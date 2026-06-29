"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export function Step2({ onNext }: { onNext: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) refs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.some((d) => !d)) {
      setError("6 оронтой кодыг бүрэн оруулна уу.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      onNext();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-[20px] w-full"
    >
      <p className="text-base text-foreground">
        Таны имэйл хаягт илгээсэн баталгаажуулах нууц кодийг оруулана уу
      </p>

      <div className="flex gap-3 w-full justify-between">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            maxLength={1}
            inputMode="numeric"
            className="
              w-full aspect-square max-w-[72px]
              flex items-end justify-center
              text-center text-base font-medium leading-6
              rounded-md border border-input
              bg-background-secondary
              text-[var(--TextColor-Primary,#000)]
              focus:outline-none focus:ring-2 focus:ring-primary
              transition
            "
            style={{ height: 40 }}
          />
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        type="submit"
        variant="brandSecondary"
        className="w-full py-6 px-8 mt-[20px] text-base"
        disabled={loading}
      >
        {loading ? "Шалгаж байна..." : "Баталгаажуулах"}
      </Button>
    </form>
  );
}
