import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'

const Item = Form.Item
const Option = Select.Option

/*
添加/修改用户的form组件
 */
const UserForm = (props) => {
  const { getFieldDecorator } = props.form
  const formItemLayout = {
    labelCol: { span: 4 },  // 左侧label的宽度
    wrapperCol: { span: 15 }, // 右侧包裹的宽度
  }
  useEffect(() => {
    props.setForm(props.form)

  }, [])

  return (
    <Form {...formItemLayout}>
      <Item label='用户名'>
        {
          getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名' }
            ]
          })(
            <Input placeholder='请输入用户名' />
          )
        }
      </Item>

      {

        <Item label='密码'>
          {
            getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码' }
              ]
            })(
              <Input type='password' placeholder='请输入密码' />
            )
          }
        </Item>

      }

      <Item label='手机号'>
        {
          getFieldDecorator('phone', {
            rules: [
              { required: true, message: '请输入手机号' }
            ]
          })(
            <Input placeholder='请输入手机号' />
          )
        }
      </Item>
      <Item label='邮箱'>

        {
          getFieldDecorator('email', {
            rules: [
              { type: "email", required: true, message: '请输入邮箱' }
            ]
          })(
            <Input placeholder='请输入邮箱' />
          )
        }
      </Item>
    </Form>
  );
}

export default Form.create()(UserForm)