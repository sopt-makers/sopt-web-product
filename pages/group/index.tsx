import Card from '@components/page/groupList/Card';
import GridLayout from '@components/page/groupList/GirdLayout';
import Pagination from '@components/page/groupList/Pagination';
import { TabList } from '@components/tabList/TabList';
import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const handleChange = (text: string) => {
    setSelectedTab(text);
  };

  return (
    <div>
      <main>
        main 페이지
        <TabList text={selectedTab} size="big" onChange={handleChange}>
          <TabList.Item text="all">모임 전체</TabList.Item>
          <TabList.Item text="mine">내 모임</TabList.Item>
        </TabList>
        <GridLayout>
          <Card />
          <Card />
          <Card />
          <Card />
        </GridLayout>
        <Pagination />
      </main>
    </div>
  );
};

export default Home;
