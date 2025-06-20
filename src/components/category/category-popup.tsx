import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import { useModalAction } from '@components/common/modal/modal.context';

const CategoryPopup = () => {
  const { closeModal } = useModalAction();
  return (
    <div className="relative flex flex-col w-full mx-auto overflow-hidden rounded-t  bg-brand-light h-inherit">
       <button
          onClick={closeModal}
          aria-label="Close Modal"
          className="w-full bg-fill-base tracking-[0.025em] rounded-md transition text-brand-dark duration-200 h-14 text-center font-semibold text-sm block hover:bg-brand hover:text-brand-light focus:outline-none"
        >
         Close
        </button>
      <CategoryDropdownSidebar className="w-full" />
          </div>
  );
};

export default CategoryPopup;
