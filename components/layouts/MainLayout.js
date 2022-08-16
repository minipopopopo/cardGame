import { StarIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children }) => {
  // todo: fix emoji whitespace rendering
  // const isSafari =
  //   typeof window !== 'undefined'
  //     ? /constructor/i.test(window.HTMLElement) ||
  //       (function (p) {
  //         return p.toString() === '[object SafariRemoteNotification]';
  //       })(
  //         !window['safari'] ||
  //           (typeof safari !== 'undefined' && safari.pushNotification)
  //       )
  //     : false;

  const isSafari = false;

  return (
    <div className="">
      <div className="background"></div>
      <div className="relative">
        <div className="flex flex-col items-center min-h-screen patterns">
          <Head>
            <title>ogsupa</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@jnnksbrt" />
            <meta name="twitter:title" content="ogsupa" />
            <meta property="og:title" content="ogsupa" />
            <meta property="og:url" content="https://ogsupa.com" />
            <meta
              property="og:image"
              content="https://ogsupa.com/ogimage.png"
            />
          </Head>
          <Toaster />
          <div className="flex flex-row md:flex-row items-center justify-center w-full text-center">
            <div className="mt-8 mb-8 sm:mt-12 md:mt-20 lg:mt-28 rounded-2xl">
              <a href="/">
                <img
                  src="/ogsupa-MV-shadow.png"
                  alt="OG supa logo"
                  className="h-[96px] sm:h-[128px] md:h-[196px]"
                />
              </a>
            </div>
          </div>
          {children}
          <div className="flex-1"></div>

        </div>
      </div>
    </div>
  );
};

export default MainLayout;
