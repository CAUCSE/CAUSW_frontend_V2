'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getContactById } from '@/fsd_entities/contact/api/get';
import type { Contact } from '@/fsd_entities/contact/config/types';
import { ContactDetail } from '@/fsd_widgets/contact/ui/ContactDetail';
import { ContactInfoTabs } from '@/fsd_widgets/contact/ui/ContactInfoTabs';
import { PreviousButton } from '@/fsd_shared';
import { Button } from '@/shadcn/components/ui/button';
import { Phone, MessageSquare, PhoneOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactDetailPage() {
  const params = useParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));

    const userId = params.userId as string;
    if (!userId) return;

    const fetchContact = async () => {
      try {
        const data = await getContactById(userId);
        setContact(data);
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
        setContact(null);
      }
    };

    fetchContact();
  }, [params.userId]);

  const handleCall = () => {
    if (isMobile) {
      window.location.href = `tel:${contact?.phoneNumber}`;
    } else {
      toast.error('웹에서는 지원되지 않는 기능입니다.');
    }
  };

  const handleMessage = () => {
    if (isMobile) {
      window.location.href = `sms:${contact?.phoneNumber}`;
    } else {
      toast.error('웹에서는 지원되지 않는 기능입니다.');
    }
  };

  if (!contact) {
    return <div></div>;
  }

  const actionButtons = !contact.isPhoneNumberVisible ? (
    <div className="flex w-full items-center justify-center gap-4 pt-4 md:pt-10">
      <Button variant="neutral" className="flex-1 rounded-lg" onClick={handleCall}>
        <Phone size={16} className="mr-2" />
        전화
      </Button>
      <Button variant="neutral" className="flex-1 rounded-lg" onClick={handleMessage}>
        <MessageSquare size={16} className="mr-2" />
        메세지
      </Button>
    </div>
  ) : (
    <div className="pt-4 md:pt-10">
      <Button variant="neutral" disabled className="h-12 w-full text-base">
        <PhoneOff size={16} className="mr-2" />
        비공개된 사용자입니다
      </Button>
    </div>
  );

  return (
    <div className="relative top-3 left-4 w-[calc(100%-2rem)] pb-12 md:top-14 md:left-14 md:w-[calc(100%-7rem)]">
      <PreviousButton className="mb-8" />
      <div className="mb-10 text-center text-2xl font-medium md:text-3xl">
        동문수첩
      </div>
      <ContactDetail
        contact={contact}
        actionButtons={actionButtons}
        infoSection={<ContactInfoTabs contact={contact} />}
      />
    </div>
  );
}
