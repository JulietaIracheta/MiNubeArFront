
import React from 'react';
import { store } from "../../actions/store";
import { Provider } from "react-redux";
import Usuario from './Usuario';
import {Button} from 'reactstrap';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import {Link} from 'react-router-dom';

function Registro() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Usuario />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default Registro;