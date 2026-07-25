/**
 * About 페이지 본문.
 * 한국어/영어 라우트 모두 이 영문 버전을 그대로 쓴다(의도된 단일 언어).
 * 업무 성과는 Resume 탭이 담당하고, 여기서는 관심사와 원칙만 다룬다.
 * 문체 규칙: em dash 금지, 문장은 짧게, 수식보다 사실.
 */

const NOW = [
  {
    label: 'Work',
    body: 'Strategy and business development in Web3. Eight years in, still here.',
  },
  {
    label: 'Building',
    body: 'A second brain that runs on my own files, so any AI model can plug into it.',
  },
  {
    label: 'Reading',
    body: 'Stablecoin regulation, Seoul housing supply, and how far a non-developer can get with AI.',
  },
  {
    label: 'Writing',
    body: 'Crypto, real estate, investing, AI. The reasoning more than the conclusions.',
  },
]

const PRINCIPLES = [
  {
    title: 'Start before it makes sense.',
    body: 'Waiting for the right conditions is a slower way of saying no. Almost everything I am glad I built started as something I had no business starting.',
  },
  {
    title: 'Build the reasoning, not just the take.',
    body: 'A conclusion someone hands me is worth very little. I would rather spend the hours assembling the evidence and let the conclusion follow.',
  },
  {
    title: 'Measure it or drop it.',
    body: 'Taste is a weak argument. If a change cannot be shown to be better, it does not stay.',
  },
  {
    title: 'Other people’s scoreboard is not mine.',
    body: 'I used to read every result as a verdict on me, and it made me slow and anxious. Reading them as information instead is the single change that kept me moving.',
  },
  {
    title: 'Subtraction is underrated.',
    body: 'Most of my good decisions were removals. Fewer commands, fewer moving parts, fewer things to trust.',
  },
  {
    title: 'Own what you keep.',
    body: 'Knowledge that lives in someone else’s account is borrowed. I keep mine in plain files I can open and carry.',
  },
]

const ELSEWHERE = [
  'Eight years in California, then back to Korea and straight into blockchain.',
  'Co-authored two books on crypto and NFT investing.',
  'The only two books I have read more than once: Ichiro Kishimi on Adler, and Pearl Buck’s The Good Earth.',
  'I run on documents. Most conversations end up as a table.',
  'I cannot write a line of code. Somehow I shipped a package to npm.',
]

export function AboutIntro() {
  return (
    <div className="pb-8 pt-8 xl:col-span-2">
      <div className="prose about-dense max-w-none dark:prose-dark">
        <p className="lead">
          My motto is a book title I picked up on a bad day: if you do nothing,
          nothing happens.
        </p>
        <p>
          It sounds like a lecture about laziness. It is the opposite. Ichiro
          Kishimi is writing about Adler, and the point is that a life is not
          the hand you were dealt, it is what you decide to do with it. I read
          it during the hardest stretch I have had at work, when I was measuring
          myself entirely by other people’s reactions. What changed was not my
          circumstances. It was that I stopped waiting for someone to hand me
          permission, and started moving first.
        </p>
        <p>
          That is most of what you need to know about how I work. I take on the
          things with no precedent, because nobody is coming to write the
          playbook for them.
        </p>

        <h2>Now</h2>
        <ul>
          {NOW.map((item) => (
            <li key={item.label}>
              <strong>{item.label}.</strong> {item.body}
            </li>
          ))}
        </ul>

        <h2>How I work</h2>
        <ul>
          {PRINCIPLES.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <br />
              {item.body}
            </li>
          ))}
        </ul>

        <h2>Elsewhere</h2>
        <ul>
          {ELSEWHERE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>This blog</h2>
        <p>
          Where I keep the reasoning behind what I build and what I bet on.
          Writing it down is how I check that I actually did something. For the
          work history, see the <a href="/resume">Resume</a> tab.
        </p>
      </div>
    </div>
  )
}
