import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';

export default function StorageScreen() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [fetchedValue, setFetchedValue] = useState('');

  const storeData = async () => {
    if (!key.trim()) {
      Alert.alert('Error', 'Please enter a key');
      return;
    }

    try {
      await AsyncStorage.setItem(key, value);
      Alert.alert('Success', `Data stored for key: ${key}`);
      setValue('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  const fetchData = async () => {
    if (!key.trim()) {
      Alert.alert('Error', 'Please enter a key');
      return;
    }

    try {
      const result = await AsyncStorage.getItem(key);
      if (result !== null) {
        setFetchedValue(result);
      } else {
        setFetchedValue('');
        Alert.alert('Not Found', `No data found for key: ${key}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  const removeData = async () => {
    if (!key.trim()) {
      Alert.alert('Error', 'Please enter a key');
      return;
    }

    try {
      await AsyncStorage.removeItem(key);
      Alert.alert('Success', `Data removed for key: ${key}`);
      setFetchedValue('');
    } catch (error) {
      Alert.alert('Error', 'Failed to remove data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AsyncStorage Demo</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Key:</Text>
        <TextInput
          style={styles.input}
          value={key}
          onChangeText={setKey}
          placeholder="Enter key (e.g., userToken, theme)"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Value:</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="Enter value"
        />
      </View>

      <CustomButton title="Store Data" onPress={storeData} />
      <CustomButton title="Fetch Data" onPress={fetchData} />
      <CustomButton title="Remove Data" onPress={removeData} />

      {fetchedValue ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Fetched Value:</Text>
          <Text style={styles.resultText}>{fetchedValue}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2e7d32',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2e7d32',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
});