'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { useActiveScroll } from '@utils/use-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import HeaderMenu from '@layouts/header/header-menu';
import { useModalAction } from '@components/common/modal/modal.context';
import cn from 'classnames';
import Search from '@components/common/search';


const AuthMenu = dynamic(() => import('@layouts/header/auth-menu'), {
  ssr: false,
});
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

function Header() {

  
  
  const { openSidebar, isAuthorized, displayMobileSearch } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  useActiveScroll(siteHeaderRef);
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-one w-full h-16 lg:h-20 z-40 fixed top-0 ',
        displayMobileSearch && 'active-mobile-search',
      )}
    >
      {/* <div className="z-20 w-full h-16 transition duration-200 ease-in-out shadow-header innerSticky body-font bg-[#291a19] lg:h-20"> */}
      <div className="z-20 w-full h-16 transition duration-200 ease-in-out shadow-header innerSticky body-font bg-brand-dark lg:h-20">
        <Search className="top-bar-search lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1" />
        {/* End of Mobile search */}
        <Container className="flex items-center justify-between w-full h-full ">
          <div className="flex shrink-0">
            <button
              aria-label="Menu"
              className="flex-col items-center text-brand-light justify-center hidden outline-none menuBtn ltr:mr-5 rtl:ml-5 lg:flex 2xl:hidden shrink-0 focus:outline-none"
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </button>

            <Logo className="-mt-1" />
          </div>

          <HeaderMenu
            data={site_header.pagesMenu}
            className="hidden w-auto ltr:pl-10 rtl:pr-10 2xl:flex"
          />
          <Search
            searchId="top-bar-search"
            className="hidden lg:flex lg:max-w-[580px] 3xl:max-w-[700px] lg:ltr:ml-7 lg:rtl:mr-7 lg:ltr:mr-5 lg:rtl:ml-5 2xl:ltr:ml-16 2xl:rtl:mr-16 3xl:ltr:ml-28 3xl:rtl:mr-28 2xl:ltr:mr-auto 2xl:rtl:ml-auto"
          />
          {/* End of search */}
          <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
            <div className="xl:mx-3.5 mx-2.5">
              {/* <LanguageSwitcher  /> */}
            </div>
            <CartButton className="hidden lg:flex 2xl:hidden xl:mx-3.5 mx-2.5" />
            <div className="items-center hidden lg:flex shrink-0 xl:mx-3.5 mx-2.5">
              <UserIcon className="text-brand-light text-opacity-60" />
              <AuthMenu
                isAuthorized={isAuthorized}
                href={`${ROUTES.ACCOUNT}`}
                btnProps={{
                  children: `Sign In`,
                  onClick: handleLogin,
                }}
              >
                Account
              </AuthMenu>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Header;
