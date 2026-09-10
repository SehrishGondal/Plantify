import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import GlobalStyles from '../styles/GlobalStyles';

export default function PlantDetailsScreen({ route }) {
  const { plant } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if plant is favorite
  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoritePlants');
      if (favorites) {
        const favoriteList = JSON.parse(favorites);
        setIsFavorite(favoriteList.includes(plant.id));
      }
    } catch (error) {
      console.log('Error checking favorites:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoritePlants');
      let favoriteList = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        // Remove from favorites
        favoriteList = favoriteList.filter(id => id !== plant.id);
        setIsFavorite(false);
        Alert.alert('Removed', `${plant.name} removed from favorites`);
      } else {
        // Add to favorites
        favoriteList.push(plant.id);
        setIsFavorite(true);
        Alert.alert('Added', `${plant.name} added to favorites`);
      }

      await AsyncStorage.setItem('favoritePlants', JSON.stringify(favoriteList));
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const viewFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoritePlants');
      if (favorites) {
        const favoriteList = JSON.parse(favorites);
        Alert.alert('Favorites', `You have ${favoriteList.length} favorite plants`);
      } else {
        Alert.alert('Favorites', 'No favorite plants yet');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load favorites');
    }
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <Image source={{ uri: plant.image }} style={GlobalStyles.plant} />
      <Text style={GlobalStyles.title}>{plant.name}</Text>
      
      <CustomButton 
        title={isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"} 
        onPress={toggleFavorite} 
      />
      <CustomButton title="View My Favorites" onPress={viewFavorites} />

      <View style={{ marginTop: 20 }}>
        <Text style={GlobalStyles.label}>Plant Care Tips:</Text>
        <Text style={GlobalStyles.text}>
          • Water regularly but don't overwater{'\n'}
          • Provide adequate sunlight{'\n'}
          • Use proper soil mixture{'\n'}
          • Fertilize during growing season
        </Text>
      </View>
    </ScrollView>
  );
}