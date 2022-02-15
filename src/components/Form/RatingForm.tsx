/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { Text } from 'components/Text';
import { Rate, Form, Modal, Button, message } from 'antd';
import { mediaQueryLargeDesktop } from '../../styles/variables';
import styled from '@emotion/styled';

const RequestListSection = styled.div`
  padding: 1.75rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 100%;
`;

export const RatingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      rating: value.rating
    };

    try {
      console.log('data', data);
    } catch (e) {
      message.error('ไม่สามารถโพสต์ขอความช่วยเหลือได้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequestListSection>
      <Text
        fontWeight={500}
        marginTop="-5px"
        marginBottom="5px"
        css={css`
          font-size: 2.7rem;

          ${mediaQueryLargeDesktop} {
            font-size: 24px;
          }
        `}
      >
        ให้คะแนน
      </Text>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        css={css`
          .ant-row {
            justify-content: center;
            width: 100%;
            margin: 15px 0;
          }

          .ant-rate {
            display: flex;
            justify-content: center;
          }
        `}
      >
        <Form.Item name="rating">
          <Rate
            allowHalf
            css={css`
              margin-top: 15px;

              .ant-rate {
                display: flex;
                justify-content: center;
              }

              .ant-rate-star.ant-rate-star-full svg {
                width: 60px;
                height: 60px;
              }
              .ant-rate-star.ant-rate-star-zero svg {
                width: 60px;
                height: 60px;
              }

              .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
                width: 60px;
                height: 60px;
              }

              .ant-rate-star.ant-rate-star-full,
              .ant-rate-star.ant-rate-star-zero,
              .ant-rate-star.ant-rate-star-half.ant-rate-star-active {
                transition: transform 0s;
              }

              .ant-rate-star.ant-rate-star-half.ant-rate-star-active:hover {
                transform: scale(0.91);
              }

              .ant-rate-star.ant-rate-star-full:hover {
                transform: scale(0.91);
              }

              .ant-rate-star.ant-rate-star-zero:hover {
                transform: scale(0.91);
              }

              ${mediaQueryLargeDesktop} {
                margin-top: 0;

                .ant-rate-star.ant-rate-star-full svg {
                  width: 30px;
                  height: 30px;
                }
                .ant-rate-star.ant-rate-star-zero svg {
                  width: 30px;
                  height: 30px;
                }

                .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
                  width: 30px;
                  height: 30px;
                }
              }
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
            background: #ee6400;
            border-radius: 9px;
            border: 0;
            position: absolute;
            bottom: 0px;
            right: 20px;
            color: #ffff;

            &:hover {
              background: #ee6400;
            }
          `}
        >
          ตกลง
        </Button>{' '}
      </Form>
    </RequestListSection>
  );
};
