import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import cn from 'classnames';

type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = 'text-brand-dark text-opacity-40',
  hideLabel,
}) => {
  const { openDrawer, setDrawerView } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    return openDrawer();
  }

  return (
    <button
      className={cn(
        'flex items-center justify-center shrink-0 h-auto focus:outline-none transform',
        className,
      )}
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <div className="relative flex items-center">
        <CartIcon className={cn(iconClassName)} />
        <span className="min-w-[20px] min-h-[20px] p-0.5 rounded-[20px] flex items-center justify-center bg-brand text-brand-light absolute -top-2.5 ltr:left-2.5 rtl:right-2.5 text-10px font-bold">
          {totalItems}
        </span>
      </div>
      {!hideLabel && (
        <span className="text-sm font-normal lg:text-15px text-brand-light ltr:ml-2 rtl:mr-2">
          Cart
        </span>
      )}
    </button>
  );
};

export default CartButton;
