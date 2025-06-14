// 'use client';

// import { usePathname, useSearchParams } from 'next/navigation';
// import cn from 'classnames';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
// import { useUI } from '@contexts/ui.context';
// import { useEffect, useState } from 'react';
// import Image from '@components/ui/image';
// import useQueryParam from '@utils/use-query-params';
// import { useRouter } from 'next/navigation';
// import { useCategoryContext } from '@pages/category-with-products';
// import Link from 'next/link';
// import useWindowSize from '@utils/use-window-size';

// const SidebarMenuItem = ({
//   className,
//   item,
//   subItem,
//   depth = 0,
//   activeCategory,
//   setActiveCategory,
// }: any) => {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const { updateQueryparams } = useQueryParam(pathname ?? '/');
//   const [formState, setFormState] = useState<string>('');
//   const [items, setItems] = useState<any[]>([]);
//   const [isOpen, setOpen] = useState<boolean>(false);
//   const { params, setParams } = useCategoryContext();
//   const { width } = useWindowSize();

//   const { name, children, icon } = item;
//   const isActive = activeCategory === name;
//   // console.log(item);
//   // console.log(formState);

//   useEffect(() => {
//     if (children) {
//       try {
//         setItems(JSON.parse(children));
//       } catch (error) {
//         console.error('Error parsing children JSON:', error);
//         setItems([]);
//       }
//     } else {
//       setItems([]);
//     }
//   }, [children]);

//   const { displaySidebar, closeSidebar } = useUI();

//   function toggleCollapse() {
//     setActiveCategory(isActive ? null : name); // toggle between expanding and collapsing
//   }

//   useEffect(() => {
//     const hasQueryKey = searchParams?.get('category');
//     // console.log('searchParams:', searchParams.toString());
//     // console.log('hasQueryKey:', hasQueryKey);
//     setFormState(hasQueryKey ?? '');
//   }, [searchParams]);

//   function onClick() {
//     const newParams = new URLSearchParams(searchParams as any); // Clone current query params
//     const categoryName = item.name || subItem || ''; // Ensure name fallback

//     // console.log(">>>>>",item);

//     if (categoryName === formState) {
//       // Remove category from query params if already selected
//       newParams.delete('category');
//       setParams('');
//       setFormState('');
//     } else {
//       // Add or update category
//       newParams.set('category', categoryName);
//       setFormState(categoryName);
//       setParams(categoryName);
//     }
//     // setParams(categoryName)

//     // Update the URL without reloading
//     const newUrl = `${pathname}?${newParams.toString()}`;
//     window.history.pushState({}, '', newUrl);

//     // Toggle collapse
//     setOpen(!isOpen);

//     if (Array.isArray(items) && !!items.length) {
//       toggleCollapse();
//     } else {
//       setFormState(categoryName);
//       displaySidebar && closeSidebar();
//     }
//   }

//   let expandIcon;
//   if (Array.isArray(items) && items.length) {
//     expandIcon = !isActive ? (
//       <IoIosArrowDown className="text-base text-brand-light text-opacity-40" />
//     ) : (
//       <IoIosArrowUp className="text-base text-brand-light text-opacity-40" />
//     );
//   }

//   return (
//     <>
//       <li
//         onClick={onClick}
//         className={`flex justify-between items-center transition ${
//           className
//             ? className
//             : `text-sm md:text-15px hover:bg-brand-light2 ${(width as number) < 1280 ? '  border-border-one ' : ' border-border-base '} ${(width as number) < 1280 && !isActive ? 'text-brand-dark hover:text-brand-light' : 'text-brand-light'} border-t  first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3`
//         } ${isActive ? 'bg-brand-light2' : 'text-brand-dark text-opacity-70'}`}
//       >
//         <button
//           type="button"
//           className={cn(
//             'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-light',
//           )}
//         >
//           {icon && (
//             <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
//               <Image
//                 src={icon ?? '/assets/placeholder/category-small.svg'}
//                 alt={name || 'Categories'}
//                 width={40}
//                 height={40}
//                 style={{ width: 'auto', height: 'auto' }}
//               />
//             </div>
//           )}
//           <span
//             className={`  group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4`}
//           >
//             {subItem ? subItem : name}
//           </span>
//           <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
//         </button>
//       </li>
//       {Array.isArray(items) && isActive ? (
//         <li>
//           <ul
//             key="content"
//             className="py-3 text-xs border-t border-border-base"
//           >
//             {items?.map((currentItem, i) => {
//               const childDepth = depth + 1;
//               return (
//                 <SidebarMenuItem
//                   key={i}
//                   subItem={currentItem}
//                   item={currentItem}
//                   depth={childDepth}
//                   className={cn(
//                     'text-sm ltr:pl-14 rtl:pr-14 py-2.5 ltr:pr-4 rtl:pl-4',
//                   )}
//                   activeCategory={activeCategory}
//                   setActiveCategory={setActiveCategory}
//                 />
//               );
//             })}
//           </ul>
//         </li>
//       ) : null}
//     </>
//   );
// };

