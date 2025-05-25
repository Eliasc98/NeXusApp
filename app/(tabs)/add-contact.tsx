import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/utils/api';

export default function AddContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveContact = async () => {
    setLoading(true);
    if (!phone.trim()) {
      setError('Phone number is required');
      return;
    }
  
    const newContact = { name, email, phone };
  
    try {
      const response = await api.post('http://192.168.153.225:8000/api/save-contacts', { name, email, phone });      
      
      Alert.alert('Contact Saved', `${response.data}`);
      router.replace('/'); 
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || 'Failed to Save contact';
      alert(errorMessage);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome name="angle-left" size={24} color="#a9a9a9" />
            </TouchableOpacity>
            <Text style={styles.title}>Add Contact</Text>
            <View style={{ width: 24 }} />
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: '#2577A7',
    fontSize: 20,
    fontWeight: '600',
  },
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
