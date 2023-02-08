

import React,{useEffect,useState} from 'react'

import { Link,useLocation } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.css'

const { SubMenu } = Menu;
export default function Leftnav(props) {
  const useLocations=useLocation()
  const [openkey,setopenkey]=useState(true)
  const [data,setdata]=useState()
  useEffect(()=>{
     setdata(getMenuNodes(menuList))
  },[])
 function  getMenuNodes(menuList)  {

    return menuList.reduce((pre, item) => {

        // 向pre添加<Menu.Item>
        if(!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {
          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(cItem => {
           return cItem.key==useLocations.pathname
          })
      if (cItem) {
         setopenkey(true)
      } 
          // 向pre添加<SubMenu>
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
              }
            >
              {getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      

      return pre
    }, [])
  }
  return (
    
    <div className="left-nav">
    <Link to='/' className="left-nav-header">
      <img src={logo} alt="logo"/>
      <h1>硅谷后台</h1>
    </Link>

    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[useLocations.pathname]}
      defaultOpenKeys={[openkey.toString()]}
    >

      {
       data
      }

    </Menu>
  </div>
    )
}
