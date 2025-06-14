import Image from 'next/image';
import Link from '@components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@settings/site-settings';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  href = siteSettings.logo.href,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'inline-block focus:outline-none max-w-[131px] w-full',
        className,
      )}
      {...props}
    >
      {/* <div className="flex items-baseline text-xl md:text-lg xl:text-2xl items-center justify-center ml-8 md:ml-2 xl:ml-12 font-bold">
        <svg
          width="40"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className='shrink-0'
        >
          <path
            fillRule="evenodd"
            // fill-rule="evenodd"
            // clip-rule="evenodd"
            clipRule="evenodd"
            d="M14.9999 24.4202C12.6994 24.4202 10.6073 23.1216 9.63967 21.1061C9.43533 20.6807 9.62614 20.1726 10.0646 19.9743C10.5031 19.776 11.0268 19.9612 11.2311 20.3866C11.9118 21.8046 13.3814 22.7159 14.9999 22.7159C16.6198 22.7159 18.0894 21.8046 18.7688 20.3866C18.9731 19.9599 19.4955 19.776 19.9353 19.9743C20.3738 20.1726 20.5646 20.6794 20.3602 21.1061C19.3926 23.1216 17.3005 24.4202 14.9999 24.4202ZM12.3083 3.78081C11.6168 4.45177 11.1878 5.37613 11.1878 6.3911V7.48484H14.9999H18.8121V6.3911C18.8121 5.37482 18.3831 4.45045 17.6916 3.78081C16.1989 2.33255 13.8023 2.33255 12.3083 3.78081ZM5.62183 29H14.9999H24.3781C25.8179 29 27.0738 27.8537 26.9966 26.4593L26.0872 10.0255C26.0101 8.63111 24.9085 7.48484 23.4687 7.48484H20.5673V6.3911C20.5673 4.90476 19.9407 3.55366 18.9325 2.57546C16.766 0.474628 13.2339 0.474628 11.0674 2.57677C10.0592 3.55497 9.43262 4.90607 9.43262 6.39241V7.48616H6.53122C5.09135 7.48616 3.98979 8.63242 3.91266 10.0269L3.00326 26.4606C2.92748 27.855 4.18196 29 5.62183 29Z"
            fill="#02B290"
          />
        </svg>
        <p className="">LIDRAH</p>
      </div> */}
      <Image
        src={siteSettings?.logo?.url}
        alt={siteSettings?.logo?.alt}
        loading="eager"
      />
      {/* <b>SARDAR_STORE</b> */}
    </Link>
  );
};

export default Logo;
