import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// import MainLayout from 'layouts/mainLayout'

// API
// import { getProducts, getProduct } from 'api/products.api'
import { getOneProduct } from 'api/API'
import { getCategories } from 'api/categories.api'

import { IMAGE_URL } from 'configs'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { IoMdArrowDropleft, IoMdAddCircleOutline } from 'react-icons/io'
// import removeExistsStaticPages from 'utils/removeExistsStaticPages'

// my own imports
import { useRouter } from 'next/router'
import { ProductDetails } from 'components/customers/productDetails/ProductDetails.page'



const useStyles = makeStyles((theme) => ({
    spinner: {
        display: 'flex',
        justifyContent: 'center'
    },
    box: {
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(4)
        }
    },
    imageBox: {
        position: 'relative',
        '&::after': {
            content: '""',
            display: 'block',
            paddingBottom: '100%'
        }
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        [theme.breakpoints.up('sm')]: {
            border: '1px solid rgb(0 0 0 / 10%)'
        }
    },
    noImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'whitesmoke'
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    detailsHeader: {
        flex: '1 1 0%'
    },
    marginT2: {
        marginTop: theme.spacing(2)
    },
    marginT4: {
        marginTop: theme.spacing(4)
    },
    quantity: {
        width: 100
    },
    addToCart: {
        height: 56,
        marginRight: theme.spacing(2),
        color: '#fff',
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        }
    },
    hr: {
        width: '100%',
        borderTop: '1px solid #e4e4e4'
    }
}))

export default function ProductPage({ product, categories }) {

    const classes = useStyles()
    const [quantity, setQuantity] = useState(0)
    const [productData, setProductData] = useState()
    const router = useRouter()

    useEffect(() => {
        console.log('all started')
        if(router.query && router.query.all){
            const [group, subgroup, id] = router.query.all
            console.log(group)
            setProductData({
                group,
                subgroup,
                id
            })
            console.log(router.query)
        }
       
    }, [router.query])

    const handleCart = (quantity) => {
        // const cartProductIndex = carts.findIndex(item => item.id === product.id)

        // const { id, name, price } = product
        // if (cartProductIndex !== -1) {
        //     updateCart(cartProductIndex, { quantity })
        // } else {
        //     addCart({ id, name, price, quantity })
        // }
    }

    const handleClick = () => {
        // if (quantity > 0) {
        //     if (quantity < +product.quantity + 1) {
        //         handleCart(quantity)
        //     } else {
        //         setAlert(`تعداد کالا بیشتر از موجودی انبار می باشد، موجودی انبار ${product.quantity} عدد می باشد`, 'warning')
        //     }
        // } else {
        //     setAlert('تعداد کالا به درستی وارد نشده است', 'error')
        // }
    }

    if (productData && productData.group) {
        return (
            <ProductDetails group={`${productData.group}`} id={`${productData.id}`} />
        )
    } else {
        return false
    }

    // }

    // export async function getStaticPaths() {
    //     const products = await getProducts()

    //     const paths = products.slice(0, 1).map((product) => ({
    //         params: { id: product.id.toString() },
    //     }))

    //     return {
    //         paths,
    //         fallback: true,
    //     }
    // }

    // export async function getStaticProps({ params: { id } }) {
    //     const product = await getProduct(id)
    //     const categories = await getCategories()

    //     if (!product) {
    //         const removeResult = await removeExistsStaticPages(
    //             ['product'],
    //             id,
    //             '.html',
    //             'Data not found but File exists. Deleting now ...',
    //             'Data and File not found.'
    //         )
    //         console.log(removeResult)

    //         return {
    //             notFound: true,
    //         }
    // }

    // return {
    //     props: {
    //         product,
    //         categories
    //     },
    //     revalidate: 1
    // }
}
