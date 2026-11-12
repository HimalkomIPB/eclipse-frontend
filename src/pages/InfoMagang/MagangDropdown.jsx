import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function MagangDropdown({
  label,
  value,
  options,
  onChange,
  placeholder = 'Pilih...',
  isOpen,
  onToggle,
  onClose,
}) {
  const dropdownRef = useRef(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const selectedOption = options.find(opt => String(opt.value) === String(value));
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onCloseRef.current?.();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [isOpen]);

  const panelVariants = {
    hidden: { opacity: 0, y: -6, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, transition: { duration: 0.08 } },
  };

  const panelTransition = {
    type: 'spring',
    stiffness: 440,
    damping: 34,
    mass: 0.8,
  };

  return (
    <div className={`relative w-full ${isOpen ? 'z-40' : 'z-10'}`} ref={dropdownRef}>
      <span className="mb-2 block font-medium text-white">{label}</span>
      <button
        type="button"
        onClick={() => onToggle?.(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-white/20 bg-[#123149] px-4 py-3 text-base text-white transition-colors duration-200 hover:border-white/40 focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate" title={displayLabel}>{displayLabel}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-white/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={panelTransition}
            className="absolute left-0 top-full z-50 mt-2 w-full border border-white/15 bg-[linear-gradient(180deg,rgba(19,54,79,0.98)_0%,rgba(13,39,59,0.96)_100%)] shadow-[0_18px_36px_rgba(3,14,26,0.38)] backdrop-blur-xl"
            style={{ borderRadius: '0.875rem' }}
            role="listbox"
          >
            {/* Scrollable container with visible elegant custom scrollbar */}
            <div className="max-h-60 overflow-y-auto rounded-[0.875rem] dropdown-scroll pr-1">
              <div className="p-1.5">
                {options.map((option) => {
                  const isSelected = String(option.value) === String(value);
                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      onPointerDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={() => {
                        onChange(option.value);
                        onCloseRef.current?.();
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm leading-snug transition-colors duration-100 hover:bg-white/10 hover:text-white ${
                        isSelected
                          ? 'bg-white/10 font-semibold text-white'
                          : 'font-normal text-white/85'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className="truncate" title={option.label}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
