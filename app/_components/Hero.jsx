import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <>
      <section className="bg-gray-50 items-center flex flex-col h-[1050px]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:h-screen lg:items-center ">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Manage Your Expenses,
              <strong className="font-extrabold mt-1 text-[#3a4159] sm:block"> Control Your Money. </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Start Creating your budget and save ton of money!
            </p>

            <div className="mt-6 flex flex-wrap justify-center">
              <a
                className="block w-full rounded bg-black  px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#2c3248] focus:outline-none focus:ring active:bg-[#3a4159] sm:w-auto"
                href="#"
              >
                Get Started
              </a>
            </div>
          </div>
         
        </div>
        <div className='mb-16'> {/* Reduced margin-top to bring the image closer */}
          <Image
            src="/main.png"
            alt="dashboard"
            width={1000}
            height={700}
            className="rounded-xl border-2 relative -top-39"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
