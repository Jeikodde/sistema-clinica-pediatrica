import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack'
import { UserProvider } from './frontend/src/context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './frontend/src/screens/LoginScreen';
import { MainDrawer } from './AppNavigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={ LoginScreen } />
          <Stack.Screen name='Main' component={ MainDrawer } options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;