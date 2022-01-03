import React from 'react';
import styled from '@emotion/styled';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';

export const WrapperContainer = styled.div`
  position: relative;
  top: 165px;
  padding: 40px 100px;
  box-sizing: border-box;
  overflow-y: scroll;

  ${mediaQueryTablet} {
    padding: 40px 60px;
  }

  ${mediaQuerySmallTablet} {
    padding: 40px 50px;
    height: calc(100vh - 180px);
  }

  ${mediaQueryMobile} {
    padding: 20px 20px 40px 20px;
    top: 140px;
  }
`;
