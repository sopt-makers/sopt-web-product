import { Box } from '@components/box/Box';
import React, { useState } from 'react';
import { styled } from 'stitches.config';
import ArrowSmallRightIcon from '@assets/svg/arrow_small_right.svg';
import useModal from '@hooks/useModal';
import DefaultModal from '@components/modal/DefaultModal';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useRouter } from 'next/router';
import ApplicantList from './ApplicantList';

const DetailHeader = () => {
  const router = useRouter();
  const groupId = router.query.id;
  const isRecruiting = true;
  const startDate = '22.10.21';
  const endDate = '22.10.28';
  const category = '스터디';
  const studyName = '피그마 왕초보를 위한 스터디';
  const hostName = '홍길동';
  const current = 4;
  const total = 5;
  const isHost = false;
  const [isApplied, setIsApplied] = useState(false);
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'default' | 'confirm'>('default');
  const isDefaultModalOpened = isModalOpened && modalType === 'default';
  const isConfirmModalOpened = isModalOpened && modalType === 'confirm';
  const modalMessage = isHost
    ? '모임을 삭제하시겠습니까?'
    : '신청을 취소하시겠습니까?';
  const modalConfirmButton = isHost ? '삭제하기' : '취소하기';

  const handleApplicantListModal = () => {
    handleModalOpen();
    setModalTitle(`모집 현황 (${current}/${total}명)`);
    setModalType('default');
  };

  const handleApplicationModal = () => {
    if (!isApplied) {
      handleModalOpen();
      setModalTitle('모임 신청하기');
      setModalType('default');
      // TODO : 신청하기 눌렀을 때
      setIsApplied(prev => !prev);
    } else {
      setModalType('confirm');
      handleModalOpen();
      // TODO: 취소하기 눌렀을 때
      setIsApplied(prev => !prev);
    }
  };

  const handleGroupDelete = () => {
    setModalType('confirm');
    handleModalOpen();
  };

  return (
    <>
      <SDetailHeader>
        <SAbout>
          <div>
            <SRecruitStatus isRecruiting={isRecruiting}>
              모집{isRecruiting ? ' 중' : '마감'}
            </SRecruitStatus>
            <SPeriod>
              {startDate} - {endDate}
            </SPeriod>
          </div>
          <h1>
            <span>{category}</span>
            {studyName}
          </h1>
          <SProfile>
            <SProfileImage />
            <span>{hostName}</span>
            <ArrowSmallRightIcon />
          </SProfile>
        </SAbout>
        <div>
          <SStatusButton onClick={handleApplicantListModal}>
            <div>
              <span>모집 현황</span>
              <span>
                {current}/{total}명
              </span>
            </div>
            <ArrowSmallRightIcon />
          </SStatusButton>
          {!isHost && (
            <SGuestButton
              isApplied={isApplied}
              onClick={handleApplicationModal}
            >
              신청{isApplied ? ' 취소' : '하기'}
            </SGuestButton>
          )}
          {isHost && (
            <SHostButton>
              <button onClick={handleGroupDelete}>삭제</button>
              <button>수정</button>
            </SHostButton>
          )}
        </div>
      </SDetailHeader>
      {isConfirmModalOpened && (
        <ConfirmModal
          message={modalMessage}
          cancelButton="돌아가기"
          confirmButton={modalConfirmButton}
          handleModalClose={handleModalClose}
        />
      )}
      {isDefaultModalOpened && (
        <DefaultModal title={modalTitle} handleModalClose={handleModalClose}>
          {modalTitle === '모임 신청하기' ? (
            <SApplicationForm>
              {/* TODO : Textarea 컴포넌트 추가되면 수정할 예정 */}
              <textarea placeholder="(선택사항) 모임에 임할 각오를 입력해주세요!" />
              <button onClick={handleModalClose}>신청하기</button>
            </SApplicationForm>
          ) : (
            <SApplicantListWrapper>
              <ApplicantList />
              {isHost && (
                <button
                  onClick={() => router.push(`/invitation?id=${groupId}`)}
                >
                  참여자 리스트
                  <ArrowSmallRightIcon />
                </button>
              )}
              {isApplied && (
                <button
                  onClick={() => router.push(`/invitation?id=${groupId}`)}
                >
                  신청자 리스트
                  <ArrowSmallRightIcon />
                </button>
              )}
            </SApplicantListWrapper>
          )}
        </DefaultModal>
      )}
    </>
  );
};

