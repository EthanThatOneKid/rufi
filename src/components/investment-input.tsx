"use client";

import { useState } from "react";
import Image from "next/image";
import { Cake } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Investment } from "@/lib/types";

interface Showcase {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageSrc: string;
  website: string;
  impact: string;
}

const charities: Showcase[] = [
  {
    id: "1",
    title: "Ocean Cleanup",
    description:
      "Developing advanced technologies to rid the world's oceans of plastic.",
    longDescription:
      "The Ocean Cleanup is a non-profit organization developing advanced technologies to rid the world's oceans of plastic. By utilizing the ocean currents to our advantage, our passive drifting systems are estimated to clean up half the Great Pacific Garbage Patch in just five years' time.",
    imageSrc: "https://picsum.photos/400/300?random=1",
    website: "https://theoceancleanup.com/",
    impact: "Removed over 100,000 kg of plastic from the oceans",
  },
  {
    id: "2",
    title: "Doctors Without Borders",
    description:
      "International humanitarian medical non-governmental organisation.",
    longDescription:
      "Doctors Without Borders (MSF) works in conflict zones and countries affected by endemic diseases. They provide assistance to people who do not have access to health care, clean water or food. MSF's actions are guided by medical ethics and the principles of impartiality, independence and neutrality.",
    imageSrc: "https://picsum.photos/400/300?random=2",
    website: "https://www.doctorswithoutborders.org/",
    impact: "Provided medical assistance in over 70 countries",
  },
  {
    id: "3",
    title: "World Wildlife Fund",
    description:
      "International NGO working on wilderness preservation and reducing human impact on the environment.",
    longDescription:
      "For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.",
    imageSrc: "https://picsum.photos/400/300?random=3",
    website: "https://www.worldwildlife.org/",
    impact: "Protected millions of acres of vital habitat worldwide",
  },
];

const cryptocurrencies: Showcase[] = [
  {
    id: "1",
    title: "Bitcoin",
    description: "The first decentralized digital currency.",
    longDescription:
      "Bitcoin is a decentralized digital currency that operates without a central authority or banks. It was created by an anonymous person or group of people under the pseudonym Satoshi Nakamoto in 2008. Bitcoin enables peer-to-peer transactions on the Bitcoin network, a highly secure and decentralized blockchain. It is known for its finite supply of 21 million coins, making it a deflationary asset and store of value.",
    imageSrc: "/bitcoin.jpg",
    website: "https://bitcoin.org/",
    impact:
      "Popularized the concept of decentralized finance (DeFi) and store of value.",
  },
  {
    id: "2",
    title: "Ethereum",
    description:
      "Blockchain platform for smart contracts and decentralized applications.",
    longDescription:
      "Ethereum is a decentralized, open-source blockchain system that features smart contract functionality. Created by Vitalik Buterin in 2015, it allows developers to build decentralized applications (DApps) on its blockchain. Ethereum’s native cryptocurrency, Ether (ETH), is the second-largest cryptocurrency by market capitalization. Ethereum 2.0 is an upgrade designed to improve the network's scalability, security, and sustainability.",
    imageSrc: "/etherium.jpg",
    website: "https://ethereum.org/",
    impact:
      "Pioneered the use of smart contracts and decentralized applications (DApps).",
  },
  {
    id: "3",
    title: "Solana",
    description:
      "High-performance blockchain for decentralized applications and crypto assets.",
    longDescription:
      "Solana is a blockchain platform designed for high-performance decentralized applications (DApps) and crypto assets. Founded by Anatoly Yakovenko in 2017, Solana’s network uses a unique consensus mechanism called Proof of History (PoH), which allows it to process thousands of transactions per second with low fees. Solana has become popular for DeFi applications, NFTs, and gaming.",
    imageSrc: "/Solana.png",
    website: "https://solana.com/",
    impact:
      "Enabled high-speed, low-cost transactions, supporting the growth of DeFi and NFTs.",
  },
];

function CharityCard({
  charity,
  isSelected,
  onSelect,
}: {
  charity: Showcase;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      onClick={onSelect}
      className={`flex flex-col overflow-hidden transition-all duration-300 transform 
      ${
        isSelected
          ? "border-4 border-blue-500 scale-105"
          : "hover:shadow-lg hover:-translate-y-1"
      } cursor-pointer`}
    >
      <div className="relative h-48 overflow-hidden group">
        <Image
          src={charity.imageSrc}
          alt={charity.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {charity.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{charity.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{charity.impact}</span>
      </CardFooter>
    </Card>
  );
}

export interface InvestmentInputProps {
  onChange: (investment: Investment) => void;
}

export default function InvestmentInput(props: InvestmentInputProps) {
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    type: "charity" | "crypto";
  } | null>(null);

  // Function to handle selection and delay the alert
  const handleSelect = (id: string, type: "charity" | "crypto") => {
    setSelectedItem({ id, type });
    const selected =
      type === "charity"
        ? charities.find((charity) => charity.id === id)
        : cryptocurrencies.find((crypto) => crypto.id === id);

    setTimeout(() => {
      props.onChange({
        id: selected!.id,
        title: selected!.title,
        percentage: 0,
        color: "yellow",
        icon: <Cake />,
      });
    }, 300); // Delay alert by 300ms to allow border change
  };

  return (
    <>
      {/* Charity Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Charities We Support
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <CharityCard
              key={charity.id}
              charity={charity}
              isSelected={
                selectedItem?.id === charity.id &&
                selectedItem?.type === "charity"
              }
              onSelect={() => handleSelect(charity.id, "charity")}
            />
          ))}
        </div>
      </div>

      {/* Cryptocurrency Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Cryptocurrency</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cryptocurrencies.map((crypto) => (
            <CharityCard
              key={crypto.id}
              charity={crypto}
              isSelected={
                selectedItem?.id === crypto.id &&
                selectedItem?.type === "crypto"
              }
              onSelect={() => handleSelect(crypto.id, "crypto")}
            />
          ))}
        </div>
      </div>
    </>
  );
}
