"use client";
import { CircleMemberManagementDetail, ManagementState } from "@/widget";

//TODO: 영현님
const CircleMemberManagement = ({
  params: { state, id, userId },
}: {
  params: { state: string; id: string; userId: string };
}) => {
  return     <CircleMemberManagementDetail userId = {userId}>
</CircleMemberManagementDetail>;
};

export default CircleMemberManagement;
