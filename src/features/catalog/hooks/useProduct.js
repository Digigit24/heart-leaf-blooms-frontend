import { useQuery } from '@tanstack/react-query';
import { catalogApi } from '../api/catalog.api';
import { mapProduct } from './useProducts';

export const useProduct = (id) => {
    return useQuery({
        queryKey: ['product', id],
        enabled: !!id,
        queryFn: async () => {
            const response = await catalogApi.getProductById(id);
            // Map the single product using the same helper, ensuring consistency
            const p = response.data || {};
            // If backend returns wrapped data, adjust. Assuming direct object or {data: object}
            return mapProduct(p);
        }
    });
};
