import UserInfo from "./UserInfo";

interface FeeInfoProps {
    studentCouncilFeeStatus: string;
    paidFeeSemesters: string;
    remainingFeeSemesters: string;
  }
  

interface UserInfoContainerProps {
userData: {
    name: string;
    email: string;
    studentId: string;
    admissionYear: string;
    graduationYear?: string;
    academicStatus: string;
    currentCompletedSemester: string;
    major: string;
};
feeInfo: FeeInfoProps;
}

export const UserInfoContainer: React.FC<UserInfoContainerProps> = ({
userData,
feeInfo
}) => {
return (
    <div className="grid grid-cols-2 gap-4 lg:gap-2 lg:flex">
    <div className="lg:mr-32">
    <UserInfo title="이름" content={userData.name} />
    <UserInfo title="이메일" content={userData.email} />
    <UserInfo title="학번" content={userData.studentId} />
    <UserInfo title="입학 년도" content={userData.admissionYear} />
    {userData.academicStatus === "GRADUATED" && (
        <UserInfo title="졸업 년도" content={userData.graduationYear} />
    )}
    </div>
    <div>
    <UserInfo title="등록 완료 학기" content={userData.currentCompletedSemester} />
    <UserInfo title="학부(학과)" content={userData.major} />
    <UserInfo title="본 학기 학생회비 적용 여부" content={feeInfo.studentCouncilFeeStatus} />
    <UserInfo title="납부한 학생회비 학기 차수" content={feeInfo.paidFeeSemesters} />
    <UserInfo title="남은 학생회비 차수" content={feeInfo.remainingFeeSemesters} />
    </div>
</div>
);
}

