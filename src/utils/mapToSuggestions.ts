import { MentionData } from '@draft-js-plugins/mention';

import { ServerMember } from '../hooks/api/useServerMembers';
import { User } from '../hooks/api/useUserData';

export const mapMembersToSuggestions = (
  members: ServerMember[] = [],
): MentionData[] => {
  return members.map(({ user: { avatar, username, id } }) => {
    return {
      avatar,
      name: username,
      username,
      id,
    };
  });
};

export const mapUsersToSuggestions = (users: User[] = []): MentionData[] => {
  return users.map(({ avatar, id, username }) => {
    return {
      avatar,
      name: username,
      username,
      id,
    };
  });
};
