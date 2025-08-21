import React, { useContext } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Login() {

  const [messageApi, contextHolder] = message.useMessage()
  const { setUser } = useContext(AuthContext)
  const onFinish = values => {
    axios.post("https://ceed8a646c7fba8b.mokky.dev/auth", values).
      then(res => {
        if (res.status === 201) {
          localStorage.setItem("token", res.data.token)
          setUser(res)
        }
      }).
      catch(err => {
        if (err.status = 401) {
          messageApi.open({
            type: "error",
            content: "Login xato"
          })
        }
      })

  }

  return (
    <>
      {contextHolder}
      <section className="login">
        <div className="login-box">
          <h1 className="login-box-title">Log In</h1>
          <Form
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            className='login-form'
          >
            <Form.Item name="username" className='login-boxes'>
              <Input placeholder='Username' />
            </Form.Item>
            <Form.Item name="password" className='login-boxes'>
              <Input type="password" className='login-box-inp' placeholder='Password' />
            </Form.Item>
            <Form.Item className='login-boxes'>
              <Button onClick={onFinish} type='primary' htmlType='submit'>Login</Button>
            </Form.Item>
          </Form>
        </div>
      </section >
    </>
  )
}

export default Login