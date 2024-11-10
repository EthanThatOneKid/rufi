"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

interface Showcase {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  images: string[];
  website: string;
  impact: string;
}

const charities: Showcase[] = [
  {
    id: 1,
    name: "Ocean Cleanup",
    description:
      "Developing advanced technologies to rid the world's oceans of plastic.",
    longDescription:
      "The Ocean Cleanup is a non-profit organization developing advanced technologies to rid the world's oceans of plastic. By utilizing the ocean currents to our advantage, our passive drifting systems are estimated to clean up half the Great Pacific Garbage Patch in just five years' time.",
    images: [
      "https://picsum.photos/400/300?random=1",
      "https://picsum.photos/400/300?random=2",
      "https://picsum.photos/400/300?random=3",
    ],

    website: "https://theoceancleanup.com/",
    impact: "Removed over 100,000 kg of plastic from the oceans",
  },
  {
    id: 2,
    name: "Doctors Without Borders",
    description:
      "International humanitarian medical non-governmental organisation.",
    longDescription:
      "Doctors Without Borders (MSF) works in conflict zones and countries affected by endemic diseases. They provide assistance to people who do not have access to health care, clean water or food. MSF's actions are guided by medical ethics and the principles of impartiality, independence and neutrality.",
    images: [
      "https://picsum.photos/400/300?random=4",
      "https://picsum.photos/400/300?random=5",
      "https://picsum.photos/400/300?random=6",
    ],
    website: "https://www.doctorswithoutborders.org/",
    impact: "Provided medical assistance in over 70 countries",
  },
  {
    id: 3,
    name: "World Wildlife Fund",
    description:
      "International NGO working on wilderness preservation and reducing human impact on the environment.",
    longDescription:
      "For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.",
    images: [
      "https://picsum.photos/400/300?random=7",
      "https://picsum.photos/400/300?random=8",
      "https://picsum.photos/400/300?random=9",
    ],
    website: "https://www.worldwildlife.org/",
    impact: "Protected millions of acres of vital habitat worldwide",
  },
];

const cryptocurrencies: Showcase[] = [
  {
    id: 1,
    name: "Bitcoin",
    description: "The first decentralized digital currency.",
    longDescription:
      "Bitcoin is a decentralized digital currency that operates without a central authority or banks. It was created by an anonymous person or group of people under the pseudonym Satoshi Nakamoto in 2008. Bitcoin enables peer-to-peer transactions on the Bitcoin network, a highly secure and decentralized blockchain. It is known for its finite supply of 21 million coins, making it a deflationary asset and store of value.",
    images: [
      "/bitcoin.jpg",
      "https://picsum.photos/400/300?random=11",
      "https://picsum.photos/400/300?random=12",
    ],
    website: "https://bitcoin.org/",
    impact:
      "Popularized the concept of decentralized finance (DeFi) and store of value.",
  },
  {
    id: 2,
    name: "Ethereum",
    description:
      "Blockchain platform for smart contracts and decentralized applications.",
    longDescription:
      "Ethereum is a decentralized, open-source blockchain system that features smart contract functionality. Created by Vitalik Buterin in 2015, it allows developers to build decentralized applications (DApps) on its blockchain. Ethereum’s native cryptocurrency, Ether (ETH), is the second-largest cryptocurrency by market capitalization. Ethereum 2.0 is an upgrade designed to improve the network's scalability, security, and sustainability.",
    images: [
      "/etherium.jpg",
      "https://picsum.photos/400/300?random=14",
      "https://picsum.photos/400/300?random=15",
    ],
    website: "https://ethereum.org/",
    impact:
      "Pioneered the use of smart contracts and decentralized applications (DApps).",
  },
  {
    id: 3,
    name: "Solana",
    description:
      "High-performance blockchain for decentralized applications and crypto assets.",
    longDescription:
      "Solana is a blockchain platform designed for high-performance decentralized applications (DApps) and crypto assets. Founded by Anatoly Yakovenko in 2017, Solana’s network uses a unique consensus mechanism called Proof of History (PoH), which allows it to process thousands of transactions per second with low fees. Solana has become popular for DeFi applications, NFTs, and gaming.",
    images: [
      "/Solana.png",
      "https://picsum.photos/400/300?random=17",
      "https://picsum.photos/400/300?random=18",
    ],
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % charity.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + charity.images.length) % charity.images.length
    );
  };

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
          src={charity.images[currentImageIndex]}
          alt={charity.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-4">
          <ChevronLeft
            className="text-white cursor-pointer"
            onClick={prevImage}
          />
          <ChevronRight
            className="text-white cursor-pointer"
            onClick={nextImage}
          />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {charity.name}
          <Heart className="text-red-500 cursor-pointer hover:fill-red-500 transition-colors duration-300" />
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

export function InvestmentInput() {
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    type: "charity" | "crypto";
  } | null>(null);

  // Function to handle selection and delay the alert
  const handleSelect = (id: number, type: "charity" | "crypto") => {
    setSelectedItem({ id, type });
    const selected =
      type === "charity"
        ? charities.find((charity) => charity.id === id)
        : cryptocurrencies.find((crypto) => crypto.id === id);

    setTimeout(() => {
      alert(
        `Selected ${type === "charity" ? "Charity" : "Cryptocurrency"}: ${
          selected?.name
        }`
      );
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
