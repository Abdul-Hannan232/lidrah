'use client';

import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import SidebarMenu from '@components/ui/sidebar-menu';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import cn from 'classnames';
import useWindowSize from '@utils/use-window-size';

interface CategorySidebarProps {
  className?: string;
  // setParams: Function;
}

export default function CategoryDropdownSidebar({
  className,
  // setParams
  
}: CategorySidebarProps) {
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });
    const { width } = useWindowSize();

  // console.log(  '/////////////////',  data  );
  
  return (
    <aside className={cn('category-mobile-sidebar', className)}>
      <div className={`h-full max-h-full overflow-auto border rounded ${width as number < 1280 ? "border-border-one":"border-border-base"} `}>
        {error ? (
          <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={error.message} />
          </div>
        ) : (
          <Scrollbar className="w-full h-full category-scrollbar">
            <div className="h-[calc(84vh_-_150px)] lg:h-full">
              {loading ? (
                Array.from({ length: 15 }).map((_, idx) => (
                  <CategoryListCardLoader
                    key={`category-list-${idx}`}
                    uniqueKey="category-list-card-loader"
                  />
                ))
              ) : (
                // <SidebarMenu setParams={setParams as Function}  className="list" items={data?.categories?.data} />
                <SidebarMenu   className="list" items={data?.categories?.data} />
              )}
            </div>
          </Scrollbar>
        )}
      </div>
    </aside>
  );
}
