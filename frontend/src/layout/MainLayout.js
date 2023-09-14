import React from 'react'
import {Navbar} from '../components'

const MainLayout = ({children}) => {
    return (
        <div style={{height:'100%', width: '100%',}}>
            <Navbar />
            <div style={{height:'100%', width: '100%',}}>{children}</div>
        </div>
    )
}

export default MainLayout;