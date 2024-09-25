import { AxiosResponse } from "axios";
import { API, useUserStore } from "@/shared";

export const UserCouncilFeeService = () => {
  const URI = "/api/v1/user-council-fee";


  const getUserCouncilFeeInfo = async (studentId: string) => {
    try
{   const response = (await API.get(`${URI}/info/${studentId}`)) as AxiosResponse;
    return response;
}   
    catch(error)
    {
        throw(error);
    }
  }

  const getUserCouncilFeeId = async (studentId: string) => {
    try
    {
        const response = (await API.get(`${URI}/getUserIdByStudentId`,
            {
                headers: {
                    'studentId': studentId,
                }
            }
         )) as AxiosResponse;
        return response;
    }
    catch(error)
    {
        throw(error);
    }
  }

  const getUserCouncilFeeList = async () =>
  {
    try {
        const response = (await API.get(`${URI}/list`, {
            params: {
                page: 0,
                size: 20,
                sort: ['name, asc'],
            }
        }))
        console.log(response);
    }
    catch (error)
    {
        throw error;
    }
  }



  return { getUserCouncilFeeInfo, getUserCouncilFeeId };
};
