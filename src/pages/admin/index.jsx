import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'


const { Footer, Sider, Content } = Layout
export default function Admin(props) {

  const user=memoryUtils.user
  if(!user) {
    // 自动跳转到登陆(在render()中)
    return <Navigate to='/'/>
  }
  return (
    <Layout style={{minHeight: '100vh'}}>
    <Sider>
      {/* <div>dasd</div> */}
      <LeftNav/>
    </Sider>
    <Layout>
      <Header></Header>
      <Content style={{margin: 20, backgroundColor: '#fff'}}>
          <Outlet/>
      </Content>
      <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
    </Layout>
  </Layout>
  )
}
