import React from 'react';
import Modal from '../../components/UI/modal/Modal';
import Hoc from '../hoc/Hoc';
import setHttpErrorHandler from '../../hooks/http-error-handler';

const ErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = setHttpErrorHandler(axios);
        return (
            <Hoc>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Hoc>
        );
    };
};

export default ErrorHandler;