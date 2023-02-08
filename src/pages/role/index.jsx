import React, { useEffect, useState, useRef } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from "../../utils/memoryUtils"
import { formateDate } from '../../utils/dateUtils'
import './index.css'
import api from '../../api'
/*
角色路由
 */


export default function Rple(props) {
  const [columns, setColumns] = useState([])
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState({})
  const [isShowAdd, setIsShowAdd] = useState(false)
  const [isShowAuth, setIsShowAuth] = useState(false)
  const [form, setForm] = useState({})
  const auth = useRef()
  const title = (
    <span>
      <Button type='primary' onClick={() => setIsShowAdd(true)}>创建角色</Button> &nbsp;&nbsp;
      <Button type='primary' disabled={!role.id} onClick={() => {
        https()
        setIsShowAuth(true)
      }}>设置角色权限</Button>
    </span>
  )
  useEffect(() => {

    setColumns(
      [
        {
          title: '角色名称',
          dataIndex: 'name'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          render: (createTime) => formateDate(createTime)
        },
        {
          title: '授权时间',
          dataIndex: 'authTime',
          render: formateDate
        },
        {
          title: '授权人',
          dataIndex: 'authName'
        },
      ]
    )
    https()
  }, [])

  // 请求数据
  async function https() {
    const res = await api.getRoleList()
    const data = res.data.result.reduce((pre, ele) => {
      return [{
        key: ele.keya,
        id: ele.id,
        name: ele.name,
        createTime: ele.createTime,
        authTime: ele.authTime,
        authName: ele.authName,
        menus: ele.menus?.split(',')
      }, ...pre]
    }, [])
    setRoles(data)
  }

  // 点击每一行的值
  function onRow(role) {
    return {
      onClick: event => { // 点击行
        setRole(role)
        console.log(555, role);
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
        const date = new Date();
        const Y = date.getFullYear() + '-'
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        // 请求添加
        const authNames = memoryUtils.user
        const addRole = {
          authTime: `${Y + M + D + h + m + s}`,
          createTime: `${Y + M + D + h + m + s}`,
          key: `${Math.floor(Math.random() * 1000)}`,
          name: roleName,
          authName: authNames,
          menus: ''
        }
        await api.addRole(addRole)
        https()
      }

    })
  }
  // setForm 传递form过来
  function setFormFun(form) {
    setForm(form)
  }

  // 更新权限
async  function updateRole() {
    // 隐藏确认框
    setIsShowAuth(false)
    // 得到最新的menus
    const menuss = auth.current.getMenus()
    const date = new Date();
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    const D = date.getDate() + ' ';
    const h = date.getHours() + ':';
    const m = date.getMinutes() + ':';
    const s = date.getSeconds();
    role.key = role.key
    role.menus = menuss.join(',')
    role.authTime = `${Y + M + D + h + m + s}`
    role.authName = memoryUtils.user
    const upres=await api.updatarole(role)
    if (upres.status==200) {
      message.success('设置角色权限成功！')
      setRole(role)
      https()
    }else{
      message.error('设置角色权限失败！')
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
            // console.log(11, role);
            // 选择某个radio时回调
            setRole(role)
          }
        }}
        onRow={onRow}
      />
      <div className='roleKey'>
        <Modal

          className='roleKey'
          title="添加角色"
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


      <Modal
        className='roleKey'
        title="设置角色权限"
        visible={isShowAuth}
        onOk={updateRole}
        onCancel={() => {
          setIsShowAuth(false)
        }}
      >
        <AuthForm ref={auth} role={role} />
      </Modal>
    </Card>
  )
}