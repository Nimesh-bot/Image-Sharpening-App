import { useMutation } from "@tanstack/react-query";
import { MultipartAxios } from "../config/axios.config";

const useReProcessImage = (
    handleSuccess: (data: unknown) => void,
    handleError: (error: unknown) => void,
) => 
    useMutation(
        (data: FormData) => MultipartAxios.post(`/re_sharpen`, data),
        {
            onSuccess: (data) => handleSuccess(data),
            onError: (error) => handleError(error),
        }
    );

export default useReProcessImage;