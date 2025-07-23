import React from 'react'
import Header from './Header/Header'
import BodyHeader from './BodyParts/BodyHeader/BodyHeader'
import { Outlet } from 'react-router-dom'

const FrontLayout = () => {
  return (
    <div>
<div>
<Header></Header>
<BodyHeader></BodyHeader>

</div>


    
 

<Outlet/>





    </div>
  )
}

export  default FrontLayout;