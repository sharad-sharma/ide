import React from 'react';
import { Link } from '@reach/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box } from '@chakra-ui/layout';
dayjs.extend(relativeTime);

export type File = {
  id: string;
  lastAccessTime: number;
  title: string;
};

export interface FilesGridProps {
  files: File[];
}

export default function FilesGrid(props: FilesGridProps): JSX.Element {
  return (
    <Box mt="4" mx="-2">
      {props.files.map(file => (
        <Box
          as={Link}
          key={file.id}
          to={`/${file.id.substring(1)}`}
          px="4"
          py="3"
          rounded="lg"
          display="inline-block"
          w="full"
          maxW="sm"
          m="2"
          bg="gray.800"
          _hover={{
            bg: 'dark.300',
          }}
        >
          <Box color="gray.200">{file.title || 'Unnamed File'}</Box>
          <Box color="gray.400">
            Last Accessed {dayjs(file.lastAccessTime).fromNow()}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
