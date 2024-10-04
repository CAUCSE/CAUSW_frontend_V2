"use client";
import { CircleMemberManagementDetail, ManagementState } from "@/widget";
import { CircleManagementButtons } from "@/entities/home/setting/management/CircleManagementDetailButtons";
import { useState } from "react";
import Router, { useRouter } from "next/router";
//TODO: 영현님
const CircleMemberManagement = ({
  params: { state, id, userId },
}: {
  params: { state: string; id: string; userId: string };
}) => {

  const [ isOpenModal, setIsOpenModal ] = useState(false);
  return     (<>
<div><p>  <CircleMemberManagementDetail userId = {userId} id = {id} state = {state}/>
</p></div>      </>);
};

export default CircleMemberManagement;
