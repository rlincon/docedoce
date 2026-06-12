/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  Clock,
  Instagram,
  Star,
  CheckCircle,
  Truck,
  Package,
  Calendar,
  ChevronRight
} from 'lucide-react';
import Header from './components/Header';
import PromoSection from './components/PromoSection';
import SweetsMenu from './components/SweetsMenu';
import Cart from './components/Cart';
import { sweetsData, initialPromos } from './data/sweetsData';
import { SweetItem, CartItem, PromoFlash } from './types';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promos, setPromos] = useState<PromoFlash[]>(initialPromos);
  const [notification, setNotification] = useState<string | null>(
    'Boas-vindas! Use o cupom DOCE10 para garantir 10% de desconto na primeira compra.'
  );

  // Auto Dismiss Initial Notification
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Set up live countdown ticker for temporary promotions (Promoções Temporárias)
  useEffect(() => {
    const interval = setInterval(() => {
      setPromos((prevPromos) => {
        return prevPromos.map((promo) => {
          if (promo.timeLeftSecondsRemaining <= 1) {
            // Logically reset countdowns dynamically for infinite demo suitability
            const randomizedReset = promo.id === 'promo-festa-vulcao' ? 1800 : 900;
            return {
              ...promo,
              timeLeftSecondsRemaining: randomizedReset
            };
          }
          return {
            ...promo,
            timeLeftSecondsRemaining: promo.timeLeftSecondsRemaining - 1
          };
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handlers for App state
  const handleToggleFavorite = (sweetId: string) => {
    setFavorites((prev) => {
      if (prev.includes(sweetId)) {
        return prev.filter((id) => id !== sweetId);
      } else {
        return [...prev, sweetId];
      }
    });
  };

  // Add standard sweet to the cart
  const handleAddToCart = (sweet: SweetItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.sweet.id === sweet.id && !item.isPromoApplied
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            sweet,
            quantity: 1,
            isPromoApplied: false
          }
        ];
      }
    });
  };

  // Add discounted promotional sweet to the cart
  const handleAddPromoItemToCart = (sweetId: string, discountPercent: number) => {
    const sweetTarget = sweetsData.find((s) => s.id === sweetId);
    if (!sweetTarget) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.sweet.id === sweetId &&
          item.isPromoApplied &&
          item.promoDiscountPercent === discountPercent
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            sweet: sweetTarget,
            quantity: 1,
            isPromoApplied: true,
            promoDiscountPercent: discountPercent
          }
        ];
      }
    });

    // Notify user in-app
    setNotification(`Produto promocional "${sweetTarget.name}" adicionado ao carrinho!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Modify quantities inside the cart drawer
  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty < 1) {
      handleRemoveCartItem(index);
      return;
    }

    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  // Delete item from cart index
  const handleRemoveCartItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Update notes/custom instructions for a specific item
  const handleUpdateItemNotes = (index: number, text: string) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index].notes = text;
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Calculate stats
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const activePromoCodesList = promos.map((p) => p.couponCode.toUpperCase());

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#3D251E] antialiased">
      
      {/* Top Banner toast alert */}
      {notification && (
        <div className="relative z-50 bg-[#DE8F80] px-4 py-2 text-center text-xs font-semibold text-white shadow transition-all duration-300">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span />
            <p className="flex items-center gap-1.5 justify-center">
              <Sparkles className="h-4 w-4 text-amber-200 animate-bounce" />
              <span>{notification}</span>
            </p>
            <button
              onClick={() => setNotification(null)}
              className="rounded-full p-0.5 text-white/80 hover:bg-white/10"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Styled Navbar Header component */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-8">
        
        {/* Epic Main Hero block */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-[#FDFBF7] border border-rose-100 shadow-sm relative">
          
          {/* Subtle graphic patterns */}
          <div className="absolute inset-0 bg-[#DE8F80]/5 bg-[radial-gradient(#DE8F80_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12 md:py-16">
            
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-rose-600">
              <Star className="h-4 w-4 fill-rose-500 text-rose-500 animate-spin" />
              <span>Garantia de Sabor Premium</span>
            </div>

            <h1 className="font-sans text-3xl font-black tracking-tight text-[#3D251E] sm:text-5xl md:text-6xl max-w-3xl leading-tight">
              Adoce seu dia com nossa <br className="hidden sm:inline" />
              <span className="text-[#DE8F80] italic">Alta Confeitaria</span> Artesanal
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-[#8C6D62] sm:text-base">
              Usamos apenas ingredientes selecionados: cacau puro importado, frutas selecionadas 
              e muito amor. Faça seu pedido com facilidade pelo cardápio digital e receba direto via WhatsApp!
            </p>

            {/* Value Highlights Pill Blocks */}
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl w-full text-left">
              <div className="flex items-start gap-2.5 rounded-2xl bg-white p-3.5 border border-rose-50">
                <Truck className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D251E]">Entrega Rápida</h4>
                  <p className="text-[10px] text-[#8C6D62]">Em toda cidade - R$ 7,00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5 rounded-2xl bg-white p-3.5 border border-rose-50">
                <Clock className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D251E]">Horário Aberto</h4>
                  <p className="text-[10px] text-[#8C6D62]">Seg a Sáb - 10h às 19h</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-2xl bg-white p-3.5 border border-rose-50">
                <Package className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D251E]">Retirada Grátis</h4>
                  <p className="text-[10px] text-[#8C6D62]">Boutique no Centro</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-2xl bg-white p-3.5 border border-rose-50">
                <CheckCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#3D251E]">100% Caseiro</h4>
                  <p className="text-[10px] text-[#8C6D62]">Doces tradicionais e espelhados</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* Main Content Area: Menu & Promos - 8 cols */}
          <div className="lg:col-span-12 space-y-8">
            
            {/* Dynamic Flash Promotions Panel (Promoções Temporárias) */}
            <PromoSection
              promos={promos}
              sweets={sweetsData}
              onAddPromoItemToCart={handleAddPromoItemToCart}
            />

            {/* Menu Catalogue with categories */}
            <div>
              <div className="mb-6 flex flex-col gap-2 border-b border-rose-100 pb-4">
                <h2 className="font-sans text-2xl font-black text-[#3D251E] tracking-tight">
                  Nosso Cardápio Online
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm">
                  Selecione os doces desejados, customize notas e adicione no carrinho para prosseguir com o pedido.
                </p>
              </div>

              <SweetsMenu
                sweets={sweetsData}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
                searchTerm={searchTerm}
              />
            </div>

          </div>
        </div>

        {/* Decorative Image Mosaic Section: "Doces Momentos" resembling instagram catalog */}
        <section className="mt-16 rounded-3xl bg-[#FDFBF7] p-6 border border-rose-100 shadow-xs">
          <div className="flex flex-col gap-1 text-center md:text-left md:flex-row md:items-baseline md:justify-between mb-6">
            <div>
              <h3 className="font-sans text-xl font-bold text-[#3D251E]">@docedocecia</h3>
              <p className="text-xs text-[#8C6D62]">Acompanhe nossas novidades e encomendas no Instagram!</p>
            </div>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-rose-500/90 hover:text-rose-600 mt-2 md:mt-0 active:scale-95 self-center"
            >
              <Instagram className="h-4 w-4" />
              <span>Ver Perfil Oficial</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1541795795328-f073b763494e?w=600&auto=format&fit=crop&q=80"
                alt="Brigadeiros no copo decorados"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black">
                ✨ #FinoArtesanal
              </div>
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80"
                alt="Recheio vulcânico brilhante"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black">
                🍫 #CacauCallebaut
              </div>
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1579306193793-0be3c966f7d1?w=600&auto=format&fit=crop&q=80"
                alt="Dora de banana banoffee"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black">
                🍌 #BanoffeeArtesanal
              </div>
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?w=600&auto=format&fit=crop&q=80"
                alt="Fornada quentinha de cookies de veludo vermelho"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black">
                🍪 #RedVelvetCookies
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Styled Informational Footer */}
      <footer className="mt-20 border-t border-rose-100 bg-[#FDFBF7] py-10 text-stone-500">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="font-sans text-base font-bold text-[#3D251E]">
            Doce Doce & Cia • Venda de Doces e Confeitaria
          </p>
          <p className="mt-1 text-xs text-[#8C6D62]">
            CNPJ: 12.345.678/0001-90 • Boutique de Doces do Centro • São Paulo / SP
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-[#8C6D62]">
            <span className="flex items-center gap-1.5 justify-center">
              <MapPin className="h-4 w-4 text-rose-500" />
              <span>Rua dos Confeiteiros, 1500 - Bloco C - Centro</span>
            </span>
            <span className="flex items-center gap-1.5 justify-center">
              <Calendar className="h-4 w-4 text-rose-500" />
              <span>Segunda a Sábado, das 10:00 às 19:00</span>
            </span>
          </div>

          <p className="mt-10 text-[10.5px] text-stone-400">
            © {new Date().getFullYear()} Doce Doce & Cia. Todos os direitos reservados. Feito com amor em São Paulo.
          </p>
        </div>
      </footer>

      {/* Slide-out drawer cart layout */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onUpdateNotes={handleUpdateItemNotes}
        onClearCart={handleClearCart}
        activePromoCodes={activePromoCodesList}
      />

    </div>
  );
}
