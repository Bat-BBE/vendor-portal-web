"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";

type Step3Form = { password: string; confirm: string };

type Rule = {
  label: string;
  test: (password: string, confirm: string) => boolean;
};

const rules: Rule[] = [
  {
    label: "Үсэг, тоо, тусгай тэмдэгт агуулсан байх",
    test: (p) =>
      /[A-Za-z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p),
  },
  {
    label: "8 дээш тэмдэгт байх",
    test: (p) => p.length >= 8,
  },
  {
    label: "Нууц үг давталт таарч байх",
    test: (p, c) => !!c && p === c,
  },
];

export function Step3({ onDone }: { onDone: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<Step3Form>({
    mode: "onChange",
    defaultValues: { password: "", confirm: "" },
  });

  const password = form.watch("password");
  const confirm = form.watch("confirm");

  const allValid = rules.every((r) => r.test(password, confirm));

  async function onSubmit() {
    if (!allValid) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      onDone();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-[20px] w-full"
      >
        <p className="text-base text-foreground">
          Шинэ нэвтрэх нууц үг үүсгэнэ үү
        </p>

        {/* Нууц үг */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="relative">
                <FormControl>
                  <Input
                    className="text-base bg-background-secondary"
                    type={showPassword ? "text" : "password"}
                    placeholder="Нууц үг"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="relative">
                <FormControl>
                  <Input
                    className="text-base bg-background-secondary"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Нууц үг давтах"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2 w-full">
          {rules.map((rule) => {
            const passed = rule.test(password, confirm);
            return (
              <div key={rule.label} className="flex items-center gap-2">
                {passed ? (
                  <CheckCircle2
                    size={19}
                    className="bg-primary text-white shrink-0 rounded-full"
                  />
                ) : (
                  <Circle
                    size={18}
                    className="bg-white text-muted-foreground shrink-0"
                  />
                )}
                <span
                  className={`text-sm transition-colors ${
                    passed ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {rule.label}
                </span>
              </div>
            );
          })}
        </div>

        <Button
          type="submit"
          variant="brandSecondary"
          className="w-full py-6 px-8 mt-[20px] text-base"
          disabled={loading || !allValid}
          onClick={onDone}
        >
          {loading ? "Хадгалж байна..." : "Нэвтрэх"}
        </Button>
      </form>
    </Form>
  );
}
