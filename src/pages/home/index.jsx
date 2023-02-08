import React,{useState} from 'react'
import {
  Icon,
  Card,
  Statistic,
  DatePicker,
  Timeline
} from 'antd'
import moment from 'moment'
import ReactEcharts from 'echarts-for-react'
// import Line from './line'
import Bar from './bar'
import "./index.css"

export default function Home() {
  const dateFormat = 'YYYY/MM/DD'
  const {RangePicker} = DatePicker
  const [isVisited,setIsVisited]=useState()
  function handleChange(isVisited) {
     return ()=>{setIsVisited(isVisited)}  
  }
// 返回仪表盘的配置对象
let option = {
  xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [1500, 2300, 1232, 3521, 3235, 4565, 3345],
      type: 'line'
  }]
};
const options = {
  // 提示框组件
  tooltip: {
      // trigger: 'axis'
  },
  // 图例组件
  legend:{
  //     data:['销量'],
  //     show:true
  },
  // x轴
  xAxis: {
      type: 'category',
      data: ["椅子","床","台灯","沙发","桌子","衣柜"]
  },
  // y轴
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [1566, 2566, 3545, 7456,3645, 6655, 5345],
      // type: 'line' 折线图
      type:'bar', // 柱状图
      name:'销量'
  }]
}
  return (
    <div className='home'>
    <Card
      className="home-card"
      title="商品总量"
      extra={<Icon style={{color: 'rgba(0,0,0,.45)'}} type="question-circle"/>}
      style={{width: 250}}
      headStyle={{color: 'rgba(0,0,0,.45)'}}
    >
      <Statistic
        value={1128163}
        suffix="个"
        style={{fontWeight: 'bolder'}}
      />
      <Statistic
        value={15}
        valueStyle={{fontSize: 15}}
        prefix={'周同比'}
        suffix={<div>%<Icon style={{color: 'red', marginLeft: 10}} type="arrow-down"/></div>}
      />
      <Statistic
        value={10}
        valueStyle={{fontSize: 15}}
        prefix={'日同比'}
        suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
      />
    </Card>
    <Card
      className="home-card"
      title="销售总量"
      extra={<Icon style={{color: 'rgba(0,0,0,.45)'}} type="question-circle"/>}
      style={{width: 250}}
      headStyle={{color: 'rgba(0,0,0,.45)'}}
    >
      <Statistic
        value={982565}
        suffix="个"
        style={{fontWeight: 'bolder'}}
      />
      <Statistic
        value={8}
        valueStyle={{fontSize: 15}}
        prefix={'周同比'}
        suffix={<div>%<Icon style={{color: 'red', marginLeft: 10}} type="arrow-down"/></div>}
      />
      <Statistic
        value={20}
        valueStyle={{fontSize: 15}}
        prefix={'日同比'}
        suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
      />
    </Card>
    <Card
      className="home-card"
      title="商品总金额"
      extra={<Icon style={{color: 'rgba(0,0,0,.45)'}} type="question-circle"/>}
      style={{width: 250}}
      headStyle={{color: 'rgba(0,0,0,.45)'}}
    >
      <Statistic
        value={345345355}
        suffix="元"
        style={{fontWeight: 'bolder'}}
      />
      <Statistic
        value={2}
        valueStyle={{fontSize: 15}}
        prefix={'周同比'}
        suffix={<div>%<Icon style={{color: 'red', marginLeft: 10}} type="arrow-down"/></div>}
      />
      <Statistic
        value={9}
        valueStyle={{fontSize: 15}}
        prefix={'日同比'}
        suffix={<div>%<Icon style={{color: '#3f8600', marginLeft: 10}} type="arrow-up"/></div>}
      />
    </Card>
    {/* <Line/> */}

    <Card
      className="home-content"
      title={<div className="home-menu">
        <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
              onClick={handleChange(true)}>访问量</span>
        <span className={isVisited ? "" : 'home-menu-active'} onClick={handleChange(false)}>销售量</span>
      </div>}
      extra={<RangePicker
        defaultValue={[moment('2019/01/01', dateFormat), moment('2019/06/01', dateFormat)]}
        format={dateFormat}
      />}
    >
      <Card
        className="home-table-left"
        title={isVisited ? '访问趋势' : '销售趋势'}
        bodyStyle={{padding: 0, height: 275}}
        extra={<Icon type="reload"/>}
      >
        
        {isVisited ? <ReactEcharts option={option} />: <ReactEcharts option={options} />}
      </Card>

      <Card title='任务' extra={<Icon type="reload"/>} className="home-table-right">
        <Timeline>
          <Timeline.Item color="green">新版本迭代会</Timeline.Item>
          <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
          <Timeline.Item color="red">
            <p>联调接口</p>
            <p>功能验收</p>
          </Timeline.Item>
          <Timeline.Item>
            <p>登录功能设计</p>
            <p>权限验证</p>
            <p>页面排版</p>
          </Timeline.Item>
        </Timeline>
      </Card>
    </Card>
  </div>
  )
}
