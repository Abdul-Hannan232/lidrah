'use client';
import HeroCarouselBlock from '@components/hero/hero-carousel-block';
import VideoCarousel from '@components/hero/hero-vedios-block';
import http from '@framework/utils/http';
import { useEffect, useState } from 'react';

const Banners = () => {
  const [heroBanner, setHeroBanner] = useState([]);

  const fetchBanners = async () => {
    const {
      data: { banners },
    } = await http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/banners`);

    const now = new Date();

    const visibleBanners = banners.filter((banner: any) => {
      const startDate = new Date(banner.startDate);
      const endingDate = new Date(banner.endingDate);

      return banner.isVisible && startDate <= now && endingDate >= now;
    });

    setHeroBanner(visibleBanners);
  };

  useEffect(() => {
    fetchBanners();
  }, []);


  // return <HeroCarouselBlock />;
  return <VideoCarousel />;
};

export default Banners;
