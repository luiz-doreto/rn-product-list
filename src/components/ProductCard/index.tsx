import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { Product } from '@/models/product.model';
import { formatPrice } from '@/utils/formatPrice';
import { colors } from '@/constants/colors';

const ProductCard = ({ product }: { product: Product }) => {
  const handlePress = () => {
    router.push({
      pathname: `/product/[id]`,
      params: {
        id: product.id.toString(),
        title: product.title,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        key={product.id}
        source={{ uri: product.thumbnail }}
        style={styles.thumbnail}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text>{formatPrice(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: colors.lightGray,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    margin: 6,
  },
  infoContainer: {
    padding: 6,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.darkGray,
  },
  thumbnail: {
    width: 90,
    height: 90,
  },
});

export default ProductCard;
