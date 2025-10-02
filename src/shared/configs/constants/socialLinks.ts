export interface SocialLink {
  key:
    | 'githubLink'
    | 'linkedInLink'
    | 'blogLink'
    | 'notionLink'
    | 'instagramLink'
    | 'tistoryLink'
    | 'naverBlogLink'
    | 'mediumLink'
    | 'kakaoTalkLink'
    | 'kakaoStoryLink'
    | 'facebookLink'
    | 'naverBandLink'
    | 'naverCafeLink'
    | 'daumCafeLink'
    | 'youtubeLink'
    | 'linktreeLink'
    | 'sliceLink'
    | 'hihelloLink'
    | 'blinqLink'
    | 'poplLink';

  name: string;
  iconKey:
    | 'github'
    | 'linkedin'
    | 'velog'
    | 'notion'
    | 'instagram'
    | 'tistory'
    | 'naverBlog'
    | 'medium'
    | 'kakaoTalk'
    | 'kakaoStory'
    | 'facebook'
    | 'naverBand'
    | 'naverCafe'
    | 'daumCafe'
    | 'youtube'
    | 'linktree'
    | 'slice'
    | 'hihello'
    | 'blinq'
    | 'popl';
  className: string;
}

export const SOCIAL_LINKS_CONFIG: SocialLink[] = [
  {
    key: 'githubLink',
    name: 'GitHub',
    iconKey: 'github',
    className: 'bg-black text-white',
  },
  {
    key: 'linkedInLink',
    name: 'LinkedIn',
    iconKey: 'linkedin',
    className: 'bg-[#007AB9] text-white',
  },
  {
    key: 'blogLink',
    name: 'Velog',
    iconKey: 'velog',
    className: 'bg-[#21C998] text-white',
  },
  {
    key: 'notionLink',
    name: 'Notion',
    iconKey: 'notion',
    className: 'border bg-white text-black',
  },
  {
    key: 'instagramLink',
    name: 'Instagram',
    iconKey: 'instagram',
    className: 'border bg-white text-black hover:bg-gray-100',
  },

  {
    key: 'tistoryLink',
    name: 'Tistory',
    iconKey: 'tistory',
    className: 'bg-[#F54900] text-white',
  },
  {
    key: 'naverBlogLink',
    name: '네이버 블로그',
    iconKey: 'naverBlog',
    className: 'bg-[#00C950] text-white',
  },
  {
    key: 'mediumLink',
    name: 'Medium',
    iconKey: 'medium',
    className: 'bg-black text-white',
  },
  {
    key: 'kakaoTalkLink',
    name: '카카오톡',
    iconKey: 'kakaoTalk',
    className: 'bg-[#FFDF20] text-black',
  },
  {
    key: 'kakaoStoryLink',
    name: '카카오스토리',
    iconKey: 'kakaoStory',
    className: 'bg-[#FFDF20] text-black',
  },
  {
    key: 'facebookLink',
    name: 'Facebook',
    iconKey: 'facebook',
    className: 'bg-[#1C398E] text-white',
  },

  {
    key: 'naverBandLink',
    name: '네이버 밴드',
    iconKey: 'naverBand',
    className: 'bg-[#00C950] text-white',
  },
  {
    key: 'naverCafeLink',
    name: '네이버 카페',
    iconKey: 'naverCafe',
    className: 'bg-[#00C950] text-white',
  },
  {
    key: 'daumCafeLink',
    name: '다음 카페',
    iconKey: 'daumCafe',
    className: 'bg-[#E7000B] text-white',
  },
  {
    key: 'youtubeLink',
    name: 'YouTube',
    iconKey: 'youtube',
    className: 'bg-[#E7000B] text-white',
  },

  {
    key: 'linktreeLink',
    name: 'Linktree',
    iconKey: 'linktree',
    className: 'bg-[#00C950] text-white',
  },
  {
    key: 'sliceLink',
    name: 'Slice',
    iconKey: 'slice',
    className: 'bg-white text-black border',
  },
  {
    key: 'hihelloLink',
    name: 'HiHello',
    iconKey: 'hihello',
    className: 'bg-white text-black border',
  },
  {
    key: 'blinqLink',
    name: 'Blinq',
    iconKey: 'blinq',
    className: 'bg-white text-black border',
  },
  {
    key: 'poplLink',
    name: 'Popl',
    iconKey: 'popl',
    className: 'bg-white text-black border',
  },
];
