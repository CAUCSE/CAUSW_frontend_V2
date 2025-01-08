import axios from "axios";
import { BASEURL, getRccAccess } from "@/shared";

// AccessToken 가져오기
const getAccessToken = async () => {
  const accessToken = await getRccAccess();
  if (!accessToken) throw new Error("AccessToken이 설정되지 않았습니다.");
  return accessToken.startsWith("Bearer ")
    ? accessToken
    : `Bearer ${accessToken}`;
};

// API 에러 핸들러
const handleApiError = (error: any) => {
  if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error("알 수 없는 오류가 발생했습니다.");
};

export const LockerService = {
  fetchLocations: async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(`${BASEURL}/api/v1/lockers/locations`, {
        headers: { Authorization: accessToken },
      });
      return response.data.lockerLocations;
    } catch (error) {
      handleApiError(error);
    }
  },

  fetchLockers: async (locationId: string) => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(`${BASEURL}/api/v1/lockers/locations/${locationId}`, {
        headers: { Authorization: accessToken },
      });
      return response.data.lockerList;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateLocker: async (lockerId: string, action: string, message: string, expireAt?: string) => {
    try {
      const accessToken = await getAccessToken();
      await axios.put(
        `${BASEURL}/api/v1/lockers/${lockerId}`,
        { action, message, expireAt },
        { headers: { Authorization: accessToken } }
      );
    } catch (error) {
      handleApiError(error);
    }
  },
};
