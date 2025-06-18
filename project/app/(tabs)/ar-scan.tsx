import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, FlipHorizontal, Zap, Star, Heart, ShoppingCart, Info, X } from 'lucide-react-native';

export default function ARScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const [showProductInfo, setShowProductInfo] = useState(false);

  const mockProduct = {
    name: "Organic Honey Crisp Apples",
    price: "$4.98",
    originalPrice: "$5.98",
    discount: "17% OFF",
    rating: 4.8,
    reviews: 1247,
    healthScore: 95,
    nutrition: {
      calories: 95,
      fiber: "4g",
      vitaminC: "14% DV",
      sugar: "19g"
    },
    benefits: ["Organic", "High in Fiber", "Rich in Antioxidants"],
    inStock: true,
    aisle: "Produce - Aisle 1",
    alternatives: [
      { name: "Regular Apples", price: "$3.48", savings: "$1.50" },
      { name: "Gala Apples", price: "$3.98", savings: "$1.00" }
    ]
  };

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setScannedProduct(mockProduct);
        setShowProductInfo(true);
        setIsScanning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need camera permission to scan products</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handleScan() {
    setIsScanning(true);
    setShowProductInfo(false);
  }

  function closeProductInfo() {
    setShowProductInfo(false);
    setScannedProduct(null);
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {/* Header */}
        <LinearGradient 
          colors={['rgba(0,76,145,0.9)', 'transparent']} 
          style={styles.header}
        >
          <Text style={styles.headerTitle}>AR Scanner</Text>
          <Text style={styles.headerSubtitle}>Point camera at products to scan</Text>
        </LinearGradient>

        {/* Scanning Overlay */}
        {isScanning && (
          <View style={styles.scanningOverlay}>
            <View style={styles.scanningFrame}>
              <View style={styles.scanningLine} />
            </View>
            <Text style={styles.scanningText}>Scanning product...</Text>
          </View>
        )}

        {/* Scan Target */}
        {!isScanning && !showProductInfo && (
          <View style={styles.scanTarget}>
            <View style={styles.targetFrame}>
              <View style={styles.targetCorner} />
              <View style={[styles.targetCorner, { transform: [{ rotate: '90deg' }] }]} />
              <View style={[styles.targetCorner, { transform: [{ rotate: '180deg' }] }]} />
              <View style={[styles.targetCorner, { transform: [{ rotate: '270deg' }] }]} />
            </View>
            <Text style={styles.targetText}>Align product within frame</Text>
          </View>
        )}

        {/* Product Information Overlay */}
        {showProductInfo && scannedProduct && (
          <View style={styles.productOverlay}>
            <TouchableOpacity style={styles.closeButton} onPress={closeProductInfo}>
              <X size={24} color="#ffffff" />
            </TouchableOpacity>
            
            <ScrollView style={styles.productInfo} showsVerticalScrollIndicator={false}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{scannedProduct.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>{scannedProduct.price}</Text>
                  <Text style={styles.originalPrice}>{scannedProduct.originalPrice}</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{scannedProduct.discount}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  <Star size={16} color="#ffc220" fill="#ffc220" />
                  <Text style={styles.rating}>{scannedProduct.rating}</Text>
                  <Text style={styles.reviews}>({scannedProduct.reviews} reviews)</Text>
                </View>
                <View style={styles.healthScore}>
                  <Text style={styles.healthScoreText}>Health Score: {scannedProduct.healthScore}/100</Text>
                </View>
              </View>

              <View style={styles.nutritionCard}>
                <Text style={styles.cardTitle}>Nutrition (per apple)</Text>
                <View style={styles.nutritionGrid}>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{scannedProduct.nutrition.calories}</Text>
                    <Text style={styles.nutritionLabel}>Calories</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{scannedProduct.nutrition.fiber}</Text>
                    <Text style={styles.nutritionLabel}>Fiber</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{scannedProduct.nutrition.vitaminC}</Text>
                    <Text style={styles.nutritionLabel}>Vitamin C</Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionValue}>{scannedProduct.nutrition.sugar}</Text>
                    <Text style={styles.nutritionLabel}>Sugar</Text>
                  </View>
                </View>
              </View>

              <View style={styles.benefitsCard}>
                <Text style={styles.cardTitle}>Health Benefits</Text>
                <View style={styles.benefitsList}>
                  {scannedProduct.benefits.map((benefit: string, index: number) => (
                    <View key={index} style={styles.benefitItem}>
                      <Text style={styles.benefitText}>✓ {benefit}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.alternativesCard}>
                <Text style={styles.cardTitle}>Cheaper Alternatives</Text>
                {scannedProduct.alternatives.map((alt: any, index: number) => (
                  <View key={index} style={styles.alternativeItem}>
                    <Text style={styles.alternativeName}>{alt.name}</Text>
                    <Text style={styles.alternativePrice}>{alt.price}</Text>
                    <Text style={styles.alternativeSavings}>Save {alt.savings}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.addToCartButton}>
                  <ShoppingCart size={20} color="#ffffff" />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Heart size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}

        {/* Bottom Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
            <FlipHorizontal size={24} color="#ffffff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.scanButton, isScanning && styles.scanButtonScanning]} 
            onPress={handleScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <View style={styles.scanningIndicator} />
            ) : (
              <Zap size={32} color="#004c91" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Info size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  permissionButton: {
    backgroundColor: '#004c91',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  permissionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  camera: {
    flex: 1,
    width: '100%',
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
  scanningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanningFrame: {
    width: 200,
    height: 200,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffc220',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scanningLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#ffc220',
  },
  scanningText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  scanTarget: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    alignItems: 'center',
  },
  targetFrame: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  targetCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#ffc220',
    top: 0,
    left: 0,
  },
  targetText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textAlign: 'center',
  },
  productOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productPrice: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
  },
  originalPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
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
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  reviews: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  healthScore: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  healthScoreText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  nutritionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#004c91',
  },
  nutritionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  benefitsCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#065f46',
  },
  alternativesCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  alternativeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f59e0b',
  },
  alternativeName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#92400e',
    flex: 1,
  },
  alternativePrice: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#92400e',
    marginRight: 8,
  },
  alternativeSavings: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#004c91',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  favoriteButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 15,
  },
  scanButton: {
    backgroundColor: '#ffc220',
    borderRadius: 40,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonScanning: {
    backgroundColor: '#ef4444',
  },
  scanningIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#ffffff',
    borderTopColor: 'transparent',
  },
});