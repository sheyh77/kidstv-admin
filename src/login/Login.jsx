import React, { useContext } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
<<<<<<< HEAD
import { AuthContext } from "../context/AuthContext"
=======
import { AuthContext } from '../context/AuthContext';
>>>>>>> 0e9f55c0d4e7448665b7bafe98db885756149b43

function Login() {

  const [messageApi, contextHolder] = message.useMessage()
  const { setUser } = useContext(AuthContext)
<<<<<<< HEAD

=======
>>>>>>> 0e9f55c0d4e7448665b7bafe98db885756149b43
  const onFinish = values => {
    axios.post("https://ceed8a646c7fba8b.mokky.dev/auth", values).
      then(res => {
        if (res.status === 201) {
          localStorage.setItem("token", res.data.token)
<<<<<<< HEAD
          setUser()
=======
          setUser(res)
>>>>>>> 0e9f55c0d4e7448665b7bafe98db885756149b43
        }
      }).
      catch(err => {
        if (err.status = 401) {
          messageApi.open({
            type: "error",
            content: "Login xato"
          })
<<<<<<< HEAD
          console.log("error")
        }
      })
  }

=======
        }
      })

  }

>>>>>>> 0e9f55c0d4e7448665b7bafe98db885756149b43
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
<<<<<<< HEAD
            <Form.Item name="username">
              <Input type="text" placeholder='Username' />
            </Form.Item>
            <Form.Item name="password">
              <Input type="password" placeholder='Password' />
            </Form.Item>
            <Form.Item>
=======
            <Form.Item name="username" className='login-boxes'>
              <Input placeholder='Username' />
            </Form.Item>
            <Form.Item name="password" className='login-boxes'>
              <Input type="password" className='login-box-inp' placeholder='Password' />
            </Form.Item>
            <Form.Item className='login-boxes'>
>>>>>>> 0e9f55c0d4e7448665b7bafe98db885756149b43
              <Button onClick={onFinish} type='primary' htmlType='submit'>Login</Button>
            </Form.Item>
          </Form>
        </div>
<<<<<<< HEAD
      </section>
=======
      </section >
>>>>>>> 0e9f55c0d4e7448665b7bafe98db885756149b43
    </>
  )
}

export default Login