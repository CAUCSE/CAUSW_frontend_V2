import { OccasionNotificationContent } from './OccasionNotificationContent';
import { OccasionNotificationHeader } from './OccasionNotificationHeader';

interface OccasionNotificationProps {
  name: string;
  state: string;
  firstNavigation: {
    name: string;
    state: string;
    router: string;
  };
  navigation?: {
    name: string;
    state: string;
    router: string;
  }[];
  data: { occasionTitle: string; occasionId: string }[];
}

export const OccasionNotification = ({ name, state, firstNavigation, navigation, data }: OccasionNotificationProps) => {
  return (
    <div className="mt-8">
      <OccasionNotificationHeader name={name} state={state} />

      <div className="flex flex-col gap-3 rounded-md bg-[#D9D9D9] px-8 py-3">
        {data.map(({ occasionId, occasionTitle }) => (
          <OccasionNotificationContent
            key={occasionId}
            occasionId={occasionId}
            occasionTitle={occasionTitle}
            state={state}
          />
        ))}
      </div>
    </div>
  );
};
