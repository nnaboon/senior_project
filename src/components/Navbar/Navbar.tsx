/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, Modal } from 'antd';
import UserPic from '../../images/avatar_user.png';
import Flex from 'components/Flex/Flex';
import { RegisterForm } from 'features/login/RegisterForm';
import { LoginForm } from 'features/login/LoginForm';
import { LoginStep } from 'features/login/const';
import { mediaQueryMobile, mediaQuerySmallTablet } from 'styles/variables';
import { useMedia, MOBILE_WIDTH, SMALL_TABLET_WIDTH } from 'styles/variables';
import { SideMenu } from 'components/Menu/SideMenu';
import { USER_DATA } from 'data/user';

const NavbarSection = styled.div`
  width: 100%;
  height: 165px;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  background: #ff8730;
  z-index: 99;

  ${mediaQuerySmallTablet} {
    height: 130px;
  }

  ${mediaQueryMobile} {
    height: 65px;
  }
`;

const NavbarList = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: end;
  box-sizing: border-box;
  padding: 20px 100px;
  > li {
    display: inline;
    margin: 0 20px;
    cursor: pointer;
    color: #ffff;
  }

  ${mediaQueryMobile} {
    padding: 15px;
  }
`;

const MyAccount = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 25px;

  ${mediaQuerySmallTablet} {
    position: absolute;
    right: 15px;
    top: 22px;
    z-index: 10;
  }

  ${mediaQueryMobile} {
    top: 12px;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  ${mediaQuerySmallTablet} {
    top: 15px;
  }

  ${mediaQueryMobile} {
    top: 40px;
  }
`;

export const Navbar = () => {
  // Change to check from key in local storage.
  const [account, setAccount] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountStep, setAccountStep] = useState<LoginStep>(LoginStep.LOGIN);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const history = useHistory();
  const { Search } = Input;

  const onSearch = (value) => {
    history.push({
      pathname: '/search',
      search: `?keyword=${value}`
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <NavbarSection>
      <Global
        styles={css`
          .ant-modal-content {
            border-radius: 12px;
            height: 614px;
          }
        `}
      />
      <Flex justify="space-between">
        {isSmallTablet ? (
          <SideMenu collapsed={collapsed} setCollapsed={setCollapsed} />
        ) : (
          <div
            style={{ width: '100px', height: '40px', background: 'blue' }}
            onClick={() => {
              history.push({
                pathname: '/'
              });
            }}
          >
            Home
          </div>
        )}
        <NavbarList>
          {!isSmallTablet && (
            <React.Fragment>
              {' '}
              <li
                onClick={() => {
                  history.push({
                    pathname: '/community/zxcvb234'
                  });
                }}
              >
                ชุมชนความช่วยเหลือ
              </li>
              <li
                onClick={() => {
                  history.push({
                    pathname: '/provide'
                  });
                }}
              >
                รายการให้ความช่วยเหลือของฉัน
              </li>
              <li
                onClick={() => {
                  history.push({
                    pathname: '/request'
                  });
                }}
              >
                รายการขอความช่วยเหลือของฉัน
              </li>
              <li
                onClick={() => {
                  history.push({
                    pathname: '/chat'
                  });
                }}
              >
                กล่องข้อความ
              </li>
              <li
                onClick={() => {
                  history.push({
                    pathname: '/profile'
                  });
                }}
              >
                โปรไฟล์
              </li>
            </React.Fragment>
          )}

          <MyAccount
            src={USER_DATA[0].imageUrl ?? UserPic}
            alt="my account"
            onClick={() => {
              setCollapsed(true);
              if (account) {
                history.push({
                  pathname: '/profile'
                });
              } else {
                setIsModalVisible(true);
              }
            }}
          />
        </NavbarList>
      </Flex>
      <SearchBarContainer>
        <Search
          placeholder="ข้าวผัดป้าเขียว, ก๋วยจั๊บนายวาย, แกงกะหรี่ป้าอร โชคชัย4"
          onSearch={onSearch}
          size="large"
          style={{
            width: isMobile ? '350px' : isSmallTablet ? '600px' : '700px',
            height: '40px'
          }}
        />
      </SearchBarContainer>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={isMobile ? '85%' : 500}
        maskClosable={false}
        centered
        css={css`
          .ant-modal-content {
            min-height: 664px;
            height: max-content;

            ${mediaQueryMobile} {
              min-height: 400px;
              height: 400px;
              overflow-y: scroll;
            }
          }
        `}
      >
        <div>
          {accountStep === LoginStep.LOGIN ? (
            <LoginForm setStep={setAccountStep} />
          ) : (
            <RegisterForm setProcessStep={setAccountStep} />
          )}
        </div>
      </Modal>
    </NavbarSection>
  );
};
