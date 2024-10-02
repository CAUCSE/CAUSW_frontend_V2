"use client";

import { Button } from "@/shared";
import { ManagementState } from "@/widget";
import { managementDetailEntities } from "./managementDetailEntities";

export function ManagementDetailButtons({ state }: { state: ManagementState }) {
  const buttons = managementDetailEntities[state].buttons;

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
