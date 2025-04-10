interface OccasionRequestManagementProps {
  state: string | undefined;
  title: string;
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
}

interface Occasion {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  ceremonyState: string;
  attachedImageUrlList: string[];
  note: string | null;
}

type OccasionListProps = {
  list: Occasion[];
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
  state: string | undefined;
};
