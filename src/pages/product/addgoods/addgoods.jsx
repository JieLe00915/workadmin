import React, { useEffect, useState } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Button,
  AutoComplete,
} from 'antd';
import "./addgoods.css"
const AutoCompleteOption = AutoComplete.Option;

function RegistrationForm(props) {
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

    useEffect(()=>{
      props.form.setFieldsValue(props.formdata);
    },[props.formdata])

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 消除
        if (props.addflage) {
          props.handleOk(values)
        }else{
          props.updatas({
            title: props.formdata.name,
            cid:props.formdata.cid,
            descs: props.formdata.description,
            price: props.formdata.price,
            id:props.formdata.id,
            image:props.formdata.image,
            sellPoint:props.formdata.sellPoint,
            num:props.formdata.num,
            paramsInfo:props.formdata.paramsInfo,
            category:props.formdata.category,
            ...values
          })
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
      <Form.Item label="商品名称">
        {getFieldDecorator('title', {
          rules: [
            {
              type: "string",
              message: 'The input is not empty title!',
            },
            {
              required: true,
              message: '请输入商品名称!',
            },
          ],
        })(<Input />)}
      </Form.Item>

      <Form.Item label="商品编号">
        {getFieldDecorator('cid', {
          rules: [
            {
              type: "string",
              message: 'The input is not empty title!',
            },
            {
              required: true,
              message: '请输入商品编号!',
            },
          ],
        })(<Input />)}
      </Form.Item>
     <Form.Item label="商品数量">
        {getFieldDecorator('num', {
          rules: [
            {
              type: "string",
              message: 'The input is not empty title!',
            },
            {
              required: true,
              message: '请输入商品数量!',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            商品价格&nbsp;
            <Tooltip title="What do you want others to call you?">
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('price', {
          rules: [{
            type: "string",
            message: '请输入数字!',
          }, { required: true, message: '商品价格不能为空!', whitespace: true }],
        })(<Input />)}
      </Form.Item>


      <Form.Item label="商品描述">
        {getFieldDecorator('descs', {
          rules: [{
            type: "string",
            message: '请输入商品描述!',
          }, { required: true, message: '商品描述不能为空!' }],
        })(<Input />
        )}
      </Form.Item>

      <Form.Item label="商品图片地址">
        {getFieldDecorator('image', {
          rules: [{
            type: "string",
            message: '请输入商品图片地址!',
          }, { required: true, message: '商品图片地址不能为空!' }],
        })(<Input />
        )}
      </Form.Item>
      <Form.Item label="商品类型">
        {getFieldDecorator('category', {
          rules: [{
            type: "string",
            message: '请输入商品类型!',
          }, { required: true, message: '商品类型不能为空!' }],
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