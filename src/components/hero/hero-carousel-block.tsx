'use client';

import BannerCard from '@components/cards/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import http from '@framework/utils/http';
import { useEffect, useState } from 'react';

interface Props {
  // heroBanner?: any;
  className?: string;
}

const HeroCarouselBlock: React.FC<Props> = ({
  className = 'mt-5 mb-8 xl:mb-10 max-h-[442px]    md:h-[380px]   md:max-h-[380px] ',
}) => {
  const [heroBanner , setHeroBanner]= useState([])





const fetchBanner = async () => {
  const { data: { banners = [] } = {} } = await http.get(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/banners`
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


  
  return (
    <div className={`${className}`}>
      <Carousel
        autoplay={true}
        prevActivateId="hero-carousel-button-prev"
        nextActivateId="hero-carousel-button-next"
      >
        {heroBanner?.map((banner: any) => (
          <SwiperSlide key={`banner--key-${banner.id}`}>
            <BannerCard
              banner={banner}
              className="overflow-hidden rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarouselBlock;
