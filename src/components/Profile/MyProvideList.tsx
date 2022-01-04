/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import { SecondaryButton } from 'components/Button/Button';
import { Rate } from 'antd';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH
} from 'styles/variables';
import { USER_DATA } from 'data/user';

const HelperListCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 11px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  height: 360px;
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 35px;
  position: relative;
  cursor: pointer;

  ${mediaQueryMobile} {
    margin-top: 0;
  }
`;

const HelperListTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #f86800;
  margin-bottom: 8px;

  ${mediaQueryMobile} {
    font-size: 18px;
  }
`;

const HelperListHeading = styled.div`
  font-size: 12px;
  line-height: 26px;
  color: #c4c4c4;
  min-width: 170px;

  ${mediaQueryMobile} {
    width: max-content;
    min-width: max-content;
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

export const MyProvideList = ({ data }: any) => {
  const history = useHistory();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  return (
    <HelperListCard
      key={data.provideId}
      onClick={() => {
        history.push({
          pathname: `/provide/${data.title}/${data.provideId}`,
          state: {
            type: 'provide'
          }
        });
      }}
    >
      <HelperListTitle>{data.title}</HelperListTitle>
      <Flex marginY={isMobile ? '2px' : '8px'}>
        <HelperListHeading>ผู้ให้ความช่วยเหลือ</HelperListHeading>
        <HelperListDetail>
          {USER_DATA.find((props) => props.userId === data.userId).username}
        </HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? '2px' : '8px'}>
        <HelperListHeading>สถานที่ให้ความช่วยเหลือ</HelperListHeading>
        <HelperListDetail>{data.location.name}</HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? '2px' : '8px'}>
        <HelperListHeading>ยอดการให้ความช่วยเหลือนี้</HelperListHeading>
        <HelperListDetail>{data.provideSum} ครั้ง</HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? '2px' : '8px'}>
        <HelperListHeading>คะแนนการให้ความช่วยเหลือนี้</HelperListHeading>
        <HelperListDetail>
          5.0 <Rate count={1} defaultValue={1} />
        </HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? '2px' : '8px'}>
        <HelperListHeading>ค่าบริการ</HelperListHeading>
        <HelperListDetail>{data.serviceCharge} บาท</HelperListDetail>
      </Flex>
      <Flex marginY={isMobile ? '2px' : '8px'}>
        <HelperListHeading>วิธีการชำระเงิน</HelperListHeading>
        <HelperListDetail>{data.payment}</HelperListDetail>
      </Flex>
    </HelperListCard>
  );
};
