import { useQuery } from '@tanstack/react-query';
import { catalogApi } from '../api/catalog.api';
import { Sun, Droplets } from 'lucide-react';

// Helper to map backend product to frontend structure
// Helper to map backend product to frontend structure
export const mapProduct = (p) => {
    const rawPrice = parseFloat(p.product_price) || 0;
    const discountPrice = parseFloat(p.discount_price) || 0;
    const hasDiscount = discountPrice > 0 && discountPrice < rawPrice;

    return {
        id: p._id || p.product_id || p.id,
        name: p.product_name || "Unknown Plant",
        scientificName: p.product_title || p.product_name,
        price: hasDiscount ? discountPrice : rawPrice,
        originalPrice: hasDiscount ? rawPrice : null,
        rating: 4.5,
        reviews: 0,
        image: p.images && p.images.length > 0
            ? (p.images[0].large_url || p.images[0].medium_url || p.images[0].small_url)
            : '/images/placeholder.png',
        tag: hasDiscount ? `${Math.round(((rawPrice - discountPrice) / rawPrice) * 100)}% OFF` : (p.category?.category_name?.trim() || ''),
        category: (p.category?.category_name || 'Indoor Plants').trim(),
        brand: p.vendor?.shopName || 'Heart Leaf',
        color: 'green',
        inStock: p.is_available !== false,
        isFeatured: p.isFeatured || p.is_featured || false,
        availability: (p.is_available !== false) ? 'In Stock' : 'Out of Stock',
        vendorId: p.vendor_id || p.vendor?.id,
        description: p.product_description,
        guide: p.product_guide,
        images: p.images || [],
        sizes: (p.category?.category_name?.trim() === "Flower Pots")
            ? [
                { id: 's', label: 'Small', priceMod: 0, detail: '10cm Dia' },
                { id: 'm', label: 'Medium', priceMod: 150, detail: '15cm Dia' },
                { id: 'l', label: 'Large', priceMod: 300, detail: '20cm Dia' }
            ]
            : [
                { id: 's', label: 'Small', priceMod: 0, detail: '10-15cm' },
                { id: 'm', label: 'Medium', priceMod: 200, detail: '20-30cm' },
                { id: 'l', label: 'Large', priceMod: 500, detail: '40-50cm' }
            ],
        pots: [
            { id: 'grower', label: 'Grower Pot', color: '#1f2937', detail: 'Basic Plastic' }, // Default
            { id: 'white', label: 'Ceramic', color: '#f3f4f6', detail: 'Matte White' },
            { id: 'clay', label: 'Clay', color: '#e07a5f', detail: 'Terracotta' }
        ],
        care: [
            { label: "Light", value: "Bright indirect", icon: Sun },
            { label: "Water", value: "Weekly", icon: Droplets }
        ]
    };
};

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await catalogApi.getAllProducts();
            return (response.data || []).map(mapProduct);
        }
    });
};
