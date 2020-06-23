import React, { useState, useEffect } from 'react';

import Order from './Order/Order';
import { BurgerBuilderAPI } from '../api';
import ErrorHandler from '../hoc/ErrorHandler/ErrorHandler';

import Spinner from '../UI/Spinner/Spinner';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let orderList = [];
      await BurgerBuilderAPI.get('/orders.json')
        .then(({data}) => {
          Object.entries(data).map(([key, val]) => {
            orderList.push({...val, id: key});
          })
        })
        .catch((err) => {
          console.log(err)
        });

      setOrders(orderList);
    }

    fetchOrders();
  }, [])

  let orderList = <Spinner />;

  orders && (
    orderList = orders.map((order) => {
      return <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
    })
  );

  return (
    <div>
      {orderList}
    </div>
  );
}

export default ErrorHandler(Orders, BurgerBuilderAPI);
