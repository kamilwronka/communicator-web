export enum ChannelType {
  PRIVATE = 'PRIVATE',
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  PARENT = 'PARENT',
}

export type ChannelMember = {
  profilePictureUrl: string;
  username: string;
  id: string;
};

export type Channel = {
  name: string;
  type: ChannelType;
  allowed_roles?: string[];
  id: string;
  users?: ChannelMember[];
};
