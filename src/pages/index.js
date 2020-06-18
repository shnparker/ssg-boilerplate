import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-white">
          <div className="max-w-screen-xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Ready to dive in?
              <br />
              Start your free trial today.
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <button
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Get started
                </button>
              </div>
              <div className="ml-3 inline-flex">
                <button
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline focus:border-indigo-300 transition duration-150 ease-in-out"
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
