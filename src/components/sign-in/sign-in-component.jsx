import React, { useState } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input-component';
import CustomButton from '../custom-button/custom-button-component';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
  GoogleButtonStyles,
} from './sign-in-styles';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user-actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password.</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={email}
          handleChange={handleChange}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />

        <ButtonsBarContainer>
          <CustomButton type='submit'>Sign In</CustomButton>
          <GoogleButtonStyles
            type='button dark'
            type='dark'
            onClick={googleSignInStart}
          />
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(withAlert()(SignIn));
