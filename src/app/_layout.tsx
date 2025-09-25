import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import FiltersButton from '@/components/FiltersButton';
import ApplyButton from '@/components/ApplyButton';

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name='index'
          options={{ title: 'Products', headerRight: () => <FiltersButton /> }}
        />
        <Stack.Screen
          name='filters-modal'
          options={{ title: 'Filters', presentation: 'modal', headerRight: () => <ApplyButton /> }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;
