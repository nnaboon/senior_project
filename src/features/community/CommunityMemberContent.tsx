/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { UserSvg } from 'components/Svg/UserSvg';
import { MessageSvg } from 'components/Svg/MessageSvg';
import UserAvatar from 'images/avatar_helper.png';
import MyAccountAvatar from 'images/avatar_user2.png';
import {
  useMedia,
  MOBILE_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { useAddChatRoom } from 'hooks/chat/useAddChatRoom';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/userStore';

const CommunityMemberCard = styled.div`
  width: 100%;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  ${mediaQueryMobile} {
    height: 140px;
    margin-bottom: 20px;
  }
`;

const CommunityAdminBadge = styled.div`
  font-weight: normal;
  font-size: 1.2rem;
  color: #ee6400;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
  }

  ${mediaQueryMobile} {
    width: 100%;
    margin-top: -3px;
  }
`;

const CommunityMemberImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 55px;

  ${mediaQueryLargeDesktop} {
    width: 50px;
    height: 50px;
  }

  ${mediaQuerySmallTablet} {
    margin-right: 25px;
  }

  ${mediaQueryMobile} {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    margin-left: 15px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #000000;
  margin-right: 30px;

  ${mediaQueryLargeDesktop} {
    font-size: 20px;
  }

  ${mediaQueryTablet} {
    font-size: 20px;
  }

  ${mediaQuerySmallTablet} {
    margin-right: 20px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    width: max-content;
    min-width: max-content;
    max-width: max-content;
  }
`;

export const CommunityMemberContent = observer(({ member }: any) => {
  const history = useHistory();
  const { execute: addChatRoom } = useAddChatRoom();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { me } = userStore;
  return (
    <div>
      {member.map(({ id, role, username, imageUrl, userId }) => (
        <CommunityMemberCard key={id}>
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              margin-left: 90px;
              justify-content: space-between;

              ${mediaQuerySmallTablet} {
                margin-left: 30px;
              }

              ${mediaQueryMobile} {
                padding: 20px;
                margin-left: 0;
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;

                ${mediaQueryMobile} {
                  align-self: flex-start;
                  margin: 0;
              `}
            >
              {' '}
              <CommunityMemberImage
                src={imageUrl}
                alt="community member avatar"
              />
              <UserName>{username}</UserName>
              {Boolean(role) && (
                <CommunityAdminBadge>ผู้นำชุมชน</CommunityAdminBadge>
              )}
            </div>
            <div
              css={css`
                display: flex;
                margin-right: 80px;

                ${mediaQuerySmallTablet} {
                  margin-right: 30px;
                }

                ${mediaQueryMobile} {
                  margin: 0;
                  position: relative;
                  bottom: -16px;
                  width: 100%;
                  justify-content: space-between;
                }
              `}
            >
              {' '}
              <SecondaryButton
                css={css`
                  width: 145px;

                  ${mediaQueryLargeDesktop} {
                    width: 120px;
                  }
                  ${mediaQuerySmallTablet} {
                    width: 100px;
                  }

                  ${mediaQueryMobile} {
                    width: 100%;
                  }
                `}
              >
                <UserSvg />
                <div
                  style={{ marginLeft: 5 }}
                  onClick={() => {
                    history.push({
                      pathname: `/profile/${userId}`
                    });
                  }}
                >
                  โปรไฟล์
                </div>
              </SecondaryButton>
              {userId !== window.localStorage.getItem('id') && (
                <PrimaryButton
                  css={css`
                    width: 145px;

                    ${mediaQueryLargeDesktop} {
                      width: 120px;
                    }
                    ${mediaQuerySmallTablet} {
                      width: 100px;
                    }

                    ${mediaQueryMobile} {
                      width: 100%;
                      margin-left: 10px;
                    }
                  `}
                  onClick={() => {
                    addChatRoom({
                      providerUserId: userId,
                      requesterUserId: me.userId
                    }).then((res) => {
                      history.push(`/chat/${res.data}`);
                    });
                  }}
                >
                  <MessageSvg />
                  <div style={{ marginLeft: 5 }}>แชท</div>
                </PrimaryButton>
              )}
            </div>
          </div>
        </CommunityMemberCard>
      ))}
    </div>
  );
});
