/**
 * RSS 피드에 넣을 문자열을 XML 안전하게 만든다.
 *
 * 예전에는 제목·요약을 `<![CDATA[...]]>` 로 감쌌는데, 값 안에 `]]>` 가 들어가면
 * 거기서 CDATA가 끊겨 뒤 문자열이 마크업으로 해석된다. XSLT나 XML을 다루는 글을 쓰면
 * 의도치 않게 피드 전체가 깨질 수 있어, CDATA를 걷어내고 전부 이스케이프한다.
 */
export function xmlEscape(value: unknown): string {
  return (
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      // XML 1.0이 허용하지 않는 제어문자. 본문 앞부분을 그대로 넣는 경로 대비.
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
  )
}
