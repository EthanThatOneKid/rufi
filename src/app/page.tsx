import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/ui/hero-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RocketIcon, HeartIcon, UsersIcon } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className='bg-gray-100'>
      {/* Hero Section */}
      <HeroSection />
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold mb-10 text-center text-blue-800 animate-fade-in-down'>
            Who are we?
          </h2>

          <p className='mb-12 text-lg text-center max-w-3xl mx-auto text-gray-700 animate-fade-in-up'>
            We are a small team of passionate students who believe that everyone
            should have access to financial freedom.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <Card className='transition-all duration-300 hover:shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold text-blue-700'>
                  Our mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  Our mission is to provide everyone with the tools to build a
                  better future and access to pursue philanthropic efforts. We
                  believe that everyone should have access to financial freedom,
                  and we are here to help you achieve that.
                </p>
              </CardContent>
            </Card>
            <Card className='transition-all duration-300 hover:shadow-xl'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold text-blue-700'>
                  Our vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  Our vision is to create a world where everyone has the ability
                  to build a better future for themselves and their communities.
                  We believe that everyone should have access to financial
                  freedom, and we are here to help you achieve that.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className='py-24 bg-blue-100'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold mb-16 text-center text-blue-800 animate-fade-in-down'>
            Key features
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
            {/* Feature Card 1 */}
            <Card className='bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-2'>
              <CardHeader>
                <RocketIcon className='w-12 h-12 text-blue-500 mb-4' />
                <CardTitle className='text-2xl font-bold text-blue-900'>
                  Passively invest in your future
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  We round up your purchases to the nearest dollar and invest
                  the difference into your future or split it between your
                  favorite charitable causes.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className='bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-2'>
              <CardHeader>
                <UsersIcon className='w-12 h-12 text-blue-500 mb-4' />
                <CardTitle className='text-2xl font-bold text-blue-900'>
                  Accessible to everyone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  We believe that everyone should have access to financial
                  freedom. That's why we have no minimums or fees, and our web
                  application is accessible to everyone.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className='bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-2'>
              <CardHeader>
                <HeartIcon className='w-12 h-12 text-blue-500 mb-4' />
                <CardTitle className='text-2xl font-bold text-blue-900'>
                  Charitable giving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600'>
                  We believe in giving back. That's why we allow you to split
                  your roundups between your future and your favorite charitable
                  causes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-24 bg-blue-800 text-white'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-4xl font-bold mb-8 animate-fade-in-down'>
            Ready to make an impact?
          </h2>
          <p className='text-xl mb-12 animate-fade-in-up'>
            Join us today and start investing in your future while supporting
            causes you care about.
          </p>
          <Button
            size='lg'
            className='bg-white text-blue-800 hover:bg-blue-100 transition-colors duration-300 animate-fade-in'>
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className='bg-gray-800 text-white py-10'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='mb-4 md:mb-0'>
              &copy; 2024 Round-Up for Impact. All rights reserved.
            </p>
            <div className='flex space-x-4'>
              <a
                className='hover:text-blue-400 transition-colors duration-300'
                href='https://github.com/EthanThatOneKid/rufi'
                target='_blank'
                rel='noopener noreferrer'>
                GitHub⭐
              </a>
              <a
                href='#'
                className='hover:text-blue-400 transition-colors duration-300'>
                Privacy Policy
              </a>
              <a
                href='#'
                className='hover:text-blue-400 transition-colors duration-300'>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
