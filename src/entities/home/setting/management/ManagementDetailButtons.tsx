"use client";

import { Button } from "@/shared";
import { ManagementState } from "@/widget";
import { uiEntities } from "./AdmissionManagementDetailEntities";

export function AdmissionManagementDetailButtons({
  state,
  admission,
}: {
  state: ManagementState;
  admission: Setting.GetAdmissionResponseDto;
}) {
  const buttons = uiEntities[state].buttons;

  return (
    <div className="flex gap-[20px] lg:gap-[50px]">
      {buttons.map(({ name, action, variant }) => (
        <Button
          key={name}
          action={() => action(admission)}
          variant={variant}
          className="h-[55px] w-[150px] lg:w-[300px]"
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
