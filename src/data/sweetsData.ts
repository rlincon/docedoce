/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SweetItem, PromoFlash } from '../types';

export const sweetsData: SweetItem[] = [
  {
    id: 'bombom-leiteninho',
    name: 'Bombom de Leite Ninho',
    description: 'Feito com Leite Ninho, produtos de qualidade e passado no mais puro Leite Ninho.',
    price: 9.00,
    category: 'Brigadeiros',
    image: '../assets/ninho.png',
    tags: ['Mais Vendido', 'Artesanal'],
    /** ingredients: ['Leite condensado integral', 'Manteiga premium', 'Cacau belga 54%', 'Granulado belga Callebaut'],
    */
    weight: '55g',
    featured: true
  },
  {
    id: 'brigadeiro-mm',
    name: 'Brigadeiro com MM',
    description: 'O brigadeiro cremoso, envolto em uma deliciosa porção de confete colorido.',
    price: 9.00,
    category: 'Brigadeiros',
    image: '../Assets/Mm.png',
    tags: ['Mais Vendido', 'Destaque'],
    /** ingredients: ['Leite condensado integral', 'Pasta pura de pistache', 'Pistaches torrados e picados'],
    */
    weight: '55g',
    featured: true
  },
  {
    id: 'leiteninho-nutella',
    name: 'Bombom de Ninho com Nutella',
    description: 'Brigadeiro cremoso de Leite Ninho® recheado com uma generosa porção de Nutella legítima no centro.',
    price: 9.00,
    category: 'Brigadeiros',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&auto=format&fit=crop&q=80',
    tags: ['Leite Ninho'],
    /**ingredients: ['Leite condensado', 'Leite em pó Ninho®', 'Creme de leite fresco', 'Creme de avelã Nutella®'],
    */
    weight: '55g'
  },
  {
    id: 'brigadeiro-morango',
    name: 'Coxinha de Morango com Brigadeiro',
    description: 'Um morango inteiro super fresco e suculento envolto em uma generosa camada de brigadeiro gourmet tradicional.',
    price: 9.00,
    category: 'Brigadeiros',
    image: '../Assets/brig-morango.png',
    tags: ['Mais Vendido'],
    /**ingredients: ['Morango fresco', 'Leite condensado', 'Chocolate em pó 50%', 'Granulado tradicional'],
    */
    weight: '55g'
  },
  {
    id: 'brigadeiro',
    name: 'Brigadeiro Tradicional de Chocolate',
    description: 'A mais pura magia de degustar o brigadeiro tradicional, feito como antigamente, uma nova emoção a cada mordida.',
    price: 9.00,
    category: 'Brigadeiros',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&auto=format&fit=crop&q=80',
    tags: ['Mais Vendido'],
    /**ingredients: ['Maracujá concentrado', 'Leite condensado', 'Chocolate ao leite para cobertura'],
    */
    weight: '55g'
  },
  {
    id: 'casadinho',
    name: 'Bombom Casadinho',
    description: 'A combinação perfeite do delicioso brigadeiro e do beijinho, sucesso em toda festa.',
    price: 9.00,
    category: 'Bombom',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    tags: ['Mais Vendido', 'Artesanal'],
    /**ingredients: ['Massa amanteigada de baunilha', 'Brigadeiro cremoso de Ninho®', 'Nutella® de verdade'],
    */
    weight: '55g',
    featured: true
  },
  {
    id: 'beijinho',
    name: 'Bombom Beijinho',
    description: 'Delicioso bombom tradicional de beijinho envolto e coco ralado sencacional, a pura magia dos aniversários.',
    price: 9.00,
    category: 'Bombom',
    image: 'https://images.unsplash.com/photo-1621303837474-61120580fd36?w=800&auto=format&fit=crop&q=80',
    tags: ['Clássico'],
    /**ingredients: ['Cenoura fresca', 'Cacau em pó', 'Amido de milho', 'Leite integral'],
    */
    weight: '55g'
  },
  {
    id: 'brigadeiro-kitkat',
    name: 'Brigadeiro com KitKat',
    description: 'Delicionso brigadeiro, com pedaços de Kitkat, uma mistura infalível. ',
    price: 9.00,
    category: 'Brigadeiros',
    image: 'https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?w=800&auto=format&fit=crop&q=80',
    tags: ['Mais Vendido', 'Artesanal'],
    /**ingredients: ['Cacau red velvet', 'Cream cheese', 'Essência de baunilha', 'Creme de leite'],
    */
    weight: '55g'
  },
  {
    id: 'brigadeiro-amendoim',
    name: 'Brigadeiro de Amendoim',
    description: 'Delicioso brigadeiro branco, com pedaços de amendoim envolto do mais crocante amendoim torrado.',
    price: 9.00,
    category: 'Brigadeiros',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    tags: ['Brigadeiros'],
    /**ingredients: ['Massa de chocolate nobre', 'Coco ralado fresco umectado', 'Ganache blend'],
    */
    weight: '55g'
  },
  {
    id: 'palia-italiana',
    name: 'Pália Italiana de Leite Ninho',
    description: 'Deliciosa Pália Italiana, feita com delicioso pavê de bolacha e um maravilhoso creme de Leite Ninho.',
    price: 9.00,
    category: 'Tradicionais',
    image: 'https://images.unsplash.com/photo-1579306193793-0be3c966f7d1?w=800&auto=format&fit=crop&q=80',
    tags: ['Incomparável'],
    /**ingredients: ['Bananas maduras', 'Caramelo toffee', 'Chantilly fresco', 'Biscoito triturado'],
    */
    weight: '55g'
  },
  {
    id: 'pastel-belem',
    name: 'Pastel de Belém',
    description: 'Delicioso creme de nata, muito cremoso em uma massa folhada crocante',
    price: 9.00,
    category: 'Incomparável',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80',
    tags: ['Campeão de Vendas'],
    /**ingredients: ['Morangos maduros fatiados', 'Creme alpino branco', 'Calda belga fluida'],
    */
    weight: '55g'
  },
  {
    id: 'oreo',
    name: 'Brigadeiro de Óreo',
    description: 'Delicioso brigadeiro com pedaços de Biscoito Óreo envolto em uma farofa de bolacha realçando o sabor.',
    price: 9.00,
    category: 'Brigadeiros',
    image: 'https://images.unsplash.com/photo-1558961309-dbdf037a1e0b?w=800&auto=format&fit=crop&q=80',
    tags: ['Incomparável'],
    /**ingredients: ['Massa amanteigada', 'Gotas de chocolate meio amargo', 'Nutella® cremosa'],
    */
    weight: '55g'
  },
  {
    id: 'Kinder-Bueno',
    name: 'Brigadeiro de Kinder Bueno',
    description: 'Massa especial de brigadeiro com pedaços de Kinder Bueno, realçando o delicioso sabor do Brigadeiro.',
    price: 11.55,
    category: 'Brigadeiros',
    image: 'https://images.unsplash.com/photo-1558961309-dbdf037a1e0b?w=800&auto=format&fit=crop&q=80',
    tags: ['Incomparável'],
    /**ingredients: ['Canela selecionada', 'Manteiga premium', 'Doce de leite de panela'],
    */
    weight: '55g'
  },
  {
    id: 'surpresa-uva',
    name: 'Surpresinha de Uva',
    description: 'Delicioso bombom de Leite Ninho com uma uva verde como recheio, tendo contraste da uva com o doce, sabor marcante.',
    price: 9.00,
    category: 'Incomparável',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop&q=80',
    tags: ['Mais Vendido', 'Artesanal'],
    /**ingredients: ['Chocolate meio amargo 50%', 'Manteiga', 'Leite em pó Ninho®'],
    */
    weight: '55g'
  },
  {
    id: 'bombom-morango',
    name: 'Bombom de Morango',
    description: 'Tradicional, delicios incomparável sabor do creme de leite condensado com o sabor da fruta.',
    price: 9.00,
    category: 'Incomparável',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=800&auto=format&fit=crop&q=80',
    tags: ['Requintado'],
    /**ingredients: ['Base crocante de biscoito Maizena', 'Creme de queijo aerado', 'Amoras, framboesas, sementes de morango'],
    */
    weight: '55g'
  },
  {
    id: 'trufa-chocolate',
    name: 'Trufa de Chocolate',
    description: 'Trufa do mais puro chocolate, delicioso chocolate meio amargo relaçando mais ainda o sabor do chocolate.',
    price: 9.00,
    category: 'Incomparável',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=800&auto=format&fit=crop&q=80',
    tags: ['Requintado'],
    /**ingredients: ['Base crocante de biscoito Maizena', 'Creme de queijo aerado', 'Amoras, framboesas, sementes de morango'],
    */
    weight: '55g'
  },
  {
    id: 'trufa-cereja',
    name: 'Trufa de Cereja',
    description: 'Trufa do mais puro chocolate, combinado com deliciosa cereja em calda, sabor marcante.',
    price: 9.00,
    category: 'Incomparável',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=800&auto=format&fit=crop&q=80',
    tags: ['Requintado'],
    /**ingredients: ['Base crocante de biscoito Maizena', 'Creme de queijo aerado', 'Amoras, framboesas, sementes de morango'],
    */
    weight: '55g'
  },
  {
    id: 'trufa-ninho',
    name: 'Trufa de Leite Ninho',
    description: 'Mistura marcante, trufa de Leite Ninho é uma sensação de sabores.',
    price: 9.00,
    category: 'Incomparável',
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?w=800&auto=format&fit=crop&q=80',
    tags: ['Requintado'],
    /**ingredients: ['Base crocante de biscoito Maizena', 'Creme de queijo aerado', 'Amoras, framboesas, sementes de morango'],
    */
    weight: '55g'
  }
];

