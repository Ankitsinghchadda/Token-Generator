"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import StandardTokenForm from "./forms/StandardTokenForm";
import LiquidityGeneratorForm from "./forms/LiquidityGeneratorForm";
import BabyTokenForm from "./forms/BabyTokenForm";
import BuyBackBabyTokenForm from "./forms/BuyBackBabyTokenForm";

const formSchema = z.object({
  tokenType: z.enum(["StandardToken", "LiquidityGeneratorToken", "BabyToken", "BuyBackBabyToken"])
});

export function TokenForm() {
  const [tokenType, setTokenType] = useState("StandardToken");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenType: "StandardToken",
    },
  });

  return (
    <>
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="tokenType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  setTokenType(value);
                }}
                defaultValue={"StandardToken"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Token Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="StandardToken">Standard Token</SelectItem>
                  <SelectItem value="LiquidityGeneratorToken">Liquidity Generator Token</SelectItem>
                  <SelectItem value="BabyToken">Baby Token</SelectItem>
                  <SelectItem value="BuyBackBabyToken">Buy Back Baby Token</SelectItem>

                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
        {tokenType == 'StandardToken' && <StandardTokenForm/>}
        {tokenType == 'LiquidityGeneratorToken' && <LiquidityGeneratorForm/>}
        {tokenType == 'BabyToken' && <BabyTokenForm/>}
        {tokenType == 'BuyBackBabyToken' && <BuyBackBabyTokenForm/>}
    </>
  );
}
