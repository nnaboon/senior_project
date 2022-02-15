/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import { Checkbox, Button, Form, message } from 'antd';
import { UserCreateBody } from './const';
import { useHistory } from 'react-router-dom';
import { ABILITY } from '../../data/ability';
import { mediaQueryMobile, mediaQueryLargeDesktop } from 'styles/variables';

type RegisterAbilityFormProps = {
  userAccountData: UserCreateBody;
  onNext: (value: UserCreateBody) => void;
  onBack: () => void;
};

const RegisterAbilityFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;
  position: relative;

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const RegisterAbilityForm = (props: RegisterAbilityFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [form] = Form.useForm();
  const history = useHistory();
  const { userAccountData, onNext, onBack } = props;

  const toggleChecked = (value) => {
    setCheckedList(value);

    if (value.includes('ไม่สามารถให้ความช่วยเหลือได้')) {
      setCheckedList([]);
      value = ['ไม่สามารถให้ความช่วยเหลือได้'];
    }
  };

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      category: value.ability
    };

    try {
      onNext({ ...userAccountData, ...data });
      history.push({
        pathname: '/'
      });
    } catch (e) {
      message.error('ไม่สามารถเลือกความสามารถในการช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterAbilityFormSection>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        css={css`
          .ant-modal .ant-form-item-control-input {
            width: 100%;
          }
          .ant-form-item-label > label {
            font-size: 1.5rem;
          }

          .ant-form-item {
            margin-bottom: 32px;
          }

          .ant-select-single:not(.ant-select-customize-input)
            .ant-select-selector {
            height: 40px;
          }

          .ant-upload.ant-upload-select-picture-card {
            width: 170px;
            height: 170px;
          }

          .ant-col-16 {
            max-width: 100%;
          }

          .ant-form-item-label > label {
            font-size: 1.68rem;
          }

          .ant-checkbox + span {
            font-size: 2rem;
          }

          .ant-checkbox-inner {
            width: 30px;
            height: 30px;
          }

          ${mediaQueryLargeDesktop} {
            .ant-form-item-label > label {
              font-size: 14px;
            }

            .ant-checkbox + span {
              font-size: 16px;
            }

            .ant-checkbox-inner {
              width: 16px;
              height: 16px;
            }
          }

          ${mediaQueryLargeDesktop} {
            font-size: 24px;

            .ant-select-single:not(.ant-select-customize-input)
              .ant-select-selector {
              height: 32px;
            }

            .ant-form-item {
              margin-bottom: 24px;
            }

            .ant-form-item-control-input {
              width: 460px;
            }

            .ant-form-item-label > label {
              font-size: 16px;
            }

            .ant-upload.ant-upload-select-picture-card {
              width: 104px;
              height: 104px;
            }
          }

          ${mediaQueryMobile} {
            width: 100%;
          }
        `}
      >
        <Global
          styles={css`
            .ant-form label {
              font-size: 18px;
              margin-bottom: 10px;
            }
          `}
        />
        <Text
          marginTop="10px"
          marginBottom="50px"
          css={css`
            height: 50px;
            font-size: 2.2rem;

            ${mediaQueryLargeDesktop} {
              height: 40px;
              font-size: 24px;
            }
          `}
        >
          ท่านยินดีให้ความช่วยเหลือในหมวดหมู่ใดบ้าง
        </Text>
        <Form.Item name="ability">
          <Checkbox.Group
            options={ABILITY}
            value={checkedList}
            onChange={toggleChecked}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '50px'
            }}
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
            bottom: 20px;
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
            bottom: 20px;
            right: 20px;
            color: #ffff;
            font-size: 16px;

            &:hover {
              background: #ee6400;
            }
          `}
        >
          ตกลง
        </Button>
      </Form>
    </RegisterAbilityFormSection>
  );
};
