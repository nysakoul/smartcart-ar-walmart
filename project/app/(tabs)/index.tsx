import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Bell, MapPin, Zap, Gift, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const featuredDeals = [
    {
      id: 1,
      title: "Organic Bananas",
      price: "$2.48",
      originalPrice: "$2.98",
      image: "https://images.pexels.com/photos/5946077/pexels-photo-5946077.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: "17% OFF",
    },
    {
      id: 2,
      title: "Whole Grain Bread",
      price: "$3.24",
      originalPrice: "$3.98",
      image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: "19% OFF",
    },
  ];

  const personalizedSuggestions = [
    {
      id: 1,
      title: "Greek Yogurt",
      reason: "Based on your diet preferences",
      image: "https://images.pexels.com/photos/1268558/pexels-photo-1268558.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$4.98",
    },
    {
      id: 2,
      title: "Almond Milk",
      reason: "Frequently bought together",
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$3.78",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={['#004c91', '#0066cc']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#ffc220" />
                <Text style={styles.location}>Walmart Supercenter - Main St</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#ffffff" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchContainer}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products, brands, or categories"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => router.push('/ar-scan')}
        >
          <LinearGradient colors={['#ffc220', '#ffb000']} style={styles.quickActionGradient}>
            <Zap size={24} color="#004c91" />
          </LinearGradient>
          <Text style={styles.quickActionText}>AR Scanner</Text>
          <Text style={styles.quickActionSubtext}>Scan & Compare</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => router.push('/shop')}
        >
          <LinearGradient colors={['#10b981', '#059669']} style={styles.quickActionGradient}>
            <MapPin size={24} color="#ffffff" />
          </LinearGradient>
          <Text style={styles.quickActionText}>Store Map</Text>
          <Text style={styles.quickActionSubtext}>Find Items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionCard}>
          <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.quickActionGradient}>
            <Gift size={24} color="#ffffff" />
          </LinearGradient>
          <Text style={styles.quickActionText}>Deals</Text>
          <Text style={styles.quickActionSubtext}>Save More</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionCard}>
          <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.quickActionGradient}>
            <TrendingUp size={24} color="#ffffff" />
          </LinearGradient>
          <Text style={styles.quickActionText}>Lists</Text>
          <Text style={styles.quickActionSubtext}>Smart Lists</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Deals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Deals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {featuredDeals.map((deal) => (
            <TouchableOpacity key={deal.id} style={styles.dealCard}>
              <Image source={{ uri: deal.image }} style={styles.dealImage} />
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{deal.discount}</Text>
              </View>
              <View style={styles.dealInfo}>
                <Text style={styles.dealTitle}>{deal.title}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{deal.price}</Text>
                  <Text style={styles.originalPrice}>{deal.originalPrice}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Personalized Suggestions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {personalizedSuggestions.map((item) => (
            <TouchableOpacity key={item.id} style={styles.suggestionCard}>
              <Image source={{ uri: item.image }} style={styles.suggestionImage} />
              <View style={styles.suggestionInfo}>
                <Text style={styles.suggestionTitle}>{item.title}</Text>
                <Text style={styles.suggestionReason}>{item.reason}</Text>
                <Text style={styles.suggestionPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Shopping Assistant Card */}
      <View style={styles.assistantCard}>
        <LinearGradient colors={['#f3f4f6', '#ffffff']} style={styles.assistantGradient}>
          <Text style={styles.assistantTitle}>Smart Shopping Assistant</Text>
          <Text style={styles.assistantDescription}>
            Use voice commands like "Find milk" or "Show me healthy snacks" to navigate the store hands-free.
          </Text>
          <TouchableOpacity style={styles.assistantButton}>
            <Text style={styles.assistantButtonText}>Try Voice Commands</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
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
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffc220',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 2,
  },
  quickActionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  dealCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  dealInfo: {
    padding: 12,
  },
  dealTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  suggestionCard: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  suggestionImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  suggestionInfo: {
    padding: 12,
  },
  suggestionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  suggestionReason: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  suggestionPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
  },
  assistantCard: {
    margin: 20,
    marginTop: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  assistantGradient: {
    padding: 20,
  },
  assistantTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  assistantDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  assistantButton: {
    backgroundColor: '#004c91',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
  },
  assistantButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});