'use client';
import { Fragment, useCallback } from 'react';
// COMPONENTS
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Card, CardContent } from '@/src/components/ui/card';
import { Separator } from '@/src/components/ui/separator';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
// HOOKS
import { useSession } from '@/src/lib/auth-client';
import { useState } from 'react';
// ICONS
import { CheckIcon, PencilIcon } from 'lucide-react';

const ProfilePage = () => {
  const { data } = useSession();
  const { user } = data ?? {};
  const { name = '', image = '', email = '' } = user ?? {};
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleEditEmail = useCallback(() => {
    setIsEditingEmail(!isEditingEmail);
  }, [isEditingEmail]);

  return (
    <div className='flex flex-col w-full justify-between items-center gap-5'>
      <div className='flex flex-row w-full justify-between items-center'>
        <h4 className='text-xl font-semibold'>Profile</h4>
      </div>
      <Card className='w-full'>
        <CardContent className='flex flex-col w-full gap-4'>
          <div className='flex flex-row w-full justify-between items-center'>
            <p>Profile Picture</p>
            <Avatar className='size-10'>
              <AvatarImage src={image ?? ''} alt={name ?? ''} />
              <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <Separator orientation='horizontal' />
          <div className='flex flex-row w-full justify-between items-center'>
            <p>Email</p>
            <div className='flex flex-row items-center gap-2'>
              {isEditingEmail ? (
                <Fragment>
                  <Input
                    className='w-full whitespace-nowrap py-0 min-w-56'
                    type='email'
                    value={email ?? ''}
                    onChange={e => console.log(e.target.value)}
                  />
                  <Button
                    variant={'outline'}
                    size={'icon'}
                    className='hover:bg-transparent cursor-pointer size-6'
                    onClick={handleEditEmail}>
                    <CheckIcon />
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Input
                    className='w-full whitespace-nowrap py-0 min-w-56'
                    type='text'
                    disabled
                    value={email ?? ''}
                  />
                  <Button
                    variant={'ghost'}
                    size={'icon'}
                    className='hover:bg-transparent cursor-pointer size-6 '
                    onClick={handleEditEmail}>
                    <PencilIcon
                      size={16}
                      className='text-neutral-500 dark:text-neutral-400'
                    />
                  </Button>
                </Fragment>
              )}
            </div>
          </div>
          <Separator orientation='horizontal' />
          <div className='flex flex-row w-full justify-between items-center'>
            <p>Full Name</p>
            <Input
              className='w-fit whitespace-nowrap py-0 min-w-56'
              type='text'
              value={name ?? ''}
              onChange={e => console.log(e.target.value)}
            />
          </div>
          <div className='flex flex-row-reverse gap-4 w-full'>
            <Button variant={'default'}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
