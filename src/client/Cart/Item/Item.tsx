import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  
  const [open, setOpen] = React.useState(false);

  //Open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Click on the card and open the dialog */}
      <Wrapper onClick={handleClickOpen}>
        <img src={item.image} alt={item.title} />
        <div>
          <h3>{item.title}</h3>
          <h3>${item.price}</h3>
        </div>
        <Button
          onClick={(event) => {
            //Avoid from triggering the parent div click event, to keep the functionality of Add Cart button on the card.
            event.stopPropagation()
            handleAddToCart(item)
          }}
          data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
      </Wrapper>

      {/* Content of the Dialog */}
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <div style={{padding:30}}>
          <div style={{display:'flex', justifyContent:'center'}}>
            <img src={item.image} alt={item.title} style={{maxHeight:200}}/>
          </div>
          <h3>{item.title}</h3>
          <h4>${item.price}</h4>
          <h4>Cheese category: {item.category}</h4>
          <p>{item.description}</p>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Button
            onClick={() => handleAddToCart(item)}
            data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Item;
