export const CHAT_MESSAGES_FETCH_LIMIT = 50;
export const CHAT_MESSAGES_SPLIT_REGEX = /(<@[a-zA-Z0-9_-\d]{21}>)/gis;
export const CHAT_MESSAGES_RETRIEVE_USER_ID_REGEX =
  /(<@)(here|([a-zA-Z0-9_-\d]{21})|(&[a-f\d]{21}))(>)/gis;
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
export const CHAT_MESSAGES_MAX_ATTACHMENT_SIZE = 1000000000; //50mb
