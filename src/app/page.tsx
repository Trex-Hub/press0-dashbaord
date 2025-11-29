// COMPONENTS
import { AnimatedText } from '@/src/components/molecules/animated-text';
import { Button } from '@/src/components/ui/button';
import IphoneMockup from '../components/molecules/iphone-mockup';
// ICONS
import { Asterisk, Rss, ShieldCheck, Globe } from 'lucide-react';
// NEXT
import Link from 'next/link';
// CONSTANTS
import { WHATSAPP_CHAT_URL } from '@/src/utils/constant';
import { AnimatedComponents } from '../components/molecules/animated-nodes';
const Home = () => {
  return (
    <div className='py-32 max-h-screen overflow-hidden'>
      <div className='container flex flex-col items-center justify-center gap-4 text-center mx-auto'>
        <div className='flex flex-wrap items-center justify-center gap-6'>
          <div className='text-primary/40 flex items-center justify-center gap-2 text-xs font-medium tracking-tight md:text-lg'>
            <Rss className='size-4' />
            <span>Real Time Knowledge</span>
          </div>
          <div className='text-primary/40 flex items-center justify-center gap-2 text-xs font-medium tracking-tight md:text-lg'>
            <ShieldCheck className='size-4' />
            <span>Secure and Private</span>
          </div>
          <div className='text-primary/40 flex items-center justify-center gap-2 text-xs font-medium tracking-tight md:text-lg'>
            <Globe className='size-4 animate-spin' />
            <span>Works Everywhere</span>
          </div>
        </div>
        <div className='flex flex-row items-start justify-center'>
          <h1 className='text-foreground font-antonio text-4xl font-extrabold uppercase tracking-tight md:text-8xl'>
            <AnimatedText text='Fighting misinformation' />
          </h1>
          <Asterisk
            size={40}
            strokeWidth={3}
            className='text-red-500 size-fit'
          />
        </div>
        <p className='text-muted-foreground/80 max-w-xl'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum animi,
          ipsam provident optio delectus neque aliquid cumque. Beatae, odio!
        </p>
        <div className='bg-muted-foreground/10 flex rounded-3xl p-1.5'>
          <Button className='rounded-3xl' size={'lg'} asChild>
            <Link href='/demo'>See It in Action</Link>
          </Button>
          <Button className='rounded-3xl' variant={'ghost'} size={'lg'} asChild>
            <Link href={WHATSAPP_CHAT_URL} target='_blank'>
              Message Now
            </Link>
          </Button>
        </div>
        <div className='relative h-full w-2/5 overflow-hidden'>
          <AnimatedComponents direction='bottom'>
            <IphoneMockup src='/images/iphone-mockup.png' />
          </AnimatedComponents>
        </div>
      </div>
    </div>
  );
};

export default Home;
