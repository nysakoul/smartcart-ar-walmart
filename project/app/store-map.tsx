import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Navigation, MapPin, Search, Filter, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function StoreMapScreen() {
  const router = useRouter();
  const [selectedAisle, setSelectedAisle] = useState<number | null>(null);

  const aisles = [
    { id: 1, name: 'Produce', items: ['Apples', 'Bananas', 'Lettuce', 'Carrots'], color: '#10b981' },
    { id: 2, name: 'Dairy', items: ['Milk', 'Cheese', 'Yogurt', 'Butter'], color: '#3b82f6' },
    { id: 3, name: 'Meat', items: ['Chicken', 'Beef', 'Pork', 'Fish'], color: '#ef4444' },
    { id: 4, name: 'Frozen', items: ['Ice Cream', 'Frozen Meals', 'Vegetables'], color: '#06b6d4' },
    { id: 5, name: 'Bakery', items: ['Bread', 'Pastries', 'Cakes', 'Cookies'], color: '#f59e0b' },
    { id: 6, name: 'Deli', items: ['Sliced Meats', 'Prepared Foods', 'Salads'], color: '#8b5cf6' },
    { id: 7, name: 'Beverages', items: ['Soda', 'Water', 'Juice', 'Coffee'], color: '#ec4899' },
    { id: 8, name: 'Snacks', items: ['Chips', 'Crackers', 'Nuts', 'Candy'], color: '#f97316' },
    { id: 9, name: 'Cereal', items: ['Breakfast Cereal', 'Oatmeal', 'Granola'], color: '#84cc16' },
    { id: 10, name: 'Canned Goods', items: ['Soup', 'Vegetables', 'Beans', 'Sauce'], color: '#6366f1' },
    { id: 11, name: 'Personal Care', items: ['Shampoo', 'Toothpaste', 'Soap'], color: '#14b8a6' },
    { id: 12, name: 'Pharmacy', items: ['Medications', 'Vitamins', 'First Aid'], color: '#f43f5e' },
  ];

  const currentLocation = { x: 50, y: 70 }; // Mock user location
  const destination = selectedAisle ? aisles.find(a => a.id === selectedAisle) : null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#004c91', '#0066cc']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Store Map</Text>
          <Text style={styles.headerSubtitle}>Walmart Supercenter - Main St</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* AR Store Layout */}
        <View style={styles.mapContainer}>
          <View style={styles.storeLayout}>
            {/* Store Entrance */}
            <View style={styles.entrance}>
              <Text style={styles.entranceText}>Entrance</Text>
            </View>

            {/* Aisles Grid */}
            <View style={styles.aislesGrid}>
              {aisles.map((aisle, index) => (
                <TouchableOpacity
                  key={aisle.id}
                  style={[
                    styles.aisleCard,
                    { backgroundColor: aisle.color },
                    selectedAisle === aisle.id && styles.selectedAisle
                  ]}
                  onPress={() => setSelectedAisle(aisle.id)}
                >
                  <Text style={styles.aisleNumber}>{aisle.id}</Text>
                  <Text style={styles.aisleName}>{aisle.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* User Location Indicator */}
            <View style={[styles.userLocation, { left: `${currentLocation.x}%`, top: `${currentLocation.y}%` }]}>
              <View style={styles.userDot}>
                <View style={styles.userPulse} />
              </View>
            </View>

            {/* Navigation Path */}
            {destination && (
              <View style={styles.navigationPath}>
                <Text style={styles.pathText}>Path to {destination.name}</Text>
              </View>
            )}

            {/* Checkout Area */}
            <View style={styles.checkoutArea}>
              <Text style={styles.checkoutText}>Self-Checkout</Text>
            </View>
          </View>
        </View>

        {/* Aisle Details */}
        {selectedAisle && (
          <View style={styles.aisleDetails}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>Aisle {selectedAisle} - {aisles.find(a => a.id === selectedAisle)?.name}</Text>
              <TouchableOpacity style={styles.navigateButton}>
                <Navigation size={16} color="#ffffff" />
                <Text style={styles.navigateButtonText}>Navigate</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemsList}>
              {aisles.find(a => a.id === selectedAisle)?.items.map((item, index) => (
                <View key={index} style={styles.itemChip}>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Search size={20} color="#004c91" />
            <Text style={styles.actionButtonText}>Find Item</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Filter size={20} color="#004c91" />
            <Text style={styles.actionButtonText}>Filter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Zap size={20} color="#004c91" />
            <Text style={styles.actionButtonText}>AR Mode</Text>
          </TouchableOpacity>
        </View>

        {/* Voice Commands */}
        <View style={styles.voiceCommands}>
          <Text style={styles.voiceTitle}>Voice Navigation</Text>
          <Text style={styles.voiceSubtitle}>Try saying: "Take me to produce" or "Find milk"</Text>
          <View style={styles.voiceExamples}>
            <Text style={styles.voiceExample}>• "Navigate to dairy aisle"</Text>
            <Text style={styles.voiceExample}>• "Show me the shortest path to bread"</Text>
            <Text style={styles.voiceExample}>• "Where is the pharmacy?"</Text>
          </View>
        </View>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffc220',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  storeLayout: {
    flex: 1,
    position: 'relative',
  },
  entrance: {
    position: 'absolute',
    bottom: 0,
    left: '35%',
    right: '35%',
    backgroundColor: '#ffc220',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  entranceText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
  },
  aislesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 20,
  },
  aisleCard: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAisle: {
    borderWidth: 3,
    borderColor: '#ffc220',
  },
  aisleNumber: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  aisleName: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
  },
  userLocation: {
    position: 'absolute',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDot: {
    width: 12,
    height: 12,
    backgroundColor: '#ef4444',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userPulse: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    opacity: 0.3,
  },
  navigationPath: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    backgroundColor: 'rgba(255, 194, 32, 0.9)',
    borderRadius: 8,
    padding: 8,
  },
  pathText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#004c91',
  },
  checkoutArea: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 8,
  },
  checkoutText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  aisleDetails: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    flex: 1,
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004c91',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  navigateButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  itemsList: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  itemChip: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  itemText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#004c91',
    marginTop: 4,
  },
  voiceCommands: {
    backgroundColor: '#f0f9ff',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  voiceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  voiceSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 12,
  },
  voiceExamples: {
    gap: 4,
  },
  voiceExample: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
  },
});