import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type PatientStackParamList = {
  PatientList: undefined;
  PatientDetail: { patientId: number };
  Appointments: undefined;
  MedicalHistory: undefined;
}

export type AppTabsParamList = {
  Home: undefined;
  Patients: NavigatorScreenParams<PatientStackParamList>;
  Help: undefined;
  Profile: undefined;
}

export type MainDrawerParamList = {
  Tabs: NavigatorScreenParams<AppTabsParamList>
  Settings: undefined;
}

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainDrawerParamList>
}


export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type HomeScreenNavigationProp = NativeStackNavigationProp<AppTabsParamList, 'Home'>;