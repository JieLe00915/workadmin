import React, { useEffect } from 'react'
import "./index.css"
import { Form, Icon, Input, Button, message } from 'antd';
import { Navigate } from 'react-router-dom'
// import logo from '../../assets/images/logo.png'
import api from '../../api/index'
import { useNavigate } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const Item = Form.Item // 不能写在import之前



function Login(props) {
  const navigate = useNavigate()
  // 得到具强大功能的form对象
  const form = props.form
  const { getFieldDecorator } = form;
  
  useEffect(() => {
    const user = memoryUtils.user
    if (!user) {
      // 自动跳转到登陆(在render()中)
      return <Navigate to='/admin' />
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values
        console.log(username, password);
        const res = await api.getLogin({
          username,
          password,
        })
        if (res.status == 200) {
          message.success('登陆成功')
          const user = username
          memoryUtils.user = user // 保存在内存中
          storageUtils.saveUser(user) // 保存到local中

          navigate("/home")

        }

      } else {
        console.log('检验失败!')
      }
    });
  };
  function validatePwd(rule, value, callback) {
    console.log('validatePwd()', rule, value)
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
  }
  return (
    <div className="login">
      <header className="login-header">
        {/* <img src={logo} alt="logo" /> */}
        <h1>React项目: 家具后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登陆</h2>
        <Form onSubmit={handleSubmit} className="login-form">
          <Item>
            {
              getFieldDecorator('username', {
                rules: [
                  { required: true, whitespace: true, message: '用户名必须输入' },
                  { min: 4, message: '用户名至少4位' },
                  { max: 12, message: '用户名最多12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                ],
                initialValue: 'admin', // 初始值
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )
            }
          </Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    validator: validatePwd
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )
            }

          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}


const WrapLogin = Form.create()(Login)
export default WrapLogin