"use client"
import { useRouter } from "next/navigation";

const BoardPage = async () => {
  const router = useRouter();
  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl h-full">
      <button onClick={() => {
        router.push("/board/detail");
      }}>postdetail</button>
    </div>
  );
};

export default BoardPage;
