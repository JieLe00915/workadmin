// import React, {Component} from 'react'
import React,{useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { Modal} from 'antd'
import axios from 'axios'
import LinkButton from '../link-button'
// import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import qingtian from '../../assets/images/晴天.jpg'
import './index.css'


export default function Header() {
const [currentTime,setcurrentTime]=useState([])
// const [dayPictureUrl,setdayPictureUrl]=useState(qingtian)
const [weather,setweather]=useState()
const [title,settitle]=useState()
const navigate=useNavigate()
const paths=useLocation()
const username = memoryUtils.user

// console.log(path);
useEffect(()=>{
  getWeather()
  getTitle()
  var intervalId = setInterval(() => {
    const currentTime = formateDate(Date.now())
    setcurrentTime([currentTime])
    }, 1000)

  return ()=>{
    clearInterval(intervalId)
  }
},[paths])


  // 退出登陆  
 function logout(){
    // 显示确认框
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        console.log('OK', this)
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 跳转到login
        navigate('/login')
      }
    })
  }

//title 
function  getTitle (){
    // 得到当前请求路径
    // const path = paths.pathname
    menuList.forEach(item => {
      if (item.key===paths.pathname) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        settitle(item.title)
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(cItem => paths.pathname.indexOf(cItem.key)===0)
        // 如果有值才说明有匹配的
        if(cItem) {
          // 取出它的title
          settitle(cItem.title)
        }
      }
    })
    // return title 
  }


 async function getWeather(){
    // 调用接口请求异步获取数据
    const res = await axios('https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=745205c062cec395dd0d606466a822aa')
    // 更新状态
    setweather(res.data.lives[0].weather)
  }
  return (
    <div className="header">
    <div className="header-top">
      <span>欢迎, {username}</span>
      {/* <a href="javascrit:;" onClick={logout}>退出</a> */}
      <LinkButton onClick={logout}>退出</LinkButton>
    </div>
    <div className="header-bottom">
      <div className="header-bottom-left">{title}</div>
      <div className="header-bottom-right">
        <span>{currentTime}</span>
        <img src={qingtian} alt="weather"/>
        <span>{weather}</span>
      </div>
    </div>
  </div>
  )
}

