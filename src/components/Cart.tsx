/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  MapPin,
  CreditCard,
  User,
  Phone,
  Tag,
  Check,
  Percent,
  MessageSquare,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { CartItem, DeliveryDetails } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onUpdateNotes: (index: number, notes: string) => void;
  onClearCart: () => void;
  activePromoCodes: string[];
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNotes,
  onClearCart,
  activePromoCodes
}: CartProps) {
  const [details, setDetails] = useState<DeliveryDetails>({
    name: '',
    phone: '',
    deliveryMethod: 'delivery',
    address: '',
    paymentMethod: 'pix'
  });

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Pricing calculations
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.sweet.price;
      const discountFac = item.isPromoApplied && item.promoDiscountPercent ? (1 - item.promoDiscountPercent / 100) : 1;
      return acc + (price * discountFac) * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  // Handle active custom coupons entered manually
  const getCouponDiscountPercent = () => {
    if (!appliedCoupon) return 0;
    const cleanCoupon = appliedCoupon.toUpperCase().trim();
    if (cleanCoupon === 'SWEET15' || activePromoCodes.includes(cleanCoupon)) return 15;
    if (cleanCoupon === 'VULCAO20') return 20;
    if (cleanCoupon === 'DOCE10') return 10;
    return 0;
  };

  const couponDiscountPercent = getCouponDiscountPercent();
  const couponDiscountAmount = subtotal * (couponDiscountPercent / 100);

  const deliveryFee = details.deliveryMethod === 'delivery' ? 7.00 : 0.00;
  const total = subtotal - couponDiscountAmount + deliveryFee;

  const handleApplyCoupon = () => {
    const cleanInput = couponInput.trim().toUpperCase();
    if (!cleanInput) return;

    if (activePromoCodes.includes(cleanInput) || ['VULCAO20', 'SWEET15', 'DOCE10'].includes(cleanInput)) {
      setAppliedCoupon(cleanInput);
      setCouponSuccess(`Cupom ${cleanInput} aplicado com sucesso!`);
      setCouponError(null);
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido ou expirado.');
      setCouponSuccess(null);
    }
  };

  // Generate WhatsApp Order Message Link
  const buildWhatsAppLink = () => {
    const phoneStore = '43991411006'; // Simulated store WhatsApp number
    let orderDetailsText = `*🍰 NOVO PEDIDO WEB - DOCE DOCE E CIA*\n\n`;
    orderDetailsText += `👤 *Cliente:* ${details.name || 'Não informado'}\n`;
    orderDetailsText += `📞 *Contato:* ${details.phone || 'Não informado'}\n`;
    orderDetailsText += `📍 *Modalidade:* ${details.deliveryMethod === 'delivery' ? 'Entrega em Casa' : 'Retirada no Local'}\n`;
    
    if (details.deliveryMethod === 'delivery') {
      orderDetailsText += `🏠 *Endereço:* ${details.address || 'Não informado'}\n`;
    }
    orderDetailsText += `💳 *Pagamento:* ${details.paymentMethod.toUpperCase()}\n\n`;

    orderDetailsText += `📝 *Ítens do Pedido:*\n`;
    cartItems.forEach((item, index) => {
      const price = item.sweet.price;
      const discountFac = item.isPromoApplied && item.promoDiscountPercent ? (1 - item.promoDiscountPercent / 100) : 1;
      const finalItemPrice = price * discountFac;
      
      orderDetailsText += `• ${item.quantity}x _${item.sweet.name}_ ${item.isPromoApplied ? '(Promo Flash)' : ''} - R$ ${(finalItemPrice * item.quantity).toFixed(2)}\n`;
      if (item.notes) {
        orderDetailsText += `  └ _Nota: ${item.notes}_\n`;
      }
    });

    orderDetailsText += `\n📊 *Resumo Financeiro:*\n`;
    orderDetailsText += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    if (couponDiscountAmount > 0) {
      orderDetailsText += `Desconto (${appliedCoupon}): -R$ ${couponDiscountAmount.toFixed(2)}\n`;
    }
    if (deliveryFee > 0) {
      orderDetailsText += `Taxa de Entrega: R$ ${deliveryFee.toFixed(2)}\n`;
    }
    orderDetailsText += `*Total: R$ ${total.toFixed(2)}*\n\n`;
    orderDetailsText += `🚀 _Obrigado pela preferência! Aguardo confirmação do pedido._`;

    // Encode text for web safeness
    const encoded = encodeURIComponent(orderDetailsText);
    return `https://api.whatsapp.com/send?phone=${phoneStore}&text=${encoded}`;
  };

  const isFormValid = () => {
    if (!details.name.trim()) return false;
    if (!details.phone.trim()) return false;
    if (details.deliveryMethod === 'delivery' && !details.address.trim()) return false;
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop filter */}
        <div
          id="cart-backdrop"
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col bg-[#FDFBF7] shadow-2xl border-l border-rose-100">
              
              {/* Cart Drawer Header */}
              <div className="flex items-center justify-between border-b border-rose-100 px-4 py-5 sm:px-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <h2 className="text-lg font-bold text-[#3D251E] id=slide-over-title">Meu Pedido</h2>
                </div>
                
                <button
                  id="close-cart-btn"
                  onClick={onClose}
                  className="rounded-full bg-stone-100 p-1.5 text-stone-500 transition-colors hover:bg-stone-200 hover:text-[#3D251E] focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart body */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 scrollbar-thin">
                {cartItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-rose-50 p-6 text-rose-400">
                      <ShoppingBag className="h-10 w-10" />
                    </div>
                    <p className="mt-4 text-base font-bold text-[#3D251E]">Seu carrinho está vazio</p>
                    <p className="mt-1 text-xs text-[#8C6D62]">Dê uma olhada no cardápio e adicione doces maravilhosos!</p>
                    <button
                      onClick={onClose}
                      className="mt-6 rounded-xl bg-[#3D251E] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-rose-600 shadow active:scale-95"
                    >
                      Voltar ao Cardápio
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Item lines */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C6D62]">Itens Escolhidos</h3>
                      
                      {cartItems.map((item, idx) => {
                        const price = item.sweet.price;
                        const discountFac = item.isPromoApplied && item.promoDiscountPercent ? (1 - item.promoDiscountPercent / 100) : 1;
                        const finalPrice = price * discountFac;

                        return (
                          <div
                            key={`${item.sweet.id}-${idx}`}
                            className="flex flex-col gap-2 rounded-2xl bg-white p-3 border border-rose-50 shadow-xs"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.sweet.image}
                                alt={item.sweet.name}
                                referrerPolicy="no-referrer"
                                className="h-12 w-12 rounded-lg object-cover bg-stone-100"
                              />
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <h4 className="text-xs font-bold text-[#3D251E] truncate">
                                    {item.sweet.name}
                                  </h4>
                                  {item.isPromoApplied && (
                                    <span className="flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-black uppercase text-red-600">
                                      <Percent className="h-2 w-2" />
                                      <span>Promo</span>
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {item.isPromoApplied ? (
                                    <>
                                      <span className="text-[10px] text-stone-400 line-through">
                                        R$ {price.toFixed(2)}
                                      </span>
                                      <span className="text-xs font-semibold text-rose-500">
                                        R$ {finalPrice.toFixed(2)}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-xs font-medium text-stone-500">
                                      R$ {price.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <button
                                id={`remove-item-${idx}`}
                                onClick={() => onRemoveItem(idx)}
                                className="p-1 text-stone-300 hover:text-red-500 transition-colors"
                                title="Remover item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Quantity & Notes Bar */}
                            <div className="flex items-center justify-between border-t border-stone-50 pt-2 mt-1">
                              <div className="flex items-center rounded-lg bg-stone-100 px-1 py-0.5">
                                <button
                                  id={`qty-minus-${idx}`}
                                  onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                  className="p-1 text-stone-500 hover:text-[#3D251E]"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-2.5 text-xs font-bold text-[#3D251E]">{item.quantity}</span>
                                <button
                                  id={`qty-plus-${idx}`}
                                  onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                  className="p-1 text-stone-500 hover:text-[#3D251E]"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <span className="text-xs font-black text-[#3D251E]">
                                R$ {(finalPrice * item.quantity).toFixed(2)}
                              </span>
                            </div>

                            {/* Direct Notes customization input */}
                            <div className="relative mt-1">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <MessageSquare className="h-3 w-3 text-stone-300" />
                              </div>
                              <input
                                id={`item-notes-input-${idx}`}
                                type="text"
                                placeholder="Pedido especial? Ex: Sem embalagem, brigadeiro extra..."
                                value={item.notes || ''}
                                onChange={(e) => onUpdateNotes(idx, e.target.value)}
                                className="w-full rounded-lg border border-stone-100 bg-stone-50 py-1 pl-7 pr-2 text-[10.5px] text-[#3D251E] outline-none placeholder:text-stone-400 focus:border-rose-300 focus:bg-white"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Promo/Coupon Code Field */}
                    <div className="rounded-2xl border border-rose-100 bg-stone-50/50 p-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C6D62] mb-2">
                        <Tag className="h-3.5 w-3.5" />
                        <span>Cupom de Desconto</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <input
                          id="coupon-input-field"
                          type="text"
                          placeholder="Digite seu cupom (Ex: DOCE10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 rounded-xl border border-rose-100 bg-white px-3 py-1.5 text-xs outline-none uppercase placeholder:normal-case focus:border-rose-400"
                        />
                        <button
                          id="apply-coupon-btn"
                          onClick={handleApplyCoupon}
                          className="rounded-xl bg-[#3D251E] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-rose-600 active:scale-95"
                        >
                          Aplicar
                        </button>
                      </div>

                      {couponSuccess && (
                        <p className="mt-1.5 text-[10.5px] font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="h-3 w-3 shrink-0" />
                          <span>{couponSuccess}</span>
                        </p>
                      )}
                      
                      {couponError && (
                        <p className="mt-1.5 text-[10.5px] font-bold text-red-500">
                          {couponError}
                        </p>
                      )}
                    </div>

                    {/* Delivery Form */}
                    <div className="space-y-3.5 rounded-2.5xl bg-rose-50/30 p-4 border border-rose-100/50">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C6D62]">Entrega & Contato</h3>

                      {/* Delivery Mode Toggle */}
                      <div className="grid grid-cols-2 gap-2 rounded-xl bg-stone-100 p-1">
                        <button
                          id="method-delivery-btn"
                          type="button"
                          onClick={() => setDetails(prev => ({ ...prev, deliveryMethod: 'delivery' }))}
                          className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                            details.deliveryMethod === 'delivery'
                              ? 'bg-rose-500 text-white shadow-xs'
                              : 'text-[#8C6D62] hover:text-[#3D251E]'
                          }`}
                        >
                          Entrega (+R$ 7.00)
                        </button>
                        <button
                          id="method-pickup-btn"
                          type="button"
                          onClick={() => setDetails(prev => ({ ...prev, deliveryMethod: 'pickup' }))}
                          className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                            details.deliveryMethod === 'pickup'
                              ? 'bg-rose-500 text-white shadow-xs'
                              : 'text-[#8C6D62] hover:text-[#3D251E]'
                          }`}
                        >
                          Retirada Grátis
                        </button>
                      </div>

                      {/* Name input */}
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <User className="h-4 w-4 text-rose-300" />
                        </div>
                        <input
                          id="customer-name-field"
                          type="text"
                          required
                          placeholder="Nome Completo *"
                          value={details.name}
                          onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full rounded-xl border border-rose-100 bg-white py-2 pl-9 pr-3 text-xs text-[#3D251E] outline-none focus:border-rose-400"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Phone className="h-4 w-4 text-rose-300" />
                        </div>
                        <input
                          id="customer-phone-field"
                          type="tel"
                          required
                          placeholder="Telefone / WhatsApp *"
                          value={details.phone}
                          onChange={(e) => setDetails(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full rounded-xl border border-rose-100 bg-white py-2 pl-9 pr-3 text-xs text-[#3D251E] outline-none focus:border-rose-400"
                        />
                      </div>

                      {/* Address Input (conditional on Delivery) */}
                      {details.deliveryMethod === 'delivery' && (
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MapPin className="h-4 w-4 text-rose-300" />
                          </div>
                          <input
                            id="customer-address-field"
                            type="text"
                            required
                            placeholder="Endereço Completo com Bairro/CEP *"
                            value={details.address}
                            onChange={(e) => setDetails(prev => ({ ...prev, address: e.target.value }))}
                            className="w-full rounded-xl border border-rose-100 bg-white py-2 pl-9 pr-3 text-xs text-[#3D251E] outline-none focus:border-rose-400"
                          />
                        </div>
                      )}

                      {/* Payment Method Selector */}
                      <div className="space-y-1.5">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#8C6D62] flex items-center gap-1.5">
                          <CreditCard className="h-3.5 w-3.5" />
                          <span>Sugerir Forma de Pagamento:</span>
                        </span>
                        
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['pix', 'cartao', 'dinheiro'] as const).map((method) => (
                            <button
                              id={`pay-method-${method}`}
                              key={method}
                              type="button"
                              onClick={() => setDetails(prev => ({ ...prev, paymentMethod: method }))}
                              className={`rounded-xl border py-2 text-center text-xs font-bold transition-all capitalize ${
                                details.paymentMethod === method
                                  ? 'border-rose-400 bg-rose-50 text-rose-600'
                                  : 'border-rose-100 bg-white text-stone-500 hover:text-[#3D251E]'
                              }`}
                            >
                              {method === 'cartao' ? 'Cartão' : method}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-[#8C6D62] italic mt-1 leading-normal">
                          * Nenhuma cobrança é feita aqui. O pagamento será combinado e finalizado diretamente no WhatsApp.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Subtotal & Checkout Bottom Bar */}
              {cartItems.length > 0 && (
                <div className="border-t border-rose-100 bg-white px-4 py-5 sm:px-6">
                  <div className="space-y-2.5">
                    
                    {/* Bill breakdown */}
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Subtotal dos doces</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>

                    {couponDiscountAmount > 0 && (
                      <div className="flex items-center justify-between text-xs font-semibold text-emerald-600">
                        <span>Desconto de Cupom ({appliedCoupon})</span>
                        <span>- R$ {couponDiscountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    {deliveryFee > 0 && (
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span>Taxa de entrega</span>
                        <span>R$ {deliveryFee.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex items-baseline justify-between border-t border-rose-50 pt-2 pb-1">
                      <span className="text-sm font-bold text-[#3D251E]">Total Estimado</span>
                      <span className="text-xl font-black text-rose-600">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>

                    {/* Informative instructions bar */}
                    {!isFormValid() ? (
                      <p className="text-[10.5px] text-center text-[#8C6D62] italic leading-snug">
                        Preencha seu Nome, Telefone e Endereço para liberar o envio do pedido pelo WhatsApp!
                      </p>
                    ) : (
                      <div className="text-center space-y-1">
                        <p className="text-[11px] font-semibold text-emerald-600">
                          ✓ Tudo pronto! Seu pedido será enviado pronto em instantes.
                        </p>
                        <p className="text-[10px] text-[#8C6D62]">
                          Sem pagamento no site. Negociaremos os detalhes na conversa.
                        </p>
                      </div>
                    )}

                    {/* Complete order WhatsApp button */}
                    <a
                      id="submit-order-wa-link"
                      href={isFormValid() ? buildWhatsAppLink() : '#'}
                      target={isFormValid() ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-[#FFF] shadow-md transition-all active:scale-98 ${
                        isFormValid()
                          ? 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg'
                          : 'bg-stone-300 cursor-not-allowed opacity-80 pointer-events-none'
                      }`}
                      onClick={() => {
                        if (isFormValid()) {
                          // Clear cart after placing order
                          setTimeout(() => {
                            onClearCart();
                            onClose();
                          }, 1000);
                        }
                      }}
                    >
                      <span>Finalizar Pedido via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
