'use client';

import type { Contact, UserCareer } from "@/fsd_entities/contact/config/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/components/ui';
import React from "react";
import GithubIcon from '../../../../public/icons/github-icon.svg';
import LinkedinIcon from '../../../../public/icons/linkedin-icon.svg';
import VelogIcon from '../../../../public/icons/velog-icon.svg';
import NotionIcon from '../../../../public/icons/notion-icon.svg';
import InstagramIcon from '../../../../public/icons/instagram-icon.svg';

interface ContactInfoTabsProps {
  contact: Contact;
}

const socialLinks = [
  {
    key: 'githubLink',
    name: 'GitHub',
    icon: <GithubIcon className="h-5 w-5" />,
    className: 'bg-black text-white',
  },
  {
    key: 'linkedInLink',
    name: 'LinkedIn',
    icon: <LinkedinIcon className="h-5 w-5" />,
    className: 'bg-[#007AB9] text-white',
  },
  {
    key: 'blogLink',
    name: 'blog',
    icon: <VelogIcon className="h-5 w-5" />,
    className: 'bg-[#21C998] text-white',
  },
  {
    key: 'notionLink',
    name: 'Notion',
    icon: <NotionIcon className="h-5 w-5" />,
    className: 'border bg-white text-black',
  },
  {
    key: 'instagramLink',
    name: 'Instagram',
    icon: <InstagramIcon className="h-5 w-5" />,
    className: 'border bg-white text-black hover:bg-gray-100',
  },
];

const formatPeriod = (career: UserCareer) => {
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
            {socialLinks.map((link) => {
              const url = contact[link.key as keyof Contact] as string | undefined;
              if (!url) return null;

              return (
                <a
                  key={link.key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-12 w-full items-center justify-center gap-3 rounded-lg font-semibold transition-colors ${link.className}`}
                >
                  {link.icon}
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
