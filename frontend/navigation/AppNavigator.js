import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import PlantDetailsScreen from '../screens/PlantDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StorageScreen from '../screens/StorageScreen';
import PlantsLibraryScreen from '../screens/PlantsLibraryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title:'Home' }}
      />
      <Stack.Screen 
        name="PlantsLibrary" 
        component={PlantsLibraryScreen}
        options={{ title: 'Plant Library' }}
      />
      <Stack.Screen 
        name="Community" 
        component={CommunityScreen}
        options={{ title: 'Community' }}
      />
      <Stack.Screen 
        name="Storage" 
        component={StorageScreen}
        options={{ title: 'Storage' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
        name="PlantDetails" 
        component={PlantDetailsScreen}
        options={{ title: 'Plant Details' }}
      />
    </Stack.Navigator>
  );
}