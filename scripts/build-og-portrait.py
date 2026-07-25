"""
About 페이지 HeroFxB(캔버스 디더 초상)와 동일한 알고리즘을 정적 PNG로 재현한다.

원본(src/components/about-fx/HeroFxB.tsx):
  SIZE = 320, STEP = 3
  1. 원본 이미지를 중앙 정사각으로 크롭해 SIZE로 리사이즈
  2. 원형 마스크(destination-in)
  3. STEP 간격으로 픽셀 샘플링, alpha < 100 인 점은 버림
  4. 각 점을 fillRect(x, y, STEP-0.5, STEP-0.5) 로 그림

여기서는 OG 이미지(1200x630)에 얹을 것이므로 배율 2배로 굽는다.
블록 개수(107x107)는 원본과 동일하게 유지해 같은 밀도로 보이게 한다.
"""

import sys
from pathlib import Path

from PIL import Image, ImageDraw

REPO_ROOT = Path(__file__).resolve().parent.parent
SRC = str(REPO_ROOT / "public" / "profile.jpeg")
DEFAULT_OUT = str(REPO_ROOT / "src" / "assets" / "og" / "portrait-dither.png")
SCALE = 2
SIZE = 320 * SCALE
STEP = 3 * SCALE
BLOCK = STEP - SCALE * 0.5  # 원본 2.5px 비율 유지
ALPHA_CUTOFF = 100


def build(out_path: str) -> None:
    img = Image.open(SRC).convert("RGB")

    # 1. 중앙 정사각 크롭 후 SIZE로 리사이즈
    w, h = img.size
    m = min(w, h)
    sx = (w - m) // 2
    sy = (h - m) // 2
    img = img.crop((sx, sy, sx + m, sy + m)).resize((SIZE, SIZE), Image.LANCZOS)

    # 2. 원형 마스크
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, SIZE - 1, SIZE - 1), fill=255)

    px = img.load()
    mk = mask.load()

    # 3~4. 격자 샘플링 후 블록 그리기
    out = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(out)
    drawn = 0
    for y in range(0, SIZE, STEP):
        for x in range(0, SIZE, STEP):
            if mk[x, y] < ALPHA_CUTOFF:
                continue
            r, g, b = px[x, y]
            draw.rectangle([x, y, x + BLOCK, y + BLOCK], fill=(r, g, b, 255))
            drawn += 1

    out.save(out_path)
    print(f"{out_path}  {SIZE}x{SIZE}  blocks={drawn}  step={STEP}  block={BLOCK}")


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_OUT)
