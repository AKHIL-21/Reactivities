import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import type { user } from "../types"
import { useNavigate } from "react-router"
import type { RegisterSchema } from "../schemas/registerSchema"
import { toast } from "react-toastify"

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
    const registerUser = useMutation({
        mutationFn : async (creds: RegisterSchema) =>{
            await agent.post('/account/register',creds)

        },
        onSuccess:() =>{
            toast.success("Register Sucessfull . you can Now Login")
            navigate('/login');
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: async () => {
            queryClient.removeQueries({
                queryKey: ['user']
            });
            queryClient.removeQueries({
                queryKey: ['activities']
            });
            await navigate('/');
        }
    })

    const { data: currentUser ,isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<user>('/account/user-info');
            return response.data;
        },
        enabled : !queryClient.getQueryData(['user']),
        retry: false
    })

    return {
        loginUser,
        logoutUser,
        currentUser,
        loadingUserInfo,registerUser
    }
}

export const useAccout = useAccount;
