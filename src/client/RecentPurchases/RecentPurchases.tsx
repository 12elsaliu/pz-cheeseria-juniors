import { Wrapper } from './RecentPurchases.styles';
import {useEffect, useState} from 'react';
import { CartItemType } from '../App';
import Purchase from './Purchase/Purchase'

type PurchaseType = {
  createdAt: string;
  items: CartItemType[]
}

const getPurchases = async():Promise<PurchaseType[]> => await (await fetch(`api/purchases`)).json()

const RecentPurchases: React.FC = () => {
  const [purchases, setPurchases] = useState([])
  
  useEffect(() => {
    const loadPurchases = async () => {
      const purchases = await getPurchases();
      setPurchases(purchases)
    }

    loadPurchases();
  }, [])  

  console.log(purchases)

  return (
    <Wrapper>
      <h2>Recent Purchases</h2>
      {purchases.length === 0 ? <p>There is no recent purchases.</p> : null}
      {
        purchases.map(purchase=> <Purchase purchase={purchase} />)
      }
    </Wrapper>
  );
};

export default RecentPurchases;