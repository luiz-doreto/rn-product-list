import { create } from 'zustand';
import { CATEGORY_ALL, SORT_BY_NONE } from '@/constants';

interface FiltersState {
  category: string;
  setCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  applyFilters: () => void;
  // Temporary states for modal
  tempCategory: string;
  setTempCategory: (category: string) => void;
  tempSortBy: string;
  setTempSortBy: (sortBy: string) => void;
  initializeTempValues: () => void;
}

const useFiltersStore = create<FiltersState>((set, get) => ({
  category: CATEGORY_ALL,
  setCategory: category => set({ category }),
  sortBy: SORT_BY_NONE,
  setSortBy: sortBy => set({ sortBy }),
  applyFilters: () => {
    const { tempCategory, tempSortBy } = get();
    set({ category: tempCategory, sortBy: tempSortBy });
  },
  // Temporary states for modal
  tempCategory: CATEGORY_ALL,
  setTempCategory: tempCategory => set({ tempCategory }),
  tempSortBy: SORT_BY_NONE,
  setTempSortBy: tempSortBy => set({ tempSortBy }),
  initializeTempValues: () => {
    const { category, sortBy } = get();
    set({ tempCategory: category, tempSortBy: sortBy });
  },
}));

export default useFiltersStore;
