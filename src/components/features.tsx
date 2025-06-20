import Image from 'next/image';

const Features = ({ className, style }: { className: string; style: any }) => {
  // Dummy array of objects...
  
  const featuresData = [
    {
      id: 1,
      title: 'Fast Delivery',
      description:
        'We ensure quick delivery of your products to your doorstep.',
      image: '/assets/images/feature/f1.png',
    },
    {
      id: 2,
      title: 'Handmade Products',
      description:
        'Explore a wide range of carefully crafted handmade products.',
      image: '/assets/images/feature/f2.png',
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Our support team is available 24/7 to assist you.',
      image: '/assets/images/feature/f3.png',
    },
    {
      id: 4,
      title: 'Secure Payments',
      description: 'Pay securely with trusted payment methods.',
      image: '/assets/images/feature/f4.png',
    },
  ];

  return (
    <div
      // className={`${className} bg-black grid gap-4 justify-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-4`}
      className={`${className} bg-black grid gap-4 justify-center  sm:grid-cols-2 xl:grid-cols-4  py-4`}
      style={style}
    >
      {featuresData.map((feature) => (
        <article
          key={feature.id}
          className="flex  2xl:h-[134px] h-[110px] p-2 2xl:p-3 items-center bg-brand-light2 rounded-2xl shadow-sm hover:bg-brand-light2/80 "
        >
          <div
              className="rounded-2xl p-2 flex shrink-0 bg-brand-light2/70  items-center justify-center  2xl:w-[110px] sm:w-[100px] w-[60px]  2xl:h-[110px] sm:h-[100px] h-[60px] "
            style={{
              boxShadow: `inset 0px 0px 32px 0px rgba(0, 0, 0, 0.25), 0px 30px 32.3px -23px rgba(0, 0, 0, 0.35)`,
            }}
          >
            <Image
              width={96}
              height={96}
              className="object-cover w-full rounded-t-lg sm:w-[96px] sm: w-[55px] sm:h-[96px] h-[55px] md:h-auto  md:rounded-none md:rounded-t-lg"
              src={feature.image}
              alt={feature.title}
            />
          </div>
          <div className="flex flex-col justify-between p-3 2xl:p-4 leading-normal">
            <h5
              className="mb-2 sm:text-base lg:text-xl  tracking-tight text-gray-900 dark:text-white"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              {feature.title}
            </h5>
            <p className="mb-3 text-sm text-[#CACACA] dark:text-gray-100">
              {feature.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Features;
