"use client";
import React, { useEffect, useState } from "react";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ConnectButton from "./ConnectButton";
import Defisale from "../app/Defisale.png"
const Navbar = () => {
  return (
    <nav className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <div className="border-b border-gray-200 px-5 flex items-center gap-5 justify-between">
          <div className="flex h-16 items-center cursor-pointer text-2xl font-bold">
            {/* TODO : Mobile nav */}
            <Link className= "flex items-center" href="/"><Image src={Defisale} width= {100} height = {100} alt="Defisale"/> DefiSale</Link>
          </div>
          <div className="font-semibold">
            <ul className="cursor-pointer flex gap-2">
              <li className="mr-5">
                <Link href="/">Home </Link>
              </li>
              <li className="mr-5">
                <Link href="/createtoken">Create Token</Link>
              </li>
              {/* <li className="mr-5">
                <Link href="/createEvent">Create Event </Link>
              </li>
              <li className="mr-5">
                <Link href="/myTickets">My Tickets</Link>
              </li> */}
            </ul>
          </div>

          <ConnectButton/>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;