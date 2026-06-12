/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Filter, Heart, Info, Plus, Sparkles, Check, ChevronDown, ChevronUp, Grid, List } from 'lucide-react';
import { SweetItem } from '../types';

interface SweetsMenuProps {
  sweets: SweetItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onAddToCart: (sweet: SweetItem) => void;
  searchTerm: string;
}

type TabType = 'todos' | 'Brigadeiros' | 'Bombom' | 'Tradicionais' | 'Incomparável' | 'outros';
type ViewMode = 'grid' | 'list';

export default function SweetsMenu({
  sweets,
  favorites,
  onToggleFavorite,
  onAddToCart,
  searchTerm
}: SweetsMenuProps) {
  const [activeTab, setActiveTab] = useState<TabType>('todos');
  const [viewMode, setViewMode] = useState<ViewMode>('list'); // Default to beautiful List View as requested
  const [expandedIngredients, setExpandedIngredients] = useState<Record<string, boolean>>({});
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Category filter tabs
  const categories: { key: TabType; label: string; count: number }[] = [
    { key: 'todos', label: 'Todos', count: sweets.length },
    { key: 'Brigadeiros', label: 'Brigadeiros', count: sweets.filter(s => s.category === 'Brigadeiros').length },
    { key: 'Bombom', label: 'Bombons', count: sweets.filter(s => s.category === 'Bombom').length },
    { key: 'Tradicionais', label: 'Tradicionais', count: sweets.filter(s => s.category === 'Tradicionais').length },
    { key: 'Incomparável', label: 'Incomparáveis', count: sweets.filter(s => s.category === 'Incomparável').length },
  ];

  // Apply filters: tab and search term
  const filteredSweets = sweets.filter((sweet) => {
    const matchesTab = activeTab === 'todos' || sweet.category === activeTab;
    const matchesSearch =
      sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sweet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sweet.ingredients && sweet.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      sweet.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleIngredients = (id: string) => {
    setExpandedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddToCart = (sweet: SweetItem) => {
    onAddToCart(sweet);
    setAddedAnimationId(sweet.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Category selector and layout switch */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-rose-50 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#8C6D62]">
            <Filter className="h-4 w-4" />
            <span>Filtrar por Categoria</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                id={`tab-btn-${cat.key}`}
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeTab === cat.key
                    ? 'bg-[#3D251E] text-white shadow-xs'
                    : 'bg-rose-50/50 text-[#8C6D62] hover:bg-rose-100 hover:text-[#3D251E]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`flex h-4 min-w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                  activeTab === cat.key ? 'bg-white/20 text-white' : 'bg-[#3D251E]/10 text-[#3D251E]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout Mode Toggler */}
        <div className="flex flex-col gap-1.5 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D62] self-start md:self-end">
            Visualização
          </span>
          <div className="inline-flex rounded-xl bg-stone-100 p-1">
            <button
              id="view-list-btn"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-[#3D251E] shadow-xs'
                  : 'text-[#8C6D62] hover:text-[#3D251E]'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Lista</span>
            </button>
            <button
              id="view-grid-btn"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-[#3D251E] shadow-xs'
                  : 'text-[#8C6D62] hover:text-[#3D251E]'
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Grade</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main product display container */}
      {filteredSweets.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-rose-200 bg-[#FDFBF7]/50 py-16 text-center">
          <p className="text-sm font-semibold text-[#8C6D62]">Nenhum doce encontrado para a busca atual.</p>
          <button
            onClick={() => {
              setActiveTab('todos');
            }}
            className="mt-3 text-xs font-bold text-rose-500 hover:underline"
          >
            Limpar filtros e buscar tudo
          </button>
        </div>
      ) : viewMode === 'list' ? (
        
        /* ——————————————————————————————————————————————————————————
           GORGEOUS PRESTIGE LIST VIEW LAYOUT
           Saves space and keeps miniature list elegant with image on same line
           —————————————————————————————————————————————————————————— */
        <div className="space-y-4">
          {filteredSweets.map((sweet) => {
            const isFav = favorites.includes(sweet.id);
            const isExpanded = !!expandedIngredients[sweet.id];
            const isAddedSuccessfully = addedAnimationId === sweet.id;

            return (
              <article
                key={sweet.id}
                className="group relative flex flex-col gap-4 rounded-2.5xl border border-rose-100/75 bg-[#FDFBF7] p-4 shadow-xs transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Left side: Image + Name and description on same main container lineup */}
                <div className="flex flex-1 items-start gap-4">
                  {/* Miniature Image - same line as title always */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-stone-100 border border-amber-100 my-auto shadow-xs">
                    <img
                      src={sweet.image}
                      alt={sweet.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Tiny responsive tag */}
                    {sweet.weight && (
                      <span className="absolute bottom-1 right-1 rounded bg-[#3D251E]/80 px-1 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider scale-90">
                        {sweet.weight}
                      </span>
                    )}
                  </div>

                  {/* Text labels and description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="font-sans text-base font-bold text-[#3D251E] group-hover:text-rose-500 transition-colors">
                        {sweet.name}
                      </h3>
                      
                      {sweet.tags && sweet.tags[0] && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-rose-600 border border-rose-100">
                          <Sparkles className="h-2 w-2 text-amber-500" />
                          <span>{sweet.tags[0]}</span>
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-[#8C6D62] line-clamp-2 max-w-2xl">
                      {sweet.description}
                    </p>

                    {/* Expandable ingredients trigger */}
                    {sweet.ingredients && sweet.ingredients.length > 0 && (
                      <div className="mt-2">
                        <button
                          id={`list-ing-toggle-${sweet.id}`}
                          onClick={() => toggleIngredients(sweet.id)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-[#DE8F80] hover:text-rose-600 transition-colors"
                        >
                          <Info className="h-3 w-3" />
                          <span>{isExpanded ? 'Ocultar ingredientes' : 'Ver ingredientes'}</span>
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-1.5 rounded-xl bg-[#FFFDFB] p-2.5 border border-amber-100/50 max-w-md">
                            <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-[#5D4037]">
                              {sweet.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="h-1 w-1 rounded-full bg-rose-400 shrink-0" />
                                  <span className="truncate">{ing}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Favorites trigger + Price info + Add button */}
                <div className="flex items-center justify-between gap-4 border-t border-rose-50/50 pt-3 sm:border-0 sm:pt-0 shrink-0">
                  
                  {/* Heart Like Button */}
                  <button
                    id={`list-fav-${sweet.id}`}
                    onClick={() => onToggleFavorite(sweet.id)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50/50 border border-orange-100/50 text-stone-600 transition-colors hover:bg-rose-50 hover:text-rose-500 active:scale-90"
                    title={isFav ? "Remover dos favoritos" : "Favoritar doce"}
                  >
                    <Heart className={`h-4.5 w-4.5 transition-all ${isFav ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-700'}`} />
                  </button>

                  <div className="text-right mr-2 sm:mr-0">
                    <span className="block text-[8px] uppercase tracking-wider text-stone-400 font-bold">Preço</span>
                    <span className="font-sans text-base font-black text-[#3D251E]">
                      R$ {sweet.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    id={`list-buy-${sweet.id}`}
                    onClick={() => handleAddToCart(sweet)}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95 ${
                      isAddedSuccessfully
                        ? 'bg-emerald-500 text-white shadow-emerald-100'
                        : 'bg-[#3D251E] text-white hover:bg-rose-600 hover:shadow shadow-xs'
                    }`}
                  >
                    {isAddedSuccessfully ? (
                      <>
                        <Check className="h-3.5 w-3.5 animate-bounce" />
                        <span>Adicionado</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" />
                        <span>Pedir</span>
                      </>
                    )}
                  </button>
                </div>

              </article>
            );
          })}
        </div>
      ) : (
        
        /* ——————————————————————————————————————————————————————————
           GORGEOUS DENSE GRID VIEW LAYOUT
           —————————————————————————————————————————————————————————— */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSweets.map((sweet) => {
            const isFav = favorites.includes(sweet.id);
            const isExpanded = !!expandedIngredients[sweet.id];
            const isAddedSuccessfully = addedAnimationId === sweet.id;

            return (
              <article
                key={sweet.id}
                className="group relative flex flex-col overflow-hidden rounded-2.5xl border border-rose-100 bg-[#FDFBF7] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image panel */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Heart Toggle */}
                  <button
                    id={`fav-btn-${sweet.id}`}
                    onClick={() => onToggleFavorite(sweet.id)}
                    className="absolute top-3 right-3 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-stone-600 transition-all hover:bg-white hover:text-rose-500 active:scale-90 shadow-sm"
                    title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <Heart className={`h-5 w-5 transition-all ${isFav ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-700'}`} />
                  </button>

                  {/* Weight label tag */}
                  {sweet.weight && (
                    <span className="absolute bottom-3 left-3 rounded-lg bg-[#3D251E]/75 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                      {sweet.weight}
                    </span>
                  )}

                  {/* Highlight tag e.g. "Mais Vendido" */}
                  {sweet.tags && sweet.tags[0] && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-lg bg-rose-500 px-2.5 py-1 text-[10px] font-black text-white uppercase tracking-wider shadow">
                      <Sparkles className="h-3 w-3 text-amber-200 animate-spin" />
                      <span>{sweet.tags[0]}</span>
                    </div>
                  )}
                </div>

                {/* Card contents info */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#3D251E] group-hover:text-rose-600 transition-colors">
                      {sweet.name}
                    </h3>
                    
                    <p className="mt-1 text-xs text-[#8C6D62] line-clamp-2 min-h-[2rem]">
                      {sweet.description}
                    </p>

                    {/* Expandable ingredients list */}
                    {sweet.ingredients && sweet.ingredients.length > 0 && (
                      <div className="mt-3 border-t border-rose-50 pt-2">
                        <button
                          id={`ingredients-toggle-${sweet.id}`}
                          onClick={() => toggleIngredients(sweet.id)}
                          className="flex items-center gap-1 text-[11px] font-bold text-rose-500/80 hover:text-rose-600 active:scale-95"
                        >
                          <Info className="h-3 w-3" />
                          <span>{isExpanded ? 'Ocultar Ingredientes' : 'Ver Ingredientes'}</span>
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3 animate-bounce" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-2 rounded-xl bg-[#FFFDFB] p-2.5 border border-amber-100/50">
                            <ul className="grid grid-cols-1 gap-1 text-[10.5px] text-[#5D4037]">
                              {sweet.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="h-1 w-1 rounded-full bg-rose-400 shrink-0" />
                                  <span className="truncate">{ing}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price and Cart Integration */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#F1E0DC] pt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-stone-400 font-bold">Valor</span>
                      <span className="font-sans text-xl font-black text-[#3D251E]">
                        R$ {sweet.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      id={`buy-btn-${sweet.id}`}
                      onClick={() => handleAddToCart(sweet)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all active:scale-95 ${
                        isAddedSuccessfully
                          ? 'bg-emerald-500 text-white shadow-emerald-200'
                          : 'bg-[#3D251E] text-white hover:bg-rose-600 hover:shadow shadow'
                      }`}
                    >
                      {isAddedSuccessfully ? (
                        <>
                          <Check className="h-3.5 w-3.5 animate-bounce" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Pedir Doce</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
