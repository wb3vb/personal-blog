import {getContactHref} from '@/shared/utils'

const isDev = process.env.NODE_ENV === 'development'

/**
 * 사이트 전역 설정, 개인화가 필요한 값은 전부 이 파일에 모여 있다.
 * TODO 표시된 값은 배포 전에 본인 값으로 교체할 것.
 */
export const SiteConfig = {
  // 사이트 정식 주소. 캐노니컬 URL, 사이트맵, OG 태그, RSS의 기준이 된다.
  // 도메인을 바꾸면 이 값만 고치면 되도록 다른 파일에서는 하드코딩하지 않는다.
  url: isDev ? 'http://localhost:3000' : 'https://wb3vb.com',
  pathPrefix: '/',
  // TODO: 블로그 이름
  title: 'wb3vb',
  // TODO: 부제 / 슬로건
  subtitle: 'Personal blog',
  copyright: 'wb3vb © All rights reserved.',
  disqusShortname: '',
  postsPerPage: 5,
  // Google Analytics 4 측정 ID (G-XXXXXXXXXX).
  // 코드에 하드코딩하지 않고 환경변수로 받는다. 값이 없으면 GA 비활성.
  // 로컬은 .env.local, 배포는 Vercel 환경변수에 NEXT_PUBLIC_GA_MEASUREMENT_ID 설정.
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
  useKatex: false,
  // 포스트 하단 "Discussion" 링크가 향하는 GitHub 저장소 (owner/repo)
  discussionRepo: 'wb3vb/personal-blog',
  // 홈/About 히어로 표시 텍스트
  location: 'SEOUL', // TODO: 거주 도시
  hero: {
    // 홈 히어로 대형 문구 (3줄). 2번째 줄이 그라데이션 강조된다.
    // 본인 삶의 모토를 그대로 옮긴 문장이므로 임의로 바꾸지 말 것.
    titleLines: ['NOTHING', 'HAPPENS', 'UNLESS I DO.'],
    tagline:
      'Life is not what you are dealt, it is what you decide. I start things, finish them, and write down what actually happened.',
    // About 페이지 히어로 아래 한 줄 소개 (About 페이지는 영문 단일 언어로 운영)
    aboutIntro:
      'Eight years in Web3. I take on work with no precedent, which means starting before anyone hands me a plan, and building the tools it needs along the way.',
    aboutRole: 'WEB3 STRATEGY & BD',
  },
  menu: [
    {
      label: 'Posts',
      labelKo: '포스트',
      path: '/pages',
    },
    {
      label: 'Tags',
      labelKo: '태그',
      path: '/tags',
    },
    {
      label: 'About',
      labelKo: '소개',
      path: '/about',
    },
  ],
  author: {
    name: 'wb3vb',
    // TODO: 프로필 이미지로 교체 (public/profile.jpeg). 현재는 기본 이미지.
    photo: '/profile.jpeg',
    bio: 'developer',
    contacts: {
      email: 'wb3vb.eth@gmail.com',
      facebook: '',
      telegram: '',
      // X(구 트위터) 프로필 URL (없으면 빈 문자열)
      twitter: 'https://x.com/web3vibe',
      // Medium 프로필 URL (없으면 빈 문자열)
      medium: 'https://medium.com/@wb3vb.eth',
      github: getContactHref('github', 'wb3vb'),
      rss: '',
      // LinkedIn 프로필 URL (없으면 빈 문자열). 끝 슬래시 없이 저장해야 라벨이 핸들로 표시됨
      linkedin: 'https://www.linkedin.com/in/web3vibe',
      instagram: '',
      line: '',
      gitlab: '',
      codepen: '',
      youtube: '',
    },
  },
}
