import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhoneBookScreen() {
  const [contacts, setContacts] = useState<any[]>([]);

  const loadContacts = async () => {
    const stored = await AsyncStorage.getItem('contacts');
    const parsed = stored ? JSON.parse(stored) : [];
    setContacts(parsed);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Contacts</Text>
      {contacts.length === 0 ? (
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
