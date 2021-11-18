import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Link from 'next/link'
import { PaginationItem } from '@material-ui/lab';
import { CollectionsOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center'
    },
  },
}));




export function Paginate(props) {

  const classes = useStyles();
console.log(props)

  // onChange gives you event and number which clicked on it :
  const handlePageChange = async (event, pageNumber) => {
    console.log(pageNumber, 'pageNumber')
    props.clickedPage(pageNumber)  
    const {field,pathSection}=props
    const url=`/${field}/${pathSection}/${pageNumber}`
    window.history.pushState({}, '', url);
  }

  return (
    
    <div dir='ltr' className={classes.root}>
      <Pagination
        // boundaryCount={props.defaultPage}
        // variant='outlined'
        page={props.currentPage}
        count={props.numberOfPages}
        // defaultPage={0}
        onChange={handlePageChange}
        color='primary'
        // renderItem={(item) => {
        //   const {field,pathSection}=props
        //   const path=`/${field}/${pathSection}/${item.page}`
        //   return  <PaginationItem
        //   component={Link}
        //   //  creating address for the Link 
        //   href={path}
        //   {...item}
        // />
        // }
         
        // }
      />

    </div>
  );
}

