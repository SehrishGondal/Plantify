import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import GlobalStyles, { colors, layout } from "../styles/GlobalStyles";

const PlantsLibraryScreen = ({ navigation }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('Testing API...');

  const API_KEY = 'sk-LuLh69144446459af13444';

  useEffect(() => {
    fetchPlantData();
  }, []);

  const fetchPlantData = async () => {
    try {
      setLoading(true);
      setError(null);
      setApiStatus('Testing API connection...');

      console.log('🌱 Testing API connection...');
      
      // Test 1: Simple API call without parameters first
      setApiStatus('Making basic API call...');
      let testUrl = `https://perenual.com/api/species-list?key=${API_KEY}&page=1`;
      console.log('API URL:', testUrl);
      
      const response = await fetch(testUrl);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ API Response successful');
      console.log('Data structure:', {
        hasData: !!data.data,
        dataLength: data.data?.length,
        total: data.total,
        firstPlant: data.data?.[0]
      });
      
      if (data.data && data.data.length > 0) {
        setApiStatus(`Loaded ${data.data.length} plants from API`);
        
        // Process the data
        const processedPlants = processPlantData(data.data);
        setPlants(processedPlants);
        console.log(`🌿 Displaying ${processedPlants.length} processed plants`);
      } else {
        throw new Error('No plant data found in API response');
      }
      
    } catch (err) {
      console.error('❌ API Error details:', err);
      setApiStatus('API Failed - Using demo data');
      setError(`API Error: ${err.message}`);
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  // Process the raw API data
  const processPlantData = (rawPlants) => {
    return rawPlants.map(plant => {
      console.log('Processing plant:', plant.common_name, {
        watering: plant.watering,
        sunlight: plant.sunlight,
        cycle: plant.cycle,
        hasImage: !!plant.default_image
      });
      
      return {
        id: plant.id,
        common_name: plant.common_name || 'Unknown Plant',
        scientific_name: plant.scientific_name || ['Scientific name not available'],
        default_image: plant.default_image || {
          thumbnail: 'https://via.placeholder.com/150/2e7d32/ffffff?text=🌿',
          regular_url: 'https://via.placeholder.com/300/2e7d32/ffffff?text=🌿'
        },
        watering: plant.watering || 'Moderate',
        sunlight: plant.sunlight || ['Indirect light'],
        cycle: plant.cycle || 'Perennial',
        care_level: plant.care_level || 'Moderate'
      };
    });
  };

  // Enhanced demo data
  const loadDemoData = () => {
    console.log('🔄 Loading demo data');
    const demoPlants = [
      {
        id: 1,
        common_name: 'Snake Plant (Demo)',
        scientific_name: ['Sansevieria trifasciata'],
        default_image: {
          thumbnail: 'https://images.unsplash.com/photo-1593482892290-9d013c2d4c54?w=150&h=150&fit=crop',
          regular_url: 'https://images.unsplash.com/photo-1593482892290-9d013c2d4c54?w=300&h=300&fit=crop'
        },
        watering: 'Minimum',
        sunlight: ['part shade', 'full shade'],
        cycle: 'Perennial',
        care_level: 'Easy'
      },
      {
        id: 2,
        common_name: 'Peace Lily (Demo)',
        scientific_name: ['Spathiphyllum wallisii'],
        default_image: {
          thumbnail: 'https://images.unsplash.com/photo-1574086953079-8b8c4c76da5f?w=150&h=150&fit=crop',
          regular_url: 'https://images.unsplash.com/photo-1574086953079-8b8c4c76da5f?w=300&h=300&fit=crop'
        },
        watering: 'Frequent',
        sunlight: ['part shade', 'full shade'],
        cycle: 'Perennial',
        care_level: 'Moderate'
      },
      {
        id: 3,
        common_name: 'Spider Plant (Demo)',
        scientific_name: ['Chlorophytum comosum'],
        default_image: {
          thumbnail: 'https://images.unsplash.com/photo-1593483316242-efb546e53a5e?w=150&h=150&fit=crop',
          regular_url: 'https://images.unsplash.com/photo-1593483316242-efb546e53a5e?w=300&h=300&fit=crop'
        },
        watering: 'Average',
        sunlight: ['part sun', 'part shade'],
        cycle: 'Perennial',
        care_level: 'Easy'
      }
    ];
    setPlants(demoPlants);
  };

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.plantItem}
      onPress={() => navigation.navigate('PlantDetails', { plant: item })}
    >
      <Image 
        source={{ uri: item.default_image?.thumbnail }} 
        style={styles.plantImage}
        onError={() => console.log('Image failed to load for:', item.common_name)}
      />
      <View style={styles.plantInfo}>
        <Text style={styles.plantName}>
          {item.common_name}
        </Text>
        <Text style={styles.scientificName}>
          {Array.isArray(item.scientific_name) ? item.scientific_name[0] : item.scientific_name}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailBadge}>
            <Text style={styles.detailText}>💧 {item.watering}</Text>
          </View>
          <View style={styles.detailBadge}>
            <Text style={styles.detailText}>☀️ {Array.isArray(item.sunlight) ? item.sunlight[0] : item.sunlight}</Text>
          </View>
          <View style={styles.detailBadge}>
            <Text style={styles.detailText}>🌿 {item.care_level} Care</Text>
          </View>
        </View>
        
        <Text style={styles.cycleText}>
          {item.cycle} • {item.common_name.includes('(Demo)') ? 'Demo Plant' : 'Real API Data'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Testing API Connection</Text>
        <Text style={styles.loadingSubtext}>
          {apiStatus}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with API status */}
      <View style={styles.header}>
        <Text style={GlobalStyles.title}>🌿 Plant Library</Text>
        <Text style={GlobalStyles.subtitle}>
          {error ? 'Demo Mode - API Unavailable' : 'Live Plant Data'}
        </Text>
        
        <View style={error ? styles.demoBanner : styles.apiBanner}>
          <Text style={error ? styles.demoText : styles.apiText}>
            {error ? '📱 Demo Data' : '✅ Live API Data'}
          </Text>
          <Text style={error ? styles.demoSubtext : styles.apiSubtext}>
            {apiStatus}
          </Text>
        </View>
      </View>

      {/* Debug Info */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>
          Plants loaded: {plants.length} | 
          Source: {error ? 'DEMO' : 'API'} | 
          First plant: {plants[0]?.common_name || 'None'}
        </Text>
      </View>

      {/* Error Banner */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={fetchPlantData}
          >
            <Text style={styles.retryText}>Retry API</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Plants List */}
      <FlatList
        data={plants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No plants found</Text>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={fetchPlantData}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        }
        ListHeaderComponent={
          plants.length > 0 && (
            <Text style={styles.resultsCount}>
              {plants.length} Plant{plants.length !== 1 ? 's' : ''} •{' '}
              {error ? 'Demo Data' : 'Live API Data'}
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    padding: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  debugContainer: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.info,
  },
  debugText: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  apiBanner: {
    backgroundColor: '#d4edda',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    alignItems: 'center',
  },
  demoBanner: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    alignItems: 'center',
  },
  apiText: {
    color: '#155724',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  demoText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  apiSubtext: {
    color: '#155724',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  demoSubtext: {
    color: '#856404',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  errorBanner: {
    backgroundColor: '#f8d7da',
    padding: 15,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  plantItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 12,
  },
  plantInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 14,
    color: colors.gray,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  detailBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  detailText: {
    fontSize: 12,
    color: colors.darkText,
    fontWeight: '500',
  },
  cycleText: {
    fontSize: 12,
    color: colors.gray,
    fontStyle: 'italic',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.darkText,
    fontWeight: '600',
  },
  loadingSubtext: {
    marginTop: 4,
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default PlantsLibraryScreen;