import Link from 'next/link';

import { NotificationStatusIcon } from '@/fsd_entities/notification/ui';

interface NotificationItemProps {
  occasionTitle: string;
  occasionId: string;
  state: string;
}
export const OccasionNotificationContent = ({ occasionTitle, occasionId, state }: NotificationItemProps) => {
  const read = true;
  return (
    <div className="rounded-md bg-white p-3">
      <Link href={`/setting/notification/${state}/${occasionId}`} className="mb-3 text-lg">
        <div className="flex flex-row items-center gap-2">
          <div className="no-wrap">
            <NotificationStatusIcon read={read} />
          </div>

          <div>
            <div className="text-[22px] text-xl font-semibold">{occasionTitle}</div>
            <div className="text-lg font-medium">{occasionTitle}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
