import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import GlobalStyles, { colors } from '../styles/GlobalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const userToken = 'user_' + Date.now();
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userEmail', email);
      
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  const checkStoredToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const email = await AsyncStorage.getItem('userEmail');
      if (token) {
        Alert.alert('Stored Data', `Token: ${token}\nEmail: ${email || 'Not found'}`);
      } else {
        Alert.alert('No Data', 'No login token found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Login</Text>
      <Text style={GlobalStyles.subtitle}>Enter your credentials</Text>
      
      <View style={GlobalStyles.inputContainer}>
        <Text style={GlobalStyles.label}>Email:</Text>
        <TextInput
          style={GlobalStyles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={GlobalStyles.inputContainer}>
        <Text style={GlobalStyles.label}>Password:</Text>
        <TextInput
          style={GlobalStyles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={GlobalStyles.buttonContainer}>
        <CustomButton title="Login" onPress={handleLogin} />
        <CustomButton title="Check Stored Token" onPress={checkStoredToken} />
      </View>
    </ScrollView>
  );
}