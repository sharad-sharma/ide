import React from 'react';
import { Router } from '@reach/router';
import { Box } from '@chakra-ui/react';

import EditorPage from './pages/EditorPage';
import CopyFilePage from './pages/CopyFilePage';
import DashboardPage from './pages/DashboardPage';

export default function App(): JSX.Element {
  return (
    <Box as={Router} minH="100vh">
      <CopyFilePage path="/:fileId/copy" />
      <EditorPage path="/:fileId" />
      <DashboardPage path="/" />
    </Box>
  );
}
