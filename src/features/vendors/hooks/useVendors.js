import { useQuery } from '@tanstack/react-query';
import { vendorsApi } from '../api/vendors.api';

// Helper to map backend vendor to frontend structure
const mapVendor = (v) => ({
    id: v._id || v.id,
    name: v.vendor_name || v.shopName || 'Unnamed Vendor',
    description: v.shopDescription || v.description || 'No description provided.',
    rating: 4.8, // Mock
    reviews: 50, // Mock
    location: v.shopAddress || 'Online',
    image: v.vendor_image || 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80',
    logo: v.vendor_logo || `https://ui-avatars.com/api/?name=${v.vendor_name || 'Vendor'}&background=0D9488&color=fff`,
    specialty: v.vendor_specialty || 'General',
    verified: v.isVerified,
    featured: v.isFeatured,
});

export const useVendors = () => {
    return useQuery({
        queryKey: ['vendors'],
        queryFn: async () => {
            const response = await vendorsApi.getAllVendors();
            return (response.data || []).map(mapVendor);
        }
    });
};
