"use client"
import { useRouter } from "next/navigation";

// eslint-disable-next-line @next/next/no-async-client-component
const BoardPage = () => {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-xl h-full">
      <button onClick={() => {
        router.push("/board/0fba374d-de80-4593-be12-6f37cc2284fd");
      }}>postdetail</button>
    </div>
  );
};

export default BoardPage;
