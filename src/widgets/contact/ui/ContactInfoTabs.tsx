'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/components/ui';
import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import BlinqIcon from '@icons/blinq-icon.svg';
import DaumCafeIcon from '@icons/daumCafe-icon.svg';
import FacebookIcon from '@icons/facebook-icon.svg';
import GithubIcon from '@icons/github-icon.svg';
import HihelloIcon from '@icons/hihello-icon.svg';
import InstagramIcon from '@icons/instagram-icon.svg';
import KakaoStoryIcon from '@icons/kakaoStory-icon.svg';
import KakaoTalkIcon from '@icons/kakaoTalk-icon.svg';
import LinkedinIcon from '@icons/linkedin-icon.svg';
import LinktreeIcon from '@icons/linktree-icon.svg';
import MediumIcon from '@icons/medium-icon.svg';
import NaverBandIcon from '@icons/naverBand-icon.svg';
import NaverBlogIcon from '@icons/naverBlog-icon.svg';
import NaverCafeIcon from '@icons/naverCafe-icon.svg';
import NotionIcon from '@icons/notion-icon.svg';
import PoplIcon from '@icons/popl-icon.svg';
import SliceIcon from '@icons/slice-icon.svg';
import TistoryIcon from '@icons/tistory-icon.svg';
import VelogIcon from '@icons/velog-icon.svg';
import YoutubeIcon from '@icons/youtube-icon.svg';
import { SOCIAL_LINKS_CONFIG } from "@/shared";

interface ContactInfoTabsProps {
  contact: Contact.Contact;
}

const ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  velog: VelogIcon,
  notion: NotionIcon,
  instagram: InstagramIcon,
  tistory: TistoryIcon,
  naverBlog: NaverBlogIcon,
  medium: MediumIcon,
  kakaoTalk: KakaoTalkIcon,
  kakaoStory: KakaoStoryIcon,
  facebook: FacebookIcon,
  naverBand: NaverBandIcon,
  naverCafe: NaverCafeIcon,
  daumCafe: DaumCafeIcon,
  youtube: YoutubeIcon,
  linktree: LinktreeIcon,
  slice: SliceIcon,
  hihello: HihelloIcon,
  blinq: BlinqIcon,
  popl: PoplIcon,
  other: LinkIcon,
};

const OTHER_LINK_CONFIG = {
  key: 'other',
  name: '기타 링크',
  iconKey: 'other',
  className: 'border bg-gray-200 text-black',
};

/**
 * URL을 분석하여 해당하는 소셜 링크 설정을 반환하는 함수
 * @param url 분석할 URL
 * @returns {object} 매칭되는 설정 객체 또는 기본 '기타 링크' 설정 객체
 */
const getSocialLinkInfo = (url: string) => {
  if (!url) return OTHER_LINK_CONFIG;

  // URL에 iconKey가 포함되어 있는지 확인하여 매칭
  // (예: "github.com" URL은 'github' iconKey를 포함하므로 매칭됨)
  const foundConfig = SOCIAL_LINKS_CONFIG.find((config) =>
    url.toLowerCase().includes(config.iconKey.toLowerCase()),
  );

  return foundConfig || OTHER_LINK_CONFIG;
};

const formatPeriod = (career: Contact.UserCareer) => {
  const { startYear, startMonth, endYear, endMonth } = career;
  const formattedStart = `${startYear}.${startMonth}`;
  const formattedEnd = endYear && endMonth ? `${endYear}.${endMonth}` : '';
  return formattedEnd ? `${formattedStart} ~ ${formattedEnd}` : `${formattedStart} ~`;
};

export const ContactInfoTabs = ({ contact }: ContactInfoTabsProps) => {
  return (
    <Tabs defaultValue="intro" className="w-full">
      <TabsList className="inline-flex w-full justify-start">
        <TabsTrigger value="intro">사용자 소개</TabsTrigger>
        <TabsTrigger value="social">소셜 네트워크</TabsTrigger>
      </TabsList>

      <TabsContent value="intro">
        <div className="h-85 w-full overflow-y-auto rounded-md border bg-gray-50 p-6">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-500">직업</p>
              <p className="text-gray-800">{contact.job}</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-500">이력</p>
              <ul className="flex flex-col gap-4">
                {contact.userCareer?.map((career, index) => (
                  <li key={index}>
                    <p className="text-gray-800">{career.description}</p>
                    <p className="text-sm text-gray-500">{formatPeriod(career)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="social">
        <div className="h-85 w-full overflow-y-auto rounded-md border bg-gray-50 p-6">
          <div className="flex flex-col gap-3">
            {contact.socialLinks?.map((url, index) => {
              if (!url) return null;

              const config = getSocialLinkInfo(url);
              const IconComponent = ICONS[config.iconKey];

              if (!IconComponent) return null;

              return (
                <a
                  key={`${config.key}-${index}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-12 w-full items-center justify-center gap-3 rounded-lg font-semibold transition-colors ${config.className}`}
                >
                  <IconComponent className="h-5 w-5" />
                  {config.name}
                </a>
              );
            })}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
