
import React, { useEffect, useState, useRef } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message

} from 'antd'
import AddForm from './user-form'
import LinkButton from "../../components/link-button/index"
import api from '../../api'

/*
角色路由
 */

export default function Rple() {
  const [columns, setColumns] = useState([])
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState({})
  const [isShowAdd, setIsShowAdd] = useState(false)
  const [form, setForm] = useState({})
  const title = (
    <span>
      <Button type='primary' onClick={() => setIsShowAdd(true)}>创建用户</Button>
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
          title: '邮箱',
          dataIndex: 'email'
        },

        {
          title: '电话',
          dataIndex: 'phone'
        },
        {
          title: '注册时间',
          dataIndex: 'creatTime',
        },
        {
          title: '操作',
          render: (user) => (
            <span>
              <LinkButton onClick={() => showUpdate(user)}>重置</LinkButton>
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
    const res = await api.getUserList()
    const data = res.data.result.reduce((pre, ele) => {
      return [{
        username: ele.username,
        creatTime: ele.creatTime,
        password: ele.password,
        email: ele.email,
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
        // console.log(111,role);
      },
    }
  }

  // 添加角色
  async function addRole() {
    form.validateFields(async (error, values) => {
      if (!error) {
        // 隐藏确认框
        form.resetFields()
        setIsShowAdd(false)
        // 收集输入数据
        const { roleName } = values
        console.log(34, values);
        const date = new Date();
        const Y = date.getFullYear() + '-'
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        // 请求添加
        // const authNames = memoryUtils.user
        const addRole = {
          username: values.username,
          createTime: `${Y + M + D + h + m + s}`,
          password: values.password,
          email: values.email,
          phone: values.phone
        }
        await api.getregister(addRole)
        message.success('创建成功！');
        https()
      
      }

    })
  }
  // setForm 传递form过来
  function setFormFun(form) {
    setForm(form)
  }

  //重置
  async function showUpdate(user) {
    await api.updataUserList({ password: '123456', id: user.id })
    message.success('重置成功！');
    https()
  
  }
  // 删除
  async function deleteUser(user) {
    await api.deleteUserList({ id: user.id })
    message.success('删除成功！');
    https()
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
      <div className='roleKey'>
        <Modal
          className='roleKey'
          title="添加用户"
          visible={isShowAdd}
          onOk={addRole}
          onCancel={() => {
            setIsShowAdd(false)
            form.resetFields()
          }}
        >
          <AddForm
            setForm={setFormFun}
          />
        </Modal>
      </div>

    </Card>
  )
}