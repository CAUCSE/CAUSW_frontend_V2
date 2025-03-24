"use client";
import { ManagementDetailInfoTable } from "@/entities/home/setting/management";
import { titleMappingForCircle } from "@/entities/home/setting/management/AdmissionManagementDetailEntities";
import { UserRscService } from "@/shared";
import { useEffect, useState } from "react";
import { UserCouncilFeeService } from "@/shared";
import { CircleManagementButtons } from "@/entities/home/setting/management/CircleManagementDetailButtons";

interface ManagementDetailProp {
  userId: string;
  id: string;
  state: string;
}

const AcademicStatus = {
  ENROLLED: "재학",
  LEAVE_OF_ABSENCE: "휴학",
  GRADUATED: "졸업",
};

export function CircleMemberManagementDetail({
  userId,
  id,
  state,
}: ManagementDetailProp) {
  const { getUser } = UserRscService();
  const { checkIsCurrentSemesterApplied } = UserCouncilFeeService();

  const [userData, setUserData] = useState({
    email: "",
    major: "",
    name: "",
    studentId: "",
    admissionYear: "",
    nickname: "",
    graduateYearMonth: "",
    academicStatus: "",
    enrolledSemester: "",
    phoneNumber: "",
    evidentImg: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(userId);
        const graduationYear = response.graduationYear?.toString() || "";
        const graduationType = response.graduationType?.toString() || "";
        const academicStatus = AcademicStatus[response.academicStatus];

        setUserData({
          email: response.email,
          major: response.major ?? "",
          name: response.name,
          studentId: response.studentId,
          admissionYear: response.admissionYear.toString() || "",
          nickname: response.nickname,
          graduateYearMonth: `${graduationYear}/${graduationType}`,
          academicStatus: academicStatus,
          enrolledSemester: response.currentCompletedSemester?.toString() || "",
          phoneNumber: response.phoneNumber || "",
          evidentImg: response.profileImageUrl || "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-[30px] px-2 py-4">
      <p className="text-[18px] font-semibold lg:text-[40px]">{`${userData.name}(${userData.studentId})의 정보`}</p>
      <ManagementDetailInfoTable
        data={userData}
        titleMapping={titleMappingForCircle}
      />
      <CircleManagementButtons
        params={{
          name: userData.name,
          studentId: userData.studentId,
          userId: userId,
          circleId: id,
        }}
      ></CircleManagementButtons>
    </div>
  );
}
