import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, CreditCard, Smartphone, QrCode, CircleCheck as CheckCircle, Star, Gift } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CheckoutScreen() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const cartItems = [
    { id: 1, name: 'Organic Honey Crisp Apples', price: 4.98, quantity: 2 },
    { id: 2, name: '2% Milk Gallon', price: 3.78, quantity: 1 },
    { id: 3, name: 'Whole Grain Bread', price: 2.98, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08875;
  const savings = 12.47;
  const total = subtotal + tax - savings;

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard, subtitle: '•••• 4532' },
    { id: 'mobile', name: 'Mobile Pay', icon: Smartphone, subtitle: 'Apple Pay, Google Pay' },
    { id: 'qr', name: 'QR Code', icon: QrCode, subtitle: 'Scan to pay instantly' },
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/(tabs)/');
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <LinearGradient colors={['#10b981', '#059669']} style={styles.successGradient}>
          <CheckCircle size={80} color="#ffffff" />
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>Your items are ready for pickup</Text>
          <Text style={styles.successAmount}>${total.toFixed(2)} charged</Text>
          
          <View style={styles.successDetails}>
            <Text style={styles.successDetailsText}>
              Receipt sent to your email
            </Text>
            <Text style={styles.successDetailsText}>
              Pickup location: Customer Service
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => router.push('/(tabs)/')}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#004c91', '#0066cc']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan & Go Checkout</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderCard}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>Qty: {item.quantity}</Text>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            
            <View style={styles.orderDivider} />
            
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Subtotal</Text>
              <Text style={styles.orderValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Tax</Text>
              <Text style={styles.orderValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={[styles.orderLabel, styles.savingsLabel]}>Savings</Text>
              <Text style={[styles.orderValue, styles.savingsValue]}>-${savings.toFixed(2)}</Text>
            </View>
            <View style={[styles.orderRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                paymentMethod === method.id && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <View style={styles.paymentIcon}>
                <method.icon size={24} color="#004c91" />
              </View>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentName}>{method.name}</Text>
                <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
              </View>
              <View style={[
                styles.paymentRadio,
                paymentMethod === method.id && styles.selectedPaymentRadio
              ]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Loyalty Benefits */}
        <View style={styles.loyaltyCard}>
          <View style={styles.loyaltyHeader}>
            <Star size={24} color="#ffc220" fill="#ffc220" />
            <Text style={styles.loyaltyTitle}>Walmart+ Benefits Applied</Text>
          </View>
          <View style={styles.loyaltyBenefits}>
            <View style={styles.loyaltyBenefit}>
              <Gift size={16} color="#10b981" />
              <Text style={styles.loyaltyBenefitText}>Free delivery on this order</Text>
            </View>
            <View style={styles.loyaltyBenefit}>
              <Star size={16} color="#ffc220" fill="#ffc220" />
              <Text style={styles.loyaltyBenefitText}>5% cashback earned</Text>
            </View>
          </View>
        </View>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Text style={styles.securityTitle}>Secure Payment</Text>
          <Text style={styles.securityText}>
            Your payment information is encrypted and secure. We never store your payment details on our servers.
          </Text>
        </View>
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.paymentSection}>
        <TouchableOpacity
          style={[styles.paymentButton, isProcessing && styles.processingButton]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <LinearGradient
            colors={isProcessing ? ['#6b7280', '#4b5563'] : ['#004c91', '#0066cc']}
            style={styles.paymentGradient}
          >
            {isProcessing ? (
              <>
                <View style={styles.loadingSpinner} />
                <Text style={styles.paymentButtonText}>Processing...</Text>
              </>
            ) : (
              <>
                <CreditCard size={24} color="#ffffff" />
                <Text style={styles.paymentButtonText}>Pay ${total.toFixed(2)}</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.paymentNote}>
          Tap to complete your Scan & Go purchase
        </Text>
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
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
    flex: 1,
  },
  itemDetails: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginRight: 12,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  orderDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  orderValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  savingsLabel: {
    color: '#059669',
  },
  savingsValue: {
    color: '#059669',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedPaymentMethod: {
    borderColor: '#004c91',
  },
  paymentIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#f0f9ff',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 2,
  },
  paymentSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  paymentRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  selectedPaymentRadio: {
    borderColor: '#004c91',
    backgroundColor: '#004c91',
  },
  loyaltyCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  loyaltyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
  },
  loyaltyBenefits: {
    gap: 8,
  },
  loyaltyBenefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loyaltyBenefitText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400e',
  },
  securityNotice: {
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  securityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#065f46',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#065f46',
    lineHeight: 20,
  },
  paymentSection: {
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
  paymentButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  processingButton: {
    opacity: 0.8,
  },
  paymentGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  paymentButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  loadingSpinner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderTopColor: 'transparent',
  },
  paymentNote: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    
  },
  successGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  successTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  successAmount: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 32,
  },
  successDetails: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successDetailsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  doneButton: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  doneButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#10b981',
  },
});