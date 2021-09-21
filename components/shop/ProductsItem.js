import Link from 'next/link'

import { IMAGE_URL } from 'configs'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    cart: {
        borderRadius: 5,
        boxShadow: '0 0 0 1px rgb(0 0 0 / 12%)',
        [theme.breakpoints.up('md')]: {
            padding: 6
        },
        cursor: 'pointer'
    },
    image: {
        [theme.breakpoints.up('xl')]: {
            width: theme.spacing(22),
            height: theme.spacing(22),
            padding: theme.spacing(1)

        },
        [theme.breakpoints.down('lg')]: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            padding: theme.spacing(1)

        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(18),
            height: theme.spacing(18),
            padding: theme.spacing(1)
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: theme.spacing(1)
    }
}))

export default function ProductsItem({ product: { id, name, image, price } }) {
    const classes = useStyles()

    return (
        <div className={classes.cart}>
            <Link href={`/product/${id}`} >
                <Grid container >
                    <Grid item xs={5}>
                        <Avatar variant="rounded" src={IMAGE_URL + image} className={classes.image}>
                            {!image && 'No Image'}
                        </Avatar>
                    </Grid>
                    <Grid item xs={7} className={classes.details}>
                        <Typography variant="body2">{name}</Typography>
                        <Typography variant="body1" >{price} تومان</Typography>
                    </Grid>
                </Grid>
            </Link>
        </div >
    )
}