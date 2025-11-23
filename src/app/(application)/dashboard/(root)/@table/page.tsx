import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
const DashboardTablePage = () => {
  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='flex flex-row w-full justify-between items-center'>
        <h4 className='text-xl font-semibold'>Latest Chats</h4>
        <Button className='w-fit hover:no-underline' variant={'link'} asChild>
          <Link href='/dashboard/chats'>View All</Link>
        </Button>
      </div>
      <div className='min-h-120 flex-1 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center'>
        Table
      </div>
    </div>
  );
};

export default DashboardTablePage;
