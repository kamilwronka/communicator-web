export enum GatewayEvents {
  //main
  IDENTIFY = 'identify',
  HELLO = 'hello',
  DISCONNECTING = 'disconnecting',
  DISCONNECT = 'disconnect',
  CONNECT = 'connect',

  // server
  SERVER_JOIN = 'server-join',
  SERVER_PRESENCE_UPDATE = 'server-presence-update',
  SERVER_PRESENCE_REQUEST = 'server-presence-request',
  SERVER_CHANNEL_CREATE = 'server-channel-create',
  SERVER_CHANNEL_UPDATE = 'server-channel-update',
  SERVER_CHANNEL_DELETE = 'server-channel-delete',

  // server messaging
  SERVER_MESSAGE_SEND = 'server-message-send',
  SERVER_MESSAGE_UPDATE = 'server-message-update',
  SERVER_MESSAGE_DELETE = 'server-message-delete',
  SERVER_MESSAGE_REACTION_ADD = 'server-message-reaction-add',
  SERVER_MESSAGE_REACTION_DELETE = 'server-message-reaction-delete',

  // direct messaging
  DIRECT_MESSAGE_SEND = 'direct-message-send',
  DIRECT_MESSAGE_UPDATE = 'direct-message-update',
  DIRECT_MESSAGE_DELETE = 'direct-message-delete',

  // relationships
  USER_RELATIONSHIP_CREATE = 'user-relationship-create',
  USER_RELATIONSHIP_UPDATE = 'user-relationship-update',
  USER_RELATIONSHIP_DELETE = 'user-relationship-delete',
}
