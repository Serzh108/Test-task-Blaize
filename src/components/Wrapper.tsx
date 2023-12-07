import { Flex } from '@chakra-ui/react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" justify="flex-start" align="center" w="100%">
      {children}
    </Flex>
  );
};

export default Wrapper;
