import { Box } from '@components/box/Box';
import DetailHeader from '@components/page/meetingDetail/DetailHeader';
import Carousel from '@components/page/meetingDetail/Carousel';
import { TabList } from '@components/tabList/TabList';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';
import { useMutationDeleteMeeting, useMutationPostApplication, useQueryGetMeeting } from '@api/meeting/hooks';
import { useRouter } from 'next/router';
import Loader from '@components/loader/Loader';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
import { PART_NAME } from '@constants/option';
import { parseTextToLink } from '@components/util/parseTextToLink';
import { useDisplay } from '@hooks/useDisplay';

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { isMobile } = useDisplay();
  const { data: detailData } = useQueryGetMeeting({ params: { id } });
  const { mutate: mutateDeleteMeeting } = useMutationDeleteMeeting({});
  const { mutate: mutatePostApplication } = useMutationPostApplication({});
  const tabRef = useRef<HTMLElement[]>([]);
  const detailList = [
    {
      id: 0,
      title: '모임 소개',
      content: detailData?.desc,
    },
    {
      id: 1,
      title: '활동 기간',
      content: `${dayjs(detailData?.mStartDate ?? '').format('YYYY.MM.DD (ddd)')} ~ ${dayjs(
        detailData?.mEndDate ?? ''
      ).format('YYYY.MM.DD (ddd)')}`,
    },
    {
      id: 2,
      title: '진행 방식',
      content: detailData?.processDesc,
    },
    {
      id: 3,
      title: '모집 대상',
      generation: detailData?.canJoinOnlyActiveGeneration ? '활동 기수' : '전체',
      partList: detailData?.joinableParts?.map(key => PART_NAME[key]),
      content: detailData?.targetDesc,
    },
    {
      id: 4,
      title: '개설자 소개',
      content: detailData?.leaderDesc,
    },
    {
      id: 5,
      title: '유의사항',
      content: detailData?.note,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(detailList[0].title);

  const handleChange = (text: string) => {
    setSelectedTab(text);
    tabRef.current[detailList.findIndex(item => item.title === text)].scrollIntoView({ behavior: 'smooth' });
  };

  const handleContent = (content: string) => {
    return parseTextToLink(content);
  };

  if (!detailData) {
    return <Loader />;
  }

  return (
    <SDetailPage>
      <Carousel imageList={detailData?.imageURL} />
      <DetailHeader
        detailData={detailData}
        mutateMeetingDeletion={mutateDeleteMeeting}
        mutateApplication={mutatePostApplication}
      />
      {isMobile && (
        <TabList text={selectedTab} size="small" onChange={handleChange}>
          {detailList.map(
            ({ id, title, content }) =>
              content && (
                <TabList.Item key={id} text={title}>
                  {title}
                </TabList.Item>
              )
          )}
        </TabList>
      )}
      {detailList.map(
        ({ id, title, generation, partList, content }) =>
          content && (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <SDetail key={id} ref={element => (tabRef.current[id] = element!)}>
              <STitle>{title}</STitle>
              {title === '모집 대상' && (
                <STarget>
                  <span>대상 기수</span> : {generation}
                  <br />
                  <span>대상 파트</span> : {partList?.join(', ')}
                </STarget>
              )}
              <SDescription>{handleContent(content)}</SDescription>
            </SDetail>
          )
      )}
    </SDetailPage>
  );
};

export default DetailPage;

const SDetailPage = styled(Box, {
  mb: '$374',

  '@tablet': {
    mb: '$122',
  },
});

const SDetail = styled('section', {
  scrollMarginTop: '$80',
  color: '$white100',
  mt: '$120',

  '@tablet': {
    mt: '$56',
  },
});

const STitle = styled('h2', {
  fontAg: '24_bold_100',
  mb: '$24',

  '@tablet': {
    fontAg: '16_bold_100',
    mb: '$20',
  },
});

const SDescription = styled('p', {
  fontAg: '22_regular_170',
  whiteSpace: 'pre-line',

  a: {
    textDecoration: 'underline',
  },

  '@tablet': {
    fontAg: '16_medium_150',
  },
});

const STarget = styled(SDescription, {
  mb: '$24',

  '@tablet': {
    mb: '$20',
  },

  span: {
    fontAg: '22_semibold_150',

    '@tablet': {
      fontAg: '16_bold_150',
    },
  },
});
