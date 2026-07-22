"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

type LoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginForm>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  });

  async function onSubmit(values: LoginForm) {
    void values;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/assets/login_back.jpg"
        alt="bg"
        fill
        className="object-cover"
      />

      <div className="relative z-10 w-full flex justify-center px-4">
        <div
          className="
            w-full
            max-w-[640px]
            rounded-xl
            border border-brand-50
            bg-background
            shadow-md
            px-8 py-10
            md:px-16 md:py-12
            lg:px-[120px] lg:py-[60px]
            flex flex-col gap-10
            "
        >
          <Image
            src="/assets/monos_logo.png"
            alt="logo"
            width={140}
            height={40}
            className="flex-1"
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-start gap-[20px] w-full"
            >
              <p className="text-base text-foreground">
                Та нэвтрэх нэр, нууц үгээ оруулна уу.
              </p>
              <FormField
                control={form.control}
                name="username"
                rules={{
                  required: "Нэвтрэх нэрээ оруулна уу.",
                }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        className="w-full text-base bg-background-secondary"
                        placeholder="Нэвтрэх нэр"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Нууц үгээ оруулна уу.",
                  minLength: {
                    value: 8,
                    message: "Нууц үг хамгийн багадаа 8 тэмдэгт байна.",
                  },
                }}
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
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <div className="w-full flex items-center justify-between gap-[12px]">
                    <label className="flex items-center gap-3">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="
                            border-primary
                            data-[state=unchecked]:bg-background-secondary
                            data-[state=checked]:bg-primary
                            data-[state=checked]:border-primary
                            data-[state=checked]:text-white
                        "
                      />
                      <span className="text-sm">Сануулах</span>
                    </label>

                    <a
                      href="/forgot-password"
                      className="text-sm font-bold hover:underline"
                    >
                      Нууц үг мартсан
                    </a>
                  </div>
                )}
              />

              <Button
                type="submit"
                variant="brandSecondary"
                className="w-full py-6 px-8 mt-[20px] text-base"
                disabled={loading}
              >
                {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
