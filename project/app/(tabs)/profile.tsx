import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, Bell, Heart, CreditCard, MapPin, Mic, Camera, Shield, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    voiceCommands: true,
    arOverlay: true,
    locationTracking: true,
    personalizedDeals: true,
  });

  const togglePreference = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const profileStats = {
    totalSavings: 347.82,
    itemsScanned: 1247,
    storesVisited: 8,
    favoriteItems: 23,
  };

  const dietaryPreferences = ['Organic', 'Gluten-Free', 'Low Sodium', 'Vegetarian'];
  const frequentCategories = ['Produce', 'Dairy', 'Bakery', 'Health & Beauty'];

  const menuItems = [
    { icon: Heart, title: 'Favorites', subtitle: '23 saved items' },
    { icon: CreditCard, title: 'Payment Methods', subtitle: '2 cards on file' },
    { icon: MapPin, title: 'Store Preferences', subtitle: 'Walmart Supercenter - Main St' },
    { icon: Bell, title: 'Notifications', subtitle: 'Deals and reminders' },
    { icon: Shield, title: 'Privacy & Security', subtitle: 'Manage your data' },
    { icon: Settings, title: 'Settings', subtitle: 'App preferences' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={['#004c91', '#0066cc']} style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Sarah Johnson</Text>
            <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
            <Text style={styles.memberSince}>SmartCart member since 2023</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${profileStats.totalSavings}</Text>
            <Text style={styles.statLabel}>Total Savings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profileStats.itemsScanned}</Text>
            <Text style={styles.statLabel}>Items Scanned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profileStats.storesVisited}</Text>
            <Text style={styles.statLabel}>Stores Visited</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profileStats.favoriteItems}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
      </View>

      {/* Smart Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart Features</Text>
        
        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <Mic size={24} color="#004c91" />
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Voice Commands</Text>
              <Text style={styles.featureDescription}>Navigate hands-free with voice</Text>
            </View>
            <Switch
              value={preferences.voiceCommands}
              onValueChange={() => togglePreference('voiceCommands')}
              trackColor={{ false: '#e5e7eb', true: '#004c91' }}
              thumbColor={preferences.voiceCommands ? '#ffffff' : '#9ca3af'}
            />
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <Camera size={24} color="#004c91" />
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>AR Product Overlay</Text>
              <Text style={styles.featureDescription}>See product info through camera</Text>
            </View>
            <Switch
              value={preferences.arOverlay}
              onValueChange={() => togglePreference('arOverlay')}
              trackColor={{ false: '#e5e7eb', true: '#004c91' }}
              thumbColor={preferences.arOverlay ? '#ffffff' : '#9ca3af'}
            />
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <MapPin size={24} color="#004c91" />
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Smart Navigation</Text>
              <Text style={styles.featureDescription}>Real-time store directions</Text>
            </View>
            <Switch
              value={preferences.locationTracking}
              onValueChange={() => togglePreference('locationTracking')}
              trackColor={{ false: '#e5e7eb', true: '#004c91' }}
              thumbColor={preferences.locationTracking ? '#ffffff' : '#9ca3af'}
            />
          </View>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shopping Preferences</Text>
        
        <View style={styles.preferenceCard}>
          <Text style={styles.preferenceTitle}>Dietary Preferences</Text>
          <View style={styles.tagContainer}>
            {dietaryPreferences.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.preferenceCard}>
          <Text style={styles.preferenceTitle}>Frequent Categories</Text>
          <View style={styles.tagContainer}>
            {frequentCategories.map((tag, index) => (
              <View key={index} style={[styles.tag, styles.categoryTag]}>
                <Text style={[styles.tagText, styles.categoryTagText]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <item.icon size={24} color="#004c91" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Personalization Card */}
      <View style={styles.personalizationCard}>
        <LinearGradient colors={['#f0f9ff', '#e0f2fe']} style={styles.personalizationGradient}>
          <Text style={styles.personalizationTitle}>Personalized Experience</Text>
          <Text style={styles.personalizationDescription}>
            SmartCart learns your preferences to provide better recommendations and faster shopping.
          </Text>
          <View style={styles.personalizationToggle}>
            <Text style={styles.personalizationToggleText}>Enable personalized deals</Text>
            <Switch
              value={preferences.personalizedDeals}
              onValueChange={() => togglePreference('personalizedDeals')}
              trackColor={{ false: '#e5e7eb', true: '#004c91' }}
              thumbColor={preferences.personalizedDeals ? '#ffffff' : '#9ca3af'}
            />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.bottomPadding} />
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffc220',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#004c91',
    borderRadius: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffc220',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
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
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
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
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  preferenceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  preferenceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#0369a1',
  },
  categoryTag: {
    backgroundColor: '#fef3c7',
  },
  categoryTagText: {
    color: '#92400e',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  personalizationCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  personalizationGradient: {
    padding: 20,
  },
  personalizationTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  personalizationDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  personalizationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personalizationToggleText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  bottomPadding: {
    height: 20,
  },
});