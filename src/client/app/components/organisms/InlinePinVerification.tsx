"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { useI18n } from '../../providers/I18nProvider';

const SLOT_COUNT = 6;

export default function InlinePinVerification() {
  const { t } = useI18n();
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(SLOT_COUNT).fill(null));
  const [digits, setDigits] = useState<string[]>(Array(SLOT_COUNT).fill(''));
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const focusSlot = useCallback((index: number) => {
    if (index >= 0 && index < SLOT_COUNT) {
      inputRefs.current[index]?.focus();
      setActiveIndex(index);
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    if (!digit) return;
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    if (index < SLOT_COUNT - 1) {
      focusSlot(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      } else if (index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        focusSlot(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusSlot(index - 1);
    } else if (e.key === 'ArrowRight' && index < SLOT_COUNT - 1) {
      focusSlot(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, SLOT_COUNT);
    if (pasted) {
      const newDigits = pasted.split('');
      while (newDigits.length < SLOT_COUNT) newDigits.push('');
      setDigits(newDigits);
      focusSlot(Math.min(pasted.length, SLOT_COUNT - 1));
    }
  };

  const handleVerify = () => {
    const pin = digits.join('');
    if (pin.length !== SLOT_COUNT) return;
    console.log('Verifying PIN:', pin);
  };

  const handleClear = () => {
    setDigits(Array(SLOT_COUNT).fill(''));
    focusSlot(0);
  };

  const pinCode = digits.join('');

  return (
    <div className="bg-[#F8EFE6] dark:bg-transparent flex items-center justify-center w-full">
      <div className="flex max-w-[896px] flex-col items-center gap-8 w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="text-[#000] dark:text-neutral-100 font-inter text-[32px] font-bold leading-10 tracking-[0.125em] text-center">
            {t('verification.page_title')}
          </h1>
        </div>

        <div className="flex p-8 flex-col items-start rounded-xl border border-[#E8E2D5] dark:border-neutral-700 bg-white dark:bg-neutral-800 w-full shadow-[0_10px_30px_-5px_rgba(26,46,68,0.06)] dark:shadow-none">
          <div className="flex py-8 px-0 flex-col items-center w-full">
            <div className="flex pb-8 flex-col items-start w-fit">
              <p className="text-[#43474D] dark:text-neutral-400 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.2em]">
                {t('verification.enter_code_label')}
              </p>
            </div>

            <div className="flex pb-12 flex-col items-start w-fit" onPaste={handlePaste}>
              <div className="flex items-start gap-4 w-fit">
                {digits.slice(0, 3).map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onFocus={() => setActiveIndex(i)}
                    onBlur={() => setActiveIndex(-1)}
                    autoComplete="one-time-code"
                    className={`w-16 h-20 rounded-lg border-2 text-center text-2xl font-mono font-bold outline-none transition-colors
                      ${activeIndex === i
                        ? 'border-amber-500 dark:border-amber-400 ring-1 ring-amber-500'
                        : 'border-[#E8E2D5] dark:border-neutral-600'
                      }
                      bg-[#FEF9EF] dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100
                      [&::-webkit-inner-spin-button]:appearance-none
                      [&::-webkit-outer-spin-button]:appearance-none
                    `}
                    aria-label={`Digit ${i + 1}`}
                  />
                ))}
                <div className="w-4" />
                {digits.slice(3).map((d, i) => {
                  const idx = i + 3;
                  return (
                    <input
                      key={idx}
                      ref={(el) => { inputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      onFocus={() => setActiveIndex(idx)}
                      onBlur={() => setActiveIndex(-1)}
                      autoComplete="one-time-code"
                      className={`w-16 h-20 rounded-lg border-2 text-center text-2xl font-mono font-bold outline-none transition-colors
                        ${activeIndex === idx
                          ? 'border-amber-500 dark:border-amber-400 ring-1 ring-amber-500'
                          : 'border-[#E8E2D5] dark:border-neutral-600'
                        }
                        bg-[#FEF9EF] dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100
                        [&::-webkit-inner-spin-button]:appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                      `}
                      aria-label={`Digit ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center items-start gap-4 w-full">
              <button
                onClick={handleVerify}
                disabled={pinCode.length !== SLOT_COUNT}
                className="cursor-pointer flex py-3 px-12 items-center gap-2 rounded-full bg-black dark:bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex flex-col items-center">
                  <path d="M4.05417 7.90417L7.35 4.60833L6.51875 3.77708L4.05417 6.24167L2.82917 5.01667L1.99792 5.84792L4.05417 7.90417ZM4.66667 11.6667C3.31528 11.3264 2.19965 10.551 1.31979 9.34062C0.439931 8.13021 0 6.78611 0 5.30833V1.75L4.66667 0L9.33333 1.75V5.30833C9.33333 6.78611 8.8934 8.13021 8.01354 9.34062C7.13368 10.551 6.01806 11.3264 4.66667 11.6667ZM4.66667 10.4417C5.67778 10.1208 6.51389 9.47917 7.175 8.51667C7.83611 7.55417 8.16667 6.48472 8.16667 5.30833V2.55208L4.66667 1.23958L1.16667 2.55208V5.30833C1.16667 6.48472 1.49722 7.55417 2.15833 8.51667C2.81944 9.47917 3.65556 10.1208 4.66667 10.4417Z" fill="white" className="dark:fill-black" />
                </svg>
                <span className="text-white dark:text-black font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.1em]">
                  {t('verification.verify_button')}
                </span>
              </button>

              <button
                onClick={handleClear}
                className="cursor-pointer flex py-3.5 px-8 flex-col justify-center items-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <span className="text-[#43474D] dark:text-neutral-300 font-hankenGrotesk text-xs font-bold leading-4 tracking-[0.1em]">
                  {t('verification.clear_button')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
