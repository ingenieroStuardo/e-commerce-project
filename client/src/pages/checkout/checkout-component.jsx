import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart-selector';

import CheckoutItem from '../../components/checkout-item/checkout-item-component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button-component';

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer,
} from './checkout-styles';

const month = new Date().getMonth() + 1;
const year = new Date().getFullYear().toString().substr(-2);

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalContainer>TOTAL: ${total}</TotalContainer>
    <WarningContainer>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: {month < 10 ? `0${month}` : `${month}`}/{year}{' '}
      - CVV: 123
    </WarningContainer>
    <StripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
