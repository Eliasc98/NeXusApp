// import { Tabs } from 'expo-router';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '@/components/screens/CustomDrawer';

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#fff',
          width: '80%',
        },
        drawerPosition: 'right',
        overlayColor: 'transparent',
      }}
    />
  );
}


// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {            
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//           <Tabs.Screen
//         name="LoginScreen"
//         options={{
//           title: 'false',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="index"
//         // options={{
//         //   title: 'false',
//         //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         // }}
//       />    
//       <Tabs.Screen
//         name="false"
//         // options={{
//         //   title: 'Profile',
//         //   tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
//         // }}         
//       />
//     </Tabs>
//   );
// }
