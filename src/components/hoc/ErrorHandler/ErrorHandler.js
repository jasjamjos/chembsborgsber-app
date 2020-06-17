import React, { useState ,useEffect } from 'react';

import Modal from '../../UI/Modal/Modal';
import Aux from '../Aux';

const errorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    useEffect(() => {
      const watchError = () => {
        axios.interceptors.request.use(request => {
          setError(null)
          return request;
        });
        
        axios.interceptors.response.use(
          response => response,
          error => {
            console.log("ERRORISTA")
            setError(error)
          }
        );
      };
      
      watchError();
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