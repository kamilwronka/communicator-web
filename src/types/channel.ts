export enum ChannelType {
  PRIVATE = 'PRIVATE',
  TEXT = 'TEXT',
  VOICE = 'VOICE',
  PARENT = 'PARENT',
}

export type ChannelMember = {
  profilePictureUrl: string;
  username: string;
  userId: string;
};

export type Channel = {
  name: string;
  type: ChannelType;
  allowed_roles?: string[];
  _id: string;
  users?: ChannelMember[];
};
