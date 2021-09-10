import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
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
      <Wrapper onClick={handleClickOpen}>
        <img src={item.image} alt={item.title} />
        <div>
          <h3>{item.title}</h3>
          <h3>${item.price}</h3>
        </div>
        <Button
          onClick={() => handleAddToCart(item)}
          data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
      </Wrapper>

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
