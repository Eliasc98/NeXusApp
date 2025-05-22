// screens/LogoutConfirmScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  LogoutConfirm: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LogoutConfirm'>;

const LogoutConfirmScreen: React.FC<Props> = ({ navigation }) => {
  const handleYes = () => {
    // TODO: Clear auth state or token
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Proceed Sign-out?</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleYes}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#2577A7',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#2577A7',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
