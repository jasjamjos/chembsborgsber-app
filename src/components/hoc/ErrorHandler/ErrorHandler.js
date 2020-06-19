import React, { useState ,useEffect } from 'react';

import Modal from '../../UI/Modal/Modal';
import Aux from '../Aux';

const errorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    useEffect(() => {
      let x,y
      const watchError = () => {
        x = axios.interceptors.request.use(request => {
          setError(null)
          return request;
        });
        
        y = axios.interceptors.response.use(
          response => response,
          error => {
            setError(error)
          }
        );
      };
      
      watchError();

      return () => {
        axios.interceptors.request.eject(x);
        axios.interceptors.response.eject(y);
      }
    },[])

    const errorConfirmedHandler = () => {
      setError(null)
    }

    return(

      <Aux>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}
        >
          {error && error.message}
        </Modal>
      <WrappedComponent {...props}></WrappedComponent>
    </Aux>
    );
  }
}

export default errorHandler;