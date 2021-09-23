import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { getListIcons } from 'api/API';
import { wordToPersian } from 'utils/convertNameToPersian'
import { ListSubheader } from '@material-ui/core';
import IconGenerator from './IconGenerator.component'
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
// import NavButtons from 'layouts/components/StoreHeader/component/NavButtons.component'
import persiaIcon from 'public/logo/persia-icon.png'
import logoText from 'public/logo/logotext.png'
import { SearchField } from 'layouts/components/SearchField.component'
import CartButton from 'layouts/components/CartButton.component'
import Spinner from 'components/Backdrop';
import { Button } from '@material-ui/core';
import Router from 'next/router';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));




const style = {
  logoContainer: {
    // display:'inline-block'
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // padding: '5px'
    justifyContent: 'space-between',
  },
}
// const theme = createTheme({
//   direction: 'rtl', // Both here and <body dir="rtl">
//   // fontFamily: Yekan
// });

// Configure JSS
// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    left: 'auto',
    right: 0,

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // backgroundColor: ''
  },
  drawer: {
    width: drawerWidth,
    // flexShrink: 0,
    overflow: 'auto',


    [theme.breakpoints.down('sm')]: {
      display: 'none',
      width: 0,
      // margin: '0 20px',
      // padding: 5,
      // marginTop: 2
    },

  },
  // drawerPaper: {
  //   width: drawerWidth,
  //   // overflow: 'auto',
  //   // height: '100%',
  //   overflow:'none',
  //   height:1000

  // },
  drawerContainer: {

    // overflow: 'hidden',

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
  inline: {
    margin: 0,
    padding: 0
  },
  text: {
    margin: 0,
    padding: 0,
    color: '#666',
    textAlign: 'right',
    direction: 'rtl',
  },
  list: {
    margin: 0,
    padding: 0,
    direction: 'rtl',
  },
  listItem: {
    padding: '0 15px',

  },
  link: {
    textDecoration: 'none',
    color: 'black',
    // direction: 'rtl',

  },
  title: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginRight: theme.spacing(2)
  },
  badge: {
    marginRight: theme.spacing(1)
  },
  icon: {
    fontSize: 30
  },
  cartIcon: {
    fontSize: 24
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  searchContainer    : {
    display: 'flex',
  }

}));



export function ListMenu({ children }) {
  const theme = useTheme();

  const classes = useStyles();

  const [loading, setLoading] = useState(false)
  Router.onRouteChangeStart = () => {
    setLoading(true)
  }

  Router.onRouteChangeComplete = () => {
    setLoading(false)
  }


  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [iconList, setIconList] = useState()

  useEffect(() => {

    ((async () => {
      if (!iconList) {
        const { data } = await getListIcons()
        setIconList(data)
      }
    }))()

  }, [iconList])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="span">


            {/* <Typography variant="h6" className={classes.title}> */}
              <Link href='/' passHref >
                <div style={style.logoContainer}>

                  {/* <Typography className={classes.title} noWrap> */}

                  <Image className={'next-image-logoText'} src={logoText} alt='logoText' height='37' width='160' />

                    <div className={classes.searchContainer}>
                      <a href='/admin/login'><Button color="inherit" className={classes.button}>مدیریت</Button></a>
                      <Link href='/cart' passHref>
                        <CartButton />

                      </Link>
                    </div>

                    <SearchField />

                    <Image src={persiaIcon} className={'next-image-logo'} alt='logo' height='50' width='50' />

                  {/* </Typography> */}

                </div>
              </Link>
              <Spinner open={loading} />
              {/* <div className={classes.grow} /> */}

            {/* </Typography> */}
            {/* <div dir='rtl' >
              <a href='/admin/login'><Button color="inherit" className={classes.button}>مدیریت</Button></a>

              <Typography>
              <Link href='/cart' passHref >

                <a style={style.logoContainer}>

                  <Typography className={classes.title} noWrap>
                  مدیریت
                  </Typography>

                </a>
              </Link>

              </Typography>
              <CartButton />

            </div> */}

          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader style={{ backgroundColor: '#3f51b5', boxShadow: '0 4px 3px #aaa' }}>
          <Image className={'next-image-logoText'} src={logoText} alt='logoText' height='37' width='160' />

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {

            iconList && iconList.map((item, index) => {
              return (
                <List className={classes.list} key={index}>
                  <ListSubheader color={'secondary'} className={classes.subHeader}>

                    <IconGenerator fa_iconName={item.icon} />
                    <span style={{ backgroundColor: 'white' }}>  {wordToPersian(item.group)} </span>

                  </ListSubheader>


                  {item.subgroup.map((text, index) => (

                    <Link href={`/home/${item.group}/${text}/1`} className={classes.link} key={text} passHref >
                      <ListItem className={classes.listItem} alignItems={'start'} button >
                        <ListItemText className={classes.text} disableTypography={true}>
                          {wordToPersian(text)}
                        </ListItemText>
                      </ListItem>
                    </Link>

                  ))}
                </List>
              )
            })
          }

        </List>
        <Divider />
        {/* <List>
          <ListSubheader color={'secondary'} className={classes.subHeader}>

            <IconGenerator fa_iconName={item.icon} />
            <span style={{ backgroundColor: 'white' }}>  {wordToPersian(item.group)} </span>

          </ListSubheader>


          {item.subgroup.map((text, index) => (

            <Link href={`/home/${item.group}/${text}/1`} className={classes.link} key={text} passHref >
              <ListItem className={classes.listItem} alignItems={'start'} button >
                <ListItemText className={classes.text} disableTypography={true}>
                  {wordToPersian(text)}
                </ListItemText>
              </ListItem>
            </Link>

          ))}
        </List> */}
      </Drawer>
    </Box>
  );
}
