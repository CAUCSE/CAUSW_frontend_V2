'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetContactByIdQuery } from '@/entities/contact';
import { ContactDetail } from '@/fsd_widgets/contact';
import { ContactInfoTabs } from '@/fsd_widgets/contact';
import { PreviousButton } from '@/fsd_shared';
import { Button } from '@/shadcn/components/ui/button';
import { Phone, MessageSquare, PhoneOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactDetailPage() {
  const params = useParams();
  const userId = params.userId as string;
  const [isMobile, setIsMobile] = useState(false);
  const { data: contact, isLoading, isError } = useGetContactByIdQuery(userId);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  if (!contact) {
    return <div></div>;
  }

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

  const actionButtons = !contact.isPhoneNumberVisible && contact.phoneNumber !== '전화번호 없음' ? (
    <div className="flex w-full items-center justify-center gap-4 pt-4 md:pt-10">
      <Button
        variant="neutral"
        className="flex-1 rounded-lg"
        onClick={handleCall}
      >
        <Phone size={16} className="mr-2" />
        전화
      </Button>
      <Button
        variant="neutral"
        className="flex-1 rounded-lg"
        onClick={handleMessage}
      >
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
