import { Box } from '@components/box/Box';
import DetailHeader from '@components/page/groupDetail/DetailHeader';
import Carousel from '@components/page/groupDetail/Carousel';
import { TabList } from '@components/tabList/TabList';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';
import {
  useMutationDeleteGroup,
  useMutationPostApplication,
  useMutationUpdateInvitation,
  useQueryGetGroup,
} from 'src/api/meeting/hooks';
import { useRouter } from 'next/router';
import Loader from '@components/loader/Loader';
import dayjs from 'dayjs';

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: detailData } = useQueryGetGroup({ params: { id } });
  const { mutate: mutateDeleteGroup } = useMutationDeleteGroup({});
  const { mutate: mutatePostApplication } = useMutationPostApplication({});
  const { mutate: mutateUpdateInvitation } = useMutationUpdateInvitation({});
  const tabRef = useRef<HTMLElement[]>([]);
  // TODO: targetGeneration과 targetPart는 임시 변수, response 수정되면 제거 예정
  const targetGeneration = '32기';
  const targetPart = '기획';
  const detailList = [
    {
      id: 0,
      title: '모임 소개',
      content: detailData?.desc,
    },
    {
      id: 1,
      title: '모임 기간',
      content: `${dayjs(detailData?.mStartDate ?? '').format('YYYY.MM.DD')} - ${dayjs(
        detailData?.mEndDate ?? ''
      ).format('YYYY.MM.DD')}`,
    },
    {
      id: 2,
      title: '진행 방식',
      content: detailData?.processDesc,
    },
    {
      id: 3,
      title: '모집 대상',
      generation: targetGeneration,
      part: targetPart,
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

  if (!detailData) {
    return <Loader />;
  }

  return (
    <SDetailPage>
      <Carousel imageList={detailData?.imageURL} />
      <DetailHeader
        detailData={detailData}
        mutateGroupDeletion={mutateDeleteGroup}
        mutateApplication={mutatePostApplication}
        mutateInvitation={mutateUpdateInvitation}
      />
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
      {detailList.map(
        ({ id, title, generation, part, content }) =>
          content && (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <SDetail key={id} ref={element => (tabRef.current[id] = element!)}>
              <STitle>{title}</STitle>
              {title === '모집 대상' && (
                <STarget>
                  <span>대상 기수</span> : {generation}
                  <br />
                  <span>대상 파트</span> : {part}
                </STarget>
              )}
              <SDescription>{content}</SDescription>
            </SDetail>
          )
      )}
    </SDetailPage>
  );
};

export default DetailPage;

const SDetailPage = styled(Box, {
  mb: '$374',

  '@mobile': {
    mb: '$122',
  },
});

const SDetail = styled('section', {
  scrollMarginTop: '$80',
  color: '$white',
  mt: '$120',

  '@mobile': {
    mt: '$56',
  },
});

const STitle = styled('h2', {
  fontAg: '24_bold_100',
  mb: '$24',

  '@mobile': {
    fontAg: '16_bold_100',
    mb: '$20',
  },
});

const SDescription = styled('p', {
  fontAg: '22_regular_170',

  '@mobile': {
    fontAg: '16_medium_150',
  },
});

const STarget = styled(SDescription, {
  mb: '$24',

  '@mobile': {
    mb: '$20',
  },

  span: {
    fontAg: '22_semibold_150',

    '@mobile': {
      fontAg: '16_bold_150',
    },
  },
});
