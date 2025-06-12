// import Container from '@components/ui/container';
// import { Metadata } from 'next';
// import DownloadAppsTwo from '@components/common/download-apps-two';
// import HeroCarouselBlock from '@components/hero/hero-carousel-block';
// import CategoryWithProduct from './category-with-products';
// import Footer from '@layouts/footer/footer';
// import Header from '@layouts/ancient/header';
// import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
// import Banners from '@components/banners/Banners';
// import Features from '@components/features';

// export const metadata: Metadata = {
//   title: 'LIDRAH',
// };

// export default async function Page() {
//   return (
//     <>
//       <Header />
//       {/* <Container className="mt-20 w-full "> */}
//       <div className=" bg-brand-dark">
//         <div
//           //      style={{
//           // backgroundImage: `conic-gradient(
//           //  #B2674B,
//           //   #62301D,
//           //         #07161200,
//           //   #00000000,
//           //   #62301D,
//           //    #62301D,
//           //   #62301D,
//           //   #18131A21,
//           //   #07161200,
//           //         #B2674B,

//           //   #B2674B

//           // )`}}
//           style={{
//             background: `linear-gradient(
//       rgba(41, 29, 26, 0.75) 0%,
// rgba(178, 102, 75, 0.66) 60%,
//       rgba(0, 0, 0, 1) 100%)`,
//           }}
//           // style={{
//           //   backgroundColor: 'rgb(53, 49, 47)',
//           //   background: `radial-gradient(circle,rgba(153, 83, 58, 1) 0%, rgba(41, 29, 26, 1) 75%)`,
//           // }}
//           className="relative max-w-[1920px] mt-20 mx-auto px-4 md:px-6 lg:px-14 2xl:px-10 md:grid grid-cols-2 lg:pt-4 gap-8 min-h-[380px] "
//         >
//           <HeroCarouselBlock />
//           <Banners />
//         </div>
//       </div>
//       <div
//       //   style={{
//       //     background: `linear-gradient(
//       // rgba(41, 29, 26, 0.75) 0%,
//       // rgba(41, 29, 26, 1) 30%,
//       // rgba(0, 0, 0, 1) 100%)`,
//       //   }}
//       >
//         <Features
//           className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 2xl:px-10"
//           style={{ backgroundColor: 'transparent' }}
//         />
//       </div>
//       <CategoryWithProduct className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 2xl:px-10" />
//       {/* </Container> */}
//       <DownloadAppsTwo />
//       <Footer />
//       <MobileNavigation />
//     </>
//   );
// }

import Container from '@components/ui/container';
import { Metadata } from 'next';
import DownloadAppsTwo from '@components/common/download-apps-two';
import HeroCarouselBlock from '@components/hero/hero-carousel-block';
import CategoryWithProduct from './category-with-products';
import Footer from '@layouts/footer/footer';
import Header from '@layouts/ancient/header';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import Banners from '@components/banners/Banners';
import Features from '@components/features';

export const metadata: Metadata = {
  title: 'LIDRAH',
};

export default async function Page() {
  return (
    <>
      <Header />
      {/* <Container className="mt-20 w-full "> */}
      <div
        className=" bg-brand-dark "
        //  style={{ boxShadow: `0 0 100px rgba(153, 83, 58, 1)`}}
      >
        <div
          //           style={{
          //             background: `linear-gradient(
          //       rgba(41, 29, 26, 0.75) 0%,
          // rgba(178, 102, 75, 0.66) 60%,
          //       rgba(0, 0, 0, 1) 100%)`,
          //           }}
          style={{
            backgroundColor: 'rgb(53, 49, 47)',
            background: `radial-gradient(circle,rgba(153, 83, 58, 1) 0%, rgba(41, 29, 26, 1) 75%)`,
          }}
          className="relative max-w-[1920px] mt-20 mx-auto px-4 md:px-6 lg:px-14 2xl:px-10 md:grid grid-cols-2 lg:pt-4 gap-8 min-h-[380px] "
        >
          <HeroCarouselBlock />
          <Banners />
        </div>
      </div>

      <Features
        className="bg-black max-w-[1920px] bg-black mx-auto px-4 md:px-6 lg:px-8 2xl:px-10"
        style={{ backgroundColor: 'black' }}
      />

      <CategoryWithProduct className="bg-black max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 2xl:px-10" />
      {/* </Container> */}
      <DownloadAppsTwo />
      <Footer />
      <MobileNavigation />
    </>
  );
}
