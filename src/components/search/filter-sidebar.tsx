import { ShopFilters } from '@components/search/filters';
import Scrollbar from '@components/ui/scrollbar';
import { useUI } from '@contexts/ui.context';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { getDirection } from '@utils/get-direction';
import { usePathname } from 'next/navigation';
import Heading from '@components/ui/heading';
 
const FilterSidebar = () => {
  const { closeFilter } = useUI();
  const pathname = usePathname();
  const dir = getDirection(pathname);
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full border border-border-base flex justify-between items-center relative ltr:pr-5 rtl:pl-5 md:ltr:pr-7 md:rtl:pl-7 shrink-0 py-0.5">
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-5 lg:py-8 focus:outline-none hover:opacity-60"
          onClick={closeFilter}
          aria-label="close"
        >
          {dir === 'rtl' ? (
            <IoArrowForward className="text-brand-dark" />
          ) : (
            <IoArrowBack className="text-brand-dark" />
          )}
        </button>
        <Heading
          variant="titleMedium"
          className="w-full text-center ltr:pr-6 rtl:pl-6"
        >
          Filters
        </Heading> 
      </div>

      <Scrollbar className="flex-grow mb-auto menu-scrollbar">
        <div className="flex flex-col px-5 py-7 md:px-7 text-heading">
          <ShopFilters />
        </div>
      </Scrollbar>

      <div className="flex items-center justify-center leading-4 text-15px md:text-base px-7 shrink-0 h-14 bg-fill-secondary text-brand-light ">
        2,6835 Items Found
      </div>
    </div>
  );
};

export default FilterSidebar;
