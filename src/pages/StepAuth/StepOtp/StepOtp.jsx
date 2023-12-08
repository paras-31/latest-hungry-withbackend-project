import React,{useState,useEffect} from 'react'
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { verifyotp ,sendotp} from '../../../redux/actions/user';
import {useDispatch,useSelector} from 'react-redux';
import style from "./StepOtp.module.css";
import { useNavigate } from 'react-router-dom';

const StepOtp = ({onPrev}) => {
    const {loading}=useSelector((state)=>state.otpReducer)
    const [otp, setotp] = useState(new Array(6).fill(""));
    const {phone,hash}=useSelector((state)=>state.otpReducer.otp);
    const [phoneno,setPhoneNo]=useState(phone);
    const [counter, setCounter] = useState(60);
    const [displayError,setDisplayError]=useState(false);
    const [error, setError] = useState();
    const [Loading,setLoading]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate()

    useEffect(() => {
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
      }, [counter]);

      useEffect(()=>{
        if ("OTPCredential" in window) {
            const ac = new AbortController();
          
            navigator.credentials
              .get({
                otp: { transport: ["sms"] },
                signal: ac.signal
              })
              .then((otp) => {
                const num=otp.code
                setotp(num.toString().split('').map(Number))
                ac.abort();
              })
              .catch((err) => {
                ac.abort();
              });
          }
      },[])

    const handleSubmit=()=>{ 
        let otpkey = parseInt(otp.join(""));  
        let item={otp:otpkey,hash,phone}
        setLoading(true)
        dispatch(verifyotp(item)).then((res)=>{
            if(res.success){
                setLoading(false)
                navigate(-1)
            }else{
                setLoading(false)
               displayErrorFunction(res.message)
            }
        })
    }

    const displayErrorFunction=(message)=>{
        setError(message)
        setDisplayError(true)
        setTimeout(()=>{
            setDisplayError(false)
            setError('')
        },3000)
    }

    const handleResend=()=>{
        dispatch(sendotp(phone)).then((res)=>{
          if(res.success){
            setCounter(60);
          }
        })
    }

    const handleChange=(element,index)=>{
        setError('')
        setDisplayError(false)
        if (isNaN(element.target.value)) {
            return false
        } else if (element.target.value.length > 1 && element.target.nextSibling) {
            element.target.nextSibling.focus();
            return false
        }

        setotp([...otp.map((d, idx) => (idx === index ? element.target.value : d))]);
    
        if (element.target.nextSibling) {
            if (index === 0 && element.target.value.length === 0) {
                element.target.focus()
            } else {
                element.target.nextSibling.focus();
            }
        }

        if (element.target.value.length === 0) {
          if (element.target.previousElementSibling) {
            element.target.previousElementSibling.focus();
          } else {
            element.target.focus();
          }
        }
    }

    const backKeyDown = (e, index) => {
        const invalid = /[e\+\-\.]/gi
        if (invalid.test(e.key)) {
            e.preventDefault();
        }
        if (e.key === 'Backspace' && e.target.value === '') {
            setotp([...otp.map((d, idx) => (idx === index - 1 ? '' : d))]);
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            } else {
                e.target.focus()
            }
        } else if (e.key === 'Backspace' && e.target.value !== '') {
            setotp([...otp.map((d, idx) => (idx === index ? '' : d))]);
            e.target.focus()
        }
    }

    return (
        <Card title="Enter OTP">
        <div
        style={{
            marginBottom: "1.5px",
            marginTop: "-10px",
            letterSpacing: "1px",
        }}
        >
        OTP Sent to {phoneno}
        </div>
        <div className={`${style.userInput}`}>
        {otp.map((data, index) => {
            return (
            <input
                type="text"
                className={`${style.otp_input}`}
                style={displayError?{ border:"0.1px solid red"}:{}}
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => backKeyDown(e, index)}
            />
            );
        })}
      
        </div>
        {error && (
        <span style={{ color: "red", fontSize: "12px",marginBottom:'-1rem' }}>
            {error}
        </span>
        ) }
        <button
        text="VERIFY"
        onClick={handleSubmit}
        className={`${style.button} root_button`}
        >
        {Loading?"Loading...":"Verify"}
        </button>
      

        <p className={`${style.resend}`}>
        {counter > 0
            ? counter > 9
            ? `Resend OTP in 00:${counter} `
            : `Resend OTP in 00:0${counter} `
            :''}
        {counter > 0 ? (
            ""
        ) : (
            <span className={`${style.resend_button}`} onClick={handleResend}>
            Resend OTP
            </span>
        )}
        </p>
    </Card>
    )
}

export default StepOtp