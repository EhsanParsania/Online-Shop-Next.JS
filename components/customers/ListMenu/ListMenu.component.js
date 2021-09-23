import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ListSubheader } from '@material-ui/core';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import Yekan from '../../asset/font/Yekan.ttf'
import { Link } from 'next/link';
// import { Plus } from 'react-icons/fa'
// import { PlusOne } from '@material-ui/icons';
import IconGenerator from './IconGenerator.component'
import { getListIcons } from 'api/API';
import { wordToPersian } from 'utils/convertNameToPersian'



const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
  // fontFamily: Yekan
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // left: 'auto',
    // right: 0,
    // textAlign: 'start',


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

  },
  list: {
    margin: 0,
    padding: 0,

  },
  listItem: {
    padding: '0 15px',

  },
  link: {
    textDecoration: 'none',
    color: 'black',
  }

}));

export function ListMenu(props) {
  const classes = useStyles();

  const [iconList, setIconList] = useState()

  useEffect(() => {


    const { data } = getListIcons()
    setIconList(data)



  }, [])
  return (

    <div className={classes.root} >

      <ThemeProvider theme={theme}>
        <div dir='rtl'>

          <CssBaseline />

          <StylesProvider jss={jss}>


            <Drawer
              // anchor="right"
              className={classes.drawer}
              variant="permanent"
            >
              <Toolbar />
              <div className={classes.drawerContainer}>


                {

                  iconList && iconList.map((item, index) => {
                    return (
                      <List className={classes.list} key={index}>
                        <ListSubheader color={'secondary'} className={classes.subHeader}>

                          <IconGenerator fa_iconName={item.icon} />
                          <span style={{ backgroundColor: 'white' }}>  {wordToPersian(item.group)} </span>

                        </ListSubheader>

                        <ListItem className={classes.listItem } button >
                          {item.subgroup.map((text, index) => (

                            <Link href={`/home/${item.group}/${text}/1`} className={classes.link} key={text} passHref >

                              <ListItemText className={`${classes.text} list-item-rtl`} disableTypography={true}>
                                {wordToPersian(text)}
                              </ListItemText>
                            </Link>

                          ))}
                        </ListItem>
                      </List>
                    )
                  })
                }


              </div>
            </Drawer>

          </StylesProvider>
        </div>
      </ThemeProvider>


      <main className={classes.content}>
        <Toolbar />

        {props.children}

      </main>
    </div >
  );
}



