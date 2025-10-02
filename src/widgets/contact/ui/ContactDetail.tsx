'use client';

import { ProfileHeader } from '@/entities/contact/ui/ProfileHeader';

interface ContactDetailProps {
  contact: Contact.Contact;
  actionButtons?: React.ReactNode;
  infoSection?: React.ReactNode;
}

export const ContactDetail = ({
  contact,
  actionButtons,
  infoSection,
}: ContactDetailProps) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <ProfileHeader contact={contact} />
      <div className="pt-8">
        <p className="text-gray-700">{contact.description}</p>
      </div>

      {actionButtons && <div className="pt-3 md:pt-6">{actionButtons}</div>}

      {infoSection && <div className="pt-8">{infoSection}</div>}
    </div>
  );
};
