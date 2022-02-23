/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, Empty } from 'antd';
import Carousel from 'react-multi-carousel';
import { css, jsx } from '@emotion/react';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { TOP_TEN_SEARCH_WEEKLY } from 'data/search';
import { SecondaryButton, TopSearchButton } from 'components/Button/Button';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { News } from 'components/News/News';
import { CATEGORY } from 'data/category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchSvg } from 'components/Svg/SearchSvg';
import CommunityPic from 'images/community_homepage.jpeg';
import GoodsPic from 'images/goods_homepage.jpeg';
import EarnMoneyPic from 'images/earn.jpeg';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  mediaQueryTablet,
  mediaQueryLargeDesktop,
  mediaQueryExtraLargeDesktop,
  SMALL_TABLET_WIDTH,
  useMedia
} from 'styles/variables';
import { LeftOutlined, LineOutlined, RightOutlined } from '@ant-design/icons';
import { PROVIDE_MAPPER } from 'data/provide';
import { useUsers } from 'hooks/user/useUsers';
import { useProvides } from 'hooks/provide/useProvides';
import { useRequests } from 'hooks/request/useRequests';
import { Loading } from 'components/Loading/Loading';

const HomePageCategorySection = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  justify-content: center;
  ${mediaQueryMobile} {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-gap: 20px;
  }
`;

const HomePageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 165px;
  padding: 40px 100px;
  overflow-y: scroll;

  ${mediaQueryTablet} {
    padding: 40px 60px;
    padding: 40px 60px;
  }

  ${mediaQuerySmallTablet} {
    padding: 40px 30px;
    top: 80px;
  }

  ${mediaQueryMobile} {
    height: calc(100vh - 80px);
    padding: 20px 20px 50px 20px;
  }
`;

const HomePagePictureSection = styled.img`
  width: 100%;
  height: 350px;
  margin-bottom: 30px;
  object-fit: fill;

  ${mediaQueryLargeDesktop} {
    height: 287px;
  }

  ${mediaQueryMobile} {
    height: 180px;
  }
`;

const TopTenSearchContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 28px;
  padding: 10px;
  overflow-x: scroll;
  margin: 40px 0;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 380px;
    margin: 10px 0;
    box-sizing: border-box;
    padding: 0;
  }
`;

const EmptyData = styled(Empty)`
  .ant-empty {
    display: flex;
    flex-direction: column;
    height: 800px !important;
    align-items: center;
    justify-content: center;
  }
}`;

const CategoryMenu = styled.div`
  width: 100%;
  height: 100%;
  min-width: 40px;
  min-height: 40px;

  max-width: 300px;
  height: 80px;
  font-size: 18px;

  svg {
    font-size: 25px;
    transition: width 0.1s, height 0.1s ease-in-out;
  }

  &:hover {
    color: #ee6400;
    cursor: pointer;

    svg {
      font-size: 32px;
    }
  }
