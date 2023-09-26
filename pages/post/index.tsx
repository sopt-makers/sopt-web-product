import { paths } from '@/__generated__/schema';
import FeedPostViewer from '@components/feed/FeedPostViewer/FeedPostViewer';
import Loader from '@components/loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { apiV2 } from '@api/index';
import FeedCommentInput from '@components/feed/FeedCommentInput/FeedCommentInput';

export default function PostPage() {
  const { query } = useRouter();
  const { GET, POST } = apiV2.get();

  const data = useQuery({
    queryFn: () => GET('/post/v1/{postId}', { params: { path: { postId: Number(query.id as string) } } }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    select: res => res.data.data,
    enabled: !!query.id,
  });

  const { mutateAsync, isLoading: isCreatingComment } = useMutation({
    mutationKey: ['/comment/v1'],
    mutationFn: (comment: string) => POST('/comment/v1', { body: { postId: post.id, contents: comment } }),
  });

  const handleCreateComment = async (comment: string) => {
    await mutateAsync(comment);
  };

  // TODO: 자동으로 타입 추론 되게끔 endpoint 수정 필요
  const post = data.data as paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json'];

  // TODO: loading 스켈레톤 UI가 있으면 좋을 듯
  if (!post) return <Loader />;

  return (
    <div>
      <FeedPostViewer
        post={post}
        Actions={['수정', '삭제']}
        CommentInput={<FeedCommentInput onSubmit={handleCreateComment} disabled={isCreatingComment} />}
      />
    </div>
  );
}
