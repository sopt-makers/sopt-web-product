import { Box } from '@components/box/Box';
import { ComponentProps } from 'react';
import { styled } from 'stitches.config';

type ModalBackgroundProps = ComponentProps<typeof Box>;

const ModalBackground = (props: ModalBackgroundProps) => {
  return <SModalBackground {...props} />;
};

export default ModalBackground;

const SModalBackground = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  width: '100%',
  height: '100%',
  backgroundColor: '$black80_trans',
});
