import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link'
import Spinner from 'components/Backdrop';

// UI
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'

import { IoMdCart } from 'react-icons/io'
import Image from 'next/image';
// import NavButtons from 'layouts/components/StoreHeader/component/NavButtons.component'
import persiaIcon from 'public/logo/persia-icon.png'
import logoText from 'public/logo/logotext.png'
import { SearchField } from 'layouts/components/SearchField.component'
import CartButton from 'layouts/components/CartButton.component'




const style = {
    logoContainer: {
        // display:'inline-block'
        display: 'flex',
        alignItems: 'center',
        // padding: '5px'
    },
}

const useStyles = makeStyles((theme) => ({
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
}))

const Header = () => {
    const classes = useStyles()

    const [loading, setLoading] = useState(false)
    Router.onRouteChangeStart = () => {
        setLoading(true)
    }

    Router.onRouteChangeComplete = () => {
        setLoading(false)
    }

    const cart = (
        <Badge badgeContent={3} className={classes.badge} color="secondary">
            <IoMdCart className={classes.cartIcon} />
        </Badge>
    )

    return (
        <AppBar position="sticky">
            <Toolbar>
                {/* <StoreHeader /> */}
                {/* <Typography variant="h6" className={classes.title}>
                    <Link href='/'>
                        فروشگاه
                    </Link>
                    <Spinner open={loading} />
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    <a href='/admin/login'><Button color="inherit" className={classes.button}>مدیریت</Button></a>
                    <Link href='/cart' passHref>
                        <Button color="inherit">
                            {cart}
                            سبد خرید
                        </Button>
                    </Link>
                </div>
                <div className={classes.sectionMobile}>
                    <a href='/admin/login'><Button color="inherit" className={classes.button}>مدیریت</Button></a>
                    <Link href='/cart' passHref>
                        <Button color="inherit">
                            {cart}
                        </Button>
                    </Link>
                </div> */}






                <Typography variant="h6" className={classes.title}>
                    <Link href='/' passHref >
                        <div style={style.logoContainer}>

                            <Image src={persiaIcon} className={'next-image-logo'} alt='logo' height='50' width='50' />
                            <Typography className={classes.title} noWrap>

                                <Image className={'next-image-logoText'} src={logoText} alt='logoText' height='37' width='160' />
                            </Typography>

                        </div>
                    </Link>
                    <Spinner open={loading} />
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                    {/* <a href='/admin/login'><Button color="inherit" className={classes.button}>مدیریت</Button></a> */}

                    {/* <Typography> */}
                    <Link href='/cart' passHref >
                        
                        <a style={style.logoContainer}>

                            {/* <Typography className={classes.title} noWrap> */}
                                مدیریت
                            {/* </Typography> */}

                        </a>
                    </Link>

                    {/* </Typography> */}
                    <CartButton />

                </div>
                <div className={classes.sectionMobile}>
                    <a href='/admin/login'><Button color="inherit" className={classes.button}>مدیریت</Button></a>
                    <Link href='/cart' passHref>
                        <CartButton />

                    </Link>
                </div>
                <SearchField />





            </Toolbar>
        </AppBar>
    )
}

export default Header