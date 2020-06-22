import React, { useState, useEffect } from 'react';

import { BurgerBuilderAPI } from '../api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await BurgerBuilderAPI.get('/orders.json');
      const cleaned_data = Object.entries(data).map(([_, value]) => {
        return value;
      });
      console.log(cleaned_data)
      return cleaned_data;
    }

    setOrders(fetchOrders());
  }, [])

  const orderList = orders.map((e) => {
    console.log(e)
  })

  return (
    <div></div>
  );
}

export default Orders;
