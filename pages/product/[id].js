import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import MainLayout from 'layouts/mainLayout'

// API
import { getProducts, getProduct } from 'api/products.api'
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
import removeExistsStaticPages from 'utils/removeExistsStaticPages'

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

    if (product) {
        return (
            <MainLayout maxWidth='md'>
                <Grid container spacing={3} className={classes.box}>
                    <Grid item xs={12} sm={4} className={classes.imageBox}>
                        {product.image ? <Image src={product.image ? product.image : '/favicon.ico'} layout='fill' loader={({ src }) => {
                            return `${IMAGE_URL}${src}`
                        }} /> :
                            <div className={classes.image + ' ' + classes.noImage}>
                                <Typography variant="h6">بدون تصویر</Typography>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} sm={8} className={classes.details}>
                        <div className={classes.detailsHeader}>
                            <Typography variant="h6">{product.name}</Typography>

                            <Breadcrumbs className={classes.marginT2} separator={<IoMdArrowDropleft />} >
                                {product.categories.map((category, index, array) => {
                                    const findCategory = categories.find(item => item.name === category && item.slug)
                                    if (findCategory) {
                                        if (index === array.length - 1)
                                            return (
                                                <div key={category} style={{ color: '#000' }}>
                                                    <Link href={`/products/${findCategory.slug}`}>
                                                        {category}
                                                    </Link>
                                                </div>
                                            )
                                        else {
                                            return (
                                                <div key={category}>
                                                    <Link href={`/products/${findCategory.slug}`}>
                                                        {category}
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    }
                                }
                                )}
                            </Breadcrumbs>
                        </div>

                        {product.quantity === '0' ? <Typography variant="h6" color="error" className={classes.marginT2}>این محصول موجود نمی باشد</Typography> :
                            <>
                                <Typography variant="h6" className={classes.marginT2}>{product.price} تومان</Typography>
                                <div className={classes.marginT2}>
                                    <TextField
                                        className={classes.quantity}
                                        label="تعداد"
                                        type="number"
                                        variant="outlined"
                                        color="secondary"
                                        value={quantity}
                                        onChange={(e) => e.target.value >= 0 && setQuantity(e.target.value)}
                                    />
                                    <Button
                                        className={classes.addToCart}
                                        variant="contained"
                                        endIcon={<IoMdAddCircleOutline style={{ margin: 5 }} />}
                                        onClick={handleClick}
                                    >افزودن به سبد خرید</Button>
                                </div>
                            </>
                        }
                    </Grid>
                    <div className={classes.hr + ' ' + classes.marginT4}></div>
                    <Typography variant="subtitle1" className={classes.marginT4}>
                        {product.description}
                    </Typography>
                </Grid>
            </MainLayout >
        )
    } else {
        return null
    }

}

export async function getStaticPaths() {
    const products = await getProducts()

    const paths = products.slice(0, 1).map((product) => ({
        params: { id: product.id.toString() },
    }))

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params: { id } }) {
    const product = await getProduct(id)
    const categories = await getCategories()

    if (!product) {
        const removeResult = await removeExistsStaticPages(
            ['product'],
            id,
            '.html',
            'Data not found but File exists. Deleting now ...',
            'Data and File not found.'
        )
        console.log(removeResult)

        return {
            notFound: true,
        }
    }

    return {
        props: {
            product,
            categories
        },
        revalidate: 1
    }
}
