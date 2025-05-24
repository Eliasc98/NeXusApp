import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import api from '@/utils/api';

export default function ProfileScreen() {
  const [tab, setTab] = useState<'profile' | 'social' | 'links'>('profile');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
  if (user) {
    setFullname(user.fullname || '');
    setUsername(user.username || '');
    setEmail(user.email || '');
    setContactNumber(user.contact_number || '');
  }
}, [user]);
  

 
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await api.get('http://127.0.0.1:8000/api/fetch-user');
          setUser(res.data.data); // assuming structure: { data: { user: {...} } }          
          console.log(res.data.data)

        } catch (error) {
          console.error('Failed to load user:', error);
        }
      };
  
      fetchUser();
    }, []);
  
    const avatarSource = user?.user_img
      ? { uri: user.user_img }
      : require('../../assets/avatar-placeholder.png');

  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullname) newErrors.name = 'is required';
    if (!email) newErrors.email = 'is required';
    if (!contactNumber) newErrors.phone = 'is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      Alert.alert('Success', 'Form submitted!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back arrow and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="angle-left" size={24} color="#a9a9a9" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={{ width: 24 }} /> {/* Spacer to balance layout */}
      </View>

      {/* Avatar with edit icon */}
      <View style={styles.avatarWrapper}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              avatarSource
            }
            style={styles.avatar}
          />
          <View style={styles.editIcon}>
            <FontAwesome name="pencil" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Top badges button */}
      <TouchableOpacity style={styles.badgeButton}>
        <Text style={styles.badgeButtonText}>Top badges</Text>
      </TouchableOpacity>

      {/* Tab buttons */}
      <View style={styles.tabs}>
        {['profile', 'social', 'links'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.tab, tab === item && styles.tabActive]}
            onPress={() => setTab(item as typeof tab)}
          >
            <Text style={[styles.tabText, tab === item && styles.tabTextActive]}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab content */}
      {tab === 'profile' && (
        <>
          <TextInput placeholder="Fullname" value={fullname} onChangeText={setFullname} style={styles.input} />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput placeholder="Phone Number" value={contactNumber} onChangeText={setContactNumber} style={styles.input} keyboardType="phone-pad" />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </>
      )}

      {tab === 'social' && (
        <>
          <TextInput placeholder="Instagram" style={styles.input} />
          <TextInput placeholder="Twitter" style={styles.input} />
          <TextInput placeholder="LinkedIn" style={styles.input} />
        </>
      )}

      {tab === 'links' && (
        <>
          <TextInput placeholder="Website" style={styles.input} />
          <TextInput placeholder="Portfolio" style={styles.input} />
          <TextInput placeholder="GitHub" style={styles.input} />
        </>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
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
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#a9a9a9',
    padding: 5,
    borderRadius: 20,
  },
  badgeButton: {
    backgroundColor: '#2577A7',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  badgeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  tabActive: {
    backgroundColor: '#2577A7',
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
  },
  input: {
    height: 45,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#2577A7',
    paddingVertical: 14,
    marginTop: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
