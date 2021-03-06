import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useAlert } from 'react-alert';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const alert = useAlert();
  const publishableKey =
    'pk_test_51I9xtxIAD7VzYoW4xb83C7cbf095x1myhqqoDl3h2EuZr5TzyJmZDfl2K2b54goK8TUh7CdLjE5aODhIlRMl60v600YRkgUVFm';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(response => {
        alert.success('Successful Payment!!');
      })
      .catch(error => {
        console.log(error);
        alert.error(
          'There was an issue with yout payment. Please make sure you use the priveded credit card'
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='E Commerce Platform'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
