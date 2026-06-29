"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  function handleDone() {
    router.push("/dashboard");
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
          <div className="flex items-center justify-between">
            <Image
              src="/assets/monos_logo.png"
              alt="logo"
              width={140}
              height={40}
            />
          </div>

          {step === 1 && (
            <Step1
              onNext={() => {
                setStep(2);
              }}
            />
          )}
          {step === 2 && <Step2 onNext={() => setStep(3)} />}
          {step === 3 && <Step3 onDone={handleDone} />}
        </div>
      </div>
    </div>
  );
}
