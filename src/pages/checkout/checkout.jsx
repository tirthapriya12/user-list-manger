import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DefaultPageLayout from '../../components/layout/default-page-layout';
import Card from '../../components/card/card';
import PaymentInfo from '../../components/payment-info/payment-info';
import { setPaymenDetails } from '../../actions/paymentAction';

class CheckoutPage extends React.Component {


    constructor(props) {

        super(props);
        this.state = {
            checkoutItem: null,
            paymentDetails: null
        }
    }

    componentDidMount() {
        this._selectCheckoutItem();
    }


    _selectCheckoutItem() {
        const { recipeId } = this.props.match.params
        const recipes = this.props.recipes;

        if (!recipes[recipeId]) {
            this.props.history.goBack();
            return;
        }

        this.setState({
            checkoutItem: recipes[recipeId]
        })
    }

    onCheckoutClick(paymentDetails) {
        this.props.setPaymenDetails({
            ...paymentDetails,
            itemPurchased: this.state.checkoutItem
        });
        this.props.history.push('/payment');
    }

    render() {
        const checkoutItem = this.state.checkoutItem;

        return (
            <DefaultPageLayout headerTitle="Recipe checkout">
                <div className="checkout-container">
                    {
                        checkoutItem &&
                        <Card image={checkoutItem.image}
                            name={checkoutItem.name}
                            price={checkoutItem.price} />
                    }
                    <PaymentInfo onCheckout={this.onCheckoutClick.bind(this)} />
                </div>
            </DefaultPageLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPaymenDetails: () => (dispatch(setPaymenDetails())),
    }
};

const mapStateToProps = (state) => {
    const { recipes } = state;
    return {
        recipes: recipes.recipes
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutPage));