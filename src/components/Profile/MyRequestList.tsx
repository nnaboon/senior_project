/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { SecondaryButton } from 'components/Button/Button';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH
} from 'styles/variables';
import { Skeleton } from 'antd';
import { USER_DATA } from 'data/user';
import { useUser } from 'hooks/user/useUser';

const HelperListCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  height: 360px;
  margin-top: 25px;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 35px;
  position: relative;
  cursor: pointer;

  ${mediaQueryMobile} {
    margin-top: 0;
    margin-bottom: 30px;
    padding: 25px;
  }
`;

const HelperListTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #f86800;
  margin-bottom: 8px;
  width: 95%;

  ${mediaQueryMobile} {
    font-size: 18px;
  }
`;

const HelperListHeading = styled.div`
  font-size: 12px;
  line-height: 26px;
  color: #c4c4c4;
  min-width: 150px;

  ${mediaQueryMobile} {
    width: max-content;
    max-width: max-content;
    margin-right: 10px;
  }
`;

const HelperListDetail = styled.div`
  font-size: 18px;
  line-height: 26px;
  color: #000000;
  width: 270px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${mediaQueryTablet} {
    width: 500px;
  }

  ${mediaQuerySmallTablet} {
    width: 350px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    width: 185px;
    -webkit-line-clamp: 2;
  }
`;

const SecondaryHelpButton = styled(SecondaryButton)`
  width: max-content;
  padding: 0 10px;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background: #f86800;
    color: #ffff;
  }
`;

export const MyRequestList = ({ data }: any) => {
  const history = useHistory();
  const { data: user, execute: getUser } = useUser();

  useEffect(() => {
    if (data) {
      getUser(data.userId);
    }
  }, [data]);

  return (
    <HelperListCard
      key={data.id}
      onClick={() => {
        history.push({
          pathname: `/request/${data.title}/${data.id}`,
          state: {
            type: 'request'
          }
        });
      }}
    >
      {user ? (
        <Flex direction="column" justify="flex-start" itemAlign="flex-start">
          <HelperListTitle>{data.title}</HelperListTitle>
          <Flex marginY="8px">
            <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
            <HelperListDetail>{user.username}</HelperListDetail>
          </Flex>
          <Flex marginY="8px">
            <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
            <HelperListDetail>{data.location.name}</HelperListDetail>
          </Flex>
          <Flex marginY="8px">
            <HelperListHeading>จำนวน</HelperListHeading>
            <HelperListDetail>{data.number}</HelperListDetail>
          </Flex>
          <Flex marginY="8px">
            <HelperListHeading>ค่าบริการ</HelperListHeading>
            <HelperListDetail>{data.serviceCharge} บาท</HelperListDetail>
          </Flex>
          <Flex marginY="8px">
            <HelperListHeading>วิธีการชำระเงิน</HelperListHeading>
            <HelperListDetail>{data.payment}</HelperListDetail>
          </Flex>
        </Flex>
      ) : (
        <Skeleton />
      )}
    </HelperListCard>
  );
};
