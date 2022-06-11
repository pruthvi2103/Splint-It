import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineDown, AiOutlineUser } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

const Header = () => {
  return (
    <nav className='bg-white flex py-3 px-16 items-center justify-between w-full'>
      <div className=''>
        {/* Image Container */}
        <Image
          alt='ineuron-logo'
          width={130}
          height={40}
          src={'https://courses.ineuron.ai/images/ineuron-logo.png'}
        />
      </div>
      {/* nav items */}
      <div className='flex ml-10'>
        <span className=''>One Neuron</span>
        <Link href={'/demo'}>
          <span className='ml-6 flex items-center justify-center cursor-pointer'>
            Courses <AiOutlineDown size={12} className='-mb-1 ml-1' />
          </span>
        </Link>
      </div>
      {/* Search */}
      <div className='flex ml-10 items-center justify-start border border-gray-800 rounded-md p-2 w-100'>
        <FiSearch size={20} />
        <input
          type='text'
          placeholder='What do you want to learn?'
          className='placeholder:text-gray-600 text-md ml-2 px-1 outline-none w-full'
        />
      </div>
      {/* right-nav */}
      <div className='flex ml-10'>
        <Link href={'/support'}>
          <span className='cursor-pointer'>Support</span>
        </Link>

        <span className='ml-8 flex items-center justify-center '>
          <AiOutlineUser className='mr-1 ' size={20} /> Manish
        </span>
      </div>
    </nav>
  );
};

export default Header;
