import{
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,

}from '@tanstack/react-query';
import type { INewUser , IUpdateUser} from "@/types";
import { createUserAccount, signInAccount } from "@/lib/appwrite/api";


export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    });
};

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string;
            password: string;
            }) => signInAccount(user)
    });
};
