import { IoCheckmarkCircle } from 'react-icons/io5';
import OrderDetails from '@components/order/order-details';
import { useOrderQuery } from '@framework/order/get-order';
import dayjs from 'dayjs';
import usePrice from '@framework/product/use-price';
import { CreatedAt } from './order-table';

export default function OrderInformation({ oid }: { oid: number }) {
  // const {
  //   query: { id },
  // } = useRouter();

  // const { data, isLoading } = useOrderQuery(id?.toString()!);
  const { data, isLoading } = useOrderQuery(oid);
  // console.log('>>>>>>>>>>>>>>>>>> data ', data);

  const { price: total } = usePrice(
    data && {
      // amount: data.shipping_fee ? data.total + data.shipping_fee : data.total,
      amount: data.totalPrice,
      currencyCode: 'USD',
    },
  );
  if (isLoading)
    return (
      <div className="py-16 xl:px-32 2xl:px-44 3xl:px-56 lg:py-20">
        Loading...
      </div>
    );
  // console.log('>>>>>>>>>>>> oid ', oid)
  return (
    <div className="py-16 xl:px-32 2xl:px-44 3xl:px-56 lg:py-20">
      <div className="flex items-center justify-start px-4 py-4 mb-6 text-sm border rounded-md border-border-base bg-fill-secondary lg:px-5 text-brand-dark md:text-base lg:mb-8">
        <span className="flex items-center justify-center w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4 bg-brand bg-opacity-20 shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-brand-light" />
        </span>
        <span className="text-brand-light">
          {' '}
          Thank you. Your order has been received.
        </span>
      </div>

      <ul className="flex flex-col border rounded-md border-border-base bg-fill-secondary md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="px-4 py-4 text-base font-semibold border-b border-dashed text-brand-light lg:text-lg md:border-b-0 md:border-r border-border-two lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="block text-xs font-normal leading-5 uppercase text-brand-light text-opacity-50   ">
            Thank you. Your order has been received.:
          </span>
          <span className="text-brand-light"> #ON00{data?.id}</span>
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-light text-opacity-50  font-normal leading-5">
            Date:
          </span>
          <span className="text-brand-light  ">
            {' '}
            <CreatedAt createdAt={data?.createdAt} />
          </span>{' '}
          <br />
          <span className="text-brand-light text-sm">
            {dayjs(data?.createdAt).format('MMMM D, YYYY')}
          </span>
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-light text-opacity-50  font-normal leading-5">
            Send Mail:
          </span>
          <span className="text-brand-light  ">{data?.user?.email}</span>
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-light text-opacity-50  font-normal leading-5">
            Total:
          </span>
          <span className="text-brand-light  "> {total}</span>
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-light text-opacity-50  font-normal leading-5">
            Payment method:
          </span>
          <span className="text-brand-light  "> {data?.paymentMethod}</span>
        </li>
      </ul>

      <p className="mb-8 text-sm text-brand-dark md:text-base">
        Pay with cash upon delivery.
      </p>
      <OrderDetails id={oid} />
    </div>
  );
}
