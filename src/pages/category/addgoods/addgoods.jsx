import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import "./addgoods.css"
import api from '../../../api'
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

function RegistrationForm(props) {
  const categorys = props.formdata
  const [confirmDirty, setconfirmDirty] = useState(false)
  const [autoCompleteResult, setAutoCompleteResult] = useState([])
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const websiteOptions = autoCompleteResult.map(website => (
    <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  ));

  useEffect(() => {
    props.form.setFieldsValue(props.formdata);

  }, [props.formdata])

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 消除
        if (props.formdata) {
          props.updatas({
            title: categorys.name,
            cid: categorys.cid,
            descs: categorys.description,
            price: categorys.price,
            id: categorys.id,
            category: categorys.category,
            sellPoint: categorys.sellPoint,
            num: categorys.num,
            paramsInfo: categorys.paramsInfo,
            ...values
          })
        } else {
          props.handleOk(values)
        }
        //清空表单
        props.form.resetFields()
        // 关闭表单
        props.handleCancel()
      }
    });
  };
  function handleCancel(e) {
    e.preventDefault();
    props.handleCancel()
    props.form.resetFields()
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} onReset={handleCancel} >
      <Form.Item label="商品类名">
        {getFieldDecorator('specsName', {
          rules: [{
            type: "string",
            message: '请输入商品类型!',
          }, { required: true, message: '商品类名不能为空!' }],
        })(<Input />
        )}
      </Form.Item>
      <Form.Item
        label='商品ID'>
        {getFieldDecorator('itemCatId', {
          rules: [{
            type: "string",
            message: '请输入数字!',
          }, { required: true, message: '商品ID不能为空!', whitespace: true }],
        })(<Input />)}
      </Form.Item>


      <Form.Item label="商品类型描述">
        {getFieldDecorator('content', {
          rules: [{
            type: "string",
            message: '请输入商品描述!',
          }, { required: true, message: '商品描述不能为空!' }],
        })(<Input />
        )}
      </Form.Item>


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 50 }}>
          确认
        </Button>
        <Button type="" htmlType="reset">
          取消
        </Button>
      </Form.Item>

    </Form>
  )
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm