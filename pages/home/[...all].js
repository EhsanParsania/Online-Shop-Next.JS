import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getFilteredProducts } from 'api/API'
import { Paginate, Spinner } from 'components/common/index'
import { CardGroup } from 'components/customers/CardGroup/CardGroup.component'
import MainLayout  from 'layouts/MainLayout'


function Store(props) {
  const router = useRouter()
  const [group, subgroup, pageNumber] = router.query.all


  const [state, setState] = useState({
    pageNumber: 1,
    numberOfPages: '',
    data: [{}],
    group: '',
    subgroup: '',
    isLoading: true
  })

  const handleGetData = async (group, subgroup, id = 1) => {
    const limit = 6

    try {
      const { data = [{}], headers } = await getFilteredProducts(group, subgroup, limit, id)
      const totalCount = headers ? headers['x-total-count'] : 1
      const numberOfPages = Math.ceil(totalCount / limit)
      console.log(numberOfPages)
      await setState({ ...state, data, numberOfPages, pageNumber: id, subgroup: subgroup, group: group ,isLoading:false})
    }
    catch (error) {
      console.log('get data failed with error ==> ', error.message)
    }
  }

  useEffect(() => {
    const [group, subgroup, pageNumber] = router.query.all
    console.log(group, subgroup, pageNumber)
    handleGetData(group, subgroup, pageNumber)

  }, [handleGetData])
  return (
    <div>
       <MainLayout>
      {
        !state.isLoading ?
          <CardGroup data={state.data}>
            <Paginate numberOfPages={state.numberOfPages} clickedPage={async (clickedPage) => await setState({...state, clickedPage })} field={`home/${group}`} pathSection={subgroup} currentPage={pageNumber} />
          </CardGroup>
          :
          <section >
            <CardGroup >
            </CardGroup>
            <Spinner />
          </section>
      }
       </MainLayout>

    </div>
  )
}

export default Store

