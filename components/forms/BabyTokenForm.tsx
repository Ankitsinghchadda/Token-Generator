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
import DefisaleABI from "../../constants/ABI/DefisaleReward.json";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Token name cannot be blank",
  }),
  symbol: z.string().min(2, {
    message: "Token Symbol is a required field.",
  }),
  totalsupply: z.string().min(2, {
    message: "Total Supply is a required field.",
  }),
  router: z.enum(["Pancakeswap"]),
  reward_token: z
    .string()
    .refine((value) => /^0x[a-fA-F0-9]{40}$/.test(value), {
      message: "Invalid Address",
    }),
  token_balance_dividends: z.string().min(2, {
    message: "Minium token balance for dividends is a requried field.",
  }),
  token_reward_fee: z.string().refine((value)=> parseInt(value) >= 0 && parseInt(value) <=100, {
    message: "Token reward fee should be between 0-100",
  }),
  auto_add_liquidity: z.string().refine((value)=> parseInt(value) >= 0 && parseInt(value) <=100, {
    message: "Auto add liquidity should be between 0-100",
  }),
  marketing_fee: z.string().refine((value)=> parseInt(value) >= 0 && parseInt(value) <=100, {
    message : "Market Fee should be between 0-100"
  }),
  marketing_wallet: z
    .string()
    .refine((value) => /^0x[a-fA-F0-9]{40}$/.test(value), {
      message: "Invalid Address",
    }),
});

const BabyTokenForm = () => {
  // 0x1e671729D9A12bBE673971f9331AaCA9A2b131b1
  const { address, isConnected } = useAccount();
  const { data, error, isLoading, isError, isSuccess, write } =
    useContractWrite({
      abi: DefisaleABI,
      address: "0x1e671729D9A12bBE673971f9331AaCA9A2b131b1",
      functionName: "createBabyToken",
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
      token_balance_dividends: "",
      token_reward_fee: "",
      auto_add_liquidity: "",
      marketing_fee: "",
      marketing_wallet: "",
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
      args: [values.name, values.symbol, BigInt(parseInt(values.totalsupply)), [values.reward_token, "0x10ED43C718714eb63d5aA57B78B54704E256024E", values.marketing_wallet, ""], [values.token_reward_fee, values.auto_add_liquidity, values.marketing_fee], 0],
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
            name="token_balance_dividends"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum token balance for dividends</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 100000000" {...field} />
                </FormControl>
                <FormDescription>
                  Min hold each wallet must be over $50 to receive rewards.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="token_reward_fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token reward fee (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0-100" type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="auto_add_liquidity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Auto add liquidity (%)</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0-100" type="number" min={0} {...field} />
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
                  <Input placeholder="ex- 0-100" type="number" min={0} {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marketing_wallet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marketing wallet</FormLabel>
                <FormControl>
                  <Input placeholder="ex- 0x324..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create Baby Token</Button>
      </form>
    </Form>
  );
};

export default BabyTokenForm;
