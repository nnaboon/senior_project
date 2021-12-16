/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { PrimaryButton, SecondaryButton } from '../Button/Button';
import { MessageSvg } from 'components/Svg/MessageSvg';
import { UserSvg } from 'components/Svg/UserSvg';
import { useMedia, mediaQueryMobile } from 'styles/variables';

interface HelperListCardProps {
  id: string;
  name: string;
  imageUrl?: string;
}

const HelperListCardContainer = styled.div`
  width: 900px;
  min-width: 730px;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;

  &:hover {
    box-shadow: 0px 9px 16px rgba(255, 135, 48, 0.2);
  }

  ${mediaQueryMobile} {
    width: 100%;
    height: 90px;
    min-width: 100%;
  }
`;

const HelperImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  ${mediaQueryMobile} {
    width: 55px;
    height: 55px;
  }
`;

const HelperName = styled.div`
  font-size: 22px;
  color: #000000;
  margin-left: 50px;

  ${mediaQueryMobile} {
    font-size: 16px;
    margin-left: 20px;
  }
`;

export const HelperListCard = ({ id, name, imageUrl }: HelperListCardProps) => {
  return (
    <HelperListCardContainer>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <HelperImage src={imageUrl} alt="user avatar" />
        <HelperName>{name}</HelperName>
      </div>

      <div
        css={css`
          display: flex;
        `}
      >
        <SecondaryButton>
          <UserSvg />
          <div>โปรไฟล์</div>
        </SecondaryButton>
        <PrimaryButton>
          <MessageSvg style={{ marginRight: '5px' }} />
          <div>แชท</div>
        </PrimaryButton>
      </div>
    </HelperListCardContainer>
  );
};
