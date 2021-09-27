import React, { Component } from 'react'
import { getFilteredProducts } from 'api/API'
import { Paginate, Spinner } from 'components/common/index'
import { CardGroup } from 'components/customers/CardGroup/CardGroup.component'
import { withRouter } from 'next/router'


class ProductsListtt extends Component {
  state = {
    pageNumber: 1,
    numberOfPages: '',
    data: [{}],
    group: '',
    subgroup: '',
    isLoading: true
  }

  async componentDidMount() {
    const  [group, subgroup, id ] = this.props.router.query.all
    console.log('==================','pageNumber',this.state.pageNumber,'id',id,'=======================')

    await this.setState({
      pageNumber: id,
      group,
      subgroup
    })

    await this.handleGetData(group, subgroup, id)
    this.setState({ isLoading: false })
  }


  async shouldComponentUpdate(nextProps, nextState) {
    // const { id, subgroup } = this.props.match.params
    const [newGroup, newSubgroup, newId] = nextProps.router.query.all

    if (this.state.pageNumber !== newId|| this.state.subgroup !== newSubgroup || this.state.group !== newGroup) {


      // const subgroup = nextProps.match.params.subgroup
      // const id = nextProps.match.params.id
      // const group = nextProps.match.params.group
      await this.handleGetData(newGroup, newSubgroup, newId)
      await this.setState({ group: newGroup, pageNumber: newId, subgroup: newSubgroup })
      this.setState({ isLoading: false })
      return false
    }
    else return false
  }


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

  render() {
    return (
      <div>
        {/* <ListMenu> */}
        {
          !this.state.isLoading ?
            <CardGroup data={this.state.data}>
              <Paginate numberOfPages={this.state.numberOfPages} clickedPage={async (clickedPage) => await this.setState({ clickedPage })} field={`home/${this.state.group}`} pathSection={this.state.subgroup} currentPage={this.state.pageNumber} />
            </CardGroup>
            :
            <section >
              <CardGroup >
              </CardGroup>
              <Spinner />
            </section>
        }
        {/* </ListMenu > */}
      </div>
    )
  }
}



const ProductsList = withRouter(ProductsListtt)
export default ProductsList 
