"use client";
import {
    ManagementDetailButtons,
    managementDetailEntities,
    ManagementDetailInfoTable,
  } from "@/entities/home/setting/management";
import {
    convertDataToTableEntity,
    titleMapping,
    titleMappingForCircle,
  } from "@/entities/home/setting/management/AdmissionManagementDetailEntities";
import { UserRscService } from "@/shared";
import { useEffect, useState } from "react";
import { UserCouncilFeeService } from "@/shared";


  interface ManagementDetailProp {
    userId: string;
  }

  


  export function CircleMemberManagementDetail({
    userId,
  }: ManagementDetailProp) {


    const { getUser } = UserRscService();
    const { checkIsCurrentSemesterApplied } = UserCouncilFeeService();
    
    const [ userData, setUserData ]= useState({
      email: '',
      major: "",
      name: "",
      studentId: "",
      leftPayedSemester: "",  
      admissionYear: "",
      nickname: "",
      graduateYearMonth: "",  
      academicStatus: "",  
      enrolledSemester: "",  
      phoneNumber: "",
      evidentImg: "",
    });

    useEffect(()=> {
        const fetchData= async() => {
            try{
                const response = await getUser(userId);
                console.log(response);
                const graduationYear = (response.graduationYear)?.toString();
                const graduationType = (response.graduationType)?.toString();



                setUserData({
                    email: response.email,
                    major: response.major?? "",
                    name: response.name,
                    studentId: response.studentId,
                    leftPayedSemester: (response.currentCompletedSemester)?.toString() || "",  
                    admissionYear: (response.admissionYear).toString() || "",
                    nickname: response.nickname,
                    graduateYearMonth: `${graduationYear}/${graduationType}`,  
                    academicStatus: response.academicStatus,  
                    enrolledSemester: response.currentCompletedSemester?.toString() || "",  
                    phoneNumber: response.phoneNumber || "",
                    evidentImg: response.profileImageUrl || "",
                })

            }
            catch(error){
                console.log(error);
            }

        }
        fetchData();
    }, [])




    return (
      <div className="flex w-full flex-col items-center gap-[30px] px-2 py-4">
        <p className="text-[18px] font-semibold lg:text-[40px]">{`${userData.name}(${userData.studentId})의 정보`}</p>
        <ManagementDetailInfoTable
          data={userData}
          titleMapping={titleMappingForCircle}
        />
      </div>
    );
  }
  