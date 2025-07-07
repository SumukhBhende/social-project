import { useNavigate } from 'react-router-dom';
import {createContext, useContext,useEffect,useState} from 'react'

import type { IUser } from '@/types';
import { getCurrentUser } from '@/lib/appwrite/api';


export const INITIAL_USER ={
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
};

const INTIAL_STATE={
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setisAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}
type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setisAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INTIAL_STATE);

export function AuthProvider ({children}: {children: React.ReactNode}) {
    const navigate = useNavigate();
    const [user,setUser] = useState<IUser>(INITIAL_USER)
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkAuthUser = async() => {
        setIsLoading(true);
        try {
            const  currentAccount = await getCurrentUser();
            if(currentAccount){
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                });
                setisAuthenticated(true);

                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

    const value={
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setisAuthenticated,
        checkAuthUser
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export const useUserContext = () => useContext(AuthContext);
