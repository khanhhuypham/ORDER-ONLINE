import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";



export const VERSION = "v1";

const axiosClient = (port: number | null = null): AxiosInstance => {
    const client = axios.create({
        baseURL: `${process.env.REACT_APP_DOMAIN_GATEWAY}/api/${VERSION}`,
        headers: { 
            "Content-Type": "application/json",
            
        },
        timeout: 10000,
        // responseType: "json",
        withCredentials: false,
    });

    client.interceptors.request.use((config: any) => {
  
        config.headers.ProjectId = 8403;
        return config;
    });

    client.interceptors.response.use(
        (response: AxiosResponse) => {
            // store.dispatch(loadingToggle());
            if (response.status === 401 || response.data.status === 401) {
                setTimeout(() => {
                    window.location.href = "/login-page";
                }, 2000);
            }

            return response;
        },
        (error: AxiosError) => {
            // store.dispatch(loadingToggle());

            try {
                const { response } = error;

                if (response?.status === 401) {
                    window.location.href = "/login-page";

                }
                console.error(error);
            } catch (e) {
                console.error(e);
            }
            throw error;
        }
    );
    return client;
};

export default axiosClient;
