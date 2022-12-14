import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/store/api/authAPI/authAPI';
import { loginData } from '@/store/api/authAPI/types';
import { login } from '@/store/reducer/authSlice';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const [inputData, setInputData] = useState({ username: '', password: '' });
  // 数据双向绑定
  const onValuesChange = (changedValues: any) => {
    setInputData((prevState) => {
      const key = Object.keys(changedValues).join();
      return { ...prevState, key: changedValues[key] };
    });
  };
  // 引入登陆 API
  const [loginFn] = useLoginMutation();
  const dispatch = useDispatch();
  // 获取上一页路由 state
  const location = useLocation();
  // 跳转
  const navigate = useNavigate();
  // 全局提示
  const [messageApi, contextHolder] = message.useMessage();

  // 登陆
  const onSubmit = async (values: loginData) => {
    try {
      const res = await loginFn(values).unwrap();
      if (res.meta.status !== 200) {
        throw new Error(res.meta.msg);
      }
      dispatch(login(res.data));
      navigate(location.state?.preURL || '/', { replace: true });
    } catch (msg: any) {
      messageApi.open({
        type: 'error',
        content: msg.toString(),
      });
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className="login">
        {contextHolder}
        <h1>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          onValuesChange={onValuesChange}
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]} className="input">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
              value={inputData.username}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
              value={inputData.password}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
