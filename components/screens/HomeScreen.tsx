import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import api from '@/utils/api';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

const HomeScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/contacts');
      setContacts(response.data.contacts);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Contacts</Text>

      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="plus" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="address-book" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="email" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search Contact"
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#666"
        style={styles.searchInput}
      />

      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#2577A7" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <FontAwesome name="user-circle" size={24} color="#aaa" />
              <Text style={styles.contactText}>{item.name}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.refreshButton} onPress={fetchContacts}>
        <Text style={styles.refreshText}>Refresh Contacts</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    color: '#2577A7',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButton: {
    backgroundColor: '#2577A7',
    padding: 18,
    borderRadius: 40,
  },
  searchInput: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#2577A7',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 15,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
  },
  refreshButton: {
    backgroundColor: '#2577A7',
    padding: 12,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 4,
  },
  refreshText: {
    color: '#fff',
    fontWeight: '600',
  },
});
