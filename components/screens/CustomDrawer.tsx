import React from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = (props: any) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <View style={styles.profileSection}>
          <FontAwesome name="user-circle" size={80} color="#2577A7" />
          <Text style={styles.profileName}>My Profile</Text>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => router.replace('../LogoutConfirm')}
          style={styles.logoutBtn}
        >
          <MaterialIcons name="logout" size={22} color="#2577A7" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#f0f4f8',
  },
  profileName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#2577A7',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#2577A7',
    marginLeft: 10,
    fontWeight: '600',
  },
});