// function SidebarMenu({ items, className }: { items: any; className?: string }) {
//   const { params, setParams } = useCategoryContext();
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const isClearDisabled = !searchParams?.has('category');
//   const [isClearing, setIsClearing] = useState(false);
//   const { width } = useWindowSize();

//   const handleClearAll = () => {
//     setIsClearing(true); // Show loader
//     const newParams = new URLSearchParams(searchParams as any);
//     newParams.delete('category');

//     // Update state and URL together
//     setParams('');
//     router.replace(`?${newParams.toString()}`);

//     // Remove loader after 500ms
//     setTimeout(() => setIsClearing(false), 500);
//   };

//   return (
//     <ul className={cn(className)}>
//       <li
//         className={`flex justify-between items-center transition ${
//           className
//             ? className
//             : 'text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
//         } text-brand-light text-opacity-70`}
//       >
//         <button
//           disabled={isClearDisabled}
//           onClick={handleClearAll}
//           type="button"
//           className={cn(
//             'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-light py-2 px-4',
//           )}
//         >
//           <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
//             <Image
//               src="/assets/images/all-product.png"
//               alt="clear all"
//               width={40}
//               height={40}
//               style={{ width: 'auto', height: 'auto' }}
//             />
//           </div>
//           <span
//             className={` ${(width as number) < 1280 ?"text-brand-dark" :"text-brand-light"}    group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4`}
//           >
//             {isClearing ? 'Clearing...' : 'All Products'}
//           </span>
//           <span className="ltr:ml-auto rtl:mr-auto"></span>
//         </button>
//       </li>

//       {Array.isArray(items) && items.length > 0 ? (
//         items.map((item: any, i: number) => (
//           <SidebarMenuItem
//             key={i}
//             item={item}
//             activeCategory={activeCategory}
//             setActiveCategory={setActiveCategory}
//           />
//         ))
//       ) : (
//         <p>No items available</p>
//       )}
//     </ul>
//   );
// }

// export default SidebarMenu;






'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import useQueryParam from '@utils/use-query-params';
import { useRouter } from 'next/navigation';
import { useCategoryContext } from '@pages/category-with-products';
import Link from 'next/link';
import useWindowSize from '@utils/use-window-size';

