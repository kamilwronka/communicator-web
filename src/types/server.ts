import { Channel } from './channel';

export type Server = {
  id: string;
  name: string;
  owner_id: string;
  icon: string;
  channels: Channel[];
  members: ServerMember[];
};

export type ServerMember = {
  id: string;
  username: string;
  profilePictureUrl: string;
};
