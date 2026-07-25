'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useMemo, useRef, useSyncExternalStore} from 'react'

import type {TagGraph as TagGraphData} from '@/utils/Post'

/**
 * Obsidian graph view를 옮겨 온 태그 지도.
 * 카테고리가 허브 노드, 태그가 주변 노드이고 선은 실제 글에서 나온 관계다.
 *
 * Obsidian처럼 화면 경계가 없다. 노드를 가두는 대신 시뮬레이션을 미리 돌려
 * 최종 배치를 구한 뒤 카메라를 거기에 맞춘다. 가두면 노드가 벽에 눌어붙어서
 * 군집이 깨진다.
 *
 * 좌표는 React state가 아니라 DOM에 직접 쓴다. 프레임마다 좌표가 바뀌므로
 * state로 돌리면 매 프레임 리렌더가 걸린다. 호버 강조도 같은 이유로 data-state
 * 속성 + CSS로 처리한다. 그래서 이 컴포넌트는 사실상 한 번만 렌더된다.
 */

/**
 * 분류별 그라데이션. 사이트 강조색(indigo/purple/pink/teal) 계열에서 뽑았다.
 * 해시로 색을 만들면 글이 늘 때마다 색이 바뀌어서 고정 매핑을 쓴다.
 */
const PALETTE: Record<string, {from: string; to: string; glow: string}> = {
  crypto: {from: '#ddd6fe', to: '#7c3aed', glow: '#a78bfa'},
  ai: {from: '#bae6fd', to: '#4f46e5', glow: '#60a5fa'},
  investing: {from: '#a7f3d0', to: '#059669', glow: '#2dd4bf'},
  realestate: {from: '#fde68a', to: '#ea580c', glow: '#fbbf24'},
  economy: {from: '#fbcfe8', to: '#be185d', glow: '#f472b6'},
  etc: {from: '#e2e8f0', to: '#64748b', glow: '#94a3b8'},
}
const FALLBACK = PALETTE.etc

// viewBox 비율이 곧 그래프 영역의 높이가 된다(width 100%, height auto).
const WIDE = {w: 860, h: 410}
const NARROW = {w: 400, h: 460}

// 힘 상수. CHARGE를 키우면 흩어지고 GRAVITY를 키우면 가운데로 모인다.
const ALPHA_DECAY = 0.022
const ALPHA_MIN = 0.004
const VELOCITY_DECAY = 0.62
const CHARGE = -480
const LINK_STRENGTH = 0.55
const GRAVITY = 0.17
const LINK_DISTANCE = 38
const COLLIDE_GAP = 24
/** 프레이밍 여유. 1이면 그래프가 테두리에 딱 붙는다. */
const FIT_FILL = 0.84
/** 자동 맞춤이 노드와 글자까지 키워 버리지 않도록 두는 상한 */
const FIT_MAX_ZOOM = 1.08

interface SimNode {
  id: string
  label: string
  kind: 'category' | 'tag'
  count: number
  href: string
  group: string
  glow: string
  r: number
  /** 라벨 가로 폭의 절반. 글자끼리 겹치지 않게 벌릴 때 쓴다. */
  lw: number
  x: number
  y: number
  vx: number
  vy: number
  pinned: boolean
}

interface Camera {
  k: number
  tx: number
  ty: number
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v))

