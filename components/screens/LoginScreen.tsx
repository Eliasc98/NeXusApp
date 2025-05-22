// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // TODO: Call API, validate and store token
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#999"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
      />
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
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 25,
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
