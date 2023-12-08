import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Review = ({handleBack,handleNext}) => {
  const {cartItems} = useSelector((state) => state.cartReducer);
  const {address}=useSelector((state)=>state.addressReducer.address)

  const getCartTotal = () => {
    let total = 0;
    Object.keys(cartItems).map((key) => {
      total += cartItems[key].price * cartItems[key].qty;
    });
    return total;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {Object.keys(cartItems).map((key, index) => (
          <ListItem key={cartItems[key].itemName} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={cartItems[key].itemName}
              secondary={cartItems[key].description}
            />
            <Typography variant="body2">{cartItems[key].price * cartItems[key].qty}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total Price" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {getCartTotal()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Shipping Address
          </Typography>
          <Typography gutterBottom>
            {address.name}
          </Typography>
          <Typography gutterBottom>
            {address.city},{address.state}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>

        <Button
          onClick={handleNext}
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          className="root_button"
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default Review