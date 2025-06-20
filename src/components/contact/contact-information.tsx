'use client';

import { FC } from 'react';
import LocationIcon from '@components/icons/contact/location-icon';
import PhoneIcon from '@components/icons/contact/phone-icon';
import MailIcon from '@components/icons/contact/mail-icon';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';

const data = [
  {
    id: 1,
    slug: '/',
    icon: (
      <LocationIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'Office Location',
    description: '2756  Quiet Valley Lane, Reseda, California, United Stats',
  },
  {
    id: 2,
    slug: '/',
    icon: (
      <PhoneIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'Call us anytime',
    description:
      'Change the design through a range +89 5631 564    +88 5321 036',
  },
  {
    id: 3,
    slug: '/',
    icon: (
      <MailIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'Send Mail',
    description: 'support@demoagency.com hire.us@demoteam.io',
  },
];
const ContactInformation = () => {
  return (
    <>
      {data.length > 0 && (
        <div className="bg-brand-light px-5 lg:px-0 xl:px-12 sm:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-7 max-w-[1420px] mx-auto space-y-7 sm:space-y-0 pt-1">
          {data?.map((item: any) => (
            <div
              key={`contact--key${item.id}`}
              className="flex flex-col max-w-xs lg:flex-row lg:max-w-sm xl:ltr:pr-7 xl:rtl:pl-7 py-3"
            >
              <div className="shrink-0 w-14 xl:w-16">{item.icon}</div>
              <div className="mt-4 lg:ltr:pl-3 lg:rtl:pr-3 2xl:ltr:pl-4 2xl:rtl:pr-4 lg:mt-0">
                <Heading variant="title" className="mb-2 lg:mb-2.5 font-bold">
                  {item.name}
                </Heading>
                <Text className='text-brand-muted'>{item.description}</Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ContactInformation;
