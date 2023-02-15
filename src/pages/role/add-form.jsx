import React, {useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
添加分类的form组件
 */
const AddForm = (props) => {
  const { getFieldDecorator } = props.form
  const formItemLayout = {
    labelCol: { span: 4 },  // 左侧label的宽度
    wrapperCol: { span: 15 }, // 右侧包裹的宽度
  }
  useEffect(()=>{
    props.setForm(props.form)

  },[])

  return (
    <Form >
    <Item label='角色名称' {...formItemLayout}>
      {
        getFieldDecorator('roleName', {
          initialValue: '',
          rules: [
            {required: true, message: '角色名称必须输入'}
          ]
        })(
          <Input placeholder='请输入角色名称'/>
        )
      }
    </Item>
  </Form>
  );
}

export default Form.create()(AddForm)