const SidebarMenuItem = ({
  className,
  item,
  subItem,
  depth = 0,
  activeCategory,
  setActiveCategory,
}: any) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string>('');
  const [items, setItems] = useState<any[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { params, setParams } = useCategoryContext();
 const { width } = useWindowSize();
  const { name, children, icon } = item;
  const isActive = activeCategory === name;
  // console.log(item);
  // console.log(formState);

  useEffect(() => {
    if (children) {
      try {
        setItems(JSON.parse(children));
      } catch (error) {
        console.error('Error parsing children JSON:', error);
        setItems([]);
      }
    } else {
      setItems([]);
    }
  }, [children]);

  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setActiveCategory(isActive ? null : name); // toggle between expanding and collapsing
  }

  useEffect(() => {
    const hasQueryKey = searchParams?.get('category');
    // console.log('searchParams:', searchParams.toString());
    // console.log('hasQueryKey:', hasQueryKey);
    setFormState(hasQueryKey ?? '');
  }, [searchParams]);

  function onClick() {
    const newParams = new URLSearchParams(searchParams as any); // Clone current query params
    const categoryName = item.name || subItem || ''; // Ensure name fallback

    // console.log(">>>>>",item);

    if (categoryName === formState) {
      // Remove category from query params if already selected
      newParams.delete('category');
      setParams('');
      setFormState('');
    } else {
      // Add or update category
      newParams.set('category', categoryName);
      setFormState(categoryName);
      setParams(categoryName);
    }
    // setParams(categoryName)

    // Update the URL without reloading
    const newUrl = `${pathname}?${newParams.toString()}`;
    window.history.pushState({}, '', newUrl);

    // Toggle collapse
    setOpen(!isOpen);

    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      setFormState(categoryName);
      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isActive ? (
      <IoIosArrowDown className="text-base   text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base   text-opacity-40" />
    );
  }

  // console.log(">>>>>>> name ", name);
  // console.log('>>>>>>> subItem ', item);
  // console.log('>>>>>>> formState ', searchParams?.get('category') === formState ?'text-[#02b290]':"");

  return (
    <>
      <li
        onClick={onClick}
        className={`flex justify-between items-center transition ${
          className
            ? className
            : `text-sm md:text-15px  border-t  ${(width as number) < 1280 ? '  border-border-one ' : ' border-border-base '} first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3`
        } ${isActive && (width as number) > 1279 ? 'bg-brand-light2 text-brand-light hover:bg-fill-secondary' : isActive && (width as number) < 1280 ? "bg-fill-brand text-brand-dark" : !isActive && (width as number) > 1279 ? "text-brand-light hover:bg-brand-light2 " : '  '} text-opacity-70 ${searchParams?.get('category') === formState ?'text-[#02b290]':""} `}
      >
        <button
          type="button"
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark',
          )}
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || 'Categories'}
                width={40}
                height={40}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
          <span
            // className={`text-brand-dark ${subItem == formState || name == formState && 'text-[#02b290]'}  group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4`}
            // className={` ${ subItem === formState ?'text-[#02b290]':"text-brand-dark"} ${subItem === formState && width as number < 1280 ?'text-[#02b290]':"text-brand-light"}  group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4`}
            className={`   ${ subItem === formState ? "text-[#02b290]":subItem !== formState && width as number < 1280 ?"text-brand-dark" :subItem !== formState && width as number > 1279 ?"text-brand-light":''}  group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4`}
          >
            {subItem ? subItem : name}
          </span>
          <span className={` ${ subItem === formState ? "text-[#02b290]":subItem !== formState && width as number < 1280 ?"text-brand-dark" :subItem !== formState && width as number > 1279 ?"text-brand-light":''} ltr:ml-auto rtl:mr-auto`}>{expandIcon}</span>
        </button>
      </li>
      {Array.isArray(items) && isActive ? (
        <li>
          <ul
            key="content"
            className={`py-3 text-xs border-t ${width as number >1279 ? "border-border-base" :"border-border-one"} `}
          >
            {items?.map((currentItem, i) => {
              const childDepth = depth + 1;
              return (
                <SidebarMenuItem
                  key={i}
                  subItem={currentItem}
                  item={currentItem}
                  depth={childDepth}
                  className={cn(
                    'text-sm ltr:pl-14 rtl:pr-14 py-2.5 ltr:pr-4 rtl:pl-4',
                  )}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
};

function SidebarMenu({ items, className }: { items: any; className?: string }) {
  const { params, setParams } = useCategoryContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isClearDisabled = !searchParams?.has('category');
  const [isClearing, setIsClearing] = useState(false);
   const { width } = useWindowSize();


  const handleClearAll = () => {
    setIsClearing(true); // Show loader
    const newParams = new URLSearchParams(searchParams as any);
    newParams.delete('category');

    // Update state and URL together
    setParams('');
    router.replace(`?${newParams.toString()}`);

    // Remove loader after 500ms
    setTimeout(() => setIsClearing(false), 500);
  };

  return (
    <ul className={cn(className)}>
      <li
        className={`flex justify-between items-center transition ${
          className
            ? className

            : `text-sm md:text-15px   border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3`
        } text-opacity-70`}
      >
        <button
          disabled={isClearDisabled}
          onClick={handleClearAll}
          type="button"
          className={cn(
            `flex items-center w-full ${(width as number) > 1279 ?"hover:bg-fill-secondary  text-brand-light":"hover:bg-fill-base  text-brand-dark"}  ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark py-2 px-4`,
          )}
        >
          <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
            <Image
              src="/assets/images/all-product.png"
              alt="clear all"
              width={40}
              height={40}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <span className={`${(width as number) > 1279 ?"hover:bg-fill-secondary  text-brand-light":"hover:bg-fill-base  text-brand-dark"}  group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4`}>
            {isClearing ? 'Clearing...' : 'All Products'}
          </span>
          <span className="ltr:ml-auto rtl:mr-auto"></span>
        </button>
      </li>
      {/* {Array.isArray(items) && items?.map((item: any, i: number) => (
        <SidebarMenuItem
          key={i}
          item={item}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />


      ))} */}

      {Array.isArray(items) && items.length > 0 ? (
        items.map((item: any, i: number) => (
          <SidebarMenuItem
            key={i}
            item={item}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))
      ) : (
        <p>No items available</p>
      )}
    </ul>
  );
}

export default SidebarMenu;
