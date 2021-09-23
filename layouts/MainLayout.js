import Header from 'layouts/components/Header'
import Footer from 'layouts/components/Footer'

// UI
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { ListMenu } from 'components/customers/ListMenu/ListMenu2.component'

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 164px)',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 116px)'
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4)
    }
  }
}))

export default function MainLayout({ children, maxWidth, pageTitle }) {
  const classes = useStyles()

  return (
    <>
      <Header />
      <Container component='main' maxWidth={maxWidth || 'xl'} className={classes.main}>
        <ListMenu>
          {/* {pageTitle && <Typography variant="h5">{pageTitle}</Typography>} */}
          {children}
        </ListMenu>
      </Container>
      <Footer />

    </>
  )
}