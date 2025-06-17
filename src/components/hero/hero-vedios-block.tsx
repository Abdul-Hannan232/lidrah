'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import http from '@framework/utils/http';

interface VideoProps {
  id: number;
  title: string;
  videoUrl: string;
}

const dummyVideos: VideoProps[] = [
  {
    id: 1,
    title: 'Video 1',
    videoUrl: '/assets/videos/video1.mp4',
  },
  {
    id: 2,
    title: 'Video 2',
    videoUrl: '/assets/videos/video2.mp4',
  },
  {
    id: 3,
    title: 'Video 3',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

export default function VideoCarousel() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);
  const [heroBanner, setHeroBanner] = useState([]);

  const fetchBanner = async () => {
    const { data: { banners = [] } = {} } = await http.get(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/videobanners`, 
    );

    const now = new Date();

    const visibleBanners = banners.filter((banner: any) => {
      const startDate = new Date(banner.startDate);
      const endingDate = new Date(banner.endingDate);

      return banner.isVisible && startDate <= now && endingDate >= now;
    });

    setHeroBanner(visibleBanners);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="mt-5 mb-8 xl:mb-10 max-h-[442px] md:h-[380px] relative bg-white rounded-2xl">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1} // Ensure one slide is visible at a time
        slidesPerGroup={1} // Move one slide per navigation click
        autoplay={{
          delay: 28000,
          disableOnInteraction: false,
        }}
        navigation={true}
        onSlideChange={handleSlideChange}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {heroBanner.map((video: any) => (
          <SwiperSlide key={video.id}>
            <video
              // src={video.videoUrl}
              src={video?.video}
              controls
              autoPlay
              loop={true}
              muted
              crossOrigin="anonymous"
              className="max-h-[442px] w-full md:h-[380px] md:max-h-[380px] object-cover rounded-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center transition duration-300 absolute top-1/2 -left-2 z-10 -translate-y-1/2 bg-brand-light transform shadow-navigation text-base hover:bg-brand hover:text-brand-light p-2 rounded-full ${
          isBeginning
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <IoIosArrowBack size={20} />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center transition duration-300 absolute top-1/2 -right-2 z-10 -translate-y-1/2 bg-brand-light text-base p-2 transform shadow-navigation hover:bg-brand hover:text-brand-light rounded-full ${
          isEnd
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
}
