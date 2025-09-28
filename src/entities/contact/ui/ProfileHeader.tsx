'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Mail, UserCircle } from 'lucide-react';

import { ImageViewer } from '@/shared/ui';

import { Badge } from '@/shadcn/components/ui/badge';

const academicStatusMap = {
  ENROLLED: { label: '재학생', variant: 'enrolled' },
  GRADUATED: { label: '졸업생', variant: 'graduated' },
  LEAVE_OF_ABSENCE: { label: '휴학생', variant: 'leave_of_absence' },
} as const;

const rolesMap = {
  PRESIDENT: { label: '학생회장', variant: 'president' },
  VICE_PRESIDENT: { label: '부학생회장', variant: 'vice_president' },
  LEADER_ALUMNI: { label: '동문회장', variant: 'leader_alumni' },
  LEADER_1: { label: '1학년 대표', variant: 'leader_1' },
  LEADER_2: { label: '2학년 대표', variant: 'leader_2' },
  LEADER_3: { label: '3학년 대표', variant: 'leader_3' },
  LEADER_4: { label: '4학년 대표', variant: 'leader_4' },
} as const;

interface ProfileHeaderProps {
  contact: Contact.Contact;
}

export const ProfileHeader = ({ contact }: ProfileHeaderProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const statusInfo = academicStatusMap[contact.academicStatus as keyof typeof academicStatusMap];
  const shortYear = String(contact.admissionYear).slice(-2);

  return (
    <>
      <div className="flex items-center gap-6">
        <div
          className="relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-full"
          onClick={() => contact.profileImageUrl && setIsViewerOpen(true)}
        >
          {contact.profileImageUrl ? (
            <Image
              src={contact.profileImageUrl}
              alt={contact.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <UserCircle className="h-full w-full text-gray-300" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">{contact.name}</h1>
            {statusInfo && <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>}
            {contact.roles?.map((role) => {
              const roleInfo = rolesMap[role as keyof typeof rolesMap];
              if (!roleInfo) return null;
              return (
                <Badge key={role} variant={roleInfo.variant}>
                  {roleInfo.label}
                </Badge>
              );
            })}
          </div>
          <p className="text-gray-500">
            {contact.major} {shortYear}학번
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Mail size={16} />
            <span>{contact.email}</span>
          </div>
        </div>
      </div>

      {isViewerOpen && contact.profileImageUrl && (
        <ImageViewer images={[contact.profileImageUrl]} onClose={() => setIsViewerOpen(false)} />
      )}
    </>
  );
};
