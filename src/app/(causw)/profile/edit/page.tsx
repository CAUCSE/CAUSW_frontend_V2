'use client';

import { useGetMyProfileQuery } from '@/entities/contact';
import { ProfileEdit } from '@/fsd_widgets/profile';
import { PreviousButton } from '@/fsd_shared';

export default function MyProfileEditPage() {
  const { data: myProfile } = useGetMyProfileQuery();

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] pb-12 md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <ProfileEdit contact={myProfile} />
    </div>
  );
}
