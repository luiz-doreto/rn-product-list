import { useState } from 'react';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const useImageSliderViewModel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    handleScroll,
    screenWidth,
  };
};

export default useImageSliderViewModel;
