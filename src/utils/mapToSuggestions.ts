import { MentionData } from '@draft-js-plugins/mention';
import { ChannelMember } from 'types/channel';
import { ServerMember } from 'types/server';

export const mapToSuggestions = (
  users: ChannelMember[] | ServerMember[] = [],
): MentionData[] => {
  return users.map(user => {
    return {
      avatar: user.profilePictureUrl,
      name: user.username,
      username: user.username,
      user_id: user.userId,
    };
  });
};
