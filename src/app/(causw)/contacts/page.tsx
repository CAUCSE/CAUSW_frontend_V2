'use client';

import { ContactList } from '@/widgets/contact';

export default function ContactPage() {
  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] pb-12 md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <div>
        <ContactList />
      </div>
    </div>
  );
}
