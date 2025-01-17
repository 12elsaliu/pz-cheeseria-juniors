import { Wrapper } from './Purchase.styles';
import { CartItemType } from '../../App';
import { DateTime } from 'luxon'

type PurchaseType = {
  createdAt: string;
  items: CartItemType[]
}

const Purchase: React.FC<{purchase: PurchaseType}> = ({purchase: { createdAt, items }}) => {
  const dt = DateTime.fromISO(createdAt) 
  const localTime = dt.toLocaleString({ year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric',minute: '2-digit'})

  const calculateTotal = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  //TODO: Click on the items in Recent Purchase to open the item description card.
  return (
    <Wrapper>
      <h4>Purchase time: {localTime}</h4>
      {items.map(item => {
        return <div>
          <h4>Item: {item.title}</h4>
          <p>Unit price: {item.price}</p>
          <p>Units purchased: {item.amount}</p>
        </div> 
      })}
      <h2 className='total'>Total: ${calculateTotal(items).toFixed(2)}</h2>
    </Wrapper>
  )
}
export default Purchase;

