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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContractWrite, useAccount, useNetwork} from "wagmi";
import DefisaleABI from "../../constants/ABI/DEFIsale.json";

const formSchema = z.object({
  tokenType: z.enum([
    "StandardToken",
    "LiquidityGeneratorToken",
    "BabyToken",
    "BuyBackBabyToken",
  ]),
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  symbol: z.string().min(2, {
    message: "symbol must be at least 2 characters.",
  }),
  decimal: z.string().min(2, {
    message: "decimal must be at least 2 characters.",
  }),
  totalsupply: z.string().min(2, {
    message: "totalsupply must be at least 2 characters.",
  }),
});

const StandardTokenForm = () => {
  const { address, isConnected } = useAccount();
  const { data, error, isLoading, isError, isSuccess, write } =
    useContractWrite({
      abi: DefisaleABI,
      address: "0xB151df492385adF6C7885F04A77e3400bDffa4Ad",
      functionName: "createStandardToken",
      onSuccess: (data) => {
        console.log(data);

        alert(`https://bscscan.com/tx/${data.hash}`);
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenType: "StandardToken",
      name: "",
      symbol: "",
      decimal: "",
      totalsupply: "",
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
      args: [
        values.name,
        values.symbol,
        values.decimal,
        BigInt(parseInt(values.totalsupply)) *
          BigInt(10 ** parseInt(values.decimal)),
      ],
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
            name="decimal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Decimal</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 18" type="number" min={0}{...field} />
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
        </div>

        {isLoading ? (
          <Button disabled>Please wait</Button>
        ) : (
          <Button  type="submit">
            Create Standard Token
          </Button>
        )}
      </form>
    </Form>
  );
};

export default StandardTokenForm;
