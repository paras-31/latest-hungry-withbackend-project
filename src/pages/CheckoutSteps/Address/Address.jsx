import React,{useState,useEffect} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, getAddress } from "../../../redux/actions/address";


const Address = ({handleNext}) => {
  const {isAuth}=useSelector((state)=>state.userReducer)
    const {address}=useSelector((state)=>state.addressReducer);
    const length=Object.keys(address).length>0
    const addressArray={
        name:length?address.address.name:"",
        state:length?address.address.state:"",
        city:length?address.address.city:"",
        phoneNumber:length?address.address.phoneNumber:"",
        pinCode:length?address.address.pinCode:"",
        address:length?address.address.address:"",
    }

    const [changed,setChanged]=useState(false)
    const [values,setValues]=useState(addressArray);
    const [check,setCheck]=useState(false);
    const [error,setError]=useState(null)
    const dispatch=useDispatch();


    useEffect(()=>{
      if(isAuth){
        dispatch(getAddress()).then((res)=>{
          if(res.success){
            setValues(res.address.address)
          }
        })
      }
    },[])

    const handleChange=(e)=>{
      setChanged(true)
      setValues((prev)=>{
        return {
          ...prev,
          [e.target.name]:e.target.value
        }
      })
    }

    const handleError=()=>{
      if(values.name.trim().length<1 || values.state.trim().length<1 || values.city.trim().length<1 || values.phoneNumber.trim().length<1 || values.pinCode.trim().length<1 || values.address.trim().length<1){
        displayError('All Fields Required')
        return false
      }
      return true
    }

    const handleSubmit=()=>{
      if(changed){
        if(handleError()){
          dispatch(createAddress(values)).then((res)=>{
            if(res.success){
              handleNext()
            }
          })
        }
      }else{
        handleNext()
      }
    }

    const displayError=(msg)=>{
      setError(msg)
      setTimeout(()=>{
        setError(null)
      },3000)
    }

    const handleAddress=(e)=>{
        setCheck(!check);
    }

    return (
    
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="firstName"
              name="name"
              label="Name"
              value={values.name}
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleChange}
              // style={error && { borderBottom: "1px solid red" }}
            />
          </Grid>  
         
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              value={values.address}
              fullWidth
              autoComplete="shipping Address"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
       
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phoneNumber"
              label="Phone Number"
              value={values.phoneNumber}
              fullWidth
              autoComplete="shipping Phone"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              value={values.city}
              label="City"
              fullWidth
              autoComplete="shipping city"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State"
              value={values.state}
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="pincode"
              name="pinCode"
              label="Pincode"
              value={values.pinCode}
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
         
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="saveAddress"
                  value="yes"
                  onChange={handleAddress}
                />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
        {error!==null && <span style={{color:'#fc283f'}}>{error}</span>}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, ml: 1 }}
              style={{color:'#fff'}}
              className="root_button"
              disabled={!check}
            >
              Next
            </Button>
        </Box>
      </React.Fragment>
  
    )
}

export default Address