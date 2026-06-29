"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

const FormFieldContext = React.createContext<{ name: string } | null>(null);

type FormProps<TFieldValues extends FieldValues> = React.PropsWithChildren<
  UseFormReturn<TFieldValues>
>;

function Form<TFieldValues extends FieldValues>({
  children,
  ...form
}: FormProps<TFieldValues>) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: String(name) }}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
}

function FormItem({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

function FormControl({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

function FormMessage({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const form = useFormContext();
  const fieldContext = React.useContext(FormFieldContext);

  if (!fieldContext) {
    return null;
  }

  const fieldError =
    form.formState.errors[
      fieldContext.name as keyof typeof form.formState.errors
    ];

  if (!fieldError?.message) {
    return null;
  }

  return (
    <p
      className={["mt-1 text-xs text-destructive", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {String(fieldError.message)}
    </p>
  );
}

export { Form, FormControl, FormField, FormItem, FormMessage };
