import { Box } from '@components/box/Box';
import DetailHeader from '@components/page/groupDetail/DetailHeader';
import Carousel from '@components/page/groupDetail/Carousel';
import { TabList } from '@components/tabList/TabList';
import { useRef, useState } from 'react';
import { styled } from 'stitches.config';
import { useQueryGetGroup } from 'src/api/meeting/hooks';
import { useRouter } from 'next/router';
import { dateFormat } from '@utils/date';

const DetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data } = useQueryGetGroup({ params: { id } });
  const tabRef = useRef<HTMLDivElement[]>([]);
  const detailList = [
    {
      id: 0,
      title: '모임 소개',
      content: data?.title,
    },
    {
      id: 1,
      title: '모임 기간',
      content: `${dateFormat(data?.mStartDate ?? '')['YYYY.MM.DD']} - ${
        dateFormat(data?.mEndDate ?? '')['YYYY.MM.DD']
      }`,
    },
    {
      id: 2,
      title: '진행 방식',
      content: data?.processDesc,
    },
    {
      id: 3,
      title: '개설자 소개',
      content: data?.leaderDesc,
    },
    {
      id: 4,
      title: '모집 대상',
      content: data?.targetDesc,
    },
    {
      id: 5,
      title: '유의사항',
      content: data?.note,
    },
  ];
  const [selectedTab, setSelectedTab] = useState(detailList[0].title);

  const handleChange = (text: string) => {
    setSelectedTab(text);
    tabRef.current[
      detailList.findIndex(item => item.title === text)
    ].scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SDetailPage>
      <Carousel imageList={data?.imageURL ?? []} />
      {data && <DetailHeader detail={data} />}
      <TabList text={selectedTab} size="small" onChange={handleChange}>
        {detailList.map(({ id, title }) => (
          <TabList.Item key={id} text={title}>
            {title}
          </TabList.Item>
        ))}
      </TabList>
      {detailList.map(({ id, title, content }) => (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <SDetail key={id} ref={element => (tabRef.current[id] = element!)}>
          <STitle>{title}</STitle>
          <SContent>{content}</SContent>
        </SDetail>
      ))}
    </SDetailPage>
  );
};

export default DetailPage;

const SDetailPage = styled(Box, {
  mb: '$374',
});

const SDetail = styled(Box, {
  color: '$white',
  mt: '$120',
});

const STitle = styled(Box, {
  fontAg: '24_bold_100',
  mb: '$24',
});

const SContent = styled('p', {
  fontSize: '$22',
  lineHeight: '37.4px',
});
