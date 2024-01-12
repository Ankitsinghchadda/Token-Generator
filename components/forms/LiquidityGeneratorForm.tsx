"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useContractWrite, useAccount, useNetwork } from "wagmi";
import DefisaleABI from "../../constants/ABI/DEFIsale.json";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Token Name cannot be blank",
  }),
  symbol: z.string().min(2, {
    message: "Token Symbol is a required field",
  }),
  totalsupply: z.string().min(2, {
    message: "Total Supply is a required field",
  }),
  router: z.enum(["Pancakeswap"]),
  transaction_fee_generate_yield: z
    .string()
    .refine((value) => parseInt(value) >= 0 && parseInt(value) <= 100, {
      message: "TaxFeeBps should be between 0-100",
    }),
  transaction_fee_generate_liquidity: z
    .string()
    .refine((value) => parseInt(value) >= 0 && parseInt(value) <= 100, {
      message: "LiquidityFeeBps should be between 0-100",
    }),
  charity_address: z.string().optional(),
  charity_percentage: z.string().optional(),
});

const LiquidityGeneratorForm = () => {
  const { address, isConnected } = useAccount();
  const { data, error, isLoading, isError, isSuccess, write } =
    useContractWrite({
      abi: DefisaleABI,
      address: "0xB151df492385adF6C7885F04A77e3400bDffa4Ad",
      functionName: "createLiquiditityGeneratorToken",
      onSuccess: (data) => {
        console.log(data);

        alert(`https://bscscan.com/tx/${data.hash}`);
      },
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      totalsupply: "",
      router: "Pancakeswap",
      transaction_fee_generate_yield: "",
      transaction_fee_generate_liquidity: "",
      charity_address: "",
      charity_percentage: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (!isConnected) {
      alert("Please connect your wallet.");
    }

    write({
      args: [values.name, values.symbol, BigInt(parseInt(values.totalsupply)), values.charity_address,  values.transaction_fee_generate_yield, values.transaction_fee_generate_liquidity, values.charity_percentage],
      value: BigInt("70000000000000000"),
    });

    setTimeout(() => {
      form.reset();
    }, 2000);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="ex- Ethereum" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symbol</FormLabel>
                <FormControl>
                  <Input placeholder="ex- Eth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalsupply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Supply</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 100000000" type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="router"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Router</FormLabel>
                <Select
                  onValueChange={(value) => {
                    console.log(value);
                  }}
                  defaultValue={"Pancakeswap"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Router Exchange" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pancakeswap">Pancakeswap</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transaction_fee_generate_yield"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction fee to generate yield (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 1" type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transaction_fee_generate_liquidity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction fee to generate liquidity (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 1" type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="charity_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Charity/Marketing address</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0x3231....." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="charity_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Charity/Marketing percent (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0-25" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create Liquidity Generator Token</Button>
      </form>
    </Form>
  );
};

export default LiquidityGeneratorForm;
