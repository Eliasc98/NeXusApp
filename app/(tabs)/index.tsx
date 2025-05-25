import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useDrawerStatus } from '@react-navigation/drawer';
import { BlurView } from 'expo-blur';
import api from '@/utils/api';



interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get('http://192.168.153.225:8000/api/contacts');
      setContacts(response.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const searchContacts = async (text: string) => {
    setQuery(text);
    setLoading(true);

    try {
      const res = await api.get(`http://192.168.153.225:8000/api/contacts/search?q=${text}`);
      setContacts(res.data.data); 
      console.log('Search results:', res.data.data);
    } catch (error: any) {
      console.error('Search error:', error);
      if (error.response?.status === 401) {
              console.log('Error', JSON.stringify(error.response.data.errors));
            } else {
              console.error('Update error:', error);
            }
    }

    setLoading(false);
  };

  // const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
               
        <TouchableOpacity style={styles.hamburger} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialIcons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={{ width: 28 }} />
      </View>

      <Text style={styles.title}>Add Contacts</Text>

      <View style={styles.iconRow}>
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('../add-contact')}>
            <FontAwesome name="plus-square-o" size={50} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>New</Text>
        </View>

        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('../phone-book')}>
            <FontAwesome name="address-book" size={50} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Phone Book</Text>
        </View>

        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="email" size={50} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.iconLabel}>Email</Text>
        </View>
      </View>

      <TextInput
        placeholder="Search Contact"
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholderTextColor="#666"
        style={styles.searchInput}
      />

      <TouchableOpacity style={styles.searchButton} onPress={() => searchContacts(query)}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
       <ActivityIndicator size="large" color="#2577A7" />
      ) : contacts.length === null ? (
        <Text style={styles.noResults}>No results found</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <FontAwesome name="user-circle" size={24} color="#aaa" />
              <Text style={styles.contactText}>{item.name ?? "No Contact Found"}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.refreshIcon} onPress={fetchContacts}>
          <MaterialIcons name="account-circle" size={28} color="#fff" />
        </TouchableOpacity>
          <Text style={styles.refreshText}>Refresh Contact</Text>
      </View>

      {isDrawerOpen && (
        <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill}>
          <View style={styles.overlay} />
        </BlurView>
      )}
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
  noResults: {
    textAlign: 'center',
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#2577A7',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-end',  
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  
  hamburger: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  
  title: {
    color: '#2577A7',
    fontSize: 20,
    marginBottom: 50,
    marginTop: 50,
    textAlign: 'center',
  },
  iconGroup: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
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
    width: "100%",
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
    fontWeight: 'bold',
  },

  footer: {    
    height: 100,
    width: '120%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,    
    backgroundColor: '#2577A7',
    padding: 20,
    elevation: 2,
  },
  
  refreshIcon: {    
    backgroundColor: '#2577A7',
    padding: 15,
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
