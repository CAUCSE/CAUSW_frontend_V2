import Image from "next/image";
import { useBoardStore } from "@/shared";

export const AllowAnonymousToggle = () => {
  const { allowAnonymous, toggleAllowAnonymous } = useBoardStore();

  return (
    <div className="ml-2 flex items-center space-x-4 pt-4">
      <span onClick={toggleAllowAnonymous}>
        {allowAnonymous ? (
          <Image
            src="/images/board/role-checked.svg"
            alt="Checked Checkbox Icon"
            width={22}
            height={22}
          ></Image>
        ) : (
          <Image
            src="/images/board/role-non-checked.svg"
            alt="Non Checked Checkbox Icon"
            width={22}
            height={22}
          ></Image>
        )}
      </span>
      <span className="text-[20px]">익명 허용 여부</span>
    </div>
  );
};
