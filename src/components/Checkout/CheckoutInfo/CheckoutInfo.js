import React, { useState } from 'react';

import classes from './CheckoutInfo.module.css';
import Button from '../../UI/Button/Button';

const CheckoutInfo = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  })

  const handlePersonalInfo = () => {
    setPersonalInfo(personalInfo);
  }

  return (
    <div className={classes.CheckoutInfo}>
      <h4>Fill out required information</h4>
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="text" name="email" placeholder="Your mail" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal code" />
        <Button btnType="Success" clicked={handlePersonalInfo}>ORDER</Button>
      </form>
    </div>
  );
}

export default CheckoutInfo;