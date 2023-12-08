import React,{useState} from 'react'
import StepPhone from '../StepPhone/StepPhone';
import StepOtp from '../StepOtp/StepOtp';

const steps={
    1:StepPhone,
    2:StepOtp
}

const Auth = () => {
    const [step, setStep] = useState(1);
    const Step = steps[step];

    const onNext=()=>{
        setStep(step+1)
    }

    const onPrev=()=>{
        setStep(step-1)
    }

    return (
        <div>
            <Step 
                onNext={onNext}
                onPrev={onPrev}
            />
        </div>
    )
}

export default Auth