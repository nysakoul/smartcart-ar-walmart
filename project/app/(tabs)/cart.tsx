import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Minus, Plus, Trash2, CreditCard, QrCode, Star, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Organic Honey Crisp Apples',
      price: 4.98,
      quantity: 2,
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      aisle: 'Produce - Aisle 1',
      inStock: true,
    },
    {
      id: 2,
      name: '2% Milk Gallon',
      price: 3.78,
      quantity: 1,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400',
      aisle: 'Dairy - Aisle 12',
      inStock: true,
    },
    {
      id: 3,
      name: 'Whole Grain Bread',
      price: 2.98,
      quantity: 1,
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
      aisle: 'Bakery - Aisle 8',
      inStock: true,
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08875; // NY tax rate
  const total = subtotal + tax;
  const savings = 12.47; // Mock savings

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#004c91', '#0066cc']} style={styles.header}>
        <Text style={styles.headerTitle}>Smart Cart</Text>
        <Text style={styles.headerSubtitle}>{cartItems.length} items • ${total.toFixed(2)}</Text>
      </LinearGradient>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Add items by scanning products with AR</Text>
          <TouchableOpacity 
            style={styles.shopButton}
            onPress={() => router.push('/ar-scan')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartContent} showsVerticalScrollIndicator={false}>
            {/* Scan & Go Banner */}
            <View style={styles.scanGoBanner}>
              <LinearGradient colors={['#10b981', '#059669']} style={styles.scanGoGradient}>
                <QrCode size={24} color="#ffffff" />
                <View style={styles.scanGoText}>
                  <Text style={styles.scanGoTitle}>Scan & Go Checkout</Text>
                  <Text style={styles.scanGoSubtitle}>Skip the line with instant payment</Text>
                </View>
              </LinearGradient>
            </View>

            {/* Cart Items */}
            <View style={styles.cartItems}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemMeta}>
                      <MapPin size={14} color="#6b7280" />
                      <Text style={styles.itemAisle}>{item.aisle}</Text>
                      {item.inStock && (
                        <View style={styles.inStockBadge}>
                          <Text style={styles.inStockText}>In Stock</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)} each</Text>
                  </View>

                  <View style={styles.itemActions}>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Minus size={16} color="#6b7280" />
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={16} color="#6b7280" />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Savings Card */}
            <View style={styles.savingsCard}>
              <View style={styles.savingsHeader}>
                <Star size={20} color="#ffc220" fill="#ffc220" />
                <Text style={styles.savingsTitle}>You're saving today!</Text>
              </View>
              <Text style={styles.savingsAmount}>Total savings: ${savings.toFixed(2)}</Text>
              <Text style={styles.savingsDetails}>
                From deals, coupons, and smart recommendations
              </Text>
            </View>

            {/* Recommendations */}
            <View style={styles.recommendations}>
              <Text style={styles.recommendationsTitle}>Frequently bought together</Text>
              
              <View style={styles.recommendationItem}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/1268558/pexels-photo-1268558.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                  style={styles.recommendationImage}
                />
                <View style={styles.recommendationInfo}>
                  <Text style={styles.recommendationName}>Greek Yogurt</Text>
                  <Text style={styles.recommendationPrice}>$4.98</Text>
                </View>
                <TouchableOpacity style={styles.addRecommendationButton}>
                  <Plus size={20} color="#004c91" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Checkout Section */}
          <View style={styles.checkoutSection}>
            <View style={styles.totalBreakdown}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax</Text>
                <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Savings</Text>
                <Text style={[styles.totalValue, styles.savingsValue]}>-${savings.toFixed(2)}</Text>
              </View>
              <View style={[styles.totalRow, styles.grandTotalRow]}>
                <Text style={styles.grandTotalLabel}>Total</Text>
                <Text style={styles.grandTotalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => router.push('/checkout')}
            >
              <LinearGradient colors={['#004c91', '#0066cc']} style={styles.checkoutGradient}>
                <CreditCard size={24} color="#ffffff" />
                <Text style={styles.checkoutButtonText}>Checkout with Scan & Go</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: '#004c91',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  shopButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  cartContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scanGoBanner: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scanGoGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  scanGoText: {
    flex: 1,
  },
  scanGoTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  scanGoSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.9,
  },
  cartItems: {
    marginTop: 20,
    gap: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
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
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  itemAisle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  inStockBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  inStockText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#065f46',
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#004c91',
  },
  itemActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    paddingHorizontal: 12,
  },
  itemTotal: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
  },
  removeButton: {
    padding: 8,
  },
  savingsCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  savingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  savingsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
  },
  savingsAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#92400e',
    marginBottom: 4,
  },
  savingsDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400e',
    opacity: 0.8,
  },
  recommendations: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recommendationImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  recommendationPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#004c91',
  },
  addRecommendationButton: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    padding: 8,
  },
  checkoutSection: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  totalBreakdown: {
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  totalValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  savingsValue: {
    color: '#059669',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
    marginTop: 8,
  },
  grandTotalLabel: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  grandTotalValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
  },
  checkoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  checkoutGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
});