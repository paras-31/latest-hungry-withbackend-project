import React,{useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import {placeOrder} from '../../../redux/actions/order'
import { getCartItems } from '../../../redux/actions/cart';
import {API} from '../../../Backend';

const Payment = ({handleNext,handleBack}) => {
    const {user}=useSelector((state)=>state.userReducer);
    const {cartItems} = useSelector((state) => state.cartReducer);
    const {address}=useSelector((state)=>state.addressReducer);
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [failure, setFailure] = useState("");

    const dispatch = useDispatch();

    const handleError = () => {
        setError("Choose Payment Method");
        setTimeout(() => {
            setError("");
        },3000)
    };

    const handleChange=async (e)=>{
        e.preventDefault();
        setValue(e.target.value);
        setError("");
        setFailure("");
    }

    const confirmcardorder=async ()=>{
        const items=Object.keys(cartItems).map((key)=>({
            productId:key,
            price:cartItems[key].price,
            quantity:cartItems[key].qty
        }))

        let total=0;
        Object.keys(cartItems).map((key)=>{
              total+=cartItems[key].price*cartItems[key].qty
        })
        
        let payload = {
            addressId: address._id,
            items,
            orderAmount:total,
            paymentStatus: value==='card'?'paid':'pending',
            paymentType: value,
        };

        dispatch(placeOrder(payload)).then((res)=>{
            if(res.success){
                dispatch(getCartItems())
                handleNext()
            }
        })
    }
    
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
            resolve(true);
            };
            script.onerror = () => {
            resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const handlePayment=async ()=>{
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );
      
          if (!res) {
            return;
          }
          const token=localStorage.getItem('token')
          const config={
              headers:{
                  'Content-type':'application/json',
                  Accept: "application/json",
                  Authorization:`Bearer ${token}`
              }
          }

          let total=0;
          Object.keys(cartItems).map((key,index)=>{
                total+=cartItems[key].price*cartItems[key].qty
          })
      
          const {data}=await axios.post(`${API}/api/payment/createpayment`,{amount:total},config)
          if(!data){
              return
          }
          console.log('paymentdata',data)

          const options={
              key:process.env.REACT_APP_RAZORPAY_KEY_ID,
              currency:data.currency,
              amount:data.amount.toString(),
              order_id:data.id,
              name:'HUNGRY',
              image:`/images/favicon.svg`,
              description: "Payment Receipt",
              handler:async function(response){
                const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=response

                if(razorpay_order_id!==undefined && razorpay_payment_id!==undefined && razorpay_signature!==undefined){
                    setFailure("")
                    confirmcardorder()
                }
              },
              prefill:{
                  phone_number:user.phone
              }
          }

          const paymentObject = new window.Razorpay(options);
          paymentObject.on("payment.failed", function (response) {
            setFailure(response.error.description);
          });
          paymentObject.open();
    }

    return (
        <>
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
            Payment Options
            </Typography>
            <FormControl component="fieldset" error={error} failure={failure}>
            <RadioGroup
                aria-label="Payment Options"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                value="cod"
                control={<Radio />}
                name="cod"
                label="Cash On Delivery"
                />
                <FormControlLabel
                name="card"
                value="card"
                control={<Radio />}
                label="Card"
                />
            </RadioGroup>
            <FormHelperText style={{ color: "#f2222c" }}>{error}</FormHelperText>
            <FormHelperText style={{ color: "#f2222c" }}>
                {failure}
            </FormHelperText>
            </FormControl>
        </React.Fragment>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
            </Button>
            {value === "" || value === "cod" ? (
            <>
                {value === "" ? (
                <>
                    <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    className="root_button"
                    style={{ cursor: "pointer" }}
                    onClick={handleError}
                    >
                    Confirm Order
                    </Button>
                </>
                ) : (
                <>
                    <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    className="root_button"
                    onClick={confirmcardorder}
                    >
                    Confirm Order
                    </Button>
                </>
                )}
            </>
            ) : (
            <>
                <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                className="root_button"
                onClick={handlePayment}
                >
                Confirm Order
                </Button>
            </>
            )}
        </Box>
    </>
    )
}

export default Payment