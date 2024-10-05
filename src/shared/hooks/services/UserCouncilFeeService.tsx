import { AxiosResponse } from "axios";
import { API, useUserStore } from "@/shared";

export const UserCouncilFeeService = () => {
  const URI = "/api/v1/user-council-fee";


  const getUserCouncilFeeInfo = async () => {
    try
{   const response = (await API.get(`${URI}/isCurrentSemesterApplied/self/info`)) as AxiosResponse;
    return response;
}   
    catch(error)
    {
        throw(error);
    }
  }


  
  const registerCouncilFee = async (body: any) => {
    try
{   
    console.log(body);
    const response = (await API.post(`${URI}/create-user`, body)) as AxiosResponse;
    return response;
}   
    catch(error)
    {
        throw(error);
    }
  }

  const checkIsCurrentSemesterApplied = async(userId: string) => {
    try{
      const response = (await API.get(`${URI}/isCurrentSemesterApplied`), {
        headers: {
          params: userId,
        }
      });
      return response;
    }
    catch(error){
      return false;
    }
  }

  const deleteUserCouncilFeeInfo = async(userCouncilFeeId: string) => {
    try{
      const response = (await API.delete(`${URI}/delete`, {
        headers: {
          userCouncilFeeId: userCouncilFeeId,
        },
      }))
      return response;
    }
  catch (error) {
    throw error;
  }
}
  return { getUserCouncilFeeInfo, registerCouncilFee, checkIsCurrentSemesterApplied, deleteUserCouncilFeeInfo };
};
