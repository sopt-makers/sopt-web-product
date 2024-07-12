import { api, apiV2, Data } from '..';

export interface PostCommentWithMentionRequest {
  userIds: number[] | null;
  content: string;
  postId: number;
}

export const postCommentWithMention = async (body: PostCommentWithMentionRequest): Promise<any> => {
  return await api.post(`/comment/v2/mention`, body);
};

export const postPostWithMention = async (body: PostCommentWithMentionRequest): Promise<any> => {
  return await api.post(`/post/v2/mention`, body);
};
