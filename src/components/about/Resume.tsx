import {SiteConfig} from '@/config'

/**
 * 이력서 페이지, 아래 내용은 전부 편집용 플레이스홀더다.
 * 디자인(섹션 구조·클래스)은 원본과 동일하게 유지했으니 텍스트만 본인 것으로 채우면 된다.
 */
export function Resume() {
  return (
    <div className="w-full space-y-8 pb-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 md:p-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Profile
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>
              <span className="font-semibold">이름:</span>{' '}
              {SiteConfig.author.name}
            </li>
            <li>
              <span className="font-semibold">이메일:</span>{' '}
              <a
                href={`mailto:${SiteConfig.author.contacts.email}`}
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                {SiteConfig.author.contacts.email}
              </a>
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 md:p-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Key Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {/* TODO: 본인 기술 스택으로 교체 */}
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js'].map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {skill}
                </span>
              ),
            )}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 md:p-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Summary
        </h2>
        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
          {/* TODO: 한두 문단의 자기소개로 교체 */}
          여기에 본인을 한두 문단으로 소개하세요. 어떤 일을 해왔고 무엇에 관심이
          있는지 적으면 됩니다.
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 md:p-12">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Employment History
        </h2>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {/* TODO: 경력 항목으로 교체 */}
          <li className="ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-800 dark:ring-gray-800">
              <span className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-500" />
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              직무, 회사명
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              YYYY.MM ~ YYYY.MM
            </time>
            <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <ul className="list-disc space-y-1 pl-5">
                <li>주요 업무나 성과를 항목으로 적으세요.</li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Tech Stack:</span> React,
              TypeScript, Next.js
            </p>
          </li>
        </ol>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 md:p-12">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Education
        </h2>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {/* TODO: 학력 항목으로 교체 */}
          <li className="ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-800 dark:ring-gray-800">
              <span className="h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-500" />
            </span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              학교명
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              YYYY.MM ~ YYYY.MM
            </time>
            <p className="text-gray-500 dark:text-gray-400">전공 / 학위</p>
          </li>
        </ol>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800/50 md:p-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Publishing
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
          {/* TODO: 저술/발표 항목으로 교체하거나 섹션 삭제 */}
          <li>발표, 저술, 오픈소스 등 활동을 적으세요.</li>
        </ul>
      </section>
    </div>
  )
}
