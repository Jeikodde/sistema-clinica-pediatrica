import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface User {
  // id: number;
  username: string;
  // password: string;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  Patient: undefined;
  Settings: undefined;
  Appointments: undefined;
  MedicalHistory: undefined;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if(!context) {
    throw new Error('useUser should be used inside UserProvider');
  }

  return context;
}