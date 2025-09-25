import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import FiltersButton from '@/components/FiltersButton';
import ApplyButton from '@/components/ApplyButton';

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      >
        <Stack.Screen
          name='index'
          options={{ title: 'Products', headerRight: () => <FiltersButton /> }}
        />
        <Stack.Screen
          name='filters-modal'
          options={{
            title: 'Filters',
            presentation: 'modal',
            headerRight: () => <ApplyButton />,
          }}
        />
        <Stack.Screen
          name='product/[id]'
          options={({ route }) => ({
            title:
              (route?.params as { title?: string }).title || 'Product Details',
          })}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;
