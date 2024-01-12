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
import DefisaleABI from "../../constants/ABI/DefisaleReward2.json";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Token name cannot be blank",
  }),
  symbol: z.string().min(2, {
    message: "Token Symbol is a requried field.",
  }),

  totalsupply: z.string().min(2, {
    message: "Totalsupply is a requried field.",
  }),
  router: z.enum(["Pancakeswap"]),
  reward_token: z
    .string()
    .refine((value) => /^0x[a-fA-F0-9]{40}$/.test(value), {
      message: "Invalid Address",
    }),
  liquidity_fee: z.string().refine((value)=> parseInt(value) >= 0 && parseInt(value) <=100, {
    message: "liquidity_fee should be between 0-100.",
  }),
  buyback_fee: z.string().refine((value)=> parseInt(value) >= 0 && parseInt(value) <=100, {
    message: "Invalid buyback fee",
  }),
  reflection_fee: z.string().refine((value)=> parseInt(value) >= 0 && parseInt(value) <=100, {
    message: "Invalid reflection fee",
  }),
  marketing_fee: z.string().refine((value)=> parseInt(value) >= 0 && parseInt(value) <=100, {
    message: "Marketing fee should be between 0-100",
  }),
});

const BuyBackBabyTokenForm = () => {
  // 0x6e224bb4b17b65845E2D4190920a40DBB1D1c444
  const { address, isConnected } = useAccount();
  const { data, error, isLoading, isError, isSuccess, write } =
    useContractWrite({
      abi: DefisaleABI,
      address: "0x6e224bb4b17b65845E2D4190920a40DBB1D1c444",
      functionName: "createBuybackBabyToken",
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
      reward_token: "",
      liquidity_fee: "",
      buyback_fee: "",
      reflection_fee: "",
      marketing_fee: "",
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
      args: [values.name, values.symbol, BigInt(parseInt(values.totalsupply)), values.reward_token, [values.liquidity_fee, values.buyback_fee, values.reflection_fee, values.marketing_fee, 10]],
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
                  <Input placeholder="ex- 100000000" {...field} />
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
            name="reward_token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reward token</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0x2342...." {...field} />
                </FormControl>
                <FormDescription>
                  If you want to reward DOGE, please enter
                  0xba2ae424d960c26247dd6c32edc70b295c744c43.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="liquidity_fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liquidity Fee (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0-100" type="number" min={0}  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buyback_fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buyback Fee (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0-100" type="number" min={0}  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reflection_fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reflection Fee (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0-100" type="number" min={0}  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marketing_fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marketing fee (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0-100" type="number" min={0}  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create Buyback Baby Token</Button>
      </form>
    </Form>
  );
};

export default BuyBackBabyTokenForm;
