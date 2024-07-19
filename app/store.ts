import {create} from 'zustand';
import {persist} from 'zustand/middleware'
interface AuthState {
  accessToken: string;
  refreshToken: string;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set,get)=>({
      accessToken:'',
      refreshToken:'',
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: '', refreshToken:'' }),
    }),
    {name:'auth-storage',
     getStorage:()=>localStorage,
    }
  )
)