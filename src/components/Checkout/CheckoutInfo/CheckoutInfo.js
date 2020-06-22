import React, { useState } from 'react';

import { BurgerBuilderAPI } from '../../api';

import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import classes from './CheckoutInfo.module.css';

const CheckoutInfo = (props) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  });

  const [loading, setLoading ]= useState(false);

  const handlePersonalInfo = async (event) => {
    event.preventDefault();
    setLoading(true);

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: 'Jasper Jose',
        email: 'jasjamjos@gmail.com',
        address: {
          street: 'Test Street 69',
          zipcode: '8000',
          country: 'Finland'
        }
      },
      deliveryMethod: 'fastest'
    }

    await BurgerBuilderAPI.post('/orders.json', order)
    .then((response) => {
      setLoading(false)
      props.history.push('/');
    }).catch((error) => {
      setLoading(false)
      props.history.push('/');
    });

    setPersonalInfo(personalInfo);
  }

  let form = (
    <form>
      <input className={classes.Input} type="text" name="name" placeholder="Your name" />
      <input className={classes.Input} type="text" name="email" placeholder="Your mail" />
      <input className={classes.Input} type="text" name="street" placeholder="Street" />
      <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
      <Button btnType="Success" clicked={handlePersonalInfo}>ORDER</Button>
    </form>
  );

  loading && (form = <Spinner />);

  return (
    <div className={classes.CheckoutInfo}>
      <h4>Fill out required information</h4>
      { form }
    </div>
  );
}

export default CheckoutInfo;