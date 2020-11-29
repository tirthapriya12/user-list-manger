import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './payment-otp.scss';

const PaymentOTP = (props) => {

    const [userOTP, setOTP] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();
        if (userOTP === props.payment.otpCheck) {
            alert("Payment Successfull");
        }
        else {
            alert("Payment failed! :( ");
        }
    }

    const onInput = (event) => {
        setOTP(Number(event.target.value))
    }
    return (
        <section className="payment-otp">
            <h1>Enter OTP</h1>
            <input className="otp" onChange={onInput} name="otp" type="text" maxLength="6" />
            <button onClick={onSubmit}>Submit</button>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        payment: state.payment
    }
}

export default connect(mapStateToProps)(withRouter(PaymentOTP));