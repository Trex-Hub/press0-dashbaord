'use client';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { useSession } from '@/src/lib/auth-client';

const Home = () => {
  const { data } = useSession();
  const { session } = data ?? {};

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen gap-8'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <h1 className='text-4xl font-bold'>Welcome to Press0</h1>
        <p className='text-lg text-gray-500'>
          Monitor your AI Agent&apos;s performance and analyze trends in
          real-time.
        </p>
      </div>
      {session ? (
        <Button className='w-full max-w-xl'>
          <Link href='/dashboard'>Dashboard</Link>
        </Button>
      ) : (
        <div className='flex flex-row gap-5 max-w-2xl w-full'>
          <Button className='flex-1' asChild>
            <Link href='/login'>Login</Link>
          </Button>
          <Button className='flex-1' asChild>
            <Link href='/'>Chat with AI</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
