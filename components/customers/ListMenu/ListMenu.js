import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Image from 'next/image';
import CartButton from './component/CartButton.component'
import { SearchField } from './component/SearchField.component'
import persiaIcon from 'public/logo/persia-icon.png'
import logoText from 'public/logo/logotext.png'

import Link from 'next/link';
import { ListSubheader } from '@material-ui/core';
import { IconGenerator } from './component/IconGenerator.component';

import { getListIcons } from 'api/API';

import { wordToPersian } from 'utils/convertNameToPersian'




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 0
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% )`,
      marginLeft: drawerWidth,
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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  subHeader: {
    color: '#222',
    fontWeight: 600,
    margin: 0,
    fontSize: 14,
    // paddingLeft:180
    marginLeft: 100
    // padding:0
  },
  spacer: {
    flexGrow: 1,
  },
  text: {
    margin: 0,
    padding: 0,
    color: '#666',
    display: 'flex',
    justifyContent: 'start',
  },
  list: {
    margin: 0,
    padding: 0,

  },
  listItem: {
    padding: '0 15px'
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  }
}));

function ListMenu(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [iconList, setIconList] = useState()

  useEffect(() => {
    (async () => {
      const { data } = await getListIcons()
      setIconList(data)

      console.log(iconList)
    })()

  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <div className={classes.drawerContainer}>


          {

            iconList ?
              (iconList.map((item, index) => {
                return (
                  <List className={classes.list} key={index}>
                    <ListSubheader color={'secondary'} className={classes.subHeader}>

                      <IconGenerator fa_iconName={item.icon} />
                      <span style={{ backgroundColor: 'white' }}>  {wordToPersian(item.group)} </span>

                    </ListSubheader>


                    {item.subgroup.map((text, index) => (

                      <Link href={`/home/${item.group}/${text}/1`} className={classes.link} key={index}>
                        <ListItem className={classes.listItem} button key={text}>
                          <ListItemText className={classes.text} disableTypography={true} >
                            {wordToPersian(text)}
                          </ListItemText>
                        </ListItem>
                      </Link>

                    ))}
                  </List>
                )
              }))
              :
              false
          }
        </div>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <div>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>


            <Image src={persiaIcon} className={'next-image-logo'} alt='logo' height='50' width='50' />
            <Typography className={classes.title} noWrap>

              <Image className={'next-image-logoText'} src={logoText} alt='logoText' height='37' width='160' />
            </Typography>

            {/* <div className={classes.spacer}>
          </div> */}

            <CartButton />
            <SearchField />

          </Toolbar>
        </div>

      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
              keepMounted: true, // Better open performance on mobile.
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
        {props.children}
      </main>
    </div>
  );
}

ListMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export { ListMenu };
