import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';
import DialogActions from '@material-ui/core/DialogActions';

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

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
 
          <div style={{padding:30}}>

              <img src={item.image} alt={item.title} style={{maxHeight:200, borderRadius:5, float:'left', marginRight:20, marginBottom:20}} />
              <h3>{item.title}</h3>
              <h4>${item.price}</h4>

            <h4>Category: {item.category}</h4>
            <p style={{clear:'both'}}>{item.description}</p>
          </div>

        <DialogActions>
          <Button onClick={handleClose} size='small' disableElevation variant='contained'>
            Cancel    
          </Button>
          <Button onClick={() => handleAddToCart(item)} data-cy={`add-to-cart-${item.id}`} size='small' disableElevation variant='contained'>
            Add to cart
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    
  );
}

export default Item;
