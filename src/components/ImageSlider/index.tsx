import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { ImageSliderProps } from './types';
import useImageSliderViewModel from './view.model';
import { colors } from '@/constants/colors';

const { width: screenWidth } = Dimensions.get('window');

const ImageSlider = ({ images }: ImageSliderProps) => {
  const { currentIndex, handleScroll } = useImageSliderViewModel();

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.image}
              contentFit='contain'
            />
          </View>
        ))}
      </ScrollView>

      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex ? colors.primary : colors.inactive,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: colors.lightGray,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: screenWidth,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height: 300,
    borderRadius: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default ImageSlider;
