/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Divider, Form, Input, message, Checkbox } from 'antd';
import { UserCreateBody } from './const';
import { FormRule, getRule } from 'utils/form/getRule';
import { Text } from 'components/Text';
import { PrimaryButton } from 'components/Button/Button';
import { LoginStep } from 'components/Navbar/const';
import { mediaQueryMobile } from 'styles/variables';

type RegisterAccountFormProps = {
  userAccountData: UserCreateBody;
  setProcessStep: (processStep: LoginStep) => void;
  onNext: (value: UserCreateBody) => void;
};

const RegisterAccountFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 620px;

  ${mediaQueryMobile} {
    padding: 0;
    height: 360px;
  }
`;

export const RegisterAccountForm = (props: RegisterAccountFormProps) => {
  const [form] = Form.useForm();
  const { userAccountData, setProcessStep, onNext } = props;
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (
      form.getFieldValue('password') &&
      form.getFieldValue('password') !== form.getFieldValue('confirmPassword')
    )
      form.setFields([
        {
          name: 'confirmPassword',
          errors: ['รหัสผ่านไม่ตรงกัน']
        }
      ]);
    else
      form.setFields([
        {
          name: 'confirmPassword',
          errors: []
        }
      ]);
  }, [password]);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      email: value.email,
      password: value.password
    } as UserCreateBody;

    try {
      //   const {
      //     available,
      //     message: errorMessage
      //   } = await checkRegisterAvailableEmail(value.email);
      //   if (!available) {
      //     message.error(errorMessage, 5);
      //   } else {
      //     onNext(data);
      //   }
      onNext(data);
    } catch (e) {
      message.error('ไม่พบบัญชีในระบบ');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (userAccountData) {
      form.setFieldsValue({
        ...userAccountData,
        confirmPassword: userAccountData?.password
      });
    }
  }, [userAccountData]);

  return (
    <RegisterAccountFormSection>
      <Global
        styles={css`
          .ant-form-item-control-input {
            width: 360px;
          }
        `}
      />
      <Text fontSize="24px" marginTop="10px" marginBottom="20px">
        เริ่มลงทะเบียน
      </Text>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        css={css`
          .ant-form-item-control-input {
            ${mediaQueryMobile} {
              width: 100%;
            }
          }
        `}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
        >
          <Input
            placeholder="อีเมล"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
        >
          <Input.Password
            placeholder="รหัสผ่าน"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          normalize={(value) => value.trim()}
          rules={[
            getRule(FormRule.REQUIRE, 'กรุณากรอกยืนยันรหัสผ่าน'),
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value && getFieldValue('password') !== value)
                  return Promise.reject('รหัสผ่านไม่ตรงกัน');
                return Promise.resolve();
              }
            })
          ]}
        >
          <Input.Password
            placeholder="ยืนยันรหัสผ่าน"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>
        <div
          css={css`
            position: absolute;
            bottom: 10px;
            left: 2.75rem;

            ${mediaQueryMobile} {
              left: 0px;
            }
          `}
        >
          มีบัญชีผู้ใช้แล้ว{' '}
          <span
            style={{
              color: '#F86800',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => setProcessStep(LoginStep.LOGIN)}
          >
            เข้าสู่ระบบ
          </span>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          css={css`
            width: 106px;
            height: 40px;
            box-sizing: border-box;
            background: #ee6400;
            border-radius: 9px;
            border: 0;
            position: absolute;
            bottom: 0;
            right: 20px;
            color: #ffff;

            &:hover {
              background: #ee6400;
            }

            ${mediaQueryMobile} {
              right: -5px;
            }
          `}
        >
          ถัดไป
        </Button>
      </Form>
    </RegisterAccountFormSection>
  );
};
