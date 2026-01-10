import { useQuery, useQueryClient } from '@tanstack/react-query';
import { catalogApi } from '../api/catalog.api';
import { mapProduct } from './useProducts';

export const useProduct = (id) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['product', id],
        enabled: !!id,
        queryFn: async () => {
            const response = await catalogApi.getProductById(id);
            // Map the single product using the same helper, ensuring consistency
            const p = response.data || {};
            // If backend returns wrapped data, adjust. Assuming direct object or {data: object}
            return mapProduct(p);
        },
        initialData: () => {
            // Optimisation: Check if we have this product in the 'products' list cache
            const products = queryClient.getQueryData(['products']);
            if (products) {
                return products.find(p => p.id === id);
            }
        },
        initialDataUpdatedAt: () => {
            // Use the timestamp of the 'products' query
            return queryClient.getQueryState(['products'])?.dataUpdatedAt;
        }
    });
};
