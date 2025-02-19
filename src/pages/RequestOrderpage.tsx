/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { Menu } from 'antd';
import { observer } from 'mobx-react-lite';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { RequestOrderCard } from 'components/Card/RequestOrderCard';
import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQueryTablet,
  MOBILE_WIDTH,
  useMedia
} from 'styles/variables';
import { useMyRequestOrder } from 'hooks/order/useMyRequestOrder';
import { EmptyData } from 'components/Empty/EmptyData';
import { Loading } from '../components/Loading/Loading';
import { userStore } from 'store/userStore';
import { firestore } from '../firebase';

export const RequestOrderPage = observer(() => {
  const [currentStatus, setCurrentStatus] = useState<string>('pending');
  const [status, setStatus] = useState<string>();

  const { me } = userStore;

  const { data: requestOrders, execute: getRequestOrders } =
    useMyRequestOrder();

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const handleClick = (e) => {
    setCurrentStatus(e.key);
  };

  useEffect(() => {
    const doc = firestore
      .collection('orders')
      .where('requesterUserId', '==', window.localStorage.getItem('id'));

    const observer = doc.onSnapshot(
      async (docSnapshot) => {
        getRequestOrders(window.localStorage.getItem('id'));
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    return () => observer();
  }, []);

  return (
    <WrapperContainer
      css={css`
        ${mediaQueryMobile} {
          height: calc(100vh - 150px);
        }
      `}
    >
      {me && requestOrders ? (
        <React.Fragment>
          <Text
            fontWeight={400}
            marginY="20px"
            css={css`
              font-size: 22px;

              ${mediaQueryLargeDesktop} {
                font-size: 20px;
              }

              ${mediaQueryTablet} {
                font-size: 18px;
              }

              ${mediaQueryMobile} {
                font-size: 20px;
              }
            `}
          >
            รายการขอความช่วยเหลือของฉัน ทั้งหมด{' '}
            {
              requestOrders?.filter(
                ({ requesterUserId, status }) =>
                  requesterUserId === window.localStorage.getItem('id') &&
                  status !== 'waiting'
              ).length
            }{' '}
            รายการ
          </Text>
          <Menu
            onClick={handleClick}
            selectedKeys={[currentStatus]}
            mode="horizontal"
          >
            <Menu.Item key="pending">รอดำเนินการ</Menu.Item>
            <Menu.Item key="progress">กำลังดำเนินการ</Menu.Item>
            <Menu.Item key="complete">สำเร็จ</Menu.Item>
            <Menu.Item key="cancel">ยกเลิก</Menu.Item>
            <Menu.Item key="rated">ให้คะแนนแล้ว</Menu.Item>
          </Menu>
          <Flex
            itemAlign="center"
            justify="center"
            direction="column"
            marginTop="30px"
          >
            {requestOrders ? (
              requestOrders?.filter(({ status, orderReferenceType, rating }) =>
                currentStatus === 'rated'
                  ? rating !== undefined
                  : status === currentStatus &&
                    status !== 'waiting' &&
                    rating === undefined
              ).length > 0 ? (
                requestOrders
                  ?.filter(({ status, orderReferenceType, rating }) =>
                    currentStatus === 'rated'
                      ? rating !== undefined
                      : status === currentStatus && rating === undefined
                  )
                  .map((props) => (
                    <RequestOrderCard
                      key={props.id}
                      props={props}
                      setStatus={setStatus}
                    />
                  ))
              ) : (
                <EmptyData />
              )
            ) : (
              <EmptyData />
            )}
          </Flex>{' '}
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </WrapperContainer>
  );
});
