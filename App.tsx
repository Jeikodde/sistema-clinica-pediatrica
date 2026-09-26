import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack'
import { UserProvider } from './frontend/src/context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './frontend/src/screens/LoginScreen';
import { MainDrawer } from './AppNavigation';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './frontend/src/db/database';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <SQLiteProvider databaseName='clinicaPediatrica' onInit={initializeDatabase}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={ LoginScreen } />
            <Stack.Screen name='Main' component={ MainDrawer } options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </UserProvider>
  );
}

export default App;