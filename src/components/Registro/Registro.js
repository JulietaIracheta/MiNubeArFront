import React,{useState} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItemLink from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Group from '@material-ui/icons/Group';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { store } from "../../actions/store";
import { Provider } from "react-redux";
import UsuarioForm from './UsuarioForm';
import NavAdmin from './NavAdmin'
import { ToastProvider } from "react-toast-notifications";
import { BorderColor, Business, MenuBook } from '@material-ui/icons';
import { Button } from 'reactstrap';
import {Search} from 'react-bootstrap-icons'

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
  const [estForm, setEst] = useState(false);
    const setEstForm = () => {
    setEst(!estForm);
  } 
  const [currentId, setCurrentId] = useState(0)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div/>
      <List>
      <ListItemLink button >
      <ListItemIcon><MenuBook /></ListItemIcon>
      <ListItemText primary="Historial"></ListItemText>
      </ListItemLink>
      <ListItemLink button onClick={() => setEstForm()}>
      <ListItemIcon><Group /></ListItemIcon>
      <ListItemText primary="Usuarios"></ListItemText>
      </ListItemLink>
      <ListItemLink button>
      <ListItemIcon><Business /></ListItemIcon>
      <ListItemText primary="Instituciones"></ListItemText>
      </ListItemLink>
      <ListItemLink button>
      <ListItemIcon><BorderColor /></ListItemIcon>
      <ListItemText primary="Cursos"></ListItemText>
      </ListItemLink>
      </List>
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Provider store={store}>
    <ToastProvider autoDismiss={true}>
    <NavAdmin />
    <div className={classes.root}>
      <CssBaseline />
    
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="adminContent"><span className="tituloadmin">Bienvenido Admin</span>
        <Button className="btn btn-primary menuadmin">Nuevo +</Button> 
        <Search className="lupa"/>
        </div>  
        {estForm &&
         <UsuarioForm {...({ currentId, setCurrentId })} />
        }
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
