import React,{useState} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { store } from "../../actions/store";
import { Provider } from "react-redux";
import UsuarioForm from './UsuarioFormDoc';
import NavAdmin from './NavAdmin'
import { ToastProvider } from "react-toast-notifications";
import { Button } from 'reactstrap';
import {Search} from 'react-bootstrap-icons'
import Usuario from './Usuario';
import Sidebar from '../Sidebar';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    top: 'unset !important',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    margin : 0,
    paddingTop : 0,
    
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userOn, setUserOn] = useState(false);
  const [estForm, setEst] = useState(false);
  
  const setEstForm = () => {
    setEst(!estForm);
  } 
  const setUserNew = () => {
    setUserOn(true);
  } 


  const [currentId, setCurrentId] = useState(0)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Provider store={store}>
    <ToastProvider autoDismiss={true}>
    <NavAdmin />
    <div className={classes.root}>
      <CssBaseline />
    <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="adminContent"><span className="tituloadmin">Bienvenido Admin</span>
        {userOn && <Button className="btn btn-primary menuadmin" onClick={() => setEstForm()}>Nuevo +</Button> &&
        <Search className="lupa"/>}
        </div>  
  
        {userOn &&
        <Usuario />}
      </main>
    </div>
    </ToastProvider>
    </Provider>
  );
}

ResponsiveDrawer.propTypes = {

  window: PropTypes.func,
};

export default ResponsiveDrawer;
