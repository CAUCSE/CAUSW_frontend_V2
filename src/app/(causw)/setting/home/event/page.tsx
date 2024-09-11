import { HomeRscService } from "@/shared";
import Link from "next/link";

export default async function EventSetting() {
  const { getEvents } = HomeRscService();

  let events;
  try {
    events = await getEvents();
  } catch (e: any) {
    console.error(e.message);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex justify-between">
        <Link href="..">이전</Link>
        <Link href="./banner">배너 추가</Link>
      </div>
      {events && <p>이벤트 목록</p>}
    </div>
  );
}
