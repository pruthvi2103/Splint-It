import Image from 'next/image';
import React from 'react';
import { AiOutlineArrowRight, AiOutlineCheckCircle, AiOutlineDown, AiOutlineUser } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';

const whatYouWillLLearn = [
  'File structure and response codes',
  'Express Server & Database Modelling',
  'Preparing Database Models',
  'Database Connectivity',
];
const courseRequirements = ['System with Internet Connection', 'Interest to learn', 'Dedication'];

const courseFeatures = [
  'Course material',
  'Course resources',
  'On demand recorded videos',
  'Practical exercises',
  'Quizzes',
  'Assignments',
  'Course completion certificate',
];

const DemoPage = () => {
  return (
    <>
      {/* Header */}
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
          <span className='cursor-pointer'>One Neuron</span>
          <span className='ml-6 flex items-center justify-center cursor-pointer'>
            Courses <AiOutlineDown size={12} className='-mb-1 ml-1' />
          </span>
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
          <span className='cursor-pointer'>Support</span>
          <span className='ml-8 flex items-center justify-center cursor-pointer'>
            <AiOutlineUser className='mr-1 ' size={20} /> Manish
          </span>
        </div>
      </nav>

      {/* Course Highlight */}
      <div className='w-full flex px-16 py-12 bg-gradient-to-r from-sky-700 text-white to-emerald-500'>
        {/* Left Container */}
        <div className='flex flex-col px-8 py-8  w-4/6 items-start justify-center'>
          <p className='text-sm text-amber-500  mb-2'>{'Development > Web Development'}</p>
          <h2 className='text-3xl font-bold mb-3 gray-100'>MERN Stack Bootcamp</h2>
          <p className='w-10/12 flex-wrap text-base  text-gray-200'>
            Learn complete web stack programming with React and Node by doing it the way a full-stack
            professional would do it. Learn how to create whole web apps from start to finish with one of the
            most trending tech stacks available. You can learn how to create data-driven applications, as well
            as how to test, protect, and deploy your code, in this thorough study path. This course
            necessitates a basic understanding of HTML, CSS, and JavaScript.
          </p>
        </div>
        {/* Right Container */}
        <div className=' z-10 my-4 '>
          <Image
            src='https://cdn.ineuron.ai/assets/uploads/thumbnails/6262c88eed35f56d7671d515.jpg'
            alt='course-banner'
            width={550}
            height={300}
            className='rounded-lg'
          />
        </div>
      </div>
      {/* Course details  */}
      <div className='flex py-20 px-24 justify-between'>
        {/* Left Container */}
        <div className='w-8/12 mr-12'>
          {/* What to learn */}
          <div className='flex flex-col bg-sky-50 py-8 rounded-3xl px-10 '>
            <p className='text-2xl font-semibold text-blue-800 mb-6'>{"What you'll learn"}</p>
            {whatYouWillLLearn.map((item) => (
              <p
                key={item}
                className='flex items-center justify-start mb-2.5 font-medium tracking-wide text-gray-600'
              >
                <AiOutlineArrowRight className='mr-1.5 scale-125' /> {item}
              </p>
            ))}
          </div>
          {/* Requirements*/}
          <div className='flex flex-col bg-sky-50 mt-8 py-8 rounded-3xl px-10 '>
            <p className='text-2xl font-semibold text-blue-800 mb-6'>{"What you'll learn"}</p>
            {courseRequirements.map((item) => (
              <p
                key={item}
                className='flex items-center justify-start mb-2.5 font-medium tracking-wide text-gray-600'
              >
                <AiOutlineArrowRight className='mr-1.5 scale-125' /> {item}
              </p>
            ))}
          </div>
        </div>
        {/* Right Container */}
        <div className='w-2/6 '>
          {/* Course Price */}
          <div className='flex flex-col bg-sky-50 py-8 rounded-3xl px-10'>
            {/* price */}
            <p className='text-blue-800 text-2xl tracking-wide font-bold'>{'₹7080.00'}</p>
            <button className='bg-gradient-to-r my-2 from-blue-800 rounded-lg text-white py-2.5 font-light to-blue-700'>
              Enroll Now
            </button>
            <p className='self-center text-sm '>This course is a part of Tech Neuron.</p>
            {/* Course Features */}
            <div>
              <p className='mt-5 mb-3 text-xl text-blue-800 font-semibold'>Course Features</p>
              {courseFeatures.map((feature) => (
                <p key={feature} className='flex items-center justify-start mb-2 font-medium text-gray-600'>
                  {' '}
                  <AiOutlineCheckCircle className='mr-2 scale-125' /> {feature}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className='bg-gradient-to-r py-4 from from-blue-700 to-blue-600 flex items-center justify-between px-12'>
        <p className='text-gray-200 opacity-60'>© iNeuron Intelligence Pvt. Ltd. 2022</p>
        <p className='text-gray-200 opacity-60'>
          Terms & Conditions <span className='text-orange-500'>|</span> Privacy Policy
        </p>
      </footer>
    </>
  );
};

export default DemoPage;
