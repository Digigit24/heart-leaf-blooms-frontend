import React from 'react';
import { Check } from 'lucide-react';

const CATEGORIES = [
    "Cactus & Succulents",
    "Indoor Plants",
    "Large Plants",
    "Flowering Plants",
    "Hanging Plants",
    "Flower Pots"
];

const FILTERS = {
    availability: [
        { id: 'in_stock', label: 'In Stock' },
        { id: 'out_stock', label: 'Out of Stock' }
    ],
    price: [
        { id: 'under_500', label: '₹0 - ₹500' },
        { id: '500_1000', label: '₹500 - ₹1000' },
        { id: '1000_2000', label: '₹1000 - ₹2000' },
        { id: 'over_2000', label: '₹2000+' },
    ]
};

export default function CategorySidebar({ selectedFilters, toggleFilter, handleCategoryClick }) {
    return (
        <div className="space-y-8">
            {/* Categories Section */}
            <div>
                <h3 className="font-heading font-bold text-primary mb-4 text-lg">Categories</h3>
                <div className="space-y-3">
                    {CATEGORIES.map((cat, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group select-none">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedFilters.category.includes(cat) ? 'bg-white border-primary' : 'border-muted/40 group-hover:border-primary bg-white'}`}>
                                {selectedFilters.category.includes(cat) && <Check size={14} className="text-primary" strokeWidth={3} />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedFilters.category.includes(cat)}
                                onChange={() => handleCategoryClick(cat)}
                            />
                            <span className={`text-sm ${selectedFilters.category.includes(cat) ? 'text-primary font-medium' : 'text-muted/80 group-hover:text-primary'}`}>
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <hr className="border-border/60" />

            {/* Dynamic Filters */}
            {Object.entries(FILTERS).map(([key, options]) => (
                <div key={key}>
                    <h3 className="font-heading font-bold text-primary mb-4 capitalize text-sm tracking-wide">
                        {key.replace('_', ' ')}
                    </h3>

                    {key === 'colors' ? (
                        <div className="flex flex-wrap gap-3">
                            {options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => toggleFilter(key, opt.id)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedFilters[key].includes(opt.id) ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110 shadow-sm'}`}
                                    style={{ backgroundColor: opt.color }}
                                    title={opt.label}
                                >
                                    {selectedFilters[key].includes(opt.id) && <Check size={14} color={opt.id === 'lime' || opt.id === 'variegated' ? '#166534' : 'white'} />}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {options.map((opt) => (
                                <label key={opt.id} className="flex items-center gap-3 cursor-pointer group select-none">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedFilters[key].includes(opt.id) ? 'bg-white border-primary' : 'border-muted/40 group-hover:border-primary bg-white'}`}>
                                        {selectedFilters[key].includes(opt.id) && <Check size={14} className="text-primary" strokeWidth={3} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedFilters[key].includes(opt.id)}
                                        onChange={() => toggleFilter(key, opt.id)}
                                    />
                                    <span className={`text-sm ${selectedFilters[key].includes(opt.id) ? 'text-primary font-medium' : 'text-muted/80 group-hover:text-primary'}`}>
                                        {opt.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// Export constants if needed elsewhere, though handled internally here for now
export { CATEGORIES, FILTERS };
