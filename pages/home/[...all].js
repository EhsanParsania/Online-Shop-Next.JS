import React, { Component } from 'react'
import { getFilteredProducts } from 'api/API'
import { Paginate, CardGroup, Spinner } from 'components/common/index'
// import { withRouter } from 'react-router'
import { isEqual } from 'lodash'

import { ListMenu } from 'components/customers/ListMenu/ListMenu'
import { withRouter } from 'next/router'


import { useRouter } from 'next/router'
import { useEffect } from 'react'

// const ProductsListt = (props) => {
//   const [pageNumber, setPageNumber] = React.useState(1)
//   const [numberOfPages, setNumberOfPages] = React.useState(1)
//   const [data, setData] = React.useState([{}])
//   const [group, setGroup] = React.useState('')
//   const [subGroup, setSubGroup] = React.useState('')
//   const [isLoading, setIsLoading] = React.useState(true)

//   console.log(props.router,'withrouter')

//   const path=useRouter()

//   useEffect(() => {

//     console.log(path)

//   }, [])

//   return (
//     <div>
//       HELLO
//     </div>
//   )
// }


class ProductsListtt extends Component {
  state = {
    pageNumber: 1,
    numberOfPages: '',
    data: [{}],
    group: '',
    subgroup: '',
    isLoading: true,
    path: '',
  }

  async componentDidMount() {
    // const [id,group,subgroup]=path.query.all
    // console.log(id,group,subgroup)
    // await this.setState({
    //   pageNumber: id,
    //   group,
    //   subgroup
    // })

    // await this.handleGetData(group, subgroup, id)
    // this.setState({ isLoading: false })
  }

  async componentDidUpdate(prevProps, prevState) {
    const newPath = this.getPath()
    const path = this.state.path


    if (path && !isEqual(path, newPath) || path === ''){
      console.log(newPath)

      this.setState({ path: newPath })
    }


    if (path && !isEqual(path, newPath)) {
      const [group, subgroup, id] = newPath.query.all
      await this.handleGetData(group, subgroup, id)
      await this.setState({ group: group, pageNumber: id, subgroup: subgroup })
      this.setState({ isLoading: false })
      console.log('3')

    }

  }


  // async shouldComponentUpdate(nextProps, nextState) {
  //   // const [group,subgroup,id] = this.state.path.query.all
  //   console.log(this.state.path.query)



  //   if(group && subgroup && id){
  //     await this.handleGetData(group, subgroup, id)
  //     await this.setState({ group: group, pageNumber: id, subgroup: subgroup })
  //     this.setState({ isLoading: false })
  //     return true
  //   }
  //   else return false
  // }


  handleGetData = async (group, subgroup, id = 1) => {
    const limit = 6

    try {
      const { data = [{}], headers } = await getFilteredProducts(group, subgroup, limit, id)
      const totalCount = headers ? headers['x-total-count'] : 1
      const numberOfPages = Math.ceil(totalCount / limit)
      console.log(numberOfPages)
      await this.setState({ data, numberOfPages, pageNumber: id, subgroup: subgroup, group: group })
    }
    catch (error) {
      console.log('get data failed with error ==> ', error.message)
    }
  }

  getPath() {
   return this.props.router
  }

  render() {
    return (
      <div>
        <ListMenu>
          {
            !this.state.isLoading ?
              <CardGroup data={this.state.data}>
                <Paginate numberOfPages={this.state.numberOfPages} clickedPage={async (clickedPage) => await this.setState({ clickedPage })} field={`home/${this.state.group}`} pathSection={this.state.subgroup} currentPage={this.state.id} />
              </CardGroup>
              :
              <section >
                {/* <CardGroup >
                </CardGroup> */}
                <Spinner />
              </section>
          }
        </ListMenu >
      </div>
    )
  }
}


const ProductsList = withRouter(ProductsListtt)
export default ProductsList
