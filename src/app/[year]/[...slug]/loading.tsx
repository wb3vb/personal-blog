const block = {background: 'var(--surface-2)'} as const

function Line({width, height = '1em'}: {width: string; height?: string}) {
  return (
    <span
      className="block animate-pulse rounded"
      style={{...block, width, height}}
    />
  )
}

export default function PostLoading() {
  return (
    <div className="page-view relative" aria-busy="true">
      <div className="post-back" aria-hidden="true">
        <span className="dot" />
        <span style={{visibility: 'hidden'}}>BACK TO INDEX</span>
      </div>

      <section className="post-masthead">
        <div className="post-eyebrow">◆ ESSAY</div>

        <div className="post-title" aria-hidden="true">
          <Line width="88%" height="1.05em" />
          <span className="mt-3 block">
            <Line width="52%" height="1.05em" />
          </span>
        </div>

        <div className="post-meta-row">
          <div className="post-author">
            <span
              className="block animate-pulse rounded-full"
              style={{...block, width: 36, height: 36}}
              aria-hidden="true"
            />
            <div>
              <Line width="80px" height="14px" />
              <span className="mt-1 block">
                <Line width="120px" height="11.5px" />
              </span>
            </div>
          </div>
          <div className="post-stats" aria-hidden="true">
            <div>
              <b>--</b>min
            </div>
            <div>
              <b>--</b>year
            </div>
            <div>
              <b>KO</b>original
            </div>
          </div>
        </div>

        <div className="post-tags-row" aria-hidden="true">
          {[64, 84, 52, 72].map((w, i) => (
            <span
              key={i}
              className="animate-pulse rounded-full"
              style={{...block, width: w, height: 22}}
            />
          ))}
        </div>
      </section>

      <div className="post-layout">
        <article
          className="post-article prose max-w-none dark:prose-dark"
          aria-hidden="true"
        >
          {[
            ['100%', '95%', '60%'],
            ['100%', '88%'],
            ['92%', '96%', '78%', '40%'],
            ['100%', '82%'],
            ['90%', '70%'],
          ].map((widths, i) => (
            <p key={i}>
              {widths.map((w, j) => (
                <span
                  key={j}
                  className="mt-2 block animate-pulse rounded first:mt-0"
                  style={{...block, width: w, height: '1em'}}
                />
              ))}
            </p>
          ))}
        </article>
      </div>
    </div>
  )
}
