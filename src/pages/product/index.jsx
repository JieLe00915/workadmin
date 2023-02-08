import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal,
  Form, DatePicker, TimePicker, Popconfirm,Input 
} from 'antd'
import Addgoods from './addgoods/addgoods'
import LinkButton from '../../components/link-button'
import api from '../../api'

export default function Gategory() {

  useEffect(() => {
    setcolumns([
      {
        title: '分类的名称',
        dataIndex: 'name', // 显示数据对应的属性名
      },
      {
        title: '商品的价格',
        dataIndex: 'price', // 显示数据对应的属性名
      },
      {
        title: '商品的数量',
        dataIndex: 'num', // 显示数据对应的属性名
      },
      {
        title: '商品的类型',
        dataIndex: 'category', // 显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 返回需要显示的界面标签
        <>
            <Popconfirm
            title="确定删除此商品吗?"
            onConfirm={()=>{confirm(category)}}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"

          >
            <a href="#" style={{marginRight:'20px'}}>删除</a>
          </Popconfirm>
          
          <Popconfirm
            title="确定要编辑商品吗?"
            onConfirm={changeConfirm(category)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">编辑</a>
          </Popconfirm>
        </>

        )
      }

    ])
    getCategorys()
  }, [])

  //请求数据
  async function getCategorys(page) {
    const result = await api.getGoodsList({page})
    setdatas(result.data.data)
  }

// 显示弹窗
  function showAdd() {
    setaddflage(true)
    setvisible(true);
  }
  // 编辑
  function changeConfirm(categorys) {
    return ()=>{
      const changeres={
        title: categorys.name,
        cid:categorys.cid,
        descs: categorys.description,
        price: categorys.price,
        id:categorys.id,
        image:categorys.image,
        sellPoint:categorys.sellPoint,
        num:categorys.num,
        paramsInfo:categorys.paramsInfo,
        category:categorys.category 
      }
      setformdata(changeres)
      setvisible(true);
    }
  }
  function updatas(values) {
   api.updateGoods(
     values
  )
  getCategorys()
  }
  // 删除
  async function confirm(category) {
    const res= await api.deleteGoods({id:category.id})
    if (res.status === 200) {
      getCategorys()
      message.success('删除成功！');
    }
  }

  function cancel() {
    message.error('操作已取消！');
  }

  //弹窗
  async function handleOk(adddatas) {
    await api.addGoods(
      adddatas
    )
    getCategorys()
    setvisible(false);
  }
  function handleCancel(e) {
    setaddflage(false)
    setvisible(false);
  }

// 搜索
async function searchClick(e) {
  if (e.keyCode ===13) {
    const searchdatas=await api.getSearch({search:e.target.value})
    setdatas(searchdatas.data.result)
    setNum(searchdatas.data.result.length)
  }
  if(e.target.value==''){
    setNum(84)
    getCategorys(1)
  }

}
  const [addflage, setaddflage] = useState(false)
  const [datas, setdatas] = useState([])
  const [columns, setcolumns] = useState([])
  const [visible, setvisible] = useState(false)//添加框的显示隐藏
  const [formdata,setformdata] = useState({})//将本条编辑数据传到弹窗中
  const [cur,setCur] = useState(1)//页数
  const [num,setNum] = useState(75)//默认条数
  const title = (
    <span>
      <LinkButton >一级分类列表</LinkButton>
      <Icon type='arrow-right' style={{ marginRight: 5 }} />
      <span>商品管理</span>
    </span>
  )
  // Card的右侧
  const extra = (
    <Button type='primary' onClick={showAdd}>
      <Icon type='plus' />
      添加
    </Button>
  )
  const res = datas.reduce((pre, ele) => {
    return [...pre,
    {
      key: ele.id,
      name: ele.title,
      image: ele.image,
      description: ele.descs,
      price: ele.price + "元",
      id:ele.id,
      cid: ele.cid,
      category:ele.category,
      sellPoint:ele.sellPoint,
      num:ele.num,
      paramsInfo:ele.paramsInfo,
    }
    ]
  }, [])

  return (
    <Card title={title} extra={extra}>
     <Input placeholder="回车搜索"  onKeyUp={searchClick} style={{marginBottom:'20px'}}/>
      <Table
        pagination={{pageSize:8,total:num,showTotal:(total)=>`共 ${total} 条数据`,current:cur,
      	onChange:(page)=>{
          setCur(page)
          getCategorys(page) 
        }
      }}
        columns={columns}
        expandedRowRender={record => <div>
          <p style={{ color: '#000' }}>商品描述：{record.description}</p>
        </div>}
        dataSource={res}
      />
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <Addgoods handleOk={handleOk} addflage={addflage} handleCancel={handleCancel} formdata={formdata} updatas={updatas}/>
      </Modal>
    </Card>
  )
}
