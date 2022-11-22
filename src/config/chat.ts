export const CHAT_MESSAGES_FETCH_LIMIT = 50;
export const CHAT_MESSAGES_SPLIT_REGEX = /(<@[a-f\d]{24}>)/gis;
export const CHAT_MESSAGES_RETRIEVE_USER_ID_REGEX =
  /(?<=<@)(here|([a-f\d]{24})|(&[a-f\d]{24}))(?=>)/gis;
export const CHAT_MESSAGES_MAX_ATTACHMENTS = 4;
export const CHAT_MESSAGES_ALLOWED_ATTACHMENT_MIME_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/avif',
  'image/webp',
  'video/x-matroska',
  'video/mp4',
];
export const CHAT_MESSAGES_MAX_ATTACHMENT_SIZE = 50000000; //50mb
