/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { SecondaryButton } from 'components/Button/Button';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop,
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH
} from 'styles/variables';
import { Skeleton } from 'antd';

interface MyRequestListProps {
  data: any;
  user: any;
}

const HelperListCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  height: 400px;
  margin-top: 25px;
  margin-bottom: 20px;
  display: flex;
  // flex-direction: column;

  box-sizing: border-box;
  padding: 35px;
  position: relative;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    height: 370px;
  }

  ${mediaQueryMobile} {
    margin-top: 0;
    margin-bottom: 30px;
    padding: 25px;
  }
`;

const HelperListTitle = styled.div`
  font-weight: 700;
  font-size: 1.85rem;
  color: #f86800;
  margin-bottom: 8px;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
  }

  ${mediaQueryMobile} {
    font-size: 18px;
  }
`;

const HelperListHeading = styled.div`
  font-size: 1rem;
  line-height: 26px;
  color: #c4c4c4;
  min-width: 215px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
    min-width: 170px;
  }

  ${mediaQueryMobile} {
    width: max-content;
    min-width: max-content;
    margin-right: 10px;
  }
`;

const HelperListDetail = styled.div`
  font-size: 1.5rem;
  line-height: 26px;
  color: #000000;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
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

export const MyRequestList = ({ data, user }: MyRequestListProps) => {
  const history = useHistory();

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
