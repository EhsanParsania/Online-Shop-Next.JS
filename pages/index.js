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
import MainLayout from 'layouts/MainLayout'
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

        <MainCustomers />

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