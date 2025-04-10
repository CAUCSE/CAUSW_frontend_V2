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
  data: { occasionTitle: string; occasionId: string }[];
}
