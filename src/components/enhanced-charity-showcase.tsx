'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Charity {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  images: string[];
  website: string;
  impact: string;
}

const charities: Charity[] = [
  {
    id: 1,
    name: 'Ocean Cleanup',
    description:
      "Developing advanced technologies to rid the world's oceans of plastic.",
    longDescription:
      "The Ocean Cleanup is a non-profit organization developing advanced technologies to rid the world's oceans of plastic. By utilizing the ocean currents to our advantage, our passive drifting systems are estimated to clean up half the Great Pacific Garbage Patch in just five years' time.",
    images: [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
    ],

    website: 'https://theoceancleanup.com/',
    impact: 'Removed over 100,000 kg of plastic from the oceans',
  },
  {
    id: 2,
    name: 'Doctors Without Borders',
    description:
      'International humanitarian medical non-governmental organisation.',
    longDescription:
      "Doctors Without Borders (MSF) works in conflict zones and countries affected by endemic diseases. They provide assistance to people who do not have access to health care, clean water or food. MSF's actions are guided by medical ethics and the principles of impartiality, independence and neutrality.",
    images: [
      'https://picsum.photos/400/300?random=4',
      'https://picsum.photos/400/300?random=5',
      'https://picsum.photos/400/300?random=6',
    ],
    website: 'https://www.doctorswithoutborders.org/',
    impact: 'Provided medical assistance in over 70 countries',
  },
  {
    id: 3,
    name: 'World Wildlife Fund',
    description:
      'International NGO working on wilderness preservation and reducing human impact on the environment.',
    longDescription:
      "For 60 years, WWF has worked to help people and nature thrive. As the world's leading conservation organization, WWF works in nearly 100 countries. At every level, we collaborate with people around the world to develop and deliver innovative solutions that protect communities, wildlife, and the places in which they live.",
    images: [
      'https://picsum.photos/400/300?random=7',
      'https://picsum.photos/400/300?random=8',
      'https://picsum.photos/400/300?random=9',
    ],
    website: 'https://www.worldwildlife.org/',
    impact: 'Protected millions of acres of vital habitat worldwide',
  },
];

const cryptocurrencies: Charity[] = [
  {
    id: 1,
    name: 'Bitcoin',
    description: 'The first decentralized digital currency.',
    longDescription:
      'Bitcoin is a decentralized digital currency that operates without a central authority or banks. It was created by an anonymous person or group of people under the pseudonym Satoshi Nakamoto in 2008. Bitcoin enables peer-to-peer transactions on the Bitcoin network, a highly secure and decentralized blockchain. It is known for its finite supply of 21 million coins, making it a deflationary asset and store of value.',
    images: [
      '/bitcoin.jpg',
      'https://picsum.photos/400/300?random=11',
      'https://picsum.photos/400/300?random=12',
    ],
    website: 'https://bitcoin.org/',
    impact:
      'Popularized the concept of decentralized finance (DeFi) and store of value.',
  },
  {
    id: 2,
    name: 'Ethereum',
    description:
      'Blockchain platform for smart contracts and decentralized applications.',
    longDescription:
      "Ethereum is a decentralized, open-source blockchain system that features smart contract functionality. Created by Vitalik Buterin in 2015, it allows developers to build decentralized applications (DApps) on its blockchain. Ethereum’s native cryptocurrency, Ether (ETH), is the second-largest cryptocurrency by market capitalization. Ethereum 2.0 is an upgrade designed to improve the network's scalability, security, and sustainability.",
    images: [
      '/etherium.jpg',
      'https://picsum.photos/400/300?random=14',
      'https://picsum.photos/400/300?random=15',
    ],
    website: 'https://ethereum.org/',
    impact:
      'Pioneered the use of smart contracts and decentralized applications (DApps).',
  },
  {
    id: 3,
    name: 'Solana',
    description:
      'High-performance blockchain for decentralized applications and crypto assets.',
    longDescription:
      'Solana is a blockchain platform designed for high-performance decentralized applications (DApps) and crypto assets. Founded by Anatoly Yakovenko in 2017, Solana’s network uses a unique consensus mechanism called Proof of History (PoH), which allows it to process thousands of transactions per second with low fees. Solana has become popular for DeFi applications, NFTs, and gaming.',
    images: [
      '/Solana.png',
      'https://picsum.photos/400/300?random=17',
      'https://picsum.photos/400/300?random=18',
    ],
    website: 'https://solana.com/',
    impact:
      'Enabled high-speed, low-cost transactions, supporting the growth of DeFi and NFTs.',
  },
];

function CharityCard({ charity }: { charity: Charity }) {
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
    <Card className='flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
      <div className='relative h-48 overflow-hidden group'>
        <Image
          src={charity.images[currentImageIndex]}
          alt={charity.name}
          layout='fill'
          objectFit='cover'
          className='transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-4'>
          <ChevronLeft
            className='text-white cursor-pointer'
            onClick={prevImage}
          />
          <ChevronRight
            className='text-white cursor-pointer'
            onClick={nextImage}
          />
        </div>
      </div>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          {charity.name}
          <Heart className='text-red-500 cursor-pointer hover:fill-red-500 transition-colors duration-300' />
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-grow'>
        <CardDescription>{charity.description}</CardDescription>
      </CardContent>
      <CardFooter className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>{charity.impact}</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>Learn More</Button>
          </DialogTrigger>
          <DialogContent className='max-w-3xl'>
            <DialogHeader>
              <DialogTitle>{charity.name}</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4'>
              <Image
                src={charity.images[0]}
                alt={charity.name}
                width={700}
                height={400}
                className='w-full h-64 object-cover rounded-lg'
              />
              <p>{charity.longDescription}</p>
              <p className='font-semibold'>Impact: {charity.impact}</p>
              <Button asChild>
                <a
                  href={charity.website}
                  target='_blank'
                  rel='noopener noreferrer'>
                  Visit Website
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export function EnhancedCharityShowcaseComponent() {
  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-center mb-8'>
          Charities We Support
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {charities.map((charity) => (
            <CharityCard key={charity.id} charity={charity} />
          ))}
        </div>
      </div>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-center mb-8'>Crypto Currency</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {cryptocurrencies.map((charity) => (
            <CharityCard key={charity.id} charity={charity} />
          ))}
        </div>
      </div>
    </>
  );
}
