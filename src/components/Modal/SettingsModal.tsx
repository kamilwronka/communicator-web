import { useState } from 'react';

import {
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

import { SettingsModalNavigation } from './SettingsModalNavigation';
import { SettingsModalNavigationHeader } from './SettingsModalNavigationHeader';
import { SettingsModalNavigationItem } from './SettingsModalNavigationItem';

export type SettingsModalMenuItem = {
  id: number;
  tab: string;
  title: string;
  component?: React.ReactNode;
  header?: string;
  onClick?: () => void;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: SettingsModalMenuItem[];
  defaultTab?: string;
};

export const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  menuItems,
  defaultTab,
}) => {
  const [selectedTab, setSelectedTab] = useState(
    defaultTab || menuItems[0].tab,
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalBody padding="0">
          <HStack>
            <Box w="96" h="100vh">
              <SettingsModalNavigation>
                {menuItems.map(item => {
                  const handleClick = () => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      setSelectedTab(item.tab);
                    }
                  };

                  return (
                    <>
                      {item.header && (
                        <SettingsModalNavigationHeader>
                          {item.header}
                        </SettingsModalNavigationHeader>
                      )}
                      <SettingsModalNavigationItem
                        key={item.id}
                        title={item.title}
                        onClick={handleClick}
                        active={selectedTab === item.tab}
                      />
                    </>
                  );
                })}
              </SettingsModalNavigation>
            </Box>
            <Box
              bg="gray.700"
              w="full"
              h="100vh"
              maxHeight="100vh"
              pl="16"
              pr="5"
              pt="6"
              overflowY="hidden"
            >
              {menuItems.map(item => {
                return item.tab === selectedTab ? item.component : null;
              })}
            </Box>
            <ModalCloseButton />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
