import React from 'react'
import {Outlet} from 'react-router-dom'
import Layout from '../Layout/Layout';

const Dashboard=()=>{
    return (
        <Layout>
            <Outlet/>
        </Layout>
    )
}

export default Dashboard