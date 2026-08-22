import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack'
import { UserProvider } from './frontend/src/context/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './frontend/src/screens/LoginScreen';
import HomeScreen from './frontend/src/screens/HomeScreen';
import PatientScreen from './frontend/src/screens/PatientScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Patient' component={PatientScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;