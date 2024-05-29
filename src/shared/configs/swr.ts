import useSWR from "swr";
import { API } from "./axios";

export default function useFetchData<T, U>(url: string, body?: U) {
  const { data, error, mutate } = useSWR<T>(
    url,
    body
      ? async (url: string) => {
          const response = await API.post(url, body);
          return response.data;
        }
      : async (url: string) => {
          const response = await API.get(url);
          return response.data;
        }
  );

  return { data, error, mutate };
}
