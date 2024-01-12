import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <>
    <MaxWidthWrapper>
  <div className='py-20 mx-auto text-center flex flex-col gap-8 items-center max-w-3xl'>
    <h1 className='text-4xl font-bold  text-gray-900 sm:text-6xl'>
    Fueling the future of Web3. Build your own crypto asset. {' '}
      <span className='text-blue-600 '>
      Token Generator
      </span>

    </h1>
    <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
    Token Generator is your canvas, your catalyst, your passport to the decentralized future. We provide the tools, the security, the seamless experience you need to turn your wildest token dreams into reality.
    </p>
    <div className='flex flex-col sm:flex-row gap-4 mt-6'>
      <Link
        href='/createtoken'
        className={buttonVariants()}>
        Create Your Token Now &rarr;
      </Link>
    </div>
  </div>
</MaxWidthWrapper>
</>
  )
}
