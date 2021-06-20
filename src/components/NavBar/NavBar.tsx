import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  ShareIcon,
} from '@heroicons/react/solid';
import { Link } from '@reach/router';
import React, { useState } from 'react';
import { isUserOnline, useOnlineUsers } from '../../hooks/useOnlineUsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavItem = (props: any): JSX.Element => {
  return (
    <Box
      position="relative"
      display="inline-flex"
      alignItems="center"
      px="4"
      py="2"
      shadow="sm"
      fontSize="sm"
      fontWeight="medium"
      color="gray.200"
      _hover={{
        bg: 'gray.800',
      }}
      _focus={{
        bg: 'gray.800',
        outline: 'none',
      }}
      {...props}
    />
  );
};

export interface DesktopNavBarProps {
  fileMenu: JSX.Element;
  runButton: JSX.Element;
  showViewOnly: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  showSidebarButton: boolean;
}

export const NavBar = (props: DesktopNavBarProps): JSX.Element => {
  const onlineUsers = useOnlineUsers();
  const onlineUserCount = onlineUsers?.filter(isUserOnline).length;

  const [showCopied, setShowCopied] = useState(false);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        setShowCopied(true);
        setTimeout(() => {
          setShowCopied(false);
        }, 3000);
      },
      () => {
        alert(
          "Couldn't copy link to clipboard. Share the current URL manually."
        );
      }
    );
  };

  return (
    <Flex overflowX="auto">
      <Flex>
        <NavItem as={Link} to="/">
          <Box as={HomeIcon} h="5" w="5" />
        </NavItem>
        <Divider orientation="vertical" borderColor="gray.600" />
        {props.fileMenu}
        <Divider orientation="vertical" borderColor="gray.600" />
        <NavItem as="button" onClick={() => handleShare()}>
          <Box as={ShareIcon} ml="-1" mr="2" h="5" w="5" color="gray.400" />
          {showCopied ? 'URL Copied!' : 'Share'}
        </NavItem>
      </Flex>
      {props.runButton}
      <Flex>
        <NavItem
          as="a"
          href="https://github.com/cpinitiative/ide/issues"
          color="gray.400"
          _hover={{
            color: 'gray.200',
          }}
          rel="noreferrer"
        >
          Report an Issue
        </NavItem>
        <Divider orientation="vertical" borderColor="gray.600" />
        <NavItem
          as="a"
          href="https://github.com/cpinitiative/ide"
          target="_blank"
          rel="noreferrer"
          color="gray.400"
          _hover={{
            color: 'gray.200',
          }}
        >
          Star this on Github!
        </NavItem>
        {props.showViewOnly && (
          <>
            <Divider orientation="vertical" borderColor="gray.600" />
            <Text
              px="4"
              py="2"
              color="gray.400"
              fontSize="sm"
              fontWeight="medium"
            >
              View Only
            </Text>
          </>
        )}
      </Flex>
      <div className="flex-1" />
      {props.showSidebarButton && (
        <div>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium text-gray-200 hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
            onClick={() => props.onToggleSidebar()}
          >
            {props.isSidebarOpen ? (
              <ChevronRightIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            ) : (
              <ChevronLeftIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            )}
            {onlineUserCount} User{onlineUserCount === 1 ? '' : 's'} Online
          </button>
        </div>
      )}
    </Flex>
  );
};
