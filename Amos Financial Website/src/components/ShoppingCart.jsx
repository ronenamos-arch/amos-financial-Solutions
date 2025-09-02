import React, { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { initializeCheckout, formatCurrency } from '@/api/EcommerceApi';
import { useToast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const cartTotalFormatted = useMemo(() => {
    const total = getCartTotal();
    const currency = cartItems.length > 0 ? cartItems[0].variant.currency : 'USD';
    return formatCurrency(total, { code: currency, symbol: '$', template: '$1' });
  }, [getCartTotal, cartItems]);

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'העגלה שלך ריקה',
        description: 'הוסף מוצרים לעגלה לפני המעבר לתשלום.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      clearCart();
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'שגיאה בתשלום',
        description: 'הייתה בעיה ביצירת התשלום. אנא נסה שוב.',
        variant: 'destructive',
      });
    }
  }, [cartItems, clearCart, toast]);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col bg-white/95 backdrop-blur-md text-right">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-blue-900">עגלת קניות</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex-grow overflow-y-auto -mx-6 px-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
              <ShoppingCartIcon size={48} className="mb-4 text-gray-400" />
              <p>העגלה שלך ריקה.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.variant.id} className="flex items-center gap-4">
                <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded-md border" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-blue-900">{item.product.title}</h3>
                  <p className="text-sm text-gray-600">{item.variant.title}</p>
                  <p className="text-sm text-green-600 font-bold">
                    {formatCurrency(item.variant.sale_price_in_cents ?? item.variant.price_in_cents, item.variant.currency)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <Button onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} size="sm" variant="ghost" className="px-2 text-gray-700 hover:bg-gray-100"><Minus size={14} /></Button>
                    <span className="px-2 text-gray-800 font-medium">{item.quantity}</span>
                    <Button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} size="sm" variant="ghost" className="px-2 text-gray-700 hover:bg-gray-100"><Plus size={14} /></Button>
                  </div>
                  <Button onClick={() => removeFromCart(item.variant.id)} size="sm" variant="ghost" className="text-red-500 hover:text-red-400 text-xs">הסר</Button>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter>
            <div className="w-full space-y-4">
              <Separator />
              <div className="flex justify-between items-center text-blue-900">
                <span className="text-lg font-medium">סה"כ</span>
                <span className="text-2xl font-bold">{cartTotalFormatted}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full btn-primary py-3 text-base">
                מעבר לתשלום
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;