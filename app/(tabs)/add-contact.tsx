import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const saveContact = async () => {
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }

    const newContact = { id: Date.now(), name, email, phone };
    const stored = await AsyncStorage.getItem('contacts');
    const contacts = stored ? JSON.parse(stored) : [];
    contacts.push(newContact);
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    Alert.alert('Contact Saved');
    router.replace('/'); // go back to Home
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Phone Number *"
        style={styles.input}
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          if (text.trim()) setError('');
        }}
        keyboardType="phone-pad"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={saveContact}>
        <Text style={styles.buttonText}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: { color: 'red', fontSize: 12, marginBottom: 10 },
  button: {
    marginTop: 20,
    backgroundColor: '#2577A7',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
