import { Box } from '@components/box/Box';
import React, { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';
import { TabProps } from './Tab';

interface TabsProps {
  text: string;
  size: string;
  onChange: (text: string) => void;
  children: React.ReactElement<TabProps>[];
}

interface TabsContextProps {
  text: string;
  size: string;
  onChange: (text: string) => void;
}

const TabsContext = React.createContext<TabsContextProps>({
  text: '',
  size: '',
  onChange: () => {},
});
export const useTabsContext = () => {
  return React.useContext(TabsContext);
};

function Tabs({
  text,
  size,
  onChange,
  children,
}: PropsWithChildren<TabsProps>) {
  return (
    <STabs
      css={{
        gap: size === 'small' ? '$24' : '$32',
      }}
    >
      <TabsContext.Provider value={{ text, size, onChange }}>
        {children}
      </TabsContext.Provider>
    </STabs>
  );
}

export default Tabs;

const STabs = styled(Box, {
  display: 'flex',
  cursor: 'pointer',
});
