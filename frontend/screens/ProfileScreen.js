import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import GlobalStyles from '../styles/GlobalStyles';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');
  const [language, setLanguage] = useState('');

  // Load saved profile data
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('userName');
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedLanguage = await AsyncStorage.getItem('language');
      
      if (savedName) setName(savedName);
      if (savedTheme) setTheme(savedTheme);
      if (savedLanguage) setLanguage(savedLanguage);
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('theme', theme);
      await AsyncStorage.setItem('language', language);
      Alert.alert('Success', 'Profile saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const clearProfile = async () => {
    try {
      await AsyncStorage.multiRemove(['userName', 'theme', 'language']);
      setName('');
      setTheme('');
      setLanguage('');
      Alert.alert('Success', 'Profile cleared!');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear profile');
    }
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Profile Settings</Text>
      
      <Text style={GlobalStyles.label}>Name:</Text>
      <TextInput
        style={GlobalStyles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={GlobalStyles.label}>Theme:</Text>
      <TextInput
        style={GlobalStyles.input}
        value={theme}
        onChangeText={setTheme}
        placeholder="Enter theme (light/dark)"
      />

      <Text style={GlobalStyles.label}>Language:</Text>
      <TextInput
        style={GlobalStyles.input}
        value={language}
        onChangeText={setLanguage}
        placeholder="Enter language"
      />

      <CustomButton title="Save Profile" onPress={saveProfile} />
      <CustomButton title="Clear Profile" onPress={clearProfile} />
      
      <View style={{ marginTop: 20, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Current Settings:</Text>
        <Text>Name: {name || 'Not set'}</Text>
        <Text>Theme: {theme || 'Not set'}</Text>
        <Text>Language: {language || 'Not set'}</Text>
      </View>
    </ScrollView>
  );
}