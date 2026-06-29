"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
type Step1Form = { email: string };

export function Step1({ onNext }: { onNext: (email: string) => void }) {
  const form = useForm<Step1Form>({
    mode: "onSubmit",
    defaultValues: { email: "" },
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: Step1Form) {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      onNext(values.email);
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
          Та бүртгэлтэй имэйл хаяг аа оруулана уу
        </p>

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Имэйл хаягаа оруулна уу.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Зөв имэйл хаяг оруулна уу.",
            },
          }}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="w-full text-base bg-background-secondary"
                  placeholder="Имэйл хаяг"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="brandSecondary"
          className="w-full py-6 px-8 mt-[20px] text-base"
          disabled={loading}
        >
          {loading ? "Илгээж байна..." : "Үргэлжлүүлэх"}
        </Button>
      </form>
    </Form>
  );
}
