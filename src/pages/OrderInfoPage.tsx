/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Text } from 'components/Text';
import Flex from 'components/Flex/Flex';
import { useLocation, useHistory } from 'react-router-dom';
import { STATUS_MAPPER } from 'components/Button/const';
import { StatusType } from 'components/Button/const';
import { Menu, Dropdown, message, Form, Modal, Divider } from 'antd';
import { StatusBadge } from 'components/Badge/StatusBadge';
import { RatingForm } from 'components/Form/RatingForm';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { LeftOutlined } from '@ant-design/icons';
import { useUpdateOrder } from 'hooks/order/useUpdateOrder';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryLargeDesktop,
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  TABLET_WIDTH
} from 'styles/variables';
import { useOrder } from 'hooks/order/useOrder';
import { Loading } from 'components/Loading/Loading';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';

const ProvideListContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  margin-top: 30px;
  padding: 30px 40px;

  ${mediaQueryLargeDesktop} {
    min-height: 310px;
  }

  ${mediaQueryTablet} {
    width: 100%;
    padding: 20px;
  }
`;

const ProvideListContent = styled.div`
  text-align: start;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const ProvideListTitle = styled.div`
  width: 280px;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 20px;
  text-align: right;
  color: #b9b9b9;
  text-align: end;
  margin-right: 20px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
    width: 130px;
  }

  ${mediaQueryMobile} {
    text-align: start;
    width: max-content;
  }
`;

const ProvideListData = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.54);

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
  }

  ${mediaQueryMobile} {
    -webkit-line-clamp: 1;
  }
`;

const ReceiverData = styled.div`
  font-weight: 500;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.54);

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    width: 200px;
    -webkit-line-clamp: 1;
  }