export const initialPromos: PromoFlash[] = [
  /**{
    id: 'promo-festa-vulcao',
    title: 'Festival Vulcânico de Ninho',
    description: '20% APENAS AGORA! O queridinho Bolo Vulcão de Ninho com Nutella por um preço imperdível durante os próximos minutos.',
    discountPercent: 20,
    timeLeftSecondsRemaining: 1800, // 30 minutes in seconds
    couponCode: 'VULCAO20',
    bannerImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&auto=format&fit=crop&q=80',
    bannerColor: 'from-amber-500 via-rose-500 to-red-600',
    itemsIncludedIds: ['bolo-vulcao-nutella']
  },
  {
    id: 'promo-brigadeiro-loucura',
    title: 'Loucura dos Brigadeiros Belgas',
    description: 'Leve Brigadeiro Belga Gourmet com 15% de desconto acumulado adicionando no carrinho diretamente nessa promoção promocional.',
    discountPercent: 15,
    timeLeftSecondsRemaining: 900, // 15 minutes in seconds
    couponCode: 'SWEET15',
    bannerImage: 'https://images.unsplash.com/photo-1541795795328-f073b763494e?w=1200&auto=format&fit=crop&q=80',
    bannerColor: 'from-amber-700 via-rose-600 to-amber-900',
    itemsIncludedIds: ['brigadeiro-gourmet', 'brigadeiro-nutella']
  }
  */
];