'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { UserCircle } from 'lucide-react';

import { useGetMyProfileQuery } from '@/entities/contact';

import { ImageViewer } from '@/shared/ui';

interface ContactCardProps {
  contact: Contact.Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  const router = useRouter();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { data: myProfile } = useGetMyProfileQuery();
  const shortYear = String(contact.admissionYear).slice(-2);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (contact.profileImageUrl) {
      setIsViewerOpen(true);
    }
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  const handleNavigate = () => {
    if (myProfile && contact.userId === myProfile.userId) {
      router.push('/contacts/profile');
    } else {
      router.push(`/contacts/${contact.userId}`);
    }
  };

  return (
    <>
      <div
        className="flex w-full cursor-pointer items-center gap-4 rounded-lg p-4 transition-colors hover:bg-gray-100 md:py-5" // `items-start` -> `items-center`로 변경
        onClick={handleNavigate}
      >
        <div
          className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full"
          onClick={handleImageClick}
        >
          {contact.profileImageUrl ? (
            <Image
              src={contact.profileImageUrl}
              alt={`${contact.name} 프로필 사진`}
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <UserCircle className="h-full w-full text-gray-400" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#155DFC]">{shortYear}학번</span>
            <span className="text-base font-bold">{contact.name}</span>
          </div>
          <div className="mt-1 flex flex-col gap-0.5 text-sm text-gray-700">
            <div className="flex items-baseline">
              <span className="mr-1.5 shrink-0 text-xs text-gray-400">직업</span>
              <span className="text-gray-800">{contact.job}</span>
            </div>
            <div className="flex items-baseline">
              <span className="mr-1.5 shrink-0 text-xs text-gray-400">소개</span>
              <span className="line-clamp-1 text-gray-800">{contact.description}</span>
            </div>
          </div>
        </div>
      </div>

      {isViewerOpen && contact.profileImageUrl && (
        <ImageViewer images={[contact.profileImageUrl]} onClose={handleCloseViewer} />
      )}
    </>
  );
};
