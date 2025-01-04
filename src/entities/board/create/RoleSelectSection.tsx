"use client";

import { UserRscService, useBoardStore } from "@/shared";
import { useEffect, useState } from "react";

import Image from "next/image";

interface RoleSelectSectionProps {
  roles: { [key: string]: string[] };
}
export const RoleSelectSection = ({ roles }: RoleSelectSectionProps) => {
  const { selectedRoles, toggleRole, toggleAnyRole } = useBoardStore();
  const [hasAuth, setHasAuth] = useState(false);

  useEffect(() => {
    const fetchAuth = async () => {
      const user = await UserRscService().getMe();
      if (
        user.roles.includes("ADMIN") ||
        user.roles.includes("PRESIDENT") ||
        user.roles.includes("VICE_PRESIDENT")
      ) {
        setHasAuth(true);
      }
    };
    fetchAuth();
  });

  return (
    <div className="mb-2">
      <div className="mb-2 text-2xl xl:mb-4 xl:text-3xl">
        게시글 작성 권한 명단
      </div>
      {hasAuth ? (
        <div className="text-md rounded-2xl bg-notice-board-role p-4 xl:text-lg">
          <div className="mb-2 flex items-center space-x-3">
            <span onClick={toggleAnyRole}>
              {selectedRoles.includes("ALL") ? (
                <Image
                  src="/images/board/role-checked.svg"
                  alt="Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              ) : (
                <Image
                  src="/images/board/role-non-checked.svg"
                  alt="Non Checked Checkbox Icon"
                  width={18}
                  height={18}
                ></Image>
              )}
            </span>
            <span>상관없음</span>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Object.entries(roles).map(([roleLabel, roleEnums]) => (
              <div key={roleLabel} className="flex items-center space-x-3">
                <span onClick={() => toggleRole(roleEnums)}>
                  {selectedRoles.includes(roleEnums[0]) ? (
                    <Image
                      src="/images/board/role-checked.svg"
                      alt="Checked Checkbox Icon"
                      width={18}
                      height={18}
                    ></Image>
                  ) : (
                    <Image
                      src="/images/board/role-non-checked.svg"
                      alt="Non Checked Checkbox Icon"
                      width={18}
                      height={18}
                    ></Image>
                  )}
                </span>
                <span>{roleLabel}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-normal-board-role p-4">
          <div className="mb-2 flex items-center space-x-3">
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
            {Object.entries(roles).map(([roleLabel]) => (
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
      )}
    </div>
  );
};
