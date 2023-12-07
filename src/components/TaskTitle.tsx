import { Flex, Text, Heading } from '@chakra-ui/react';

const TaskTitle = () => {
  return (
    <Flex direction="column" gap={4} align="center" py={16} color="white">
      <Heading>Test task for Blaize</Heading>
      <Text as="i"> Using Ethers.js and Chakra-UI</Text>
    </Flex>
  );
};

export default TaskTitle;
