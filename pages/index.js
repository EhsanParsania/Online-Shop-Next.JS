import Head from 'components/Head'
import ProductItem from 'components/shop/ProductsItem'

// API
import { getCategories } from 'api/categories.api'
import { getCategorizedProducts } from 'api/products.api'

import { HOME_CATEGORIZED_PRODUCTS_LIMIT } from 'configs'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import MainLayout  from 'layouts/MainLayout'
import { MainCustomers } from 'components/customers/MainCustomers/MainCustomers.page'

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}))

export default function HomePage({ categorizedProducts }) {
  const classes = useStyles()

  return (
    <>
      <Head title=" پارسیان" />
      <MainLayout>
        {/* {categorizedProducts.map((item, index) => (
          <div key={index}>
            <Typography variant="h6">کالا های گروه {item.name.replace('کالاهای', '')}</Typography>
            <Grid container spacing={2} className={classes.box}>
              {
                item.data.map(product => (
                  <Grid key={product.id} item xs={12} sm={6} md={6} lg={4} xl={3} >
                    <ProductItem product={product} />
                  </Grid>
                ))
              }
            </Grid>
          </div>
        ))
        } */}
        <MainCustomers/>

      </MainLayout>
    </>
  )
}

export async function getStaticProps() {
  const categories = await getCategories()
  const categorizedProducts = await getCategorizedProducts(categories, HOME_CATEGORIZED_PRODUCTS_LIMIT)

  return {
    props: { categorizedProducts },
    revalidate: 1
  }
}