import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { formatPrice } from '@/utils/formatPrice';
import ImageSlider from '@/components/ImageSlider';
import useProductViewModel from '@/viewmodels/product/useProductViewModel';

const ProductDetails = () => {
  const { product, isLoading, error } = useProductViewModel();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#007AFF' />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load product details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageSlider images={product.images} />

      <View style={styles.contentContainer}>
        <View style={styles.priceSection}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
        </View>

        <View style={styles.stockSection}>
          <Text style={styles.stockLabel}>Stock:</Text>
          <Text
            style={[
              styles.stockValue,
              { color: product.stock > 0 ? '#4CAF50' : '#F44336' },
            ]}
          >
            {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </Text>
        </View>

        <View style={styles.availabilitySection}>
          <Text style={styles.availabilityLabel}>Status:</Text>
          <Text
            style={[
              styles.availabilityValue,
              {
                color:
                  product.availabilityStatus === 'In Stock'
                    ? '#4CAF50'
                    : '#FF9800',
              },
            ]}
          >
            {product.availabilityStatus}
          </Text>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.additionalInfo}>
          <Text style={styles.sectionTitle}>Product Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category:</Text>
            <Text style={styles.infoValue}>{product.category}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rating:</Text>
            <Text style={styles.infoValue}>{product.rating.toFixed(1)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SKU:</Text>
            <Text style={styles.infoValue}>{product.sku}</Text>
          </View>

          {product.warrantyInformation && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Warranty:</Text>
              <Text style={styles.infoValue}>
                {product.warrantyInformation}
              </Text>
            </View>
          )}

          {product.shippingInformation && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Shipping:</Text>
              <Text style={styles.infoValue}>
                {product.shippingInformation}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
  },
  contentContainer: {
    padding: 16,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  brand: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  stockSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    color: '#333',
  },
  stockValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  availabilitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  availabilityLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    color: '#333',
  },
  availabilityValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  additionalInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    flex: 2,
    textAlign: 'right',
  },
});

export default ProductDetails;
