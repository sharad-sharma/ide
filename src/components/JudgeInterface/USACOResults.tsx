import { Box, Text } from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const USACOTestCase = ({ data }: { data: any }) => {
  const textColor = data.title === 'Correct answer' ? 'green.100' : 'red.100';
  return (
    <Box
      m="1"
      display="inline-block"
      w="70px"
      h="60px"
      border="1px"
      borderColor={data.title === 'Correct answer' ? 'green.700' : 'red.700'}
      bgColor={data.title === 'Correct answer' ? 'green.900' : 'red.900'}
      position="relative"
      title={data.title}
    >
      <Box
        fontWeight="bold"
        textAlign="center"
        fontSize="2.5rem"
        color={textColor}
        lineHeight="10"
      >
        {data.symbol}
      </Box>
      <Text
        position="absolute"
        bottom="0"
        left="4px"
        color={textColor}
        fontSize="sm"
        fontWeight="bold"
      >
        {data.trialNum}
      </Text>
      <Text
        position="absolute"
        bottom="0"
        right="0"
        textAlign="right"
        color={textColor}
        lineHeight="3"
        p="2px"
        fontSize="xs"
      >
        {data.memory}
        <br />
        {data.time}
      </Text>
    </Box>
  );
};

export default function USACOResults({
  data,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}): JSX.Element | null {
  if (!data) return null;
  return (
    <Box mt="3">
      <Text fontWeight="bold" color="gray.200">
        {data.message}
      </Text>
      {data.output && (
        <Text
          as="pre"
          fontFamily="mono"
          color="red.300"
          lineHeight="none"
          mt="1"
        >
          {data.output}
        </Text>
      )}
      <Box textAlign="center">
        {data.testCases &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.testCases.map((tc: any) => (
            <USACOTestCase data={tc} key={tc.trialNum} />
          ))}
      </Box>
    </Box>
  );
}
