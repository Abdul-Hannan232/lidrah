import Container from '@components/ui/container';
import AccountNav from '@components/my-account/account-nav';
import { ROUTES } from '@utils/routes';
import SettingsIcon from '@components/icons/account-settings';
import OrdersIcon from '@components/icons/account-order';
import WishlistIcon from '@components/icons/account-wishlist';
import MapIcon from '@components/icons/account-address';
import NotificationIcon from '@components/icons/account-notification';
import HelpIcon from '@components/icons/account-help';
import NoticeIcon from '@components/icons/account-notice';
import { IoSettingsOutline } from 'react-icons/io5';
import AccountNavMobile from '@components/my-account/account-nav-mobile';

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT_SETTING,
    name: 'Account Settings',
    icon: <SettingsIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.ORDERS,
    name: 'Orders',
    icon: <OrdersIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.WISHLIST,
    name: 'Wishlist',
    icon: <WishlistIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.ADDRESS,
    name: 'Address',
    icon: <MapIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  // {
  //   slug: ROUTES.NOTIFICATION,
  //   name: 'Notifications',
  //   icon: <NotificationIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  // {
  //   slug: ROUTES.LEGAL_NOTICE,
  //   name: 'Legal Notice',
  //   icon: <NoticeIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  // {
  //   slug: ROUTES.HELP_CENTER,
  //   name: 'Help Center',
  //   icon: <HelpIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  // },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: 'Change Password',
    icon: (
      <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-light border-t border-b border-border-base">
      <Container>
        <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
          <div className="flex flex-col w-full lg:flex-row">
            <div className="lg:hidden">
              <AccountNavMobile options={accountMenu} />
            </div>
            <div className="hidden lg:block shrink-0 w-56 xl:w-72 2xl:w-[385px] ltr:mr-7 rtl:ml-7 xl:ltr:mr-8 xl:rtl:ml-8">
              <AccountNav options={accountMenu} />
            </div>

            <div className="w-full p-4 mt-4 overflow-x-auto border rounded-md lg:mt-0 border-border-base sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
