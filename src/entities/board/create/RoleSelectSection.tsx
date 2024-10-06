import Image from 'next/image';
import { useBoardStore } from '@/shared';

interface RoleSelectSectionPorps {
  userRole: boolean,
  roles: { [key: string]: string[] };
}
export const RoleSelectSection = ({ userRole, roles }: RoleSelectSectionPorps) => {
  const { selectedRoles, toggleRole, toggleAnyRole } = useBoardStore();

  return (
    <div className="mb-2">
      <div className="text-[28px] mb-2lg:mb-4">게시글 작성 권한 명단</div>
      {userRole 
      ? <div className="p-4 bg-notice-board-role rounded-2xl">
          <div className="flex items-center space-x-3 mb-2">
            <span onClick={toggleAnyRole}>
              {selectedRoles.includes('ALL') ? 
                <Image
                  src="/images/board/role-checked.svg"
                  alt="Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image> :
                <Image
                  src="/images/board/role-non-checked.svg"
                  alt="Non Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              }
            </span>
            <span>상관없음</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(roles).map(([roleLabel, roleEnums]) => (
              <div key={roleLabel} className="flex items-center space-x-3">
                <span onClick={() => toggleRole(roleEnums)}>
                  {selectedRoles.includes(roleEnums[0]) ? 
                    <Image
                      src="/images/board/role-checked.svg"
                      alt="Checked Checkbox Icon"
                      width={18}
                      height={18}
                    ></Image> :
                    <Image
                      src="/images/board/role-non-checked.svg"
                      alt="Non Checked Checkbox Icon"
                      width={18}
                      height={18}
                    ></Image>
                  }
                </span>
                <span>{roleLabel}</span>
              </div>
            ))}
          </div>
        </div>
      : <div className="p-4 bg-normal-board-role rounded-2xl">
          <div className="flex items-center space-x-3 mb-2">
            <span>
              <Image
                src="/images/board/normal-role-checked.svg"
                alt="Checked Checkbox Icon"
                width={18}
                height={18}
              ></Image>
            </span>
            <span>상관없음</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(roles).map(([roleLabel, roleEnums]) => (
              <div key={roleLabel} className="flex items-center space-x-3">
                <span>
                  <Image
                    src="/images/board/normal-role-non-checked.svg"
                    alt="Non Checked Checkbox Icon"
                    width={18}
                    height={18}
                  ></Image>
                </span>
                <span>{roleLabel}</span>
              </div>
            ))}
          </div>
          
        </div>
    }
    </div>
  );
};

