import { AxiosResponse } from "axios";
import { API, useUserStore } from "@/shared";

export const UserCouncilFeeService = () => {
  const URI = "/api/v1/users-council-fee";


  const getUserCouncilFeeInfo = async (data: any) => {
    try
{   const response = await API.get(`${URI}/info/${data}`);
    const id = useUserStore((state) => state.id);
  
}   
    catch(error)
    {
        throw(error);
    }
  }



  return { getUserCouncilFeeInfo };
};
