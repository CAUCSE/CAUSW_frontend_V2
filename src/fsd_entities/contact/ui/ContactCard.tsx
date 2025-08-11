'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserCircle } from 'lucide-react';

import { ImageViewer } from '@/fsd_shared/ui';
import { useGetMyProfileQuery } from '@/fsd_entities/contact';

interface ContactCardProps {
  contact: Contact.Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  const router = useRouter();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { data: myProfile } = useGetMyProfileQuery();

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
      router.push('/profile');
    } else {
      router.push(`/contacts/${contact.userId}`);
    }
  };

  return (
    <>
      <div
        className="flex w-full cursor-pointer items-start gap-4 rounded-lg p-4 transition-colors hover:bg-gray-100 md:py-5"
        onClick={handleNavigate}
      >
        <div className="relative h-10 w-10 shrink-0" onClick={handleImageClick}>
          {contact.profileImageUrl ? (
            <Image src={contact.profileImageUrl} alt={contact.name} fill className="rounded-full" />
          ) : (
            <UserCircle className="h-full w-full text-gray-400" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2.5">
            <span className="font-bold">{contact.name}</span>
            <span className="text-sm font-extralight" style={{ color: '#779CE7' }}>
              {contact.major} {contact.admissionYear}
            </span>
          </div>
          <div className="mt-1 flex flex-col gap-0.5 text-sm text-gray-700">
            <div className="flex items-baseline">
              <span className="mr-1.5 shrink-0 text-xs text-gray-400">직업</span>
              <span className="text-gray-800">{contact.job}</span>
            </div>
            <div className="flex items-baseline">
              <span className="mr-1.5 shrink-0 text-xs text-gray-400">소개</span>
              <span className="text-gray-800 line-clamp-1">{contact.description}</span>
            </div>
          </div>
        </div>
      </div>

      {isViewerOpen && contact.profileImageUrl && (
        <ImageViewer
          images={[contact.profileImageUrl]}
          onClose={handleCloseViewer}
        />
      )}
    </>
  );
};
