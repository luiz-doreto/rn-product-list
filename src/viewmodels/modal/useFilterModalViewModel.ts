import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useFiltersStore from '@/store/useFiltersStore';
import { Category } from '@/models/category.model';

const useFilterModalViewModel = () => {
  const {
    tempCategory,
    setTempCategory,
    tempSortBy,
    setTempSortBy,
    initializeTempValues,
    applyFilters,
  } = useFiltersStore();

  const getCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories = await response.json();
    return [{ slug: 'All', name: 'All', url: '' }, ...categories];
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  // sync temp and current values
  useEffect(() => {
    initializeTempValues();
  }, [initializeTempValues]);

  const handleApplyFilters = () => {
    applyFilters();
  };

  return {
    categories,
    isLoading,
    error,
    selectedCategory: tempCategory,
    setSelectedCategory: setTempCategory,
    selectedSort: tempSortBy,
    setSelectedSort: setTempSortBy,
    handleApplyFilters,
  };
};

export default useFilterModalViewModel;
