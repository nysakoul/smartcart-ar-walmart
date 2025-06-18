import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Navigation, Clock, MapPin, Filter, Mic } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ShopScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const categories = [
    { id: 1, name: 'Grocery', color: '#10b981', icon: '🥬' },
    { id: 2, name: 'Electronics', color: '#3b82f6', icon: '📱' },
    { id: 3, name: 'Clothing', color: '#8b5cf6', icon: '👕' },
    { id: 4, name: 'Home', color: '#f59e0b', icon: '🏠' },
    { id: 5, name: 'Health', color: '#ef4444', icon: '💊' },
    { id: 6, name: 'Beauty', color: '#ec4899', icon: '💄' },
  ];

  const popularItems = [
    {
      id: 1,
      name: 'Organic Apples',
      aisle: 'Produce - Aisle 1',
      distance: '50 ft',
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$3.48',
    },
    {
      id: 2,
      name: '2% Milk Gallon',
      aisle: 'Dairy - Aisle 12',
      distance: '120 ft',
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$3.78',
    },
    {
      id: 3,
      name: 'Whole Grain Bread',
      aisle: 'Bakery - Aisle 8',
      distance: '90 ft',
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$2.98',
    },
  ];

  const handleVoiceSearch = () => {
    setIsVoiceActive(!isVoiceActive);
    // Simulate voice recognition
    if (!isVoiceActive) {
      setTimeout(() => {
        setSearchQuery('Find organic bananas');
        setIsVoiceActive(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#004c91', '#0066cc']} style={styles.header}>
        <Text style={styles.headerTitle}>Shop Smart</Text>
        <Text style={styles.headerSubtitle}>Find items with AR navigation</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products or say 'Find milk'"
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={[styles.voiceButton, isVoiceActive && styles.voiceButtonActive]}
            onPress={handleVoiceSearch}
          >
            <Mic size={18} color={isVoiceActive ? '#ffffff' : '#6b7280'} />
          </TouchableOpacity>
        </View>

        {isVoiceActive && (
          <View style={styles.voiceIndicator}>
            <Text style={styles.voiceText}>🎤 Listening... Try saying "Find organic bananas"</Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionLarge}
            onPress={() => router.push('/store-map')}
          >
            <LinearGradient colors={['#ffc220', '#ffb000']} style={styles.quickActionGradient}>
              <Navigation size={32} color="#004c91" />
              <Text style={styles.quickActionTitle}>Store Map</Text>
              <Text style={styles.quickActionSubtitle}>Navigate with AR</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionSmall}>
            <LinearGradient colors={['#10b981', '#059669']} style={styles.quickActionGradientSmall}>
              <Clock size={24} color="#ffffff" />
            </LinearGradient>
            <Text style={styles.quickActionSmallText}>Recent</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionSmall}>
            <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.quickActionGradientSmall}>
              <Filter size={24} color="#ffffff" />
            </LinearGradient>
            <Text style={styles.quickActionSmallText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
            <TouchableOpacity>
              <MapPin size={20} color="#004c91" />
            </TouchableOpacity>
          </View>
          
          {popularItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <View style={styles.itemLocation}>
                  <MapPin size={16} color="#6b7280" />
                  <Text style={styles.itemAisle}>{item.aisle}</Text>
                  <Text style={styles.itemDistance}>• {item.distance} away</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.navigateButton}>
                <Navigation size={20} color="#004c91" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Voice Commands Help */}
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Voice Commands</Text>
          <Text style={styles.helpText}>Try these voice commands:</Text>
          <View style={styles.commandList}>
            <Text style={styles.commandItem}>• "Find organic produce"</Text>
            <Text style={styles.commandItem}>• "Show me dairy products"</Text>
            <Text style={styles.commandItem}>• "Navigate to bread aisle"</Text>
            <Text style={styles.commandItem}>• "Find cheapest milk"</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffc220',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1f2937',
  },
  voiceButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  voiceButtonActive: {
    backgroundColor: '#ef4444',
  },
  voiceIndicator: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  voiceText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffc220',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  quickActionLarge: {
    flex: 2,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  quickActionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
    marginTop: 8,
  },
  quickActionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#004c91',
    opacity: 0.8,
  },
  quickActionSmall: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradientSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionSmallText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '30%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
    marginBottom: 4,
  },
  itemLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  itemAisle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  itemDistance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  navigateButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
  },
  helpCard: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 12,
  },
  commandList: {
    gap: 4,
  },
  commandItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
  },
});