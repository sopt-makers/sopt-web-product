import { Box } from '@components/box/Box';
import { styled } from 'stitches.config';
import ProfileDefaultIcon from '@assets/svg/profile_default.svg';
import Image from 'next/image';
import useModal from '@hooks/useModal';
import { Dialog } from '@headlessui/react';
import XBigIcon from '@assets/svg/x_big.svg';
import ModalBackground from '@components/modal/ModalBackground';

interface ListItemProps {
  profileImage?: string;
  name: string;
  date: string;
  status?: 'waiting' | 'accepted' | 'rejected';
  detail?: string;
  isHost: boolean;
}

const ListItem = ({
  profileImage,
  name,
  date,
  status,
  detail,
  isHost,
}: ListItemProps) => {
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return '대기';
      case 'accepted':
        return '승인';
      case 'rejected':
        return '거절';
    }
  };

  return (
    <>
      <SListItem>
        <SLeft>
          {profileImage ? (
            <Image src={profileImage} width="32" height="32" />
          ) : (
            <ProfileDefaultIcon />
          )}
          <SName>{name}</SName>
          {isHost && status && (
            <SStatus isAccepted={status === 'accepted'}>
              {getStatusText(status)}
            </SStatus>
          )}
          {isHost && (
            <>
              <SVerticalLine />
              <SDetailButton onClick={handleModalOpen}>신청내역</SDetailButton>
            </>
          )}
          <SVerticalLine />
          <SDate>{date}</SDate>
        </SLeft>
        {isHost && (
          <div>
            {status === 'waiting' && (
              <>
                <SHostPurpleButton>승인</SHostPurpleButton>
                <SHostGrayButton>거절</SHostGrayButton>
              </>
            )}
            {status === 'accepted' && (
              <SHostGrayButton>승인 취소</SHostGrayButton>
            )}
            {status === 'rejected' && (
              <SHostGrayButton>거절 취소</SHostGrayButton>
            )}
          </div>
        )}
      </SListItem>
      {isModalOpened && (
        <Dialog open={isModalOpened} onClose={handleModalClose}>
          <ModalBackground />
          <Dialog.Panel>
            <SDialogWrapper>
              <SHeader>
                <Dialog.Title className="title">신청내역</Dialog.Title>
                <button onClick={handleModalClose}>
                  <SXBigIcon />
                </button>
              </SHeader>
              <SDetailText>{detail}</SDetailText>
            </SDialogWrapper>
          </Dialog.Panel>
        </Dialog>
      )}
    </>
  );
};

export default ListItem;

const SListItem = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  borderRadius: '19.711px',
  backgroundColor: '$black80',
  padding: '$24 $32 $24 $24',
  mb: '$20',
});

const SLeft = styled(Box, {
  flexType: 'verticalCenter',

  '& img': {
    borderRadius: '$round',
  },
});

const SVerticalLine = styled(Box, {
  width: '$1',
  height: '$12',
  ml: '$30',
  mr: '$30',
  backgroundColor: '$gray100',
});

const SName = styled('button', {
  ml: '$24',
  color: '$white',
  fontWeight: '$bold',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
});

const SDate = styled(Box, {
  flexType: 'verticalCenter',
  fontAg: '18_medium_100',
});

const SStatus = styled('span', {
  padding: '$4',
  ml: '$8',
  borderRadius: '4px',
  fontAg: '12_semibold_100',
  backgroundColor: '$gray100',

  variants: {
    isAccepted: {
      true: {
        backgroundColor: '$purple200',
      },
    },
  },
});

const SDetailButton = styled('button', {
  color: '$white',
  textDecoration: 'underline',
  textUnderlinePosition: 'under',
});

const SHostGrayButton = styled('button', {
  color: '$white',
  borderRadius: '32px',
  fontAg: '16_bold_100',
  padding: '$12 $20',
  backgroundColor: '$black40',
  lineHeight: '$16',
});

const SHostPurpleButton = styled(SHostGrayButton, {
  marginRight: '8.5px',
  backgroundColor: '$purple100',
});

const SDialogWrapper = styled(Box, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '2',
  width: '$646',
  borderRadius: '20px',
  boxShadow: '4px 4px 40px #181818',
  background: '$black80',
});

const SHeader = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  height: '$100',
  padding: '$40 $40 $36 $40',
  borderBottom: `1px solid $black40`,

  '.title': {
    width: '100%',
    fontAg: '24_bold_100',
    textAlign: 'center',
    color: '$white',
  },
});

const SXBigIcon = styled(XBigIcon, {
  cursor: 'pointer',
});

const SDetailText = styled('p', {
  backgroundColor: '$black60',
  margin: '$24',
  padding: '$16',
  borderRadius: '19.711px',
  minHeight: '$200',
  fontAg: '16_medium_150',
  color: '$white',
});
