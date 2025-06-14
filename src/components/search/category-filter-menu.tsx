import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import { FaCheck } from 'react-icons/fa';
import useQueryParam from '@utils/use-query-params';
import useWindowSize from '@utils/use-window-size';

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}

function safeJSONParse(value: string | null) {
  try {
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.error('Error parsing JSON:', e);
    return [];
  }
}

function CategoryFilterMenuItem({
  // className = 'hover:bg-fill-secondary text-brand-light border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  className = ' border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  subItem,
  depth = 0,
}: any) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>([]);
   const { width } = useWindowSize();
  

  // console.log('item', item);

  const [subItemAction, setSubItemAction] = useState<boolean>(false);
  const [items, setItems] = useState('');
  const isActive =
    checkIsActive(formState, item?.name || item) ||
    // checkIsActive(formState, item.slug) ||
    // item?.children?.some((_item: any) => checkIsActive(formState, _item.slug));
    (item?.children &&
      JSON.parse(item?.children)?.some(
        (_item: any) => checkIsActive(formState, _item.name),
        // checkIsActive(formState, _item.slug),
      ));

  const [isOpen, setOpen] = useState<boolean>(isActive);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  // const { slug, name, children: items, icon } = item;
  const { name, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  useEffect(() => {
    setItems(safeJSONParse(item?.children));
  }, [item?.children]);

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  const hasQueryKey = searchParams?.get('category');

  useEffect(() => {
    updateQueryparams('category', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(',') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      setFormState(
        formState.includes(name || item)
          ? formState.filter((title) => title !== (name || item))
          : [...formState, name || item],
      );
      // setFormState(
      //   formState.includes(slug)
      //     ? formState.filter((item) => item !== slug)
      //     : [...formState, slug],
      // );

      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base   text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base  text-opacity-40" />
    );
  }


  
  return (
    <>
      <li
        onClick={onClick}
                  // ${isActive && (width as number) > 1279 ? 'bg-brand-light2 text-brand-light hover:bg-fill-secondary' : isActive && (width as number) < 1280 ? "bg-fill-brand text-brand-dark" : !isActive && (width as number) > 1279 ? "  hover:bg-brand-light2  " : '  '} text-opacity-70 

        className={cn(
          { 'bg-brand-light2 text-brand-light': isOpen },
          `${ (width as number) < 1280 ? '  border-border-one ' : ' border-border-base '}    flex  justify-between items-center transition text-sm md:text-15px
        ${ formState.includes(item.name || name || item) ? "!text-yellow-100":item !== formState && width as number < 1280 ?"text-brand-dark hover:text-opacity-70" :item !== formState && width as number > 1279 ?" text-brand-light":''} text-opacity-70 
          `,
          className,
        )}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group',
            { 'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3': depth > 0 },
          )}
          // onClick={handleChange}
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4 2xl:ltr:mr-3 2xl:rtl:ml-3 3xl:ltr:mr-4 3xl:rtl:ml-4">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                // alt={name || t('text-category-thumbnail')}
                alt={name || 'Category Thumbnail'}
                width={40}
                height={40}
                style={{ width: 'auto' }}
              />
            </div>
          )}
          {/* <span className={`  ${ subItem === formState ? "text-[#02b290]":subItem !== formState && width as number < 1280 ?"text-brand-dark" :subItem !== formState && width as number > 1279 ?"text-brand-light":''}  capitalize py-0.5`}> */}
          <span className={`    capitalize py-0.5`}>
            {name || item}
          </span>
          {depth > 0 && (
            <span
              className={`w-[22px] h-[22px] text-13px flex items-center justify-center border-2 border-border-four rounded-full ltr:ml-auto rtl:mr-auto transition duration-500 ease-in-out group-hover:border-yellow-100 text-brand-light ${
                formState.includes(item.name || item) &&
                'border-yellow-100 bg-yellow-100'
              }`}
            >
              {formState.includes(item.name || item) && <FaCheck />}
            </span>
          )}
          {expandIcon && (
            <span className={`  ltr:ml-auto rtl:mr-auto`}>{expandIcon}</span>
          )}
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul key="content" className="px-4 text-xs">
            {items?.map((currentItem: any, index:any) => {
              const childDepth = depth + 1;
              // console.log('currentItem ', currentItem);

              return (
                <CategoryFilterMenuItem
                  key={`${currentItem.name}${currentItem.name} ${index}`}
                  item={currentItem}
                  depth={childDepth}
                  className="px-0 border-t border-border-base first:border-t-0 mx-[3px] bg-transparent"
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function CategoryFilterMenu({ items, className }: any) {
  // console.log('fffffffffffffff ', items);

  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem
          key={`${item.name}-key-${item.id}`}
          item={item}
        />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
