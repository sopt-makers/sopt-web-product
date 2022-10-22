import { TabList } from '@components/tabList/TabList';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const handleChange = (text: string) => {
    setSelectedTab(text);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        main 페이지
        <TabList text={selectedTab} size="big" onChange={handleChange}>
          <TabList.Item text="all">모임 전체</TabList.Item>
          <TabList.Item text="mine">내 모임</TabList.Item>
        </TabList>
      </main>
    </div>
  );
};

export default Home;
