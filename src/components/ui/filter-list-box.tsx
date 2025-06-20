import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { IoChevronDown, IoCheckmarkSharp } from 'react-icons/io5';
import { usePathname, useSearchParams } from 'next/navigation';
import useQueryParam from '@utils/use-query-params';
type Option = {
  name: string;
  value: string;
};

export default function ListBox({ options }: { options: Option[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  // const hasQueryKey = searchParams?.get('sort_by');
  const hasQueryKey = searchParams?.get('price');
  // const currentSelectedItem = hasQueryKey
  //   ? options.find((o) => o.value === hasQueryKey)!
  //   : options[0];

  const [selectedItem, setSelectedItem] = useState<Option>(
    hasQueryKey
      ? (options.find((o) => o.value === hasQueryKey) ?? {
          name: '',
          value: '',
        })
      : { name: '', value: '' },
  );

  useEffect(() => {
    const newSelectedItem = hasQueryKey
      ? (options.find((o) => o.value === hasQueryKey) ?? {
          name: '',
          value: '',
        })
      : { name: '', value: '' };

    if (newSelectedItem.value !== selectedItem.value) {
      setSelectedItem(newSelectedItem);
    }
  }, [hasQueryKey, options, selectedItem]);

  function handleItemClick(value: string) {
    updateQueryparams('price', value);
  }

  return (
    <Listbox
      value={selectedItem}
      onChange={({ value }) => handleItemClick(value)}
    >
      {({ open }) => (
        <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px]">
          <div className="flex items-center">
            <div className="shrink-0 text-15px ltr:mr-2 rtl:ml-2 text-brand-light text-opacity-70">
              Sort by
            </div>
            <Listbox.Button className="relative w-full text-sm font-semibold rounded-lg cursor-pointer ltr:pr-5 rtl:pl-5 text-brand-light ltr:text-left rtl:text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-brand focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {selectedItem?.name || ' Select Option'}
              </span>
              <span className="absolute flex items-end pointer-events-none top-1 ltr:right-0 rtl:left-0 ltr:pl-1 rtl:pr-1">
                <IoChevronDown
                  className="w-3.5 h-3.5 text-brand-muted"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-20 w-full py-1 mt-1 overflow-auto text-sm rounded-md shadow-lg bg-brand-light max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {options?.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${
                      active || selectedItem.name ===option.name
                        ? 'text-brand-dark bg-fill-dropdown-hover'
                        : 'bg-brand-light'
                    }
    cursor-pointer transition-all select-none relative py-2.5 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {option.name}
                      </span>
                      {selected  || selectedItem.name ===option.name? (
                        <span
                          className={`${active || selectedItem.name ===option.name ? 'text-brand' : ''}
        check-icon absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3`}
                        >
                          <IoCheckmarkSharp
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

