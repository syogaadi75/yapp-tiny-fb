import Image from 'next/image';
import {BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon} from '@heroicons/react/solid';
import {FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon} from '@heroicons/react/outline';
import HeaderIcon from './Headericon';
import { signOut, useSession } from 'next-auth/react';

function Header() {
    const { data: session, status } = useSession()

  return (
    <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'>
        {/* Left */}
        <div className='flex items-center ml-2 rounded-full'>
            <Image src="https://links.papareact.com/5me" width={40} height={40} layout={'fixed'} />
            <div className='flex bg-gray-100 rounded-full p-2 ml-2'>
                <SearchIcon className='h-6 text-gray-600' />
                <input className='hidden md:inline-flex flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500' type="text" placeholder="Search Facebook" />
            </div>
        </div>
        
        {/* Center */}
        <div className='flex justify-center flex-grow'>
            <div className='flex space-x-6 md:space-x-2'>
                <HeaderIcon active Icon={HomeIcon} />
                <HeaderIcon Icon={FlagIcon} />
                <HeaderIcon Icon={PlayIcon} />
                <HeaderIcon Icon={ShoppingCartIcon} />
                <HeaderIcon Icon={UserGroupIcon} />
            </div>
        </div>

        {/* Right */}
        <div className='flex items-center sm:space-x-2 justify-end'>
            {/* Profile */}
            <Image src={session.user.image} onClick={signOut} className="rounded-full cursor-pointer" width={40} height={40} layout="fixed" />

            <p className='font-semibold pr-3 whitespace-nowrap'>{session.user.name}</p>
            <ViewGridIcon className='icon' />
            <ChatIcon className='icon' />
            <BellIcon className='icon' />
            <ChevronDownIcon className='icon' />
        </div>
    </div>
  )
}

export default Header