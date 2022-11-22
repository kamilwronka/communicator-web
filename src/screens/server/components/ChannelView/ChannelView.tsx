import { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { ChannelType } from 'types/channel';

import { useServerChannels } from 'hooks/servers/useServerChannels';

import { TextChannelView } from '../TextChannelView/TextChannelView';

export const ChannelView: React.FC = () => {
  const { selectedChannel } = useServerChannels();
  const { serverId, channelId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastVisitedChannel, setLastVisitedChannel] = useLocalStorage(
    `${serverId}/lastVisitedChannel`,
  );

  useEffect(() => {
    setLastVisitedChannel(channelId);
  }, [channelId, setLastVisitedChannel]);

  const renderChannelView = () => {
    switch (selectedChannel?.type) {
      case ChannelType.TEXT:
        return <TextChannelView />;
      default:
        return null;
    }
  };

  return selectedChannel ? renderChannelView() : null;
};
