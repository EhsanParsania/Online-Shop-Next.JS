import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import  Link  from 'next/link';


import {SimpleRating} from 'components/common/index'


import { BASE_URL } from 'api/Variables.api';



function MediaCard(props) {

  // const randomRate = () => {
  //   const rate = Math.floor(Math.random()*4)+1 
  //   console.log(rate)
  //   return rate
  // }


 var useStyles = makeStyles({
  root: {
    width: (window.screen.width-320)/3,
    // padding:'15px',
    margin: '20px 20px 20px',
    // height: 160,
    '&:hover':{
      boxShadow: '0 5px 4px #bbb',


      }


  },
  media: {
    minHeight: 100,
    minWidth: 100,
    // border: '1px solid #eee',
    borderRadius: '6px',
    // boxShadow: '0 6px 2px #ddd',




  },
  CardActionArea: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '10px'
  },
  content: {
    minWidth: 230,
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    
  },
  link: {
    textDecoration: 'none',
    // minHeight:160
  },
  title: {
    // minHeight: 35
    fontSize: 14
  }
});




  const classes = useStyles();

  return (
    <Link href={`/home/products/${props.group}/${props.subgroup}/${props.id}`} className={classes.link}>
      <Card className={classes.root} raised='true' >
        <CardActionArea className={classes.CardActionArea} >
          <CardMedia
            className={classes.media}
            image={`${BASE_URL}${props.image}`}
            title={props.name}
          />
          <CardContent className={classes.content} >
            <Typography gutterBottom variant="p" component="h4" className={classes.title}>
              {props.name}
            </Typography>

            <SimpleRating />


            <Typography variant="body2" color="textSecondary" component="p">
              {props.price}  تومان
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
      </Card>
    </Link>
  );
}


export { MediaCard }




