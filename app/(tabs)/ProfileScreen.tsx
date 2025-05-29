import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import api from '@/utils/api';

export default function ProfileScreen() {
  const [tab, setTab] = useState<'profile' | 'social' | 'links'>('profile');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Socials
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');

  // Links
  const [github, setGithub] = useState('');
  const [website, setWebsite] = useState('');
  const [portfolio, setPortfolio] = useState('');

  useEffect(() => {
  if (user) {
    setFullname(user.fullname || '');
    setUsername(user.username || '');
    setEmail(user.email || '');
    setContactNumber(user.contact_number || '');
    // Socials
    setTwitter(user.twitter || '');
    setInstagram(user.instagram || '');
    setLinkedin(user.linkedin || '');

    // Links
    setGithub(user.github || '');
    setWebsite(user.website || '');
    setPortfolio(user.portfolio || '');
  }
}, [user]);
  

 
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await api.get('http://192.168.67.225:8000/api/fetch-user');
          setUser(res.data.data);        
          console.log(res.data.data)

        } catch (error) {
          console.error('Failed to load user:', error);
        }
      };
  
      fetchUser();
    }, []);
  
    const avatarSource = avatar
        ? { uri: avatar } 
        : user?.user_img
        ? { uri: user.user_img }
        : require('../../assets/avatar-placeholder.png');

  const router = useRouter();

  // const pickImage = async () => {
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     alert("Permission to access gallery is required!");
  //     return;
  //   }
    
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 0.7,
  //   });
  //   if (!result.canceled) {
  //     setAvatar(result.assets[0].uri);
  //   }
  // };

  const pickImage = async () => {
  if (Platform.OS === 'web') {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const webUri = URL.createObjectURL(file);
        setAvatar(webUri);
      }
    };
    input.click();
  } else {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission is required to access gallery!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  }
};


  const handleSubmits = async () => {

    setLoading(true);
    const newErrors: { [key: string]: string } = {};
    if (!fullname) newErrors.fullName = 'is required';
    if (!email) newErrors.email = 'is required';
    if (!contactNumber) newErrors.contactNumber = 'is required';
    setErrors(newErrors);
    
    const formData = new FormData();
  
    formData.append('fullname', String(fullname));
    formData.append('username', String(username));
    formData.append('email', String(email));
    formData.append('contact_number', String(contactNumber));
    formData.append('twitter', String(twitter));
    formData.append('instagram', String(instagram));
    formData.append('linkedin', String(linkedin));

    formData.append('github', String(github));
    formData.append('website', String(website));
    formData.append('portfolio', String(portfolio));    
    

    console.log( "this is the data: " + fullname, username, email, contactNumber );

  
    if (avatar) {
      const base64Img = await FileSystem.readAsStringAsync(avatar, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      formData.append('user_img', base64Img);
    }
  

    try {
      const res = await api.post('http://192.168.67.225:8000/api/update-profile', formData);
  
      Alert.alert('Success', res.data.message || 'Profile updated successfully!');
      console.log(res.data);
      router.replace('/'); 
    } catch (error: any) {
      if (error.response?.status === 422) {
        console.log('Validation Errors:', error.response.data.errors);
        Alert.alert('Validation Failed', JSON.stringify(error.response.data.errors));
      } else {
        console.error('Update error:', error);
        Alert.alert('Error', 'Something went wrong');
      }
    }
    setLoading(false);
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
          <TextInput placeholder="Instagram" value={instagram} onChangeText={setInstagram} style={styles.input} />
          <TextInput placeholder="Twitter" value={twitter} onChangeText={setTwitter} style={styles.input} />
          <TextInput placeholder="LinkedIn" value={linkedin} onChangeText={setLinkedin} style={styles.input} />
        </>
      )}

      {tab === 'links' && (
        <>
          <TextInput placeholder="Website" value={website} onChangeText={setWebsite} style={styles.input} />
          <TextInput placeholder="Portfolio" value={portfolio} onChangeText={setPortfolio} style={styles.input} />
          <TextInput placeholder="GitHub" value={github} onChangeText={setGithub} style={styles.input} />
        </>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmits}>
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
