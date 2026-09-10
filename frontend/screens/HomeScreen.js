import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from "react-native"; // ← Make sure all components are imported
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyles, { colors, layout } from "../styles/GlobalStyles";

const plants = [
  { id: 1, name: "Aloe Vera", image: "https://www.thetutuguru.com.au/wp-content/uploads/2020/05/Aloe-vera-plant-wild.jpg" },
  { id: 2, name: "Snake Plant", image: "https://www.kew.org/sites/default/files/styles/image_gallery/public/2023-01/snake%20plant%20many%20leaves.jpg.webp?itok=_wj4LxON" },
  { id: 3, name: "Peace Lily", image: "https://cdn.mos.cms.futurecdn.net/qYNPupRnspGWPF4886Z7hB-1200-80.jpg" },
];

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const favorites = await AsyncStorage.getItem('favoritePlants');
      
      if (name) setUserName(name);
      if (favorites) {
        const favoriteList = JSON.parse(favorites);
        setFavoriteCount(favoriteList.length);
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={[layout.container, { alignItems: "center" }]}
      showsVerticalScrollIndicator={true}
    >
      {/* Header */}
      <Text style={GlobalStyles.title}>🌿 Welcome to Plantify!</Text>
      <Text style={GlobalStyles.subtitle}>
        {userName ? `Hello, ${userName}!` : 'Your plant care companion'}
      </Text>

      {/* Quick Stats */}
      {favoriteCount > 0 && (
        <View style={GlobalStyles.statsContainer}>
          <Text style={{ color: colors.primary, textAlign: 'center' }}>
            🌟 You have {favoriteCount} favorite plant{favoriteCount !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Main Action Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%", marginBottom: 25 }}>
        <TouchableOpacity
          style={[GlobalStyles.card, { backgroundColor: colors.secondary, width: "48%", alignItems: "center" }]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png" }}
            style={[GlobalStyles.icon, { marginBottom: 10 }]}
          />
          <Text style={GlobalStyles.value}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[GlobalStyles.card, { backgroundColor: colors.secondary, width: "48%", alignItems: "center" }]}
          onPress={() => navigation.navigate("Community")}
        >
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/128/1256/1256650.png" }}
            style={[GlobalStyles.icon, { marginBottom: 10 }]}
          />
          <Text style={GlobalStyles.value}>Community</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Buttons */}
      <View style={GlobalStyles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.primary}
          onPress={() => navigation.navigate("PlantsLibrary")}
        >
          <Text style={GlobalStyles.textPrimary}>🌿 Browse Plant Library</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyles.secondary}
          onPress={() => navigation.navigate("Storage")}
        >
          <Text style={GlobalStyles.textSecondary}>📱 AsyncStorage Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Plants Section */}
      <Text style={[GlobalStyles.subtitle, { alignSelf: 'flex-start', marginLeft: 20, marginBottom: 15 }]}>
        Featured Plants
      </Text>
      
      <View style={{ width: "100%", alignItems: "center" }}>
        {plants.map((plant) => (
          <TouchableOpacity
            key={plant.id}
            style={[GlobalStyles.card, { width: "90%", alignItems: "center", marginBottom: 15 }]}
            onPress={() => navigation.navigate("PlantDetails", { plant })}
          >
            <Image source={{ uri: plant.image }} style={GlobalStyles.plant} />
            <Text style={GlobalStyles.value}>{plant.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}