import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
后台管理的折线图路由组件
 */
export default class Line extends Component {

  state = {
    sales: [300, 275, 350, 230, 180, 205], // 销量的数组
    stores: [200, 223, 120, 150, 195, 310], // 库存的数组
  }

  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store-1)
        return pre
      }, []),
    }))
  }

  /*
  返回柱状图的配置对象
   */
  getOption = (sales, stores) => {
    return {
      title: {
        text: '销量数据展示'
      },
      tooltip: {},
      legend: {
        data:['销量', '库存']
      },
      xAxis: {
        data: ["椅子","床","台灯","沙发","桌子","衣柜"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'line',
        data: sales
      }, {
        name: '库存',
        type: 'line',
        data: stores
      }]
    }
  }

  render() {
    const {sales, stores} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>

        <Card title='数据统计'>
          <ReactEcharts option={this.getOption(sales, stores)} />
        </Card>

      </div>
    )
  }
}