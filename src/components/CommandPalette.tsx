import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CornerDownLeft, MessageSquare, Navigation, Search, Sparkles, X } from 'lucide-react';
import type { Product, SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { accentOf } from '../systems/theme';
import { useBodyScrollLock, useEscape } from '../hooks';

interface Command {
  id: string;
  label: string;
  hint: string;
  group: 'Systems' | 'Navigate' | 'Actions';
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  content: SiteContent;
  onSelectProduct: (product: Product) => void;
  onFocusSystem: (productId: string) => void;
  onOpenPlanner: (topic?: string) => void;
}

/**
 * ⌘K / Ctrl+K launcher. Gives the site the feel of a tool rather than a
 * brochure: jump to any system, section or action from the keyboard.
 */
export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  content,
  onSelectProduct,
  onFocusSystem,
  onOpenPlanner,
}) => {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useBodyScrollLock(open);
  useEscape(open, onClose);

  const commands = useMemo<Command[]>(() => {
    const systems: Command[] = content.products.items.map((product) => ({
      id: `system-${product.id}`,
      label: product.name,
      hint: product.tagline,
      group: 'Systems',
      icon: getIcon(product.iconName),
      color: accentOf(product.accent).hex,
      run: () => {
        onFocusSystem(product.id);
        onClose();
      },
    }));

    const navigation: Command[] = content.navigation.links.map((link) => ({
      id: `nav-${link.href}`,
      label: link.label,
      hint: `Jump to ${link.href}`,
      group: 'Navigate',
      icon: Navigation,
      run: () => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    }));

    const actions: Command[] = [
      {
        id: 'action-planner',
        label: 'Start a project brief',
        hint: 'Scope, timeline and budget in four steps',
        group: 'Actions',
        icon: Sparkles,
        run: () => {
          onOpenPlanner('Command palette');
          onClose();
        },
      },
      {
        id: 'action-whatsapp',
        label: 'Chat on WhatsApp',
        hint: content.cta.whatsappUrl.replace('https://', ''),
        group: 'Actions',
        icon: MessageSquare,
        run: () => {
          window.open(content.cta.whatsappUrl, '_blank', 'noopener');
          onClose();
        },
      },
      {
        id: 'action-specs',
        label: 'Open the flagship system spec',
        hint: content.products.items[0]?.name ?? 'Product details',
        group: 'Actions',
        icon: ArrowRight,
        run: () => {
          const first = content.products.items[0];
          if (first) onSelectProduct(first);
          onClose();
        },
      },
    ];

    return [...systems, ...navigation, ...actions];
  }, [content, onClose, onFocusSystem, onOpenPlanner, onSelectProduct]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return commands;
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(term) ||
        command.hint.toLowerCase().includes(term) ||
        command.group.toLowerCase().includes(term)
    );
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    setCursor((current) => Math.min(current, Math.max(0, results.length - 1)));
  }, [results.length]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor, open]);

  if (!open) return null;

  const grouped = results.reduce<Record<string, { command: Command; index: number }[]>>((acc, command, index) => {
    (acc[command.group] ||= []).push({ command, index });
    return acc;
  }, {});

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setCursor((c) => (c + 1) % Math.max(1, results.length));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(1, results.length));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      results[cursor]?.run();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#0F1D33] border border-white/10 shadow-2xl overflow-hidden animate-scale-in"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2.5 px-4 h-13 py-3 border-b border-white/10">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search systems, sections or actions…"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto custom-scrollbar p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-slate-500">
              Nothing matches “{query}”. Try “pharmacy”, “POS” or “contact”.
            </p>
          )}

          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="mb-1.5">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {group}
              </div>
              {items.map(({ command, index }) => {
                const Icon = command.icon;
                const active = index === cursor;
                return (
                  <button
                    key={command.id}
                    type="button"
                    data-index={index}
                    onMouseEnter={() => setCursor(index)}
                    onClick={command.run}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                      active ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-lg grid place-items-center shrink-0"
                      style={{
                        backgroundColor: command.color ? `${command.color}22` : 'rgba(255,255,255,0.06)',
                        color: command.color ?? '#94a3b8',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-semibold text-white truncate">{command.label}</span>
                      <span className="block text-[11px] text-slate-500 truncate">{command.hint}</span>
                    </span>
                    {active && <CornerDownLeft className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="px-4 py-2 border-t border-white/10 flex items-center gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">↵</kbd> open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">esc</kbd> close
          </span>
          <span className="ml-auto">{results.length} results</span>
        </div>
      </div>
    </div>
  );
};
