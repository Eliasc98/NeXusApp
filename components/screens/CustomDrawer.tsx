import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = (props: any) => {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('../login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../../assets/avatar-placeholder.png')}
            style={styles.avatar}
          />
        </View>

        {/* Profile Section */}
        <View style={styles.menu}>
          <View style={styles.menuHeader}>
            <FontAwesome name="lock" size={18} color="#2577A7" />
            <Text style={styles.menuTitle}>Profile</Text>
          </View>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('../profile')}>
            <FontAwesome name="list-ul" size={16} color="#000" />
            <Text style={styles.menuText}>My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <MaterialIcons name="power-settings-new" size={18} color="#000" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  menu: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuTitle: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2577A7',
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
});
