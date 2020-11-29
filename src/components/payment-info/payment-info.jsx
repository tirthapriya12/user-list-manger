import React, { useState } from 'react';
import './payment-info.scss';

const PaymentInfo = (props) => {

    const [paymentState, setState] = useState({});

    const onCheckout = (event) => {
        event.preventDefault();
        const isValid = !!paymentState.card_number && !!paymentState.cvv && !!paymentState.expiry_month && !!paymentState.expiry_year;
        if (!isValid) return alert("enter all required details");
        props.onCheckout(paymentState);
    }

    const onInput = (event) => {
        setState({
            ...paymentState,
            [event.target.name]: event.target.value
        })
    }
    
    return (
        <section className="payment-info">
            <form onSubmit={onCheckout}>
                <span className="card-name">
                    <label>Name: </label>
                    <input type="text" onChange={onInput} name="card_name" placeholder="name on card" />
                </span>
                <br />
                <span className="card-number">
                    <label>Card number: </label>
                    <input type="text" onChange={onInput} name="card_number" placeholder="card number" />
                </span>
                <br />
                <span className="card-expiry">
                    <label>Card expiry </label>
                    <input type="text" onChange={onInput} name="expiry_month" placeholder="MM" />
                    {'/'}
                    <input type="text" onChange={onInput} name="expiry_year" placeholder="YY" />
                </span>
                <span className="card-cvv">
                    <label>CVV Code: </label>
                    <input type="text" onChange={onInput} name="cvv" placeholder="xxx" />
                </span>
                <br />
                <button className="checkout-btn" type="submit">Checkout</button>
            </form>
        </section>
    )
}

export default PaymentInfo;