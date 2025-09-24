import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

import { Product } from '@/models/product.model';
import { formatPrice } from '@/utils/formatPrice';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        key={product.id}
        source={{ uri: product.thumbnail }}
        style={styles.thumbnail}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text>{formatPrice(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: '#e3e3e3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  thumbnail: {
    width: 90,
    height: 90,
  },
});

export default ProductCard;
