import { useState } from 'react';
import Link from '@components/ui/link';
import { siteSettings } from '@settings/site-settings';
import Scrollbar from '@components/ui/scrollbar';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import cn from 'classnames';
import { useCategoriesQuery } from '@framework/category/get-all-categories';

import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from 'react-icons/io5';
import AuthMenu from './auth-menu';
import { ROUTES } from '@utils/routes';
import { useModalAction } from '@components/common/modal/modal.context';

const social = [
  {
    id: 0,
    link: 'https://www.facebook.com/redqinc/',
    icon: <IoLogoFacebook />,
    className: 'facebook',
    title: 'text-facebook',
  },
  {
    id: 1,
    link: 'https://twitter.com/redqinc',
    icon: <IoLogoTwitter />,
    className: 'twitter',
    title: 'text-twitter',
  },
  {
    id: 2,
    link: 'https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw',
    icon: <IoLogoYoutube />,
    className: 'youtube',
    title: 'text-youtube',
  },
  {
    id: 3,
    link: 'https://www.instagram.com/redqinc/',
    icon: <IoLogoInstagram />,
    className: 'instagram',
    title: 'text-instagram',
  },
];

export default function MobileMenu() {
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const { site_header } = siteSettings;
  const { closeSidebar, isAuthorized } = useUI();
  const { openModal } = useModalAction();

  function handleLogin() {
    closeSidebar();
    openModal('LOGIN_VIEW');
  }
  const {
    data: categories,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });

  const data = [
    {
      id: 1,
      path: '/',
      name: 'Home',
    },
    {
      id: 6,
      path: '/pages/my-account/account-settings',
      name: 'Categories',
      subMenu: categories?.categories?.data,
    },
    {
      id: 4,
      path: '/pages/search',
      name: 'Search',
    },

    {
      id: 5,
      path: '/pages/my-account/account-settings',
      name: 'My Account',
    },
    {
      id: 6,
      path: '/pages/faq',
      name: 'Faqs',
    },
    {
      id: 7,
      path: 'https://sardar-store-dashboard.vercel.app/login',
      name: 'Admin',
    },
  ];

  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];
    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }
    setActiveMenus(newActiveMenus);
  };

  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = '',
  }: any) =>
    (data.name || typeof data === 'string') && (
      <li className={`transition-colors duration-200 ${className}`}>
        <div className="relative flex items-center justify-between">
          {data.name && data.name === 'My Account' ? (
           isAuthorized ?
               
           <Link
           href={
             data.path
               ? data.path
               : `/pages/search?category=${data.name ? data?.name : data}`
           }
           // href={`${data.path}`}
           className="relative w-full py-4 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
         >
           <span className="block w-full" onClick={closeSidebar}>
             {data.name ? data.name : data}
           </span>
         </Link>
                :
                <span
              // href={
              //   data.path
              //     ? data.path
              //     : `/pages/search?category=${data.name ? data?.name : data}`
              // }
              // href={`${data.path}`}
              
              className="relative w-full py-4 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
            >
              <span className="block w-full cursor-pointer font-medium" onClick={handleLogin}>
                Login
              </span>
            </span>
             
          ) : (
            <Link
              href={
                data.path
                  ? data.path
                  : `/pages/search?category=${data.name ? data?.name : data}`
              }
              // href={`${data.path}`}
              className="relative w-full py-4 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
            >
              <span className="block w-full" onClick={closeSidebar}>
                {data.name ? data.name : data}
              </span>
            </Link>
          )}

          {hasSubMenu && (
            <div
              className="cursor-pointer w-full h-8 text-[17px] px-5 shrink-0 flex items-center justify-end text-brand-dark text-opacity-80 absolute ltr:right-0 rtl:left-0 top-1/2 transform -translate-y-1/2"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform ${
                  activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.subMenu ? data.subMenu : JSON.parse(data.children)}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }

    // console.log('---------------->>>>' ,data);

    dept = dept + 1;

    return (
      <ul className={cn('mobile-sub-menu', dept > 2 && 'ltr:-ml-4 rtl:-mr-4')}>
        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu?.children}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={cn(
                dept > 1 && 'ltr:pl-4 rtl:pr-4',
                dept > 2 && 'ltr:pl-8 rtl:pr-8',
              )}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full border-b border-border-base flex justify-between items-center relative ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 shrink-0 py-0.5">
          <div role="button" onClick={closeSidebar} className="inline-flex " >
            <Logo className='brightness-0' />
          </div>

          <button
            className="flex items-center justify-center px-4 py-5 text-2xl transition-opacity md:px-5 lg:py-8 focus:outline-none hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-brand-dark mt-0.5" />
          </button>
        </div>

        <Scrollbar className="flex-grow mb-auto menu-scrollbar">
          <div className="flex flex-col px-0 py-6 text-brand-dark h-[calc(100vh_-_150px)]">
            <ul className="mobile-menu">
              {/* {site_header.menu.map((menu, index) => { */}
              {data.map((menu, index) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${index}`;

                return (
                  <ListMenu
                    dept={dept}
                    data={menu}
                    hasSubMenu={menu?.subMenu ? menu?.subMenu : false}
                    // hasSubMenu={menu.subMenu}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                );
              })}
            </ul>
          </div>
        </Scrollbar>

        <div className="flex items-center justify-center py-5 -mx-3 border-t text-brand-light border-border-base px-7 shrink-0">
          {social?.map((item, index) => (
            <Link
              href={item.link}
              className={`text-heading mx-3 transition duration-300 ease-in text-brand-dark text-opacity-60 hover:text-brand ${item.className}`}
              key={index}
            >
              <span className="sr-only">{item.title}</span>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