`;

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const history = useHistory();
  const { data: response, execute: getUsers } = useUsers();
  const { data: provides, execute: getProvides } = useProvides();
  const { data: requests, execute: getRequests } = useRequests();
  const { Search } = Input;

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2800 },
      items: 5
    },
    bigDesktop: {
      breakpoint: { max: 2800, min: 2000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 2000, min: 1300 },
      items: 3
    },
    smallDesktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 2
      // partialVisibilityGutter: 50
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
      // partialVisibilityGutter: 200
    },
    smallTablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const pictureResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    bigDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1
      // partialVisibilityGutter: 200
    },
    smallTablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    getProvides();
    getRequests();
  }, []);

  return (
    <HomePageContainer>
      {provides && requests ? (
        <React.Fragment>
          <Carousel
            arrows={false}
            responsive={pictureResponsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
          >
            <HomePagePictureSection
              src={CommunityPic}
              alt="community in homepage"
            />
            <HomePagePictureSection
              src={EarnMoneyPic}
              alt="earn money in homepage"
            />
          </Carousel>
          {!isSmallTablet && (
            <HomePageCategorySection>
              {CATEGORY.map(({ id, name, icon }) => (
                <CategoryMenu
                  key={id}
                  onClick={() => {
                    history.push({
                      pathname: `/${id}`
                    });
                  }}
                >
                  <Flex direction="column" itemAlign="center" justify="center">
                    <FontAwesomeIcon
                      icon={icon}
                      css={css`
                        margin-bottom: 20px;
                      `}
                    />
                    <div>{name}</div>
                  </Flex>
                </CategoryMenu>
              ))}
            </HomePageCategorySection>
          )}
          <div
            css={css`
              justify-content: space-between;
              display: flex;
              margin-top: 50px;

              ${mediaQueryLargeDesktop} {
                margin-top: 40px;
              }
            `}
          >
            <Search
              placeholder="ค้นหาสถานที่"
              onSearch={onSearch}
              size="large"
              style={{ width: isMobile ? '200px' : '462px', height: '60px' }}
              css={css`
                .ant-input {
                  height: 50px;
                  width: 500px;
                  font-size: 1.6rem;
                }

                .ant-btn-icon-only.ant-btn-lg {
                  height: 50px;
                  width: 50px;
                }

                ${mediaQueryExtraLargeDesktop} {
                  .ant-input {
                    height: 40px;
                    width: 100%;
                    font-size: 16px;
                  }

                  .ant-btn-icon-only.ant-btn-lg {
                    height: 40px;
                    width: 40px;
                  }
                }
              `}
            />
            <PostRequestButton
              buttonText="เขียนความช่วยเหลือ"
              css={css`
                a {
                  width: max-content !important;
                  min-width: max-content !important;
                }
              `}
            />
          </div>
          <Text
            fontWeight={500}
            marginY="10px"
            css={css`
              font-size: 2.5rem;

              ${mediaQueryLargeDesktop} {
                font-size: 1.92rem;
              }

              ${mediaQueryTablet} {
                font-size: 1.85rem;
              }

              ${mediaQueryMobile} {
                font-size: 22px;
              }
            `}
          >
            ความช่วยเหลือยอดนิยม
          </Text>
          <React.Fragment>
            {provides?.filter(({ location }) =>
              searchValue ? location.name.includes(searchValue) : true
            ).length > 0 ? (
              <React.Fragment
                css={css`
                  .react-multi-carousel-list {
                    position: static;
                  }
                `}
              >
                {' '}
                <Carousel
                  responsive={responsive}
                  partialVisible={true}
                  arrows
                  css={css`
                    .react-multiple-carousel__arrow {
                      z-index: 10;
                    }

                    .react-multiple-carousel__arrow--left {
                      left: 0;
                    }

                    .react-multiple-carousel__arrow--right {
                      right: 0;
                    }
                  `}
                >
                  {provides
                    ?.filter(
                      ({ communityId, location, visibility }) =>
                        Boolean(visibility) &&
                        !Boolean(communityId) &&
                        (searchValue
                          ? location.name.includes(searchValue)
                          : true)
                    )
                    .map((items) => (
                      <PopularRequestSection key={items.id} data={[items]} />
                    ))}
                </Carousel>
              </React.Fragment>
            ) : (
              <EmptyData
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                css={css`
                  .ant-empty {
                    display: flex;
                    flex-direction: column;
                    height: 300px;
                    align-items: center;
                    justify-content: center;
                  }
                `}
                description={<span>ไม่พบข้อมูล</span>}
              />
            )}
          </React.Fragment>
          <Text
            fontWeight={500}
            marginY="30px"
            css={css`
              font-size: 2.5rem;

              ${mediaQueryLargeDesktop} {
                font-size: 1.92rem;
              }

              ${mediaQueryTablet} {
                font-size: 1.85rem;
              }

              ${mediaQueryMobile} {
                font-size: 22px;
              }
            `}
          >
            Top 10 การค้นหาติดอันดับ
          </Text>
          <TopTenSearchContainer>
            {isTablet ? (
              <div
                css={css`
                  width: 100%;
                  height: 100%;
                  position: relative;
                  background: rgb(247, 249, 249);
                  border-radius: 8px;
                `}
              >
                {TOP_TEN_SEARCH_WEEKLY.map(({ name }) => (
                  <div
                    style={{
                      display: 'flex',
                      margin: '15px',
                      fontWeight: 700
                    }}
                    key={name}
                    onClick={() => {
                      history.push({
                        pathname: '/search',
                        search: `?keyword=${name}`,
                        state: {
                          search: name
                        }
                      });
                    }}
                  >
                    <SearchSvg
                      style={{
                        marginRight: '10px',
                        width: isMobile ? '20px' : '25px',
                        height: isMobile ? '20px' : '25px'
                      }}
                    />
                    {name}
                  </div>
                ))}
              </div>
            ) : (
              <React.Fragment>
                {' '}
                {TOP_TEN_SEARCH_WEEKLY.map(({ name }) => (
                  <TopSearchButton
                    key={name}
                    onClick={() => {
                      history.push({
                        pathname: '/search',
                        search: `?keyword=${name}`,
                        state: {
                          search: name
                        }
                      });
                    }}
                  >
                    <SearchSvg
                      style={{
                        marginRight: '10px',
                        width: isMobile ? '20px' : '25px',
                        height: isMobile ? '20px' : '25px'
                      }}
                    />
                    {name}
                  </TopSearchButton>
                ))}
              </React.Fragment>
            )}
          </TopTenSearchContainer>
          <Text
            fontWeight={500}
            marginY="30px"
            css={css`
              font-size: 2.5rem;

              ${mediaQueryLargeDesktop} {
                font-size: 1.92rem;
              }

              ${mediaQueryTablet} {
                font-size: 1.85rem;
              }

              ${mediaQueryMobile} {
                font-size: 22px;
              }
            `}
          >
            Top 10 ความช่วยเหลือประจำสัปดาห์
          </Text>
          <React.Fragment>
            {provides?.filter(({ location }) =>
              searchValue ? location.name.includes(searchValue) : true
            ).length > 0 ? (
              <React.Fragment
                css={css`
                  .react-multi-carousel-list {
                    position: static;
                  }
                `}
              >
                {' '}
                <Carousel
                  responsive={responsive}
                  partialVisible={true}
                  arrows
                  css={css`
                    .react-multiple-carousel__arrow {
                      z-index: 10;
                    }

                    .react-multiple-carousel__arrow--left {
                      left: 0;
                    }

                    .react-multiple-carousel__arrow--right {
                      right: 0;
                    }
                  `}
                >
                  {provides
                    ?.filter(
                      ({ communityId, location, visibility }) =>
                        Boolean(visibility) &&
                        !Boolean(communityId) &&
                        (searchValue
                          ? location.name.includes(searchValue)
                          : true)
                    )
                    .map((items) => (
                      <PopularRequestSection key={items.id} data={[items]} />
                    ))}
                </Carousel>
              </React.Fragment>
            ) : (
              <EmptyData
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                css={css`
                  .ant-empty {
                    display: flex;
                    flex-direction: column;
                    height: 300px;
                    align-items: center;
                    justify-content: center;
                  }
                `}
                description={<span>ไม่พบข้อมูล</span>}
              />
            )}
          </React.Fragment>
          <Text
            fontWeight={500}
            marginY="30px"
            css={css`
              font-size: 2.5rem;

              ${mediaQueryLargeDesktop} {
                font-size: 1.92rem;
              }

              ${mediaQueryTablet} {
                font-size: 1.85rem;
              }

              ${mediaQueryMobile} {
                font-size: 22px;
              }
            `}
          >
            ความช่วยเหลือแนะนำ
          </Text>
          <React.Fragment>
            {requests?.filter(({ location }) =>
              searchValue ? location.name.includes(searchValue) : true
            ).length > 0 ? (
              <React.Fragment
                css={css`
                  .react-multi-carousel-list {
                    position: static;
                  }
                `}
              >
                {' '}
                <Carousel
                  responsive={responsive}
                  partialVisible={true}
                  arrows
                  css={css`
                    .react-multiple-carousel__arrow {
                      z-index: 10;
                    }

                    .react-multiple-carousel__arrow--left {
                      left: 0;
                    }

                    .react-multiple-carousel__arrow--right {
                      right: 0;
                    }
                  `}
                >
                  {requests
                    ?.filter(
                      ({ communityId, location, visibility }) =>
                        Boolean(visibility) &&
                        !Boolean(communityId) &&
                        (searchValue
                          ? location.name.includes(searchValue)
                          : true)
                    )
                    .map((items) => (
                      <SuggestedRequestSection key={items.id} data={[items]} />
                    ))}
                </Carousel>
              </React.Fragment>
            ) : (
              <EmptyData
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                css={css`
                  .ant-empty {
                    display: flex;
                    flex-direction: column;
                    height: 300px;
                    align-items: center;
                    justify-content: center;
                  }
                `}
                description={<span>ไม่พบข้อมูล</span>}
              />
            )}
          </React.Fragment>
          <Text
            fontWeight={500}
            marginY="30px"
            css={css`
              font-size: 2.5rem;

              ${mediaQueryLargeDesktop} {
                font-size: 1.92rem;
              }

              ${mediaQueryTablet} {
                font-size: 1.85rem;
              }

              ${mediaQueryMobile} {
                font-size: 22px;
              }
            `}
          >
            ข่าวน่าสนใจ
          </Text>
          <div
            css={css`
              display: flex;
            `}
          >
            <News />
          </div>
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </HomePageContainer>
  );
};
