import { Box } from '@components/box/Box';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';

const GroupInformation = () => {
  const router = useRouter();
  const groupId = router.query.id;

  // 임시
  const category = '스터디';
  const isRecruiting = true;
  const studyName = '피그마 왕초보를 위한 스터디! 개발자도 기획자도 오세요들';
  const hostName = '홍길동';
  const startDate = '22.10.21';
  const endDate = '22.10.28';
  const current = 4;
  const total = 5;

  return (
    <SGroupInformation>
      <SImage />
      <div>
        <SCategory>{category}</SCategory>
        <STitle>
          <span>모집{isRecruiting ? ' 중 ' : '마감 '} </span>
          {studyName}
        </STitle>
        <SDetailContainer>
          <div>
            <SDetail>
              <SDetailType>모임 생성</SDetailType>
              <span>{hostName}</span>
            </SDetail>
            <SDetail>
              <SDetailType>모집 기간</SDetailType>
              <span>
                {startDate} - {endDate}
              </span>
            </SDetail>
            <SDetail>
              <SDetailType>모집 현황</SDetailType>
              <span>
                {current}/{total}명
              </span>
            </SDetail>
          </div>
          <button onClick={() => router.push(`/group/detail/${groupId}`)}>
            상세 보기
          </button>
        </SDetailContainer>
      </div>
    </SGroupInformation>
  );
};

export default GroupInformation;

const SGroupInformation = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  marginTop: '$70',
  paddingBottom: '$64',
  borderBottom: `2px solid $black40`,
});

// TODO : 이미지 넣으면 수정할 예정
const SImage = styled(Box, {
  width: '$478',
  minWidth: '$478',
  height: '$312',
  borderRadius: '14px',
  marginRight: '$35',
  backgroundColor: '$black40',
});

const SCategory = styled(Box, {
  color: '$gray80',
  fontAg: '24_semibold_100',
  marginBottom: '$12',
});

const STitle = styled(Box, {
  fontAg: '34_bold_140',
  marginBottom: '$40',

  '& > span': {
    color: '$purple100',
  },
});

const SDetailContainer = styled(Box, {
  fontAg: '20_medium_100',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',

  '& > div': {
    marginBottom: '$24',
  },

  '& > button': {
    padding: '$20 $34',
    color: '$purple100',
    border: `2px solid $purple100`,
    borderRadius: '10px',
    fontAg: '20_bold_100',
  },
});

const SDetail = styled(Box, {
  marginBottom: '$12',
});

const SDetailType = styled('span', {
  color: '$gray80',
  marginRight: '$16',
});
