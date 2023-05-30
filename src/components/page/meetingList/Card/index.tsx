import { Box } from '@components/box/Box';
import { Flex } from '@components/util/layout/Flex';
import { EApprovalStatus, RECRUITMENT_STATUS } from '@constants/option';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MeetingResponse, parsePartValueToLabel } from '@api/meeting';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg?rect';
import { getResizedImage } from '@utils/image';

interface CardProps {
  bottom?: ReactNode;
  meetingData: MeetingResponse;
}

function Card({ bottom, meetingData }: CardProps) {
  const isAllParts = meetingData.joinableParts?.length === 6 || meetingData.joinableParts === null;

  return (
    <Box as="li" css={{ width: '100%' }}>
      <Link href={`/detail?id=${meetingData.id}`} passHref>
        <a>
          <Box css={{ '@tablet': { display: 'flex', width: '100%' } }}>
            <Box css={{ position: 'relative' }}>
              <SStatus recruitingStatus={meetingData.status}>{RECRUITMENT_STATUS[meetingData.status]}</SStatus>
              <SThumbnailImage
                css={{
                  backgroundImage: `url(${getResizedImage(meetingData.imageURL[0].url, 760)})`,
                }}
              />
            </Box>
            <Box>
              <STitleSection>
                <SCategory>{meetingData.category}</SCategory>
                {meetingData.isMentorNeeded && <SCategory>멘토 구해요</SCategory>}
                <STitle>{meetingData.title}</STitle>
              </STitleSection>
              <Box
                css={{
                  '@tablet': {
                    display: 'none',
                  },
                }}
              >
                <Flex css={{ mb: '$14' }} align="center">
                  <SProfileWrapper>
                    {meetingData.user.profileImage ? (
                      <SProfile src={getResizedImage(meetingData.user.profileImage, 120)} alt="" />
                    ) : (
                      <ProfileDefaultIcon width={24} height={24} />
                    )}
                  </SProfileWrapper>
                  <SName>{meetingData.user.name}</SName>
                </Flex>
                <SInfoRow>
                  <SKey>활동 기간</SKey>
                  <SValue>
                    {dayjs(meetingData.mStartDate).format('YY.MM.DD')} -{' '}
                    {dayjs(meetingData.mEndDate).format('YY.MM.DD')}
                  </SValue>
                </SInfoRow>
                <SInfoRow>
                  <SKey>모집 대상</SKey>
                  <SValue>
                    {meetingData.targetActiveGeneration ? `${meetingData.targetActiveGeneration}기` : '전체 기수'} /{' '}
                    {isAllParts
                      ? '전체 파트'
                      : meetingData.joinableParts
                          .map(part => parsePartValueToLabel(part))
                          .filter(item => item !== null)
                          .join(',')}
                  </SValue>
                </SInfoRow>
                <SInfoRow>
                  <SKey>모집 현황</SKey>
                  <SValue>
                    {meetingData.appliedInfo.filter(info => info.status === EApprovalStatus.APPROVE).length}/
                    {meetingData.capacity}명
                  </SValue>
                </SInfoRow>
              </Box>
              <Box
                css={{
                  display: 'none',
                  '@tablet': {
                    display: 'flex',
                  },
                }}
              >
                <SMobileValue>{meetingData.category}</SMobileValue>
                <SMobileValue>{meetingData.user.name}</SMobileValue>
              </Box>
            </Box>
          </Box>
        </a>
      </Link>
      {bottom}
    </Box>
  );
}

export default Card;

const SThumbnailImage = styled('div', {
  width: '380px',
  height: '260px',
  overflow: 'hidden',
  borderRadius: '$12',
  backgroundColor: '$black80',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  '@tablet': {
    width: '120px',
    height: '82px',
    borderRadius: '$8',
  },
});

const SStatus = styled(Box, {
  position: 'absolute',
  top: '16px',
  left: '16px',
  borderRadius: '$8',
  padding: '$3 $8',
  fontStyle: 'T5',
  variants: {
    recruitingStatus: {
      0: {
        backgroundColor: '$gray100',
      },
      1: {
        backgroundColor: '$purple100',
      },
      2: {
        backgroundColor: '$black60',
      },
    },
  },
  '@tablet': {
    fontStyle: 'B4',
    top: '8px',
    left: '8px',
    borderRadius: '5px',
    padding: '$2 $6',
  },
});

const STitleSection = styled(Box, {
  my: '$16',
  '@tablet': {
    my: '$8',
  },
});

const SCategory = styled('p', {
  display: 'inline-block',
  fontStyle: 'T6',
  color: '$gray40',
  border: '1px solid $gray60',
  borderRadius: '37px',
  px: '$10',
  py: '$3',
  mr: '$5',
  '@tablet': {
    mr: '$0',
    display: 'none',
  },
});
const SProfileWrapper = styled(Box, {
  flexType: 'verticalCenter',
  color: '$white100',
  width: 'fit-content',
  mr: '$8',
});
const SProfile = styled('img', {
  width: '$24',
  height: '$24',
  borderRadius: '50%',
  objectFit: 'cover',
  background: '$black60',
});

const SName = styled('p', {
  fontStyle: 'T5',
});
const STitle = styled('p', {
  maxWidth: '380px',
  fontStyle: 'H2',
  mt: '$8',
  '@tablet': {
    fontAg: '14_semibold_140',
    maxWidth: '162px',
  },
});
const SInfoRow = styled(Flex, {
  '& + &': {
    mt: '$4',
  },
});
const SInfo = styled('p', {
  fontStyle: 'B3',
});
const SKey = styled(SInfo, {
  width: '74px',
  color: '$gray100',
  mr: '$12',
  whiteSpace: 'nowrap',
});
const SValue = styled(SInfo, {
  color: '$gray60',
});

const SMobileValue = styled('p', {
  fontAg: '12_medium_100',
  color: '$gray80',
  '& + &': {
    ml: '$8',
  },
  '&:first-child:after': {
    content: '|',
    ml: '$8',
  },
});
