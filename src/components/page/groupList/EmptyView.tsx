import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

function EmptyView({ message }: { message: string }) {
  return (
    <Wrapper css={{ minHeight: '820px' }}>
      <Message>{message}</Message>
    </Wrapper>
  );
}

export default EmptyView;

const Wrapper = styled(Flex.Center, {
  minHeight: '820px',
  border: '1px solid $black40',
  borderRadius: '10px',
  my: '$24',
});

const Message = styled('p', {
  fontAg: '24_medium_100',
  color: '$gray80',
});
