import Image from 'next/image';
import { useBoardStore } from '@/shared';

export const AllowAnonymousToggle = () => {
  const { allowAnonymous, toggleAllowAnonymous } = useBoardStore();

  return (
    <div className="flex items-center space-x-4 ml-2">
      <span onClick={toggleAllowAnonymous}>
        {allowAnonymous ? 
          <Image
            src="/images/board/role-checked.svg"
            alt="Checked Checkbox Icon"
            width={22}
            height={22}
          ></Image> :
          <Image
            src="/images/board/role-non-checked.svg"
            alt="Non Checked Checkbox Icon"
            width={22}
            height={22}
          ></Image>
        }
      </span>
      <span className='text-[20px]'>익명 허용 여부</span>
    </div>
  );
};
