import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './frontend/src/screens/HomeScreen';
import PatientScreen from './frontend/src/screens/PatientScreen';
import SettingsScreen from './frontend/src/screens/SettingsScreen';
import HelpScreen from './frontend/src/screens/HelpScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import AppointmentsScreen from './frontend/src/screens/AppointmentScreen';
import MedicalHistoryScreen from './frontend/src/screens/MedicalHistoryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './frontend/src/screens/LoginScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const darkModeEnabled = true;

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name='Inicio' component={ HomeScreen } />
    <Drawer.Screen name='Pacientes' component={ PatientScreen } />
    <Drawer.Screen name='Configuracion' component={ SettingsScreen } />
    <Drawer.Screen name='Ayuda' component={ HelpScreen } />
  </Drawer.Navigator>
  );
}


const AppTabs1 = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name='Home' 
      component={ HomeScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name='home' size={size} color={ color } />
        )
      }} 
    />

    <Tab.Screen 
      name='Profile' 
      component={ ProfileScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name='home' size={size} color={ color } />
        )
      }} 
    />

    <Tab.Screen 
      name='Patient'
      component={ PatientScreen }
      options={{
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name='baby-carriage' size={ size } color={ color } />
        )
      }}
    />
    <Tab.Screen 
      name='Settings' 
      component={ SettingsScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='cog' size={ size } color={ color } />
        )
      }}
    />
    <Tab.Screen 
      name='Help' 
      component={ HelpScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='help' size={ size } color={ color } />
        )
      }}
    />

    <Tab.Screen 
      name='Appointments' 
      component={ AppointmentsScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='help' size={ size } color={ color } />
        )
      }}
    />

    <Tab.Screen 
      name='MedicalHistory' 
      component={ MedicalHistoryScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='help' size={ size } color={ color } />
        )
      }}
    />
  </Tab.Navigator>
);

export const PatientStack = () => (
  <Stack.Navigator >
    <Stack.Screen name='PatientList' component={ PatientScreen } />
    <Stack.Screen name='Appointments' component={ AppointmentsScreen } />
    <Stack.Screen name='MedicalHistory' component={ MedicalHistoryScreen } />
  </Stack.Navigator>
)

export const AppTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: darkModeEnabled ? '#1f2937' : '#fff' },
      headerTintColor:   darkModeEnabled ? '#fff' : '#1f2937' ,
      tabBarStyle: { backgroundColor: darkModeEnabled ? '#1f2937' : '#fff' },
      tabBarActiveTintColor: darkModeEnabled ? '#fff' : '#1f2937' ,
      tabBarInactiveTintColor: darkModeEnabled ? '#888' : '#999',
    }}
  >
    <Tab.Screen 
      name='Home'
      component={ HomeScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='home' color={ color } size={ size } />
        )
      }}
    />

    <Tab.Screen 
      name='Profile' 
      component={ ProfileScreen }
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='account' color={ color } size={ size } />
        )
      }}
    />

    <Tab.Screen 
      name='Patients' 
      component={ PatientStack } 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='medical-bag' color={ color } size={ size } />
        )
      }}
    />

    <Tab.Screen 
      name='Help' 
      component={ HelpScreen } 
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='help' color={ color } size={ size } />
        )
      }}
    />
  </Tab.Navigator>
)

export const MainDrawer = () => (
  <Drawer.Navigator>
    <Drawer.Screen name='Tabs' component={ AppTabs } />
    <Drawer.Screen name='Settings' component={ SettingsScreen } />
  </Drawer.Navigator>
)