import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { sortByOptions } from '@/store/useFiltersStore';

const useFilterModalViewModel = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const getCategories = async () => {
    const response = await fetch(
      'https://dummyjson.com/products/category-list'
    );
    const categories = await response.json();
    return categories;
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  return {
    categories,
    sortByOptions,
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
  };
};

export default useFilterModalViewModel;
