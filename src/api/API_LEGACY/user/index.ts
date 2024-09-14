import { GroupInfo } from '@components/feed/Modal/FeedFormPresentation';
import { api, PromiseResponse } from '../..';
import { MeetingResponse } from '../meeting';
import { paths } from '@/__generated__/schema2';

/**
 * @deprecated
 */
interface ActivityResponse {
  part: string;
  generation: number;
}

/**
 * @deprecated
 */
export interface UserResponse {
  activities: ActivityResponse[];
  id: number;
  name: string;
  orgId: string;
  phone: string;
  profileImage: string;
}

export interface MyProfileResponse extends UserResponse {
  hasActivities: boolean;
}

/**
 * @deprecated
 * @example
 * 0 | 1 | 2 >> 'WAITING' | 'APPROVE' | 'REJECT' 로 변경되었습니다.
 */
export type ApplicationStatusType = 0 | 1 | 2;

export interface ApplyResponse {
  id: number;
  content: string;
  status: ApplicationStatusType;
  meeting: MeetingResponse;
  user: UserResponse;
}

type MeetingListOfAppliedResponse =
  paths['/user/v2/apply']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

type MeetingListOfMineResponse =
  paths['/user/v2/meeting']['get']['responses']['200']['content']['application/json;charset=UTF-8'];

export const fetchMeetingListOfApplied = async () => {
  return api.get<MeetingListOfAppliedResponse>('/user/v2/apply');
};

export const fetchMeetingListOfMine = async () => {
  return api.get<MeetingListOfMineResponse>('/user/v2/meeting');
};

export const fetchMyProfile = async () => {
  return api.get<PromiseResponse<MyProfileResponse>>('/users/v1/profile/me');
};

export const fetchMeetingListOfUserAttend = async () => {
  return api.get<GroupInfo[]>('/user/v2/meeting/all');
};