`;
export const OrderInfoPage = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [requesterRating, setRequesterRating] = useState<number>();
  const [status, setStatus] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const history = useHistory();
  const { pathname } = useLocation();
  const query = pathname.split('/')[3];
  const orderType = pathname.split('/')[2];

  const { loading: updateLoading, execute: updateOrder } = useUpdateOrder();
  const { data: order, execute: getOrder } = useOrder();

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getOrder(query).then((res) => {
      setRequesterRating(res.data.requesterRating);
    });
  }, [status]);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          if (order.status !== 'pending') {
            try {
              updateOrder(query, { status: 'pending' }).then(() => {
                getOrder(query);
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        รอดำเนินการ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (order.status !== 'progress') {
            try {
              updateOrder(query, { status: 'progress' }).then(() => {
                getOrder(query);
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        กำลังดำเนินการ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (order.status !== 'complete') {
            try {
              updateOrder(query, { status: 'complete' }).then(() => {
                getOrder(query);
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        สำเร็จ
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          if (order.status !== 'cancel') {
            try {
              updateOrder(query, { status: 'cancel' }).then(() => {
                getOrder(query);
              });
            } catch (error) {
              message.error('ไม่สามาถเปลี่ยนสถานะได้');
            } finally {
              message.success('สำเร็จ');
            }
          }
        }}
      >
        ยกเลิก
      </Menu.Item>
    </Menu>
  );

  return (
    <WrapperContainer>
      {order ? (
        <React.Fragment>
          <Flex
            justify="space-between"
            css={css`
              ${mediaQueryMobile} {
                flex-direction: column;
              }
            `}
          >
            <Flex
              css={css`
                cursor: pointer;
              `}
              onClick={() => {
                history.push(`/order/${orderType}`);
              }}
            >
              <LeftOutlined
                style={{ marginRight: '10px' }}
                css={css`
                  font-size: 24px;

                  ${mediaQueryLargeDesktop} {
                    font-size: 18px;
                  }
                `}
              />
              <div
                css={css`
                  font-size: 24px;

                  ${mediaQueryLargeDesktop} {
                    font-size: 18px;
                  }
                `}
              >
                ย้อนกลับ
              </div>
            </Flex>
            <Flex
              css={css`
                ${mediaQueryMobile} {
                  flex-direction: column;
                  align-items: flex-end;
                }
              `}
            >
              {' '}
              <Flex
                itemAlign="center"
                justify="flex-end"
                css={css`
                  margin-right: 25px;
                  ${mediaQueryMobile} {
                    margin-right: 0;
                    margin-top: 20px;
                    margin-bottom: 10px;
                  }
                `}
              >
                <ProvideListTitle
                  css={css`
                    ${mediaQueryMobile} {
                      width: unset;
                    }
                  `}
                >
                  หมายเลขคำสั่งซื้อ
                </ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    color: #ee6400;
                    font-size: 1.5rem;

                    ${mediaQueryLargeDesktop} {
                      font-size: 18px;
                    }
                  `}
                >
                  {order.id}
                </ProvideListData>
              </Flex>
              <StatusBadge
                status={STATUS_MAPPER[order.status].status}
                color={STATUS_MAPPER[order.status].color}
              />
            </Flex>
          </Flex>
          <Flex
            justify="space-between"
            marginBottom="40px"
            css={css`
              margin-top: 60px;
              align-items: flex-end;

              ${mediaQueryLargeDesktop} {
                margin-top: 40px;
              }

              ${mediaQueryMobile} {
                flex-direction: column;
                align-items: unset;
              }
            `}
          >
            <div
              css={css`
                margin-left: 40px;

                ${mediaQueryLargeDesktop} {
                  margin-left: 0;
                }

                ${mediaQuerySmallTablet} {
                  margin-left: 14px;
                }
              `}
            >
              <Text
                fontWeight={500}
                marginY="15px"
                css={css`
                  font-size: 24px;

                  ${mediaQueryLargeDesktop} {
                    font-size: 20px;
                  }

                  ${mediaQueryMobile} {
                    font-size: 18px;
                  }
                `}
              >
                ที่อยู่จัดส่ง
              </Text>

              {Object.keys(order.receiver).length > 0 ? (
                <Flex
                  direction="column"
                  justify="flex-start"
                  itemAlign="flex-start"
                >
                  <ReceiverData>{order.receiver.name}</ReceiverData>
                  <ReceiverData>{order.receiver.phoneNumber}</ReceiverData>
                  <ReceiverData>{order.receiver.address}</ReceiverData>
                </Flex>
              ) : (
                <ReceiverData>-</ReceiverData>
              )}
            </div>
            {!isMobile && (
              <div>
                {' '}
                {order.status === StatusType.COMPLETE ? (
                  orderType === 'request' ? (
                    <Flex
                      itemAlign="flex-end"
                      css={css`
                        flex-direction: column;
                        ${mediaQueryMobile} {
                          flex-direction: row;
                          justify-content: space-between;
                        }
                      `}
                    >
                      <SecondaryButton
                        onClick={() => {
                          history.push(`/chat/${order.chatId}`);
                        }}
                        css={css`
                          z-index: 10;
                          margin-right: 0;
                          margin-top: 10px;
                          margin-bottom: 0;
                        `}
                      >
                        แชท
                      </SecondaryButton>
                      {!order.rating && (
                        <PrimaryButton
                          css={css`
                            margin-left: 0;
                            z-index: 10;
                            margin-top: 10px;

                            ${mediaQueryMobile} {
                              min-width: 47%;
                              width: 47%;
                            }
                          `}
                          onClick={() => {
                            setIsModalVisible(true);
                          }}
                        >
                          ให้คะแนน
                        </PrimaryButton>
                      )}
                    </Flex>
                  ) : (
                    <Flex direction="column" itemAlign="flex-end">
                      <SecondaryButton
                        onClick={() => {
                          history.push(`/chat/${order.chatId}`);
                        }}
                        css={css`
                          margin-right: 0;
                          margin-bottom: 0;
                        `}
                      >
                        แชท
                      </SecondaryButton>
                      {(!order.rating || !requesterRating) && (
                        <PrimaryButton
                          css={css`
                            margin-left: 0;
                            z-index: 10;
                            margin-top: 10px;

                            ${mediaQueryMobile} {
                              min-width: 47%;
                              width: 47%;
                            }
                          `}
                          onClick={() => {
                            setIsModalVisible(true);
                          }}
                        >
                          ให้คะแนน
                        </PrimaryButton>
                      )}
                    </Flex>
                  )
                ) : (
                  <Flex direction="column">
                    <SecondaryButton
                      onClick={() => {
                        history.push(`/chat/${order.chatId}`);
                      }}
                      css={css`
                        z-index: 10;
                        margin-right: 0;
                        margin-bottom: 2px;

                        ${mediaQueryLargeDesktop} {
                          margin-bottom: 0;
                        }

                        ${mediaQueryTablet} {
                          min-width: 130px;
                        }

                        ${mediaQueryMobile} {
                          min-width: 47%;
                          width: 47%;
                        }
                      `}
                    >
                      แชท
                    </SecondaryButton>
                    {orderType === 'provide' && (
                      <Dropdown overlay={menu} trigger={['click']}>
                        <PrimaryButton
                          css={css`
                            margin-left: 0;
                            margin-top: 10px;

                            ${mediaQueryTablet} {
                              min-width: 130px;
                            }

                            ${mediaQueryMobile} {
                              min-width: 47%;
                              width: 47%;
                            }
                          `}
                        >
                          เปลี่ยนสถานะ
                        </PrimaryButton>
                      </Dropdown>
                    )}
                  </Flex>
                )}
              </div>
            )}
          </Flex>
          <ProvideListContainer>
            <ProvideListContent>
              <ProvideListData
                css={css`
                  font-weight: 700;
                  font-size: 24px;
                  color: black;

                  ${mediaQueryLargeDesktop} {
                    font-size: 21px;
                  }

                  ${mediaQueryMobile} {
                    font-size: 16px;
                    width: 60%;
                  }
                `}
              >
                {order.title}
              </ProvideListData>
              <Flex itemAlign="flex-start" marginY="4px">
                <ProvideListData>{order.location.name}</ProvideListData>
              </Flex>
              <Flex itemAlign="flex-start" marginY="4px">
                <ProvideListData>x{order.number}</ProvideListData>
              </Flex>
              <Flex itemAlign="flex-start" marginY="4px">
                <ProvideListData>{order.description}</ProvideListData>
              </Flex>

              <Divider style={{ margin: '18px' }} />
              <Flex itemAlign="center" justify="flex-end">
                <ProvideListTitle>ช่องทางการชำระเงิน</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    font-size: 24px;
                    font-weight: 600;
                    color: black;

                    ${mediaQueryLargeDesktop} {
                      font-size: 20px;
                    }

                    ${mediaQueryMobile} {
                      font-size: 18px;
                    }
                  `}
                >
                  {order.payment}
                </ProvideListData>
              </Flex>
              <Flex itemAlign="center" justify="flex-end">
                <ProvideListTitle>ราคาสินค้า</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    font-size: 24px;
                    font-weight: 600;
                    color: black;

                    ${mediaQueryLargeDesktop} {
                      font-size: 20px;
                    }

                    ${mediaQueryMobile} {
                      font-size: 18px;
                    }
                  `}
                >
                  ฿{order.price.toLocaleString()}
                </ProvideListData>
              </Flex>
              <Flex itemAlign="center" justify="flex-end">
                <ProvideListTitle>อัตราค่าบริการ</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    font-size: 24px;
                    font-weight: 600;
                    color: black;

                    ${mediaQueryLargeDesktop} {
                      font-size: 20px;
                    }

                    ${mediaQueryMobile} {
                      font-size: 18px;
                    }
                  `}
                >
                  ฿{order.serviceCharge.toLocaleString()}
                </ProvideListData>
              </Flex>
              <Flex itemAlign="center" justify="flex-end">
                <ProvideListTitle>จำนวนคำสั่งซื้อทั้งหมด</ProvideListTitle>
                <ProvideListData
                  css={css`
                    width: unset;
                    font-size: 24px;
                    font-weight: 600;
                    color: black;

                    ${mediaQueryLargeDesktop} {
                      font-size: 20px;
                    }

                    ${mediaQueryMobile} {
                      font-size: 18px;
                    }
                  `}
                >
                  ฿{(order.serviceCharge + order.price).toLocaleString()}
                </ProvideListData>
              </Flex>
            </ProvideListContent>
            <Modal
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              width={isMobile ? '350px' : isLargeDesktop ? '400px' : '25%'}
              maskClosable={false}
              centered
              css={css`
                .ant-modal-content {
                  height: 320px;
                }

                .ant-modal-body {
                  height: 100%;
                }

                ${mediaQueryLargeDesktop} {
                  .ant-modal-content {
                    height: 220px;
                  }
                }
              `}
            >
              <RatingForm
                order={order}
                setRequesterRating={setRequesterRating}
                setIsModalVisible={setIsModalVisible}
                setStatus={setStatus}
              />
            </Modal>
          </ProvideListContainer>
          {isMobile && (
            <div>
              {' '}
              {order.status === StatusType.COMPLETE ? (
                orderType === 'request' ? (
                  <Flex
                    itemAlign="flex-end"
                    css={css`
                      flex-direction: column;
                      ${mediaQueryMobile} {
                        flex-direction: row;
                        justify-content: space-between;
                      }
                    `}
                  >
                    <SecondaryButton
                      onClick={() => {
                        history.push(`/chat/${order.chatId}`);
                      }}
                      css={css`
                        width: 140px;
                        height: 45px;
                        z-index: 10;
                        margin-right: 0;
                        margin-top: 10px;
                        margin-bottom: 0;

                        ${mediaQueryTablet} {
                          min-width: 130px;
                        }

                        ${mediaQueryMobile} {
                          width: 100%;
                          height: 33px;
                        }
                      `}
                    >
                      แชท
                    </SecondaryButton>

                    {order.rating && (
                      <PrimaryButton
                        css={css`
                          width: 140px;
                          margin-left: 0;
                          height: 45px;
                          z-index: 10;
                          margin-top: 10px;

                          ${mediaQueryTablet} {
                            min-width: 130px;
                          }

                          ${mediaQueryMobile} {
                            min-width: 47%;
                            width: 47%;
                            height: 33px;
                            margin-left: 15px;
                          }
                        `}
                        onClick={() => {
                          setIsModalVisible(true);
                        }}
                      >
                        ให้คะแนน
                      </PrimaryButton>
                    )}
                  </Flex>
                ) : (
                  <Flex itemAlign="flex-end">
                    <SecondaryButton
                      onClick={() => {
                        history.push(`/chat/${order.chatId}`);
                      }}
                      css={css`
                        min-width: 140px;
                        height: 45px;
                        z-index: 10;
                        margin-right: 0;
                        margin-bottom: 0;

                        ${mediaQueryTablet} {
                          min-width: 130px;
                        }

                        ${mediaQueryMobile} {
                          min-width: 47%;
                          width: 47%;
                          height: 33px;
                        }
                      `}
                    >
                      แชท
                    </SecondaryButton>
                    {(!order.rating || !requesterRating) && (
                      <PrimaryButton
                        css={css`
                          margin-left: 0;
                          z-index: 10;
                          margin-top: 10px;
                          margin-left: 10px;

                          ${mediaQueryMobile} {
                            min-width: 47%;
                            margin-left: 10px;
                          }
                        `}
                        onClick={() => {
                          setIsModalVisible(true);
                        }}
                      >
                        ให้คะแนน
                      </PrimaryButton>
                    )}
                  </Flex>
                )
              ) : (
                <Flex direction="column">
                  <SecondaryButton
                    onClick={() => {
                      history.push(`/chat/${order.chatId}`);
                    }}
                    css={css`
                      width: 180px;
                      height: 50px;
                      z-index: 10;
                      margin-right: 0;
                      margin-bottom: 2px;
                      font-size: 1.7rem;

                      ${mediaQueryLargeDesktop} {
                        width: 140px;
                        height: 45px;
                        margin-bottom: 0;
                      }

                      ${mediaQueryTablet} {
                        min-width: 130px;
                      }

                      ${mediaQueryMobile} {
                        min-width: 47%;
                        width: 47%;
                        height: 33px;
                      }
                    `}
                  >
                    แชท
                  </SecondaryButton>
                  {orderType === 'provide' && (
                    <Dropdown overlay={menu} trigger={['click']}>
                      <PrimaryButton
                        css={css`
                          width: 180px;
                          height: 50px;
                          margin-left: 0;
                          margin-top: 10px;
                          font-size: 1.7rem;

                          ${mediaQueryLargeDesktop} {
                            width: 140px;
                            height: 45px;
                          }

                          ${mediaQueryTablet} {
                            min-width: 130px;
                          }

                          ${mediaQueryMobile} {
                            min-width: 47%;
                            width: 47%;
                            height: 33px;
                            margin-left: 15px;
                          }
                        `}
                      >
                        เปลี่ยนสถานะ
                      </PrimaryButton>
                    </Dropdown>
                  )}
                </Flex>
              )}
            </div>
          )}
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </WrapperContainer>
  );
};
