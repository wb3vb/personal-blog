import {getContactHref} from '@/shared/utils'

const isDev = process.env.NODE_ENV === 'development'

/**
 * 사이트 전역 설정, 개인화가 필요한 값은 전부 이 파일에 모여 있다.
 * TODO 표시된 값은 배포 전에 본인 값으로 교체할 것.
 */
export const SiteConfig = {
  // TODO: 첫 배포 후 실제 도메인으로 교체 (예: https://blog.example.com)
  url: isDev ? 'http://localhost:3000' : 'https://personal-blog.vercel.app',
  pathPrefix: '/',
  // TODO: 블로그 이름
  title: 'wb3vb',
  // TODO: 부제 / 슬로건
  subtitle: 'Personal blog',
  copyright: 'wb3vb © All rights reserved.',
  disqusShortname: '',
  postsPerPage: 5,
  // TODO: Google Analytics 4 측정 ID (없으면 빈 문자열 → GA 비활성)
  googleAnalyticsId: '',
  useKatex: false,
  // 포스트 하단 "Discussion" 링크가 향하는 GitHub 저장소 (owner/repo)
  discussionRepo: 'wb3vb/personal-blog',
  // 홈/About 히어로 표시 텍스트
  location: 'SEOUL', // TODO: 거주 도시
  hero: {
    // TODO: 홈 히어로 대형 문구 (3줄). 2번째 줄이 그라데이션 강조된다.
    titleLines: ['MOVE.', 'MAKE,', 'HAPPEN.'],
    tagline:
      'Nothing happens unless you do something, so I keep building, learning, and writing it down.',
    // TODO: About 페이지 소개 문단
    aboutIntro:
      '확장 가능한 시스템과 개발자 경험에 관심이 많습니다. 여기에 배우고 만든 것을 기록합니다.',
    aboutRole: 'DEVELOPER',
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
      // TODO: 트위터/X 핸들 (없으면 빈 문자열)
      twitter: '',
      github: getContactHref('github', 'wb3vb'),
      rss: '',
      linkedin: '',
      instagram: '',
      line: '',
      gitlab: '',
      codepen: '',
      youtube: '',
    },
  },
}
