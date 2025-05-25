// screens/LoginScreen.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';



type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');  

  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    try {
      const res = await api.post('http://192.168.153.225:8000/api/login', { username, password });

      const token = res.data.data.token;
      await AsyncStorage.setItem('token', token);

      Alert.alert('Success', 'Logged in!');
      router.replace('/');
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || 'Login failed';
      alert(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <FontAwesome name="user" size={20} color="#2577A7" style={styles.icon} />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#999"
          style={styles.input}
        />
      </View>

      <View style={styles.inputWrapper}>
        <FontAwesome name="lock" size={20} color="#2577A7" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#2577A7',
    paddingVertical: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
// This code defines a simple login screen using React Native and TypeScript.