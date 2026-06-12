/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, ShoppingBag, Heart, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  favoritesCount: number;
}

export default function Header({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
  favoritesCount
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-rose-100 bg-[#FDFBF7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-sm">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-sans text-xl font-bold tracking-tight text-[#3D251E] sm:text-2xl">
              Doce<span className="text-rose-500 font-medium">Doce & Cia</span>
            </h1>
            <p className="hidden text-[10px] uppercase tracking-widest text-rose-400 font-medium sm:block">
              Alta Confeitaria & Doceria Artesanal
            </p>
          </div>
        </div>

        {/* Search Bar - Responsive */}
        <div className="relative mx-4 hidden max-w-md flex-1 md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-[#8C6D62]" />
          </div>
          <input
            id="desktop-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Procurar um doce especial (bolo, brigadeiro, copo)..."
            className="w-full rounded-2xl border border-rose-100 bg-white py-2 pl-9 pr-4 text-sm text-[#3D251E] outline-none transition-colors placeholder:text-stone-400 focus:border-rose-400 focus:ring-1 focus:ring-rose-200"
          />
        </div>

        {/* Call to Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist badge helper */}
          {favoritesCount > 0 && (
            <div className="flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs text-rose-600 transition-all">
              <Heart className="h-4.5 w-4.5 fill-rose-500 text-rose-500" />
              <span className="font-semibold">{favoritesCount}</span>
            </div>
          )}

          {/* Cart triggers */}
          <button
            id="cart-trigger-btn"
            onClick={onOpenCart}
            className="group relative flex items-center gap-2 rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-rose-600 hover:shadow-md active:scale-95"
          >
            <ShoppingBag className="h-4.5 w-4.5 group-hover:animate-bounce" />
            <span className="hidden sm:inline">Meu Carrinho</span>
            
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-100 px-1 text-[11px] font-bold text-rose-600 animate-wiggle">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar Mobile */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-[#8C6D62]" />
          </div>
          <input
            id="mobile-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar doces..."
            className="w-full rounded-xl border border-rose-100 bg-white py-2 pl-9 pr-4 text-sm text-[#3D251E] outline-none transition-colors placeholder:text-stone-400 focus:border-rose-300"
          />
        </div>
      </div>
    </header>
  );
}
