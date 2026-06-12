/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SweetItem {
  id: string;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  category: 'Brigadeiros' | 'Incomparável' | 'Tradicionais' | 'Bombom' | 'outros';
  image: string;
  tags?: string[];
  ingredients?: string[];
  weight?: string;
  featured?: boolean;
}

export interface PromoFlash {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  timeLeftSecondsRemaining: number; // For simulation dynamic countdowns
  couponCode: string;
  bannerImage: string;
  bannerColor: string; // Tailwind class like bg-rose-500
  itemsIncludedIds: string[]; // IDs of products receiving the flash discount
}

export interface CartItem {
  sweet: SweetItem;
  quantity: number;
  notes?: string;
  isPromoApplied?: boolean;
  promoDiscountPercent?: number;
}

export interface DeliveryDetails {
  name: string;
  phone: string;
  deliveryMethod: 'delivery' | 'pickup';
  address: string;
  paymentMethod: 'pix' | 'cartao' | 'dinheiro';
}
