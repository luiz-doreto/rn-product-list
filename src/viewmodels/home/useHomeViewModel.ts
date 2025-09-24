import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductApi } from './types';
import useFiltersStore from '@/store/useFiltersStore';

const LIMIT_PER_PAGE = 20;

const useHomeViewModel = () => {
  const { category, sortBy } = useFiltersStore();

  const buildProductsUrl = (
    category: string,
    sortBy: string,
    skip: number,
    limit: number
  ) => {
    let baseUrl = 'https://dummyjson.com/products';

    if (category) {
      baseUrl += `/category/${category}`;
    }

    const params = new URLSearchParams();
    if (sortBy !== 'none') {
      params.append('sortBy', sortBy);
    }
    params.append('limit', limit.toString());
    params.append('skip', skip.toString());

    return `${baseUrl}?${params.toString()}`;
  };

  const getProducts = async (pageParam = 0) => {
    const url = buildProductsUrl(category, sortBy, pageParam, LIMIT_PER_PAGE);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useInfiniteQuery<ProductApi>({
      queryKey: ['products', { category, sortBy }],
      queryFn: ({ pageParam = 0 }) => getProducts(pageParam as number),
      getNextPageParam: lastPage => {
        const nextSkip = lastPage.skip + lastPage.limit;
        return nextSkip < lastPage.total ? nextSkip : undefined;
      },
      initialPageParam: 0,
    });

  const allProducts = data?.pages.flatMap(page => page.products) ?? [];

  return {
    products: allProducts,
    fetchMore: fetchNextPage,
    hasMore: hasNextPage,
    isFetchingMore: isFetchingNextPage,
    error,
    totalCount: data?.pages[0]?.total ?? 0,
  };
};

export default useHomeViewModel;
