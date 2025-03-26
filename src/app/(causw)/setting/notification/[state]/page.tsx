import { OccasionNotification } from "@/widget";

const firstNavigation = {
  name: "경조사 목록",
  state: "occasion",
  router: "/setting/notification/occasion",
};

// 추가 탭이 필요할 경우 추가
const navigation: {
  name: string;
  state: "occasion" | "alarms"; // 새로운 탭 상태 추가
  router: string;
}[] = [];

type TOccasion = {
  occasionTitle: string;
  occasionId: string;
};

const Occasion = ({ params: { state } }: { params: { state: string } }) => {
  // TODO 경조사 가져오는 로직 연동 필요
  const occasionData: TOccasion[] = [
    {
      occasionTitle: "테스트 경조사 1",
      occasionId: "1",
    },
    {
      occasionTitle: "테스트 경조사 2",
      occasionId: "2",
    },
  ];

  const alarmData: TOccasion[] = [
    {
      occasionTitle: "테스트 알림 1",
      occasionId: "3",
    },
    {
      occasionTitle: "테스트 알림 2",
      occasionId: "4",
    },
  ];

  // `state`에 따라 데이터를 결정
  const data: TOccasion[] =
    state === "occasion" ? occasionData : state === "alarms" ? alarmData : [];

  let isFirstNavigation;
  if (!state) {
    isFirstNavigation = true;
  } else if (navigation.length > 0) {
    isFirstNavigation =
      navigation.findIndex((element) => element.state === state) === -1;
  } else {
    isFirstNavigation = false;
  }

  return (
    <OccasionNotification
      state={state}
      title="전체 알림"
      firstNavigation={firstNavigation}
      navigation={navigation}
      data={data}
    />
  );
};

export default Occasion;
