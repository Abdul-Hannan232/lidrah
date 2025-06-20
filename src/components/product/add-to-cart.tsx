import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';
import Button from '@components/ui/button';

interface Props {
  data: any;
  variation?: any;
  disabled?: boolean;
  variant?: any;
  className?:string
}
const AddToCart = ({
  data,
  variation,
  disabled,
  variant = 'mercury',
  className=""
}: Props) => {
  // console.log(">>>>>>>>>>>>>. ", variation);
  
  const { width } = useWindowSize();
  // const { t } = useTranslation(lang, 'common');
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
 
  
  const item = generateCartItem(data!, variation);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
  ) => {
    e.stopPropagation();
    // console.log("Button clicked" , item);

    if(variation){

      addItemToCart ({...item, stock:variation?.stock}, 1);
    }else{
      addItemToCart (item, 1);
    }
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  const iconSize = width! > 480 ? '19' : '17';


  
  return !isInCart(item?.id) ? (
    variant === 'venus' ? (
      <button
        className="w-full grid grid-cols-[1fr,max-content] items-center bg-[#F4F6F8] rounded-[4px] mt-[10px] no-underline transition-all text-gray-600 hover:text-black font-medium"
        aria-label="Count Button"
        onClick={handleAddClick}
        // disabled={
        //   isInCart(item.id)
        //     ? getItemFromCart(item.id).quantity + selectedQuantity >=
        //       Number(item.stock)
        //     : selectedQuantity >= Number(item.stock)
        //  || outOfStock}
      >
        <span className="sm:flex text-[15px] sm:items-center sm:justify-center">
          Add
        </span>
        <span className="w-10 h-10 bg-[#E5E8EC] rounded-tr-[4px] rounded-br-[4px] flex items-center justify-center ml-auto">
          <PlusIcon width={iconSize} height={iconSize} opacity="1" />
        </span>
      </button>
    ) : (
      // <button
      //   className={`flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none ${className}`}
      //   aria-label="Count Button"
      //   onClick={handleAddClick}
      //   disabled={disabled || outOfStock}
      // >
      //   <PlusIcon width={iconSize} height={iconSize} opacity="1" />
      // </button>
      <Button
        className={`flex items-center  justify-center w-full   text-4xl rounded-md bg-brand  relative  text-brand-light focus:outline-none  hover:bg-opacity-100 ${className}`}
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled || outOfStock}
      >
        Add
        {/* <div className='bg-brand-light3   w-12 md:w-14 h-12 md:h-14 rounded-lg  justify-self-end absolute right-0 flex items-center justify-center '> */}
        <div className='bg-brand-light3   w-[40px] h-[40px] rounded-lg  justify-self-end absolute right-0 flex items-center justify-center '>
        <PlusIcon width={iconSize} height={iconSize} opacity="1"  />
        </div>
      </Button>
    )
  ) : (
    <Counter
      value={getItemFromCart(item.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
    
      // disabled={outOfStock}
      // disabled={
      //   isInCart(item.id)
      //     ? getItemFromCart(item.id).quantity  >=
      //       Number(data?.stock)
      //     : getItemFromCart(item.id).quantity  >= Number(data?.stock)
      // }
      // disabled={
      //   isInCart(item.id)
      //     ? getItemFromCart(item.id).quantity  >=
      //       Number(data?.stock) || getItemFromCart(item.id).quantity  >=
      //       Number(variation?.stock)
      //     : getItemFromCart(item.id).quantity  >= Number(data?.stock) 
      // }
      disabled={
        isInCart (item.id)
          ? getItemFromCart(item.id).quantity  >=
            Number(item?.stock)
          : getItemFromCart(item.id).quantity  >= Number(item?.stock)
      }
      className="w-full h-10"
      variant={variant}
    />
  );
};

export default AddToCart;
