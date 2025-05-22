import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '@/utils/api';

const ProfileScreen: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const loadProfile = async () => {
    try {
      const res = await api.get('/profile');
      const data = res.data;
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');
      setMobile(data.mobile || '');
      setEmail(data.email || '');
    } catch (err) {
      console.error(err);
    }
  };

  const validate = () => {
    const missing = [];
    if (!firstName) missing.push('First Name');
    if (!lastName) missing.push('Last Name');
    if (!mobile) missing.push('Mobile');
    return missing;
  };

  const handleSave = async () => {
    const missing = validate();
    if (missing.length > 0) {
      setErrors(missing);
      Alert.alert('Missing Fields', missing.join(', ') + ' is required');
      return;
    }

    try {
      await api.put('/profile', {
        first_name: firstName,
        last_name: lastName,
        mobile,
        email,
      });
      Alert.alert('Success', 'Profile updated!');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      {errors.includes('First Name') && <Text style={styles.error}>is required</Text>}

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      {errors.includes('Last Name') && <Text style={styles.error}>is required</Text>}

      <TextInput
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        style={styles.input}
      />
      {errors.includes('Mobile') && <Text style={styles.error}>is required</Text>}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    color: '#2577A7',
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#2577A7',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});
