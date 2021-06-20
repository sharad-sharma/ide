import { Box } from '@chakra-ui/react';
import React from 'react';

export interface TabBarProps {
  tabs: {
    label: string;
    value: string;
  }[];
  activeTab: string;
  onTabSelect?: (tab: { label: string; value: string }) => void;
}

export const TabBar = ({
  tabs,
  activeTab,
  onTabSelect,
}: TabBarProps): JSX.Element => {
  return (
    <Box bg="black">
      {tabs.map(tab => (
        <Box
          as="button"
          key={tab.value}
          bg={tab.value === activeTab ? '#1E1E1E' : 'transparent'}
          px="4"
          py="0.5"
          fontWeight="medium"
          fontSize="sm"
          _focus={{
            outline: 'none',
          }}
          _hover={
            tab.value === activeTab
              ? undefined
              : {
                  color: 'gray.300',
                  bg: 'gray.800',
                }
          }
          color={tab.value === activeTab ? 'gray.200' : 'gray.400'}
          transition="all 150ms cubic-bezier(0.4, 0, 0.2, 1)"
          onClick={() => {
            if (onTabSelect) onTabSelect(tab);
          }}
        >
          {tab.label}
        </Box>
      ))}
    </Box>
  );
};
