import React, { useState } from 'react';

import { BurgerBuilderAPI } from '../../api';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import classes from './CheckoutInfo.module.css';

const CheckoutInfo = (props) => {
  const formObj = (type, cType, placeholder) => {
    let obj = {
      elementType: type,
      value: ''
    }

    if (type === 'select') {
      obj.elementConfig = {
        options: cType
      }
    } else {
      obj.elementConfig = {
        type: cType,
        placeholder: placeholder
      }
    }

    return {...obj}
  }
  
  const [orderForm, setOrderForm] = useState({
    name: formObj('input', 'text', 'Your Name'),
    email: formObj('input', 'text', 'Your Email'),
    street: formObj('input', 'text', 'Street'),
    postalCode: formObj('input', 'text', 'Postal Code'),
    country: formObj('input', 'text', 'Country'),
    deliveryMethod: formObj('select', [
      {value: 'fastest', displayValue: 'Fastest'},
      {value: 'cheapest', displayValue: 'Cheapest'},
    ], 'Your Name')
  });


  const [loading, setLoading ]= useState(false);

  const handleOrderForm = async (event) => {
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

    // setOrderInfo(OrderInfo);
  }

  const forElementsArray = [];

  Object.entries(orderForm).map(([key,el]) => {
    forElementsArray.push({
      id:key,
      config: orderForm[key]
    })
  })

  let form = (
    <form>
      {forElementsArray.map((formElement) => {
        return (<Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={}
        />)
      })}
      <Button btnType="Success" clicked={handleOrderForm}>ORDER</Button>
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