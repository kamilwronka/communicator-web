import { Channel } from './channel';

export type Server = {
  _id: string;
  name: string;
  owner_id: string;
  icon: string;
  channels: Channel[];
  members: ServerMember[];
};

export type ServerMember = {
  userId: string;
  username: string;
  profilePictureUrl: string;
};
