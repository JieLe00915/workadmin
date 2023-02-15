
import React, { useEffect, useState, useRef } from 'react'
import {
  Card,
  Button,
  Table,
  message

} from 'antd'
import LinkButton from "../../components/link-button/index"
import api from '../../api'

/*
角色路由
 */

export default function Order() {
  const [columns, setColumns] = useState([])
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState({})
  const title = (
    <span>
      <Button type='primary'>订单管理</Button>
    </span>
  )
  useEffect(() => {
    setColumns(
      [
        {
          title: '用户名',
          dataIndex: 'username'
        },
      

        {
          title: '电话',
          dataIndex: 'phone'
        },
        {
          title: '收获地址',
          dataIndex: 'address'
        },
        {
          title: '购买时间',
          dataIndex: 'time',
        },
        {
          title: '订单备注',
          dataIndex: 'remarks',
        },
        {
          title: '操作',
          render: (user) => (
            <span>
              <LinkButton onClick={() => deleteUser(user)}>删除</LinkButton>
            </span>
          )
        }
      ]
    )
    https()
  }, [])

  // 请求数据
  async function https() {
    const res = await api.getOrderList()
    const data = res.data.result.reduce((pre, ele) => {
      return [{
        username: ele.username,
        time: ele.time,
        remarks: ele.remarks,
        address: ele.address,
        phone: ele.phone,
        id: ele.id
      }, ...pre]
    }, [])
    setRoles(data)
  }

  // 点击每一行的值
  function onRow(role) {
    return {
      onClick: event => { // 点击行
        setRole(role)
      },
    }
  }

  //重置
  async function showUpdate(user) {
    await api.updataUserList({ password: '123456', id: user.id })
    message.success('重置成功！');
    https()
  
  }
  // 删除
  async function deleteUser(user) {
   const res=  await api.deleteOrderList({ id: user.id })
   if (res.status==200) {
    message.success('删除成功！');
    https()
   }
  }
  return (
    <Card title={title}>
      <Table
        bordered
        rowKey='id'
        dataSource={roles}
        columns={columns}
        pagination={{ defaultPageSize: 8 }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [role.id],
          onSelect: (role) => {
            // 选择某个radio时回调
            setRole(role)
          }
        }}
        onRow={onRow}
      />

    </Card>
  )
}