'use client';

import Link from 'next/link';
import { Button } from '@/shadcn/components/ui/button';
import { ContactDetail } from '@/fsd_widgets/contact/ui/ContactDetail';
import { ContactInfoTabs } from '@/fsd_widgets/contact/ui/ContactInfoTabs';
import { useGetMyProfileQuery } from '@/fsd_entities/contact';
import { Edit } from 'lucide-react';
import { PreviousButton } from '@/fsd_shared';

export default function MyProfilePage() {
  const { data: myProfile, isLoading, isError } = useGetMyProfileQuery();

  if (isLoading) return <div> </div>;
  if (isError || !myProfile) return <div> </div>;

  const myProfileButtons = (
    <div className="flex w-full items-center justify-center gap-4">
      <Button variant="outline" className="flex-1 rounded-lg" asChild>
        <Link href="/profile/edit">
          <Edit size={16} className="mr-2" />
          프로필 수정
        </Link>
      </Button>
    </div>
  );

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] pb-12 md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <ContactDetail
        contact={myProfile}
        actionButtons={myProfileButtons}
        infoSection={<ContactInfoTabs contact={myProfile} />}
      />
    </div>
  );
}
