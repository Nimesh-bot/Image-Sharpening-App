import { useMutation } from "@tanstack/react-query";
import { AppAxios } from "../config/axios.config";

const useDeleteRecord = (
    handleSuccess: (data: unknown) => void,
    handleError: (error: unknown) => void,
) => 
    useMutation(
        (record: string) => AppAxios.delete(`/results/${record}`),
        {
            onSuccess: (data) => handleSuccess(data),
            onError: (error) => handleError(error),
        }
    );

export default useDeleteRecord;