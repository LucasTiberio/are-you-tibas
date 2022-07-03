import axios from 'axios';
import { useState } from 'react';
import { API_MAIN_URL } from '../utils/commons';

const axiosInstance = axios.create({
    baseURL: API_MAIN_URL,
    timeout: 10 * 1000,
});

export interface iLoginResponse {
    tibasToken: string;
}

const useLogin = function() {
    const [isLoading, setIsLoading] = useState(false);

    const loginFunction = async (login: string, password: string, successFunction: (data: iLoginResponse) => void, errorFunction: (error: any) => void) => {
        try {
            setIsLoading(true);
    
            const body = {
                login,
                password
            }

            const { data } = await axiosInstance.post('/api', body)

            successFunction(data)
        } catch (error: any) {
            errorFunction(error?.response?.data || error)
        } finally {
            setIsLoading(false);
        }

    }

    return {
        login: loginFunction,
        isLoading,
    }
}

export default useLogin;