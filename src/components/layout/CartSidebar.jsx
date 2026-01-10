import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/app/store/cart.store';
import { useUIStore } from '@/app/store/ui.store';
import Drawer from '@/components/common/Drawer';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartSidebar() {
    const navigate = useNavigate();
    const { isCartOpen, closeCart } = useUIStore();
    const { items, removeItem, addItem } = useCartStore(); // Assuming addItem handles quantity updates

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout'); // Or /cart
    };

    return (
        <Drawer isOpen={isCartOpen} onClose={closeCart} title={`Shopping Cart (${items.length})`}>
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    <div className="p-4 bg-gray-50 rounded-full">
                        <ShoppingBag size={32} className="text-gray-300" />
                    </div>
                    <p className="text-muted">Your cart is empty.</p>
                    <button onClick={closeCart} className="text-primary font-bold hover:underline">Start Shopping</button>
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-heading font-bold text-primary line-clamp-1">{item.name}</h3>
                                        <p className="text-xs text-muted">{item.variant || 'Standard'}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-primary">₹{item.price}</span>
                                        <div className="flex items-center gap-3">
                                            {/* Simple quantity update simulation if store doesn't support specific update action yet, 
                             usually addItem logic adds to existing. Using logic from store inspection.
                         */}
                                            <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-gray-50 rounded-2xl mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-muted font-medium">Subtotal</span>
                            <span className="font-bold text-xl text-primary">₹{subtotal.toFixed(0)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-lg shadow-primary/20"
                        >
                            Checkout <ShoppingBag size={18} />
                        </button>
                    </div>
                </div>
            )}
        </Drawer>
    );
}