export default function TagGraph({data}: {data: TagGraphData}) {
  const router = useRouter()
  const svgRef = useRef<SVGSVGElement>(null)
  const sceneRef = useRef<SVGGElement>(null)
  /** 줌 버튼이 시뮬레이션 안쪽 카메라를 건드리기 위한 통로 */
  const apiRef = useRef<{zoom: (f: number) => void; reset: () => void} | null>(
    null,
  )
  const narrow = useMediaQuery('(max-width: 640px)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const view = narrow ? NARROW : WIDE

  /** 반지름과 초기 좌표. 서버와 클라이언트가 같은 값을 내도록 난수를 쓰지 않는다. */
  const layout = useMemo(() => {
    const maxCount = Math.max(...data.nodes.map((n) => n.count), 1)
    const cats = data.nodes.filter((n) => n.kind === 'category')
    const tags = data.nodes.filter((n) => n.kind === 'tag')

    const place = (list: typeof data.nodes, radius: number) =>
      list.map((n, i) => {
        const t = (i / Math.max(list.length, 1)) * Math.PI * 2 - Math.PI / 2
        // 고정폭 글꼴이라 글자 수 x 폭으로 라벨 크기를 충분히 정확히 잡을 수 있다
        const fontSize = n.kind === 'category' ? 12.5 : 10.5
        return {
          ...n,
          glow: (PALETTE[n.group] ?? FALLBACK).glow,
          lw: (n.label.length * fontSize * 0.6) / 2,
          r:
            n.kind === 'category'
              ? 13 + (n.count / maxCount) * 11
              : 6 + (n.count / maxCount) * 7,
          x: view.w / 2 + Math.cos(t) * radius,
          y: view.h / 2 + Math.sin(t) * radius,
          vx: 0,
          vy: 0,
          pinned: false,
        }
      })

    const nodes: SimNode[] = [...place(cats, 55), ...place(tags, 150)]
    /** 실제로 쓰이는 그라데이션만 defs에 넣는다 */
    const groups = [...new Set(data.nodes.map((n) => n.group))]
    return {nodes, links: data.links, groups}
  }, [data, view.w, view.h])

  /** 호버 강조에 쓰는 인접 노드 표 */
  const neighbors = useMemo(() => {
    const map = new Map<string, Set<string>>()
    for (const l of data.links) {
      if (!map.has(l.source)) {
        map.set(l.source, new Set())
      }
      if (!map.has(l.target)) {
        map.set(l.target, new Set())
      }
      map.get(l.source)?.add(l.target)
      map.get(l.target)?.add(l.source)
    }
    return map
  }, [data])

  useEffect(() => {
    const svg = svgRef.current
    const scene = sceneRef.current
    if (!svg || !scene) {
      return
    }

    const nodes: SimNode[] = layout.nodes.map((n) => ({...n}))
    const byId = new Map(nodes.map((n) => [n.id, n]))

    const links = layout.links
      .map((l) => ({
        a: byId.get(l.source),
        b: byId.get(l.target),
        weight: l.weight,
        el: scene.querySelector<SVGLineElement>(
          `line[data-link="${CSS.escape(`${l.source}|${l.target}`)}"]`,
        ),
      }))
      .filter((l) => l.a && l.b && l.el) as {
      a: SimNode
      b: SimNode
      weight: number
      el: SVGLineElement
    }[]

    const els = new Map<string, SVGGElement>()
    for (const n of nodes) {
      const el = scene.querySelector<SVGGElement>(
        `g[data-id="${CSS.escape(n.id)}"]`,
      )
      if (el) {
        els.set(n.id, el)
      }
    }

    // ---------- 물리 ----------
    // d3-force와 같은 방식. 힘은 alpha에 비례해 줄어들다가 0에서 멈춘다.
    let alpha = 1
    let alphaTarget = 0

    const cx = view.w / 2
    const cy = view.h / 2
    // 화면이 가로로 길면 세로로 더 세게 당겨서 군집을 납작하게 만든다.
    // 그래야 옆이 비지 않으면서도 영역 높이를 키우지 않는다.
    const squeeze = Math.sqrt(view.w / view.h)
    const gx = GRAVITY / squeeze
    const gy = GRAVITY * squeeze

    const step = () => {
      alpha += (alphaTarget - alpha) * ALPHA_DECAY

      // 서로 밀어낸다. dx를 그대로 곱하므로 힘이 1/d로 완만하게 준다.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const d2 = Math.max(dx * dx + dy * dy, 100)
          const w = (CHARGE * alpha) / d2
          a.vx += dx * w
          a.vy += dy * w
          b.vx -= dx * w
          b.vy -= dy * w
        }
      }

      // 연결된 노드는 서로 당긴다
      for (const l of links) {
        const dx = l.b.x - l.a.x
        const dy = l.b.y - l.a.y
        const d = Math.hypot(dx, dy) || 1
        const rest = LINK_DISTANCE + l.a.r + l.b.r
        const w = (((d - rest) / d) * alpha * LINK_STRENGTH) / 2
        l.a.vx += dx * w
        l.a.vy += dy * w
        l.b.vx -= dx * w
        l.b.vy -= dy * w
      }

      // 가운데로 모으고, 속도를 줄이고, 위치를 갱신한다
      for (const n of nodes) {
        if (n.pinned) {
          n.vx = 0
          n.vy = 0
          continue
        }
        n.vx += (cx - n.x) * gx * alpha
        n.vy += (cy - n.y) * gy * alpha
        n.vx *= VELOCITY_DECAY
        n.vy *= VELOCITY_DECAY
        n.x += n.vx
        n.y += n.vy
      }

      // 겹침은 힘이 아니라 위치로 직접 푼다. 힘으로 풀면 튕겨 나간다.
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i]
            const b = nodes[j]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const d = Math.hypot(dx, dy) || 0.01
            const min = a.r + b.r + COLLIDE_GAP
            if (d >= min) {
              continue
            }
            const push = (min - d) / d / 2
            const ox = dx * push
            const oy = dy * push
            if (!a.pinned) {
              a.x -= ox
              a.y -= oy
            }
            if (!b.pinned) {
              b.x += ox
              b.y += oy
            }
          }
        }
      }

      // 라벨은 노드 아래에 깔리므로 높이가 비슷하면 가로로 벌려 준다
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          if (Math.abs(a.y + a.r - (b.y + b.r)) > 15) {
            continue
          }
          const dx = b.x - a.x
          const gap = a.lw + b.lw + 10
          const dist = Math.abs(dx)
          if (dist >= gap) {
            continue
          }
          const push = ((gap - dist) / 2) * (dx < 0 ? -1 : 1)
          if (!a.pinned) {
            a.x -= push
          }
          if (!b.pinned) {
            b.x += push
          }
        }
      }

      return alpha
    }

    // ---------- 카메라 ----------
    // 최종 배치를 미리 구해 두고 거기에 화면을 맞춘다. 그래야 노드가 자리를
    // 잡는 동안에도 화면이 흔들리지 않는다.
    const fitTo = (list: {x: number; y: number; r: number}[]): Camera => {
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity
      for (const n of list) {
        // 라벨이 노드 아래·양옆으로 삐져나오는 만큼 여유를 준다
        minX = Math.min(minX, n.x - n.r - 42)
        maxX = Math.max(maxX, n.x + n.r + 42)
        minY = Math.min(minY, n.y - n.r - 10)
        maxY = Math.max(maxY, n.y + n.r + 24)
      }
      const k = clamp(
        Math.min(view.w / (maxX - minX), view.h / (maxY - minY)) * FIT_FILL,
        0.4,
        FIT_MAX_ZOOM,
      )
      return {
        k,
        tx: view.w / 2 - ((minX + maxX) / 2) * k,
        ty: view.h / 2 - ((minY + maxY) / 2) * k,
      }
    }

    const preview = nodes.map((n) => ({...n}))
    {
      // 화면에 그리지 않고 먼저 수렴시킨다
      const keep = nodes.map((n) => ({x: n.x, y: n.y}))
      while (step() > ALPHA_MIN) {
        // 계산만 반복한다
      }
      for (let i = 0; i < nodes.length; i++) {
        preview[i].x = nodes[i].x
        preview[i].y = nodes[i].y
        // 실제 시뮬레이션은 처음 배치에서 다시 시작한다
        nodes[i].x = keep[i].x
        nodes[i].y = keep[i].y
        nodes[i].vx = 0
        nodes[i].vy = 0
      }
      alpha = 1
    }

    const home = fitTo(preview)
    const cam: Camera = {...home}

    const paint = () => {
      scene.setAttribute(
        'transform',
        `translate(${cam.tx.toFixed(2)} ${cam.ty.toFixed(2)}) scale(${cam.k.toFixed(4)})`,
      )
      for (const n of nodes) {
        els
          .get(n.id)
          ?.setAttribute(
            'transform',
            `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`,
          )
      }
      for (const l of links) {
        l.el.setAttribute('x1', l.a.x.toFixed(1))
        l.el.setAttribute('y1', l.a.y.toFixed(1))
        l.el.setAttribute('x2', l.b.x.toFixed(1))
        l.el.setAttribute('y2', l.b.y.toFixed(1))
      }
    }

    let raf = 0
    const loop = () => {
      paint()
      // alpha가 0에 가까워지면 멈춘다. 계속 돌리면 배터리만 먹는다.
      raf = step() < ALPHA_MIN ? 0 : requestAnimationFrame(loop)
    }
    /** 끌기 같은 개입이 있을 때 시뮬레이션을 다시 데운다 */
    const reheat = (target: number) => {
      alphaTarget = target
      alpha = Math.max(alpha, target || 0.3)
      if (!raf && !reduceMotion) {
        raf = requestAnimationFrame(loop)
      }
    }

    if (reduceMotion) {
      // 움직임을 줄이기로 한 사용자에게는 최종 배치만 보여준다
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].x = preview[i].x
        nodes[i].y = preview[i].y
      }
      alpha = 0
    }
    // 탭이 숨겨져 있으면 rAF가 돌지 않으므로 첫 프레임은 직접 그린다
    paint()
    if (!reduceMotion) {
      raf = requestAnimationFrame(loop)
    }

    // ---------- 좌표 변환 ----------
    /** 화면 좌표 -> viewBox 좌표 */
    const toView = (e: PointerEvent | WheelEvent) => {
      const rect = svg.getBoundingClientRect()
      return {
        x: ((e.clientX - rect.left) / rect.width) * view.w,
        y: ((e.clientY - rect.top) / rect.height) * view.h,
      }
    }
    /** 화면 좌표 -> 그래프 좌표(카메라 역변환) */
    const toScene = (e: PointerEvent) => {
      const p = toView(e)
      return {x: (p.x - cam.tx) / cam.k, y: (p.y - cam.ty) / cam.k}
    }

    // ---------- 호버 강조 ----------
    const setHover = (id: string | null) => {
      const near = id ? neighbors.get(id) : null
      for (const [nodeId, el] of els) {
        el.dataset.state =
          id == null
            ? 'idle'
            : nodeId === id
              ? 'hot'
              : near?.has(nodeId)
                ? 'near'
                : 'dim'
      }
      for (const l of links) {
        const touches = id != null && (l.a.id === id || l.b.id === id)
        l.el.dataset.state = id == null ? 'idle' : touches ? 'hot' : 'dim'
        if (touches) {
          l.el.style.setProperty('--c', l.a.glow)
        }
      }
    }

    const nodeAt = (target: EventTarget | null) =>
      (target as Element | null)?.closest?.('.tg-node') as SVGGElement | null

    // ---------- 끌기(노드) / 밀기(배경) ----------
    let dragNode: {node: SimNode; dx: number; dy: number; moved: number} | null =
      null
    let pan: {x: number; y: number; tx: number; ty: number} | null = null

    const onOver = (e: PointerEvent) => {
      if (dragNode || pan) {
        return
      }
      const el = nodeAt(e.target)
      setHover(el?.dataset.id ?? null)
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) {
        return
      }
      const el = nodeAt(e.target)
      const node = el?.dataset.id ? byId.get(el.dataset.id) : undefined
      svg.setPointerCapture(e.pointerId)
      if (node) {
        const p = toScene(e)
        dragNode = {node, dx: node.x - p.x, dy: node.y - p.y, moved: 0}
        node.pinned = true
        setHover(node.id)
        // 끄는 동안 시뮬레이션을 계속 데워 주변이 따라 움직이게 한다
        reheat(0.3)
      } else {
        const p = toView(e)
        pan = {x: p.x, y: p.y, tx: cam.tx, ty: cam.ty}
        svg.dataset.panning = 'on'
      }
    }

    const onMove = (e: PointerEvent) => {
      if (dragNode) {
        const p = toScene(e)
        const nx = p.x + dragNode.dx
        const ny = p.y + dragNode.dy
        dragNode.moved +=
          Math.abs(nx - dragNode.node.x) + Math.abs(ny - dragNode.node.y)
        dragNode.node.x = nx
        dragNode.node.y = ny
        if (reduceMotion) {
          paint()
        }
        return
      }
      if (pan) {
        const p = toView(e)
        cam.tx = pan.tx + (p.x - pan.x)
        cam.ty = pan.ty + (p.y - pan.y)
        paint()
      }
    }

    const onUp = (e: PointerEvent) => {
      svg.releasePointerCapture?.(e.pointerId)
      if (pan) {
        pan = null
        delete svg.dataset.panning
        return
      }
      if (!dragNode) {
        return
      }
      const {node, moved} = dragNode
      node.pinned = false
      dragNode = null
      // 끌지 않고 눌렀다 뗀 것이면 이동으로 본다
      if (moved < 4) {
        router.push(node.href)
        return
      }
      reheat(0)
    }

    const onLeave = () => {
      if (!dragNode && !pan) {
        setHover(null)
      }
    }

    // ---------- 줌 ----------
    const zoomAt = (vx: number, vy: number, factor: number) => {
      const k = clamp(cam.k * factor, home.k * 0.4, home.k * 4)
      const ratio = k / cam.k
      cam.tx = vx - (vx - cam.tx) * ratio
      cam.ty = vy - (vy - cam.ty) * ratio
      cam.k = k
      paint()
    }

    // 페이지 스크롤을 뺏지 않도록 확대는 Ctrl/Cmd(트랙패드 핀치 포함)일 때만.
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        return
      }
      e.preventDefault()
      const p = toView(e)
      zoomAt(p.x, p.y, Math.exp(-e.deltaY * 0.01))
    }

    const resetView = () => {
      cam.k = home.k
      cam.tx = home.tx
      cam.ty = home.ty
      paint()
    }

    apiRef.current = {
      zoom: (factor) => zoomAt(view.w / 2, view.h / 2, factor),
      reset: resetView,
    }

    svg.addEventListener('pointerover', onOver)
    svg.addEventListener('pointerdown', onDown)
    svg.addEventListener('pointermove', onMove)
    svg.addEventListener('pointerup', onUp)
    svg.addEventListener('pointercancel', onUp)
    svg.addEventListener('pointerleave', onLeave)
    svg.addEventListener('wheel', onWheel, {passive: false})
    svg.addEventListener('dblclick', resetView)

    return () => {
      if (raf) {
        cancelAnimationFrame(raf)
      }
      apiRef.current = null
      svg.removeEventListener('pointerover', onOver)
      svg.removeEventListener('pointerdown', onDown)
      svg.removeEventListener('pointermove', onMove)
      svg.removeEventListener('pointerup', onUp)
      svg.removeEventListener('pointercancel', onUp)
      svg.removeEventListener('pointerleave', onLeave)
      svg.removeEventListener('wheel', onWheel)
      svg.removeEventListener('dblclick', resetView)
    }
  }, [layout, neighbors, view.w, view.h, reduceMotion, router])

  return (
    <div className="tag-graph">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${view.w} ${view.h}`}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {layout.groups.map((g) => {
            const c = PALETTE[g] ?? FALLBACK
            return (
              <radialGradient
                key={g}
                id={`tgg-${g}`}
                cx="32%"
                cy="26%"
                r="82%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor={c.from} />
                <stop offset="55%" stopColor={c.glow} />
                <stop offset="100%" stopColor={c.to} />
              </radialGradient>
            )
          })}
          {layout.groups.map((g) => {
            const c = PALETTE[g] ?? FALLBACK
            return (
              <radialGradient
                key={`${g}-soft`}
                id={`tgg-${g}-soft`}
                cx="32%"
                cy="26%"
                r="86%"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor={c.from} stopOpacity="0.85" />
                <stop offset="60%" stopColor={c.glow} stopOpacity="0.5" />
                <stop offset="100%" stopColor={c.to} stopOpacity="0.28" />
              </radialGradient>
            )
          })}
        </defs>

        <g ref={sceneRef} className="tg-scene">
          <g className="tg-links">
            {layout.links.map((l) => (
              <line
                key={`${l.source}|${l.target}`}
                data-link={`${l.source}|${l.target}`}
                data-state="idle"
                strokeWidth={Math.min(0.9 + l.weight * 0.16, 2)}
              />
            ))}
          </g>
          <g className="tg-nodes">
            {layout.nodes.map((n) => (
              <g
                key={n.id}
                className="tg-node"
                data-id={n.id}
                data-kind={n.kind}
                data-state="idle"
                transform={`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`}
                style={{['--c' as string]: n.glow}}
              >
                <circle className="tg-hit" r={n.r + 12} />
                <circle
                  className="tg-dot"
                  r={n.r}
                  fill={`url(#tgg-${n.group}${n.kind === 'tag' ? '-soft' : ''})`}
                />
                <text y={n.r + 16} textAnchor="middle">
                  {n.label}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>

      <div className="tg-zoom">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => apiRef.current?.zoom(1.25)}
        >
          +
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => apiRef.current?.zoom(0.8)}
        >
          −
        </button>
        <button
          type="button"
          aria-label="Reset view"
          onClick={() => apiRef.current?.reset()}
        >
          ⤾
        </button>
      </div>

      <p className="tg-hint">
        Click a node to open its posts. Drag to move, drag the background to
        pan, pinch to zoom.
      </p>

      {/* 키보드와 크롤러를 위한 실제 링크. 그래프는 이 목록의 시각화다. */}
      <ul className="tg-list">
        {data.nodes.map((n) => (
          <li key={n.id} data-kind={n.kind}>
            <a href={n.href}>
              {n.label}
              <span>{n.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
