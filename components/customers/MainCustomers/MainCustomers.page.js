import React, { Component } from 'react'
// import { ListMenu } from '../../../components/ListMenu/ListMenu.component'
import { CardGroupContainer } from 'components/customers/MainCustomers/component/CardGroupContainer.component';

class MainCustomers extends Component {

  render() {
    return (
      // <ListMenu >
        <section >
          <h1>Hello world</h1>
          <CardGroupContainer field='drinks' />
          <CardGroupContainer field='proteins' />
          <CardGroupContainer field='groceries' />
          <CardGroupContainer field='dairies' />
          <CardGroupContainer field='drinks' />


        </section>
      // </ListMenu>

    )
  }
}


export { MainCustomers }