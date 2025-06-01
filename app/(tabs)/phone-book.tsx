import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import api from '@/utils/api';

export default function PhoneBookScreen() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
      try {
        const response = await api.get('http://192.168.67.225:8000/api/contacts');
        setContacts(response.data.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
  };   

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome name="angle-left" size={24} color="#a9a9a9" />
            </TouchableOpacity>  
            <Text style={styles.title}>Saved Contact</Text>          
            <View style={{ width: 24 }} />
        </View>

      {loading ? (
             <ActivityIndicator size="large" color="#2577A7" />
            ) :  contacts.length === 0 ? (
        <Text style={{ color: '#999', marginTop: 20 }}>No contacts found</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name || 'No name'}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
              {item.email ? <Text style={styles.email}>{item.email}</Text> : null}
            </View>
          )}
        />
      )}
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
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2577A7', marginBottom: 20 },
  card: {
    backgroundColor: '#f2f8fc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: '600' },
  phone: { color: '#333' },
  email: { color: '#666' },
});
