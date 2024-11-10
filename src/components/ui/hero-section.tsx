import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* Background Image */}
      <Image
        src='/background.jpg?height=1080&width=1920'
        alt='Background representing impact'
        layout='fill'
        objectFit='cover'
        priority
        className='z-0'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-60 z-10'></div>

      {/* Content */}
      <div className='relative z-20 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8'>
        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-6 animate-fade-in-down'>
          Round up for Impact
        </h1>

        <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 animate-fade-in-up'>
          #MicroSaving
        </p>

        <div className='flex flex-col sm:flex-row gap-4 animate-fade-in'>
          <Link href='/signup' className='text-black hover:underline'>
            <Button
              variant='default'
              size='lg'
              className='w-full sm:w-auto text-lg px-8 py-3'>
              Sign Up for free!
            </Button>
          </Link>{' '}
          <Link href='/login' className='text-black hover:underline'>
            <Button
              variant='outline'
              size='lg'
              className='w-full sm:w-auto bg-white text-black hover:bg-gray-100 text-lg px-8 py-3'>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
