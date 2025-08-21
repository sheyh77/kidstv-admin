import React from 'react';
import { Button, Form, message } from 'antd';
import axios from 'axios';

function Login() {

  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = values => {
    console.log(values)
  }

  const onFinishFailed = values => {
    console.log(values)
  }

  // const onFinish = values => {
  //   axios.post("https://ceed8a646c7fba8b.mokky.dev/auth", values).
  //     then(res => {
  //       if (res.status === 201) {
  //         localStorage.setItem("token", res.data.token)
  //         console.log("togri")
  //       }
  //     }).
  //     catch(err => {
  //       if (err.status = 401) {
  //         // messageApi.open({
  //         //   type: "error",
  //         //   content: "Login xato"
  //         // })
  //         console.log("error")
  //       }
  //     })
  // }

  return (
    <section className="login">
      <div className="login-box">
        <h1 className="login-box-title">Log In</h1>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          className='login-form'
        >
          <input type="text" className='login-box-inp' placeholder='Username' />
          <input type="password" className='login-box-inp' placeholder='Password' />
          <Button className="login-box-btn" onClick={onFinish} type='primary' htmlType='submit'>Login</Button>
        </Form>
      </div>
    </section>
  )
}

export default Login