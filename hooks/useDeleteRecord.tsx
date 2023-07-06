import { useMutation, QueryClient } from "@tanstack/react-query";
import { AppAxios } from "../config/axios.config";
import { useDispatch } from "react-redux";
import { getResults } from "../redux/apiSlice";

const queryClient = new QueryClient();

const useDeleteRecord = (
    handleSuccess: (data: unknown) => void,
    handleError: (error: unknown) => void,
) => 
    useMutation<string, unknown, string>(
        (record: string) => AppAxios.delete(`/results/${record}`),
        {
            onSuccess: (data) => {
                handleSuccess(data)
            },
            onError: (error) => handleError(error),
        }
    );

export default useDeleteRecord;