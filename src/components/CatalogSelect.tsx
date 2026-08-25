'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface CatalogSelectOption {
  value: string;
  label: string;
}

interface CatalogSelectProps {
  label: string;
  value: string;
  options: CatalogSelectOption[];
  onChange: (value: string) => void;
}

export const CatalogSelect: React.FC<CatalogSelectProps> = ({
  label,
  value,
  options,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = useId();
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const selectedOption = options[selectedIndex] || options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => optionRefs.current[selectedIndex]?.focus());
  }, [isOpen, selectedIndex]);

  const selectOption = (option: CatalogSelectOption) => {
    onChange(option.value);
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusedIndex = optionRefs.current.findIndex((option) => option === document.activeElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (focusedIndex + direction + options.length) % options.length;
      optionRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="catalog-select" ref={rootRef}>
      <span className="filter-label">{label}</span>
      <button
        ref={triggerRef}
        type="button"
        className={`catalog-select-trigger ${isOpen ? 'open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown size={17} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          className="catalog-select-menu"
          role="listbox"
          aria-label={label}
          onKeyDown={handleMenuKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value || 'all'}
                ref={(element) => { optionRefs.current[index] = element; }}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`catalog-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => selectOption(option)}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
