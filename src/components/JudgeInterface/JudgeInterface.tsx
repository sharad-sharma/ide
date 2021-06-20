import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai/utils';
import React, { useState } from 'react';
import { currentLangAtom, mainMonacoEditorAtom } from '../../atoms/workspace';
import { useSettings } from '../SettingsContext';
import USACOResults from './USACOResults';

function encode(str: string | null) {
  return btoa(unescape(encodeURIComponent(str || '')));
}

export default function JudgeInterface(): JSX.Element {
  const { settings } = useSettings();
  const mainMonacoEditor = useAtomValue(mainMonacoEditorAtom);
  const lang = useAtomValue(currentLangAtom);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [statusData, setStatusData] = useState<any>(null);

  const handleSubmit = async () => {
    const problemID = settings.judgeUrl?.match(/cpid=(\d+)/)?.[1];
    if (!mainMonacoEditor || !lang) {
      alert('Error: Page still loading?');
      return;
    }
    if (!problemID) {
      alert('Error: Failed to parse problem ID. Is the usaco.org URL correct?');
      return;
    }

    setStatusData({
      message: 'Sending submission to server',
      statusCode: -100,
    });

    const data = {
      problemID: problemID,
      language: { cpp: 'c++17', java: 'java', py: 'python3' }[lang],
      base64Code: encode(mainMonacoEditor.getValue()),
    };

    const resp = await fetch(`https://judge.usaco.guide/submit`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const submissionID = await resp.text();

    const checkStatus = async () => {
      const statusResp = await fetch(
        `https://judge.usaco.guide/submission/${submissionID}`
      );
      const data = await statusResp.json();
      setStatusData(data);

      if (data.statusCode && parseInt(data.statusCode) <= -8) {
        // still working
        setTimeout(checkStatus, 1000);
      }
    };

    setTimeout(checkStatus, 1000);
  };

  return (
    <Flex position="relative" h="full" direction="column">
      <Box p="4" pb="0">
        <Text color="gray.100" fontWeight="bold" fontSize="lg">
          {settings.judgeUrl}
          {/* Problem 1. Social Distancing I */}
        </Text>
        <Text color="gray.400" fontSize="sm">
          Early access. Report issues to Github. Do not spam submit.
          {/* USACO 2020 US Open Contest, Bronze */}
        </Text>
      </Box>
      <Box flex="1" overflowY="auto" px="4">
        <USACOResults data={statusData} />
      </Box>
      <Button
        colorScheme="purple"
        color="white"
        bgColor="purple.900"
        _hover={{
          bgColor: 'purple.800',
        }}
        _active={{
          bgColor: 'purple.800',
        }}
        borderRadius="0"
        isLoading={statusData?.statusCode <= -8}
        loadingText="Submitting..."
        onClick={() => handleSubmit()}
      >
        Submit
      </Button>
    </Flex>
  );
}
