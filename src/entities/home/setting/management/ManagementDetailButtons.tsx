"use client";

import { Button } from "@/shared";
import { ManagementState } from "@/widget";
import { uiEntities } from "./managementDetailEntities";

export function ManagementDetailButtons({ state }: { state: ManagementState }) {
  const buttons = uiEntities[state].buttons;

  return (
    <div className="flex gap-[50px]">
      {buttons.map(({ name, action, variant }) => (
        <Button
          key={name}
          action={action}
          variant={variant}
          className="h-[55px] w-[300px]"
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
