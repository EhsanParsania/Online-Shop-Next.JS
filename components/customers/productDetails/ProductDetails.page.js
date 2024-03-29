import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// import { CssBaseline } from '@material-ui/core';
import { BASE_URL } from '../../../api/Variables.api';
import  {BreadCrumb}  from './component/BreadCrumb.component';
import  MainLayout  from 'layouts/MainLayout';
import { Toolbar } from '@material-ui/core'
import { InputNumber } from './component/InputNumber.component';
// import { withRouter } from 'react-router-dom';
import { getOneProduct } from 'api/API';
import { Markup } from 'interweave';
import { SimpleRating } from 'components/customers/SimpleRating.component'
// import { connect } from 'react-redux';
// import { addProductToCart, deleteCart } from '../../../redux/actions';
import { toEnglishDigit } from 'utils/convertNumber';
// import { toast } from 'react-toastify';
import ConfirmModal from './component/ConfirmModal.component'





const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minHeight: 610,
    padding: 15,
    margin: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  topContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    cursor: 'unset',
    marginBottom: 20

  },
  image: {
    width: 360,
    height: 360,
  },
  leftContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',

  },
  inputNumber: {
    marginLeft: 20,
    width: 60
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    color: '#777'

  },
  rateContainer: {
    display: 'flex',

  },
  supplyText: {
    paddingBottom: 20,
    fontSize: 16
  },
  supplyNumber: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18
  }
});



function ProductDetails(props) {
  const classes = useStyles();

  const [product, setProduct] = useState()
  const [number = 1, setNumber] = useState()
  const [supply, setSupply] = useState()

  const getDataWithParams = async () => {
    try {
      console.log('data fetched')
      const { group, id } = props
      const { data: product } = await getOneProduct(group, id)
      await setProduct(product)
    }
    catch (error) {
      console.log(error.messege)
    }
  }



  useEffect(() => {
    console.log('in product details started')
    getDataWithParams()
    // const EN_digit_supply = toEnglishDigit(product.supply)
    // setSupply(EN_digit_supply)
    // console.log(EN_digit_supply)
  }, [])

  const addToBuyList = (flag) => {
    if (flag == 'true') {
      const { id, name, group, price, subgroup, image } = product
      const orderId = props.cart.length

      const data = {
        productId: id,
        productName: name,
        group: group,
        subgroup: subgroup,
        number: parseInt(number),
        id: orderId,
        productPrice: price,
        image: image
      }

      props.addProductToCart(data)
      toast.info(<p dir='rtl'> &emsp;<strong> ✔ </strong> &ensp;کالا به سبد خرید اضافه شد   </p>, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  if (product) return (
    <MainLayout style={{ flexDirection: 'column' }}>
      <Toolbar />
      {/* <CssBaseline /> */}
      <Card className={classes.root} raised={true}>
        <div className={classes.topContent} >

          <CardMedia className={classes.image}
            component="img"
            alt={product.name}
            height="140"
            image={`${BASE_URL}${product.image}`}
            title={product.name}
          />


          <CardContent className={classes.leftContent} >
            <Typography gutterBottom variant="h5" component="h2" >
              {product.name}
            </Typography>

            {/* <BreadCrumb {...product} /> */}


            <div className={classes.rateContainer}>
              <Typography variant="body2" color="textSecondary" component="p">

                امتیاز محصول

                <SimpleRating />

              </Typography>
            </div>
            {
              supply !== 0 ?

                <>
                  <Typography variant="body2" component="p" className={classes.supplyText}>

                    موجودی محصول : <span className={classes.supplyNumber} > {product.supply} </span> &nbsp; عدد

                  </Typography>

                  <div className={classes.buttonContainer} >
                    <InputNumber className={classes.inputNumber} onChange={(number) => setNumber(number)} max={toEnglishDigit(product.supply)} />

                    <ConfirmModal onClick={addToBuyList} />

                  </div>
                </>

                :

                <>
                  <Typography variant="body2" component="p" className={classes.supplyText}>

                    موجودی محصول : <span className={classes.supplyNumber} >اتمام موجودی</span>



                  </Typography>

                    <div className={classes.buttonContainer} >
                      <InputNumber disabled className={classes.inputNumber} onChange={(number) => setNumber(number)} max={toEnglishDigit(product.supply)} />
                      <Button disabled variant='contained' color="secondary" onClick={addToBuyList} >
                        افزودن به سبد خرید
                      </Button>
                    </div>
                </>
            }

          </CardContent>

        </div>


        <Divider variant='middle' />
        <CardActions className={classes.bottomContent}>

          <Typography gutterBottom variant="h6" component="h6" >
            توضیحات محصول
          </Typography>

          <Markup content={product.information} />

        </CardActions>


      </Card>
    </MainLayout>
  );
  else return false
}



export { ProductDetails }












