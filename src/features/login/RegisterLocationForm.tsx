/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Button, Divider, Form, Input, message, Checkbox } from 'antd';
import { UserCreateBody } from './const';
import { mediaQueryMobile } from 'styles/variables';
import { GoogleMapContent } from 'components/GoogleMap/GoogleMap';

type RegisterLocationFormProps = {
  userAccountData: UserCreateBody;
  onNext: (value: UserCreateBody) => void;
  onBack: () => void;
};

const RegisterLocationFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 620px;

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const RegisterLocationForm = (props: RegisterLocationFormProps) => {
  const [form] = Form.useForm();
  const { userAccountData, onNext, onBack } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      location: value.location
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
      onNext({ ...userAccountData, ...data });
    } catch (e) {
      message.error('ไม่พบบัญชีในระบบ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterLocationFormSection>
      <Global
        styles={css`
          .ant-form-item-control-input {
            width: 360px;
          }
        `}
      />
      <Text fontSize="24px" marginTop="10px" marginBottom="20px">
        สถานที่ที่คุณสามารถให้ความช่วยเหลือได้
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
          name="location"
          // rules={[
          //   {
          //     required: true,
          //     message: 'กรุณากรอกสถานที่ที่คุณสามารถให้ความช่วยเหลือได้'
          //   }
          // ]}
        >
          <GoogleMapContent
            width="100%"
            css={css`
              width: 100%;
              min-width: 100%;
            `}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          css={css`
            width: 106px;
            height: 40px;
            box-sizing: border-box;
            background: #ffff;
            border-radius: 9px;
            border: 1px solid #ee6400;
            position: absolute;
            bottom: 0;
            right: 140px;
            color: #ee6400;
            font-size: 16px;

            &:hover {
              background: #ffff;
            }
          `}
          onClick={() => onBack()}
        >
          ย้อนกลับ
        </Button>
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
            font-size: 16px;

            &:hover {
              background: #ee6400;
            }
          `}
        >
          ถัดไป
        </Button>
      </Form>
    </RegisterLocationFormSection>
  );
};
