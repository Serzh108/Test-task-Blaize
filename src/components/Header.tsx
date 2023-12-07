import Image from 'next/image';
import { Flex, Box, Text, Link } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      w="100%"
      py={2}
      px={4}
      bgGradient="linear(269.26deg,#ac35a0 6.59%,#2f42aa 94.04%)">
      <Text color="white">Developed by Serzh108</Text>
      <Box>
        <Link
          href="https://www.linkedin.com/in/serhii-zhykhariev-678b0a78/"
          isExternal>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