export default DetailHeader;

const SDetailHeader = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  paddingBottom: '$120',
  borderBottom: `2px solid $black60`,
  mb: '$40',
});

const SAbout = styled(Box, {
  marginRight: '$90',

  '& > div': {
    flexType: 'verticalCenter',
    mb: '$12',
  },

  '& > h1': {
    span: {
      color: '$gray80',
      marginRight: '$8',
    },

    fontAg: '34_bold_140',
    mb: '$20',
  },
});

const SRecruitStatus = styled(Box, {
  width: 'fit-content',
  padding: '$7 $8',
  mr: '$12',
  borderRadius: '6px',
  fontAg: '16_bold_100',

  variants: {
    isRecruiting: {
      true: {
        backgroundColor: '$purple100',
      },
      false: {
        backgroundColor: '$gray80',
      },
    },
  },
});

const SPeriod = styled(Box, {
  fontAg: '20_bold_100',
});

const SProfile = styled('button', {
  flexType: 'verticalCenter',
  color: '$white',

  '& > span': {
    mr: '$16',
  },
});

const SProfileImage = styled(Box, {
  width: '$60',
  height: '$60',
  borderRadius: '50%',
  objectFit: 'cover',
  mr: '$16',
  backgroundColor: '$black60',
});

const Button = styled('button', {
  width: '$300',
  height: '$60',
  borderRadius: '12px',
  color: '$white',
});

const SStatusButton = styled(Button, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  padding: '$21 $20',
  mb: '$16',
  backgroundColor: '$black80',
  fontAg: '18_semibold_100',

  'span:first-child': {
    mr: '$12',
    color: '$gray80',
  },
});

const SGuestButton = styled(Button, {
  fontAg: '20_bold_100',
  padding: '$20 0',
  textAlign: 'center',

  variants: {
    isApplied: {
      true: {
        border: `2px solid $black40`,
      },
      false: {
        backgroundColor: '$purple100',
      },
    },
  },
});

const SHostButton = styled(Box, {
  button: {
    width: '$144',
    color: '$white',
    padding: '$20 0',
    textAlign: 'center',
    borderRadius: '$50',
    fontAg: '20_bold_100',
  },

  'button:first-child': {
    border: `2px solid $black40`,
    mr: '12px',
  },

  'button:last-child': {
    backgroundColor: '$purple100',
  },
});

const SApplicantListWrapper = styled(Box, {
  padding: '$28 $28 $88 $28',

  button: {
    mt: '$24',
    fontAg: '16_semibold_100',
    color: '$white',
    float: 'right',
    flexType: 'verticalCenter',

    svg: {
      ml: '$8',
    },
  },
});

const SApplicationForm = styled(Box, {
  padding: '$24 $24 $48 $24',
  borderBottomLeftRadius: '16px',
  borderBottomRightRadius: '16px',
  height: '$356',

  '& > p': {
    fontAg: '32_bold_100',
    textAlign: 'center',
    mt: '$32',
    mb: '$48',
  },

  // 임시
  textarea: {
    width: '100%',
    height: '$200',
    fontAg: '22_regular_170',
    color: '$gray80',
    backgroundColor: '$black60',
    outline: 'none',
    borderRadius: '10px',
  },

  button: {
    display: 'block',
    margin: '0 auto',
    mt: '$28',
    padding: '$19 0',
    width: '$180',
    borderRadius: '12px',
    textAlign: 'center',
    fontAg: '18_bold_100',
    color: '$white',
    backgroundColor: '$purple100',
  },
});
