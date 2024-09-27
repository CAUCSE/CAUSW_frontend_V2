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


  
  const registerCouncilFee = async () => {
    try
{   const response = (await API.post(`${URI}/create-user`)) as AxiosResponse;
    return response;
}   
    catch(error)
    {
        throw(error);
    }
  }

  




  return { getUserCouncilFeeInfo, registerCouncilFee };
};
