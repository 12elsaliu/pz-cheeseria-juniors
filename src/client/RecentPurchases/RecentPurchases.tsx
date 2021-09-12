import { Wrapper } from './RecentPurchases.styles';
import { useQuery } from 'react-query';
import { CartItemType } from '../App';
import Purchase from './Purchase/Purchase'

type PurchaseType = {
  createdAt: string;
  items: CartItemType[]
}

const getPurchases = async():Promise<PurchaseType[]> => await (await fetch(`api/purchases`)).json()

const RecentPurchases: React.FC = () => {
  // TODO: Use isLoading and error to show loading spinner or error message
  const { data, isLoading, error } = useQuery<PurchaseType[]>(
    'purchases',
    getPurchases
  );

  return (
    <Wrapper>
      <h2>Recent Purchases</h2>
      {data?.length === 0 ? <p>There is no recent purchases.</p> : null}
      {
        data?.map(purchase=> <Purchase purchase={purchase} />)
      }
    </Wrapper>
  );
};

export default RecentPurchases;