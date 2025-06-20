import cn from 'classnames';
import { FaChevronDown } from 'react-icons/fa';
import LocationIcon from '@components/icons/location-icon';
import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';

interface DeliveryProps {
  className?: string; 
} 
const Delivery: React.FC<DeliveryProps> = ({ className }) => {
  const { isAuthorized } = useUI();
  const { openModal } = useModalAction();
  function handleDeliveryView() {
    !isAuthorized ? openModal('LOGIN_VIEW') : openModal('DELIVERY_VIEW');
  }

  return (
    <div className={cn('delivery-address', className)}>
      <button
        className="inline-flex items-center text-15px text-brand-light tracking-[0.1px]"
        onClick={handleDeliveryView}
      >
        <LocationIcon />
        <span className="ltr:pl-1.5 lg:rtl:pr-1.5">Delivery:</span>
        <span className="font-semibold text-brand relative top-[1px] ltr:pl-1 rtl:pr-1">
          {!isAuthorized ? 'Address' : 'Home Address'}
        </span>
        <span className="ltr:pl-1.5 lg:rtl:pr-1.5">
          <FaChevronDown className="text-xs text-brand-light text-opacity-40" />
        </span>
      </button>
    </div>
  );
};

export default Delivery;
