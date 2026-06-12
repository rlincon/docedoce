/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Clock, Tag, Sparkles, ShoppingCart, Percent } from 'lucide-react';
import { PromoFlash, SweetItem } from '../types';

interface PromoSectionProps {
  promos: PromoFlash[];
  sweets: SweetItem[];
  onAddPromoItemToCart: (sweetId: string, discountPercent: number) => void;
}

 
  export default function PromoSection({
  promos,
  sweets,
  onAddPromoItemToCart,
  }: PromoSectionProps) {
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  if (promos.length === 0) return null;

  const currentPromo = promos[activePromoIndex] || promos[0];

  // Helper to format remaining time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Find sweets linked to this promotion
  const promoSweets = sweets.filter((s) =>
    currentPromo.itemsIncludedIds.includes(s.id)
  );

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#FDFBF7] p-1 border border-rose-100 shadow-md">
   
   
      {/* Title block */}
   
      <div className="flex flex-col gap-2 p-6 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-500">
            <Percent className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-sans text-xl font-bold text-[#3D251E] tracking-tight">
              Promoções Temporárias
            </h2>
            <p className="text-xs text-rose-500 font-medium">
              Aproveite os descontos relâmpago antes que o cronômetro chegue ao fim!
            </p>
          </div>
        </div>

        {/* Promo Switcher Bullets */}
        {promos.length > 1 && (
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            {promos.map((promo, idx) => (
              <button
                id={`promo-bullet-${promo.id}`}
                key={promo.id}
                onClick={() => setActivePromoIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activePromoIndex === idx
                    ? 'w-6 bg-red-500'
                    : 'w-2.5 bg-rose-200 hover:bg-rose-300'
                }`}
                title={promo.title}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Promo Banner with dynamic background */}
      <div className="mx-4 mb-4 overflow-hidden rounded-2.5xl bg-gradient-to-br from-rose-500 via-pink-600 to-amber-600 text-white shadow-inner sm:mx-6 md:mb-6">
        <div className="relative grid grid-cols-1 md:grid-cols-12">
          
          {/* Decorative radial overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_40%)]" />

          {/* Banner text info - 7/12 width */}
          <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="h-4 w-4 animate-spin text-amber-200" />
                <span>OFERTA RESTRITA</span>
              </div>
              
              <h3 className="mt-4 font-sans text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                {currentPromo.title}
              </h3>
              
              <p className="mt-2 text-sm text-pink-50 max-w-sm">
                {currentPromo.description}
              </p>
            </div>

            {/* Countdown area */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5 rounded-xl bg-black/30 px-4 py-2 backdrop-blur-md">
                <Clock className="h-5 w-5 text-red-100 animate-pulse" />
                <span className="font-mono text-xl font-bold tracking-widest text-[#FFF]">
                  {formatTime(currentPromo.timeLeftSecondsRemaining)}
                </span>
                <span className="text-[10px] uppercase text-pink-100 font-bold self-end mb-0.5">restantes</span>
              </div>

              <div className="rounded-xl border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-xs text-white/90">Cupom Aplicado: </span>
                <span className="font-mono font-bold text-amber-200 uppercase">{currentPromo.couponCode}</span>
              </div>
            </div>
          </div>

          {/* Promo Items list - 5/12 width */}
          <div className="relative border-t border-white/10 bg-black/15 p-6 md:col-span-5 md:border-t-0 md:border-l">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-200 mb-4">
              Produtos na Promoção:
            </h4>

            <div className="space-y-4">
              {promoSweets.map((sweet) => {
                const discountedPrice = sweet.price * (1 - currentPromo.discountPercent / 100);
                return (
                  <div
                    key={sweet.id}
                    className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/15"
                  >
                    <img
                      src={sweet.image}
                      alt={sweet.name}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-xl object-cover shadow-sm bg-stone-100"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-[#FFF]">
                        {sweet.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-pink-200 line-through">
                          R$ {sweet.price.toFixed(2)}
                        </span>
                        <span className="text-sm font-black text-amber-200">
                          R$ {discountedPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Quick Add To Cart */}
                    <button
                      id={`add-promo-btn-${sweet.id}`}
                      onClick={() => onAddPromoItemToCart(sweet.id, currentPromo.discountPercent)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-rose-600 shadow transition-transform hover:scale-110 active:scale-95"
                      title="Adicionar item promocional ao carrinho"
                    >
                      <ShoppingCart className="h-4.5 w-4.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
