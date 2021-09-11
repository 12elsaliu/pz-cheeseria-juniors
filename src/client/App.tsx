import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Button from '@material-ui/core/Button';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import RecentPurchases from './RecentPurchases/RecentPurchases'
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};


const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [historyOpen, setHistoryOpen] =useState(false)
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  console.log(data);
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const processPurchase = async () =>{
    if(cartItems.length!==0){
      console.log(cartItems,'item')
      const res = await fetch('api/purchases',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(cartItems)
      })
      if(res.status===200 ){
        //Reset the cart for next purchase
        setCartItems([])
        handleClickOpen()
        //Sent state will determine the corresponding message to display when the data has successfully sent to the server.
        setSent(true)
      }
    }else{
       // When there is no item in the cart, nothing has been sent to the server. Display the corresponding message.
      setSent(false)
      handleClickOpen()
    }
  }
  

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (

    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={()=> setHistoryOpen(true)}>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          processPurchase={processPurchase}
        />

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <div style={{padding:20, textAlign:'center'}}>
            {sent
            ?<h3> You have successfully placed your order. </h3>
            :<h3> Can't place the order as there is no item in cart.</h3>
            } 
            <Button onClick={handleClose} size='small' disableElevation variant='contained'>
              Back   
            </Button>
          </div>
        </Dialog>
      </Drawer>

      <Drawer anchor='left' open={historyOpen} onClose={() => setHistoryOpen(false)}>
        <RecentPurchases/>
      </Drawer>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>

  );
};

export default App;
