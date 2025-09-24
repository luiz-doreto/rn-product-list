import { create } from 'zustand';

export const sortByOptions = {
  rating: 'rating',
  price: 'price',
  none: 'none',
};

interface FiltersState {
  category: string;
  setCategory: (category: string) => void;
  sortBy: 'rating' | 'price' | 'none';
  setSortBy: (sortBy: 'rating' | 'price' | 'none') => void;
}

const useFiltersStore = create<FiltersState>(set => ({
  category: '',
  setCategory: category => set({ category }),
  sortBy: 'none',
  setSortBy: sortBy => set({ sortBy }),
}));

export default useFiltersStore;
