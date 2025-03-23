"use client";

import React, { useEffect, useState } from "react";
import { UserService, UserCouncilFeeService, userQueryKey } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { LoadingComponent } from "@/_deprecated/entities";
import ProfileForm from "@/_deprecated/widget/setting/ProfileForm";

const PersonalInfoPage = () => {
  const [feeInfo, setFeeInfo] = useState({
    studentCouncilFeeStatus: "",
    paidFeeSemesters: "",
    remainingFeeSemesters: "",
  });

  const { getUserCouncilFeeInfo } = UserCouncilFeeService();
  const { getMyInfo } = UserService();

  // 유저 정보 가져오기
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: userQueryKey.all,
    queryFn: async () => {
      const response = await getMyInfo();
      return response.data;
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUserCouncilFeeData = await getUserCouncilFeeInfo();
        const userCouncilFeeData = responseUserCouncilFeeData.data;

        setFeeInfo({
          studentCouncilFeeStatus: userCouncilFeeData.isAppliedThisSemester
            ? "O"
            : "X",
          paidFeeSemesters: `${userCouncilFeeData.numOfPaidSemester}학기`,
          remainingFeeSemesters: `${userCouncilFeeData.restOfSemester}학기`,
        });
      } catch (error: any) {
        console.error("Failed to fetch user info:", error?.message);
        setFeeInfo({
          studentCouncilFeeStatus: "X",
          paidFeeSemesters: "0학기",
          remainingFeeSemesters: "0학기",
        });
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) return <LoadingComponent />;
  if (error) return <p>에러 발생</p>;

  return (
    <div className="p-3">
      <ProfileForm userData={userData} feeInfo={feeInfo} />
    </div>
  );
};

export default PersonalInfoPage;
