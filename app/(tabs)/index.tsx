import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '@/components/screens/LoginScreen';
import HomeScreen from '@/components/screens/HomeScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import LogoutConfirmScreen from '@/components/screens/LogoutConfirmScreen';

export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  LogoutConfirm: undefined;
};



const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: true }}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="My Profile" component={ProfileScreen} />
    <Drawer.Screen name="Logout" component={LogoutConfirmScreen} />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
        <Stack.Screen name="LogoutConfirm" component={LogoutConfirmScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
