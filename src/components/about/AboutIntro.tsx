/**
 * About 페이지 본문 소개, 전부 편집용 플레이스홀더다.
 * 디자인(prose 래퍼)은 유지했으니 문단 내용만 본인 것으로 채우면 된다.
 */
export function AboutIntro() {
  return (
    <div className="pt-8 pb-8 xl:col-span-2">
      <div className="prose max-w-none dark:prose-dark">
        {/* TODO: 자기소개 문단으로 교체 */}
        <p>
          여기에 자기소개를 적으세요. 어떤 일을 하고, 어떤 기술에 관심이 있는지
          자유롭게 채우면 됩니다.
        </p>
        <p>
          코드 바깥에서 무엇을 즐기는지, 이 블로그에서 어떤 이야기를 다루려
          하는지도 적어 보세요.
        </p>
      </div>
    </div>
  )
}
