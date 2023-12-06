import { Flex, Box, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      w="100%"
      py={2}
      px={4}
      bgGradient="linear(to-l, #c24fb6 6.59%,#3f51b8 94.04%)">
      <Text color="white">Developed by Serzh108</Text>
      <Box>
        <a
          href="https://www.linkedin.com/in/serhii-zhykhariev-678b0a78/"
          target="_blank"
          rel="noopener noreferrer">
          <img src="/logo.svg" alt="Logo" width={40} height={40} />
        </a>
      </Box>
    </Flex>
  );
};

export default Header;