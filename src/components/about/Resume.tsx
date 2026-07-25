import Image from 'next/image'

import {SiteConfig} from '@/config'

/**
 * 이력서 페이지. LinkedIn Experience를 그대로 옮기고 문장만 다듬는다(순서·회사·기간 임의 변경 금지).
 * About 페이지와 함께 영문 단일 언어로 운영한다.
 * 공개 페이지이므로 생년월일·연락처·주소 같은 개인 식별정보는 싣지 않는다.
 */

const EXPERTISE = [
  'Strategic Development',
  'Business Development',
  'Relationship Building',
  'Blockchain Research',
  'Business Strategy',
]

interface Role {
  title: string
  period: string
}

interface Job {
  company: string
  /** 국가 단위까지만. 상세 주소는 공개 페이지에 싣지 않는다. */
  location: string
  about: string
  /** 한 회사에서 직함이 바뀐 경우 최신순으로 나열한다. */
  roles: Role[]
  points: string[]
  /** public/logos 아래 파일. 없으면 회사명 이니셜 모노그램으로 대체한다. */
  logo?: string
  /** 공식 사이트 (LinkedIn 경력 항목에 연결해 둔 링크와 동일) */
  url?: string
}

const JOBS: Job[] = [
  {
    company: 'Kaia DLT Foundation',
    location: 'South Korea · Hybrid',
    about:
      'An Abu Dhabi based non-profit foundation jointly established by Klaytn Foundation and LINE to lead the integration of the Klaytn and Finschia blockchains.',
    logo: '/logos/kaia.png',
    url: 'https://kaia.io',
    roles: [{title: 'Strategy Planning Manager', period: 'Oct 2024 - Present'}],
    points: [
      'Took a key role from roadmap to execution on Project Dragon, the industry-first merger of the Klaytn and Finschia blockchains, to drive merger synergy.',
      'Spearheaded the native onboarding of Tether (USDT) as the Kaia blockchain’s core stable asset.',
      'Developing Web3 strategy and user adoption.',
      'Managing implementation of the Permissionless network transition.',
    ],
  },
  {
    company: 'LINE',
    location: 'South Korea · Hybrid',
    about:
      'LINE’s dedicated blockchain subsidiary, focused on global Web3 ecosystem expansion through mainnet development and DApp services.',
    logo: '/logos/linenext.png',
    url: 'https://line.me',
    roles: [{title: 'Business Strategy Manager', period: 'Oct 2022 - Sep 2024'}],
    points: [
      'Secured the ADGM DLT license for Finschia, the first for an Asian blockchain project, managing the process from regulatory analysis to approval.',
      'Onboarded global enterprises including SoftBank and SEGA as governance members to expand the ecosystem.',
      'Served as a key member in the early planning and strategy development for Project Dragon, the Finschia and Klaytn merger.',
      'Led the transition of Finschia from a private to a public blockchain, strengthening transparency, decentralization, and community participation.',
    ],
  },
  {
    company: 'Decipher',
    location: 'Korea · On-site',
    about:
      'A student-led blockchain research society at Seoul National University, dedicated to advancing blockchain technology through research, industry collaboration, and community engagement.',
    url: 'https://medium.com/decipher-media',
    roles: [
      {title: 'Senior Researcher', period: 'Mar 2023 - Aug 2023'},
      {title: 'Junior Researcher', period: 'Sep 2022 - Feb 2023'},
    ],
    points: [
      'Conducted in-depth blockchain technical analysis and built industry collaborations to strengthen research capabilities.',
      'Researched the latest blockchain trends, expanding education and networking within and beyond the university community.',
      'Presented at the Decipher Weekly Session, including a talk on Shared Sequencer and SUAVE.',
    ],
  },
  {
    company: 'Bithumb Korea',
    location: 'South Korea · On-site',
    about:
      'A leading digital asset exchange in South Korea, pioneering mass adoption of blockchain technology through a diverse range of crypto trading services.',
    logo: '/logos/bithumb.png',
    url: 'https://www.bithumb.com',
    roles: [
      {title: 'Business Development Manager', period: 'Jul 2020 - Oct 2022'},
    ],
    points: [
      'Developed and enhanced digital asset listing, delisting, and management policies.',
      'Prepared requested materials and submitted key reports to relevant government agencies.',
      'Implemented transparent disclosure systems in partnership with external agencies.',
      'Managed technical support and strategic communication for over 150 listed projects.',
      'Co-authored two professional publications on crypto investment and NFTs.',
    ],
  },
]

const PUBLISHING = [
  'Co-author, “NFT Investing Bible” (2022)',
  'Co-author, “The Complete Guide to Coin Investing” (2021)',
  'Keynote, AwesomeWasm Conference (Berlin, 2023)',
  'Excellence Award, Token Economy Research Competition (2019, Korea University)',
]

const CARD =
  'rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800/50'
const H2 = 'text-2xl font-bold text-gray-900 dark:text-gray-100'

export function Resume() {
  return (
    <div className="resume-dense w-full space-y-6 pb-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className={`${CARD} p-6 md:p-10`}>
          <h2 className={`mb-4 ${H2}`}>Summary</h2>
          <p className="mb-3 font-medium text-gray-900 dark:text-gray-100">
            From rugged dreams to real protocol.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            A hands-on Web3 strategist with 8+ years of turning ambitious ideas
            into shipped products. I work across go-to-market strategy, global
            partnership development, and the regulatory landscapes that decide
            whether any of it can actually launch.
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Currently at Kaia DLT Foundation in Seoul. Reach me at{' '}
            <a
              href={`mailto:${SiteConfig.author.contacts.email}`}
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              {SiteConfig.author.contacts.email}
            </a>{' '}
            or on{' '}
            <a
              href={SiteConfig.author.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              LinkedIn
            </a>
            .
          </p>
        </section>

        <section className={`${CARD} p-6 md:p-10`}>
          <h2 className={`mb-4 ${H2}`}>Top Skills</h2>
          <div className="flex flex-wrap gap-2">
            {EXPERTISE.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className={`${CARD} p-8 md:p-12`}>
        <h2 className={`mb-8 ${H2}`}>Experience</h2>
        <ol className="space-y-8">
          {JOBS.map((job) => (
            <li
              key={job.company}
              className="flex gap-4 border-b border-gray-100 pb-8 last:border-0 last:pb-0 dark:border-gray-800"
            >
              <div className="resume-logo shrink-0">
                {job.logo ? (
                  <Image
                    src={job.logo}
                    alt=""
                    width={40}
                    height={40}
                    loading="eager"
                  />
                ) : (
                  <span aria-hidden="true">{job.company.charAt(0)}</span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                      <span>{job.company}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14 4h6v6" />
                        <path d="M20 4 11 13" />
                        <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                      </svg>
                      <span className="sr-only">(opens official site)</span>
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <ul className="resume-roles mb-1">
                  {job.roles.map((r) => (
                    <li key={r.title}>
                      <span className="text-gray-700 dark:text-gray-300">
                        {r.title}
                      </span>
                      <time className="text-sm font-normal text-gray-400 dark:text-gray-500">
                        {r.period} · {job.location}
                      </time>
                    </li>
                  ))}
                </ul>
                <p className="mb-3 text-sm text-gray-400 dark:text-gray-500">
                  {job.about}
                </p>
                <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                  <ul className="list-disc space-y-1 pl-5">
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${CARD} p-8 md:p-12`}>
        <h2 className={`mb-6 ${H2}`}>Publishing &amp; Activity</h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
          {PUBLISHING.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
