'use client';

import Link from 'next/link';

import { ContactList } from '@/widgets/contact';

import { PreviousButton } from '@/shared';

export default function ContactPage() {
  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] pb-12 md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-medium md:text-3xl">동문수첩</h1>
      </div>
      <div>
        <ContactList />
      </div>
    </div>
  );
}
