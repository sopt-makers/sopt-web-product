import { paths } from '@/__generated__/schema';
import FeedCommentViewer from '../FeedCommentViewer/FeedCommentViewer';
import FeedActionButton from '../FeedActionButton/FeedActionButton';
import { useOverlay } from '@hooks/useOverlay/Index';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useRef, useState } from 'react';
import { useDeleteComment } from '@api/post/hooks';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiV2 } from '@api/index';
import FeedCommentEditor from '../FeedCommentEditor/FeedCommentEditor';
import { parseTextToLink } from '@components/util/parseTextToLink';
import { PostCommentWithMentionRequest } from '@api/mention';
import { useMutationPostCommentWithMention } from '@api/mention/hooks';
import FeedReCommentContainer from '../FeedReCommentContainer/FeedReCommentContainer';
import { styled } from 'stitches.config';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import Avatar from '@components/avatar/Avatar';
import { replyType } from '../FeedReCommentContainer/FeedReCommentType';
import ReplyPointIcon from '@assets/svg/recomment_point_icon.svg';
import ReCommentHoverIcon from '@assets/svg/Recomment_Hover_Icon.svg';
import MessageIcon from '@assets/svg/message-dots.svg?v2';
import ReWriteIcon from '@assets/svg/comment-write.svg';
import TrashIcon from '@assets/svg/trash.svg';
import AlertIcon from '@assets/svg/alert-triangle.svg';
interface FeedCommentContainerProps {
  comment: paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'][number];
  isMine: boolean;
  postUserId: number;
  onClickLike: (commentId: number) => void;
}

// eslint-disable-next-line prettier/prettier
export default function FeedCommentContainer({ comment, isMine, postUserId, onClickLike }: FeedCommentContainerProps) {
  const queryClient = useQueryClient();
  const { PUT } = apiV2.get();
  const { query } = useRouter();
  const overlay = useOverlay();
  const [editMode, setEditMode] = useState(false);
  const [showMoreReComments, setShowMoreReComments] = useState(false);
  const initialReplyLength = useRef<number>(comment?.replies?.length);

  const { mutate: mutateDeleteComment } = useDeleteComment(query.id as string);

  const { mutate: mutatePostCommentWithMention } = useMutationPostCommentWithMention({});

  const { mutateAsync: mutateEditComment } = useMutation({
    mutationFn: (contents: string) =>
      PUT('/comment/v2/{commentId}', { params: { path: { commentId: comment.id } }, body: { contents } }),
    onSuccess: () => queryClient.invalidateQueries(['/comment/v1', query.id]),
  });

  const handleSubmitComment = async (req: PostCommentWithMentionRequest) => {
    await mutateEditComment(req.content);
    mutatePostCommentWithMention(req);
    setEditMode(false);
  };

  return (
    <>
      {comment.user.id === null ? (
        <div style={{ color: colors.gray500 }}>{comment.contents}</div>
      ) : (
        <FeedCommentViewer
          key={comment.id}
          comment={comment}
          Actions={
            isMine
              ? [
                  <FeedActionButton onClick={() => setEditMode(true)}>
                    <ReWriteIcon />
                    수정
                  </FeedActionButton>,
                  <FeedActionButton
                    onClick={() =>
                      overlay.open(({ isOpen, close }) => (
                        // eslint-disable-next-line prettier/prettier
                        <ConfirmModal
                          isModalOpened={isOpen}
                          message="댓글을 삭제하시겠습니까?"
                          cancelButton="돌아가기"
                          confirmButton="삭제하기"
                          handleModalClose={close}
                          handleConfirm={() => {
                            mutateDeleteComment(comment.id);
                            close();
                          }}
                        />
                      ))
                    }
                  >
                    <TrashIcon />
                    삭제
                  </FeedActionButton>,
                ]
              : [
                  <FeedActionButton
                    onClick={() =>
                      overlay.open(({ isOpen, close }) => (
                        // eslint-disable-next-line prettier/prettier
                        //todo: 신고 모달 여기에 붙여주세요.
                        <ConfirmModal
                          isModalOpened={isOpen}
                          message="신고하시겠습니까?"
                          cancelButton="돌아가기"
                          confirmButton="신고하기"
                          handleModalClose={close}
                          handleConfirm={() => {
                            mutateDeleteComment(comment.id);
                            close();
                          }}
                        />
                      ))
                    }
                  >
                    <AlertIcon />
                    신고
                  </FeedActionButton>,
                ]
          }
          Content={
            editMode ? (
              <FeedCommentEditor
                defaultValue={comment.contents}
                onCancel={() => setEditMode(false)}
                onSubmit={handleSubmitComment}
              />
            ) : (
              parseTextToLink(comment.contents)
            )
          }
          isMine={isMine}
          isPosterComment={postUserId === comment.user.id}
          onClickLike={onClickLike}
        />
      )}
      {initialReplyLength.current >= 2 && !showMoreReComments ? (
        <LoadMoreReCommentsButton onClick={() => setShowMoreReComments(!showMoreReComments)}>
          <ReplyPointIcon style={{ marginRight: '12px' }} />
          <Avatar
            src={comment.replies[comment?.replies?.length - 1].user.profileImage || ''}
            alt={comment.user.name}
            sx={{ width: 28, height: 28 }}
          />
          <SReplyButton>{comment.replies[comment?.replies?.length - 1].user.name}님이 답글을 달았습니다</SReplyButton>
          <MessageIconWrapper>
            <SMessageIcon />
            <SMessageHoverIcon />
          </MessageIconWrapper>
          <span>{comment?.replies?.length}개 보기</span>
        </LoadMoreReCommentsButton>
      ) : (
        <>
          {comment?.replies?.map((reply: replyType) => {
            return (
              <FeedReCommentContainer
                comment={comment}
                reply={reply}
                isMine={isMine}
                postUserId={postUserId}
                onClickLike={onClickLike}
              />
            );
          })}
        </>
      )}
    </>
  );
}

const LoadMoreReCommentsButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& > span': {
    color: colors.gray300,
    ...fontsObject.LABEL_4_12_SB,
    marginLeft: '4px',
  },
});

const SReplyButton = styled('div', {
  marginLeft: '8px',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const MessageIconWrapper = styled('div', {
  width: '20px',
  height: '20px',
  color: '$gray300',
  marginLeft: '12px',
  '&:hover svg:first-of-type': {
    display: 'none',
  },
  '&:hover svg:nth-of-type(2)': {
    display: 'block',
  },
});
const SMessageHoverIcon = styled(ReCommentHoverIcon, {
  display: 'none',
  fill: colors.gray300,
});
const SMessageIcon = styled(MessageIcon, {
  display: 'block',
});
