import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BurgerBuilderAPI } from '../../api';


import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import classes from './CheckoutInfo.module.css';

const CheckoutInfo = (props) => {
  const formObj = (type, cType, placeholder, validation, isValid) => {
    let obj = {
      elementType: type,
      value: '',
      validation: validation,
      isValid: isValid,
      touched: false
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
    name: formObj('input', 'text', 'Your Name', { required: true }, false),
    email: formObj('input', 'text', 'Your Email', { required: true }, false),
    street: formObj('input', 'text', 'Street', { required: true }, false),
    postalCode: formObj('input', 'text', 'Postal Code', { required: true, minLength: 4, maxLength: 4 }, false),
    country: formObj('input', 'text', 'Country', { required: true }, false),
    deliveryMethod: formObj('select', [
      {value: 'fastest', displayValue: 'Fastest'},
      {value: 'cheapest', displayValue: 'Cheapest'},
    ], 'fastest', {}, true)
  });

  const [formIsValid, setFormIsValid] = useState(true);

  const inputValidation = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    } 

    return isValid;
  }

  const inputChangedHandler = (event, key) => {
    let newState = orderForm[key]
    newState.value = event.target.value;
    newState.isValid = inputValidation(newState.value, newState.validation);
    newState.touched = true;
    
    setOrderForm({...orderForm}, {key: newState})

    Object.entries(orderForm).map(([_, value]) => {
      return setFormIsValid(value.isValid && formIsValid);
    })
  }

  const [loading, setLoading ]= useState(false);

  const handleOrderForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = {};
    Object.entries(orderForm).map(([key, value]) => {
      return formData[key] = value.value;
    })

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      customer: {
        name: orderForm.name,
        email: orderForm.email,
        address: {
          street: orderForm.street,
          zipcode: orderForm.postalCode,
          country: orderForm.country
        }
      },
      deliveryMethod: orderForm.deliveryMethod
    }

    await BurgerBuilderAPI.post('/orders.json', order)
    .then((response) => {
      setLoading(false)
      props.history.push('/');
    }).catch((error) => {
      setLoading(false)
      props.history.push('/');
    });

  }

  const forElementsArray = [];

  Object.entries(orderForm).map(([key,el]) => {
    return forElementsArray.push({
      id:key,
      config: orderForm[key]
    })
  })

  let form = (
    <form onSubmit={handleOrderForm}>
      {forElementsArray.map((formElement) => {
        return (<Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => inputChangedHandler(event, formElement.id)}
          invalid={!formElement.config.isValid}
          touched={formElement.config.touched}
          shouldValidate={formElement.config.validation}
        />)
      })}
      <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(CheckoutInfo);