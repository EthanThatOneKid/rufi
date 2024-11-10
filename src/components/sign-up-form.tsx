'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { startAnyoneClient } from '@/lib/anon';
import { AnonSocksClient } from '@anyone-protocol/anyone-client';

const signUpSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    bank: z
      .array(z.enum(['chase', 'wellsfargo', 'bankofamerica']))
      .nonempty('Please select at least one bank'),
    addCreditCard: z.boolean().default(false),
    creditCardNumber: z.string().optional(),
    creditCardExpiry: z.string().optional(),
    creditCardCVC: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      if (data.addCreditCard) {
        return (
          data.creditCardNumber && data.creditCardExpiry && data.creditCardCVC
        );
      }
      return true;
    },
    {
      message:
        "Credit card information is required if 'Add credit card now' is checked",
      path: ['creditCardNumber'],
    }
  );

type SignUpForm = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [addCreditCard, setAddCreditCard] = useState(false);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      bank: [],
      addCreditCard: false,
      creditCardNumber: '',
      creditCardExpiry: '',
      creditCardCVC: '',
    },
  });

  async function signUp() {
    console.log('started');
    const anon = await startAnyoneClient();
    const anonSocksClient = new AnonSocksClient(anon);
    try {
      const response = await anonSocksClient.get('https://google.com');

      console.log('Database response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      await anon.stop();
    }
  }

  const onSubmit = (data: SignUpForm) => {
    signUp();
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Sign Up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className='my-4' />
              <FormField
                control={form.control}
                name='bank'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Bank(s)</FormLabel>
                    <div className='space-y-2'>
                      {['chase', 'wellsfargo', 'bankofamerica'].map((bank) => (
                        <div key={bank} className='flex items-center space-x-3'>
                          <Checkbox
                            checked={(field.value as string[]).includes(bank)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, bank]
                                : field.value.filter((b) => b !== bank);
                              field.onChange(newValue);
                            }}
                          />
                          <FormLabel className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                            {bank.replace(/^./, (str) => str.toUpperCase())}
                          </FormLabel>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className='my-4' />
              <FormField
                control={form.control}
                name='addCreditCard'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          setAddCreditCard(checked as boolean);
                        }}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Add credit card now</FormLabel>
                      <FormDescription>
                        You can add your credit card information later if you
                        prefer.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {addCreditCard && (
                <div className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='creditCardNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credit Card Number</FormLabel>
                        <FormControl>
                          <Input {...field} className='w-full' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex space-x-4'>
                    <FormField
                      control={form.control}
                      name='creditCardExpiry'
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='MM/YY'
                              className='w-full'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='creditCardCVC'
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input {...field} className='w-full' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              <Button type='submit' className='w-full'>
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
