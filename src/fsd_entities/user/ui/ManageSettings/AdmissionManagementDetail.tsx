/**
 * AdmissionManagementDetail.tsx
 * - "환경설정"-"관리"-"유저 관리"-유저 선택
 */
import { getAdmission, getUser, getUserAcademicRecord } from '../../api/get';
import { managementDetailEntities } from '../../config';
import {
  convertAdmissionDataToTableEntity,
  convertUserDataToTableEntity,
  titleMapping,
  titleMappingForRejected,
  titleMappingForUser,
} from '../../config/AdmissionManagementDetailEntities';
import { ManagementState } from '../../model/types';
import { ManagementDetailButtons } from './buttons';
import { ManagementDetailInfoTable } from './ManagementDetailInfoTable';

interface ManagementDetailProp {
  state: ManagementState;
  admissionId: string;
}

export async function AdmissionManagementDetail({ state, admissionId }: ManagementDetailProp) {
  const entities = managementDetailEntities[state];
  console.log(entities, state);

  const { titleSuffix } = entities;

  let admission;
  if (state === 'admission' || state === 'reject') {
    try {
      admission = await getAdmission(admissionId);
    } catch (error) {
      console.error(error);
    }
  }

  let userInfo;
  try {
    userInfo = await getUser(admissionId);
  } catch (error) {
    console.error(error);
  }
  try {
    const response = await getUserAcademicRecord(admissionId);
    userInfo.profileImageUrl = response.userAcademicRecordApplicationResponseDtoList[0].attachedImageUrlList[0];
  } catch (error) {
    console.error(error);
  }

  let name;
  let studentId;

  console.log(admission, userInfo);

  // 가입 신청서 조회도 안되고 유저 정보 조회도 안 될 경우에
  if (!admission && !userInfo) return <div>가입 신청서 조회 실패</div>;
  if (admission && !userInfo) {
    name = admission.user.name;
    studentId = admission.user.studentId;
  } else if (!admission && userInfo) {
    name = userInfo.name;
    studentId = userInfo.studentId;
  }

  return (
    <div className="flex w-full flex-col items-center gap-[30px] px-2 py-8">
      <p className="mt-8 text-[18px] font-semibold lg:text-[25px]">{`${name}(${studentId})의 ${titleSuffix}`}</p>
      {admission && (
        <>
          <ManagementDetailInfoTable data={convertAdmissionDataToTableEntity(admission)} titleMapping={titleMapping} />
          <ManagementDetailButtons state={state} admission={admission} />
        </>
      )}
      {userInfo && (state === 'drop' || state === 'inactive') && (
        <>
          <ManagementDetailInfoTable
            data={convertUserDataToTableEntity(userInfo)}
            titleMapping={titleMappingForRejected}
          />
          <ManagementDetailButtons state={state} admission={userInfo} />
        </>
      )}
      {userInfo && (state === 'active' || state === 'reject') && (
        <div>
          <ManagementDetailInfoTable data={convertUserDataToTableEntity(userInfo)} titleMapping={titleMappingForUser} />
          <ManagementDetailButtons state={state} admission={userInfo} />
        </div>
      )}
    </div>
  );
}
