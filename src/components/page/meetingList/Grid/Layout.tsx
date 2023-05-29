import { Box } from '@components/box/Box';
import { PropsWithChildren } from 'react';
import { styled } from 'stitches.config';

function GridLayout({ children }: PropsWithChildren) {
  return <StyledGridContainer as="ul">{children}</StyledGridContainer>;
}

const StyledGridContainer = styled(Box, {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '30px',
  margin: '24px 0 120px 0',
  rowGap: '120px',
  placeItems: 'start center',

  '@media (max-width: 1250px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 850px)': {
    gridTemplateColumns: '1fr',
  },
  '@mobile': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    margin: '16px 0 40px 0',
    rowGap: '40px',
    columnGap: '11px',
  },
  '@media (max-width: 550px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 359px)': {
    gridTemplateColumns: '1fr',
  },
});

export default GridLayout;
