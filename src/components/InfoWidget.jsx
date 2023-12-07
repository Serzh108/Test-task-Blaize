"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { testContractAddress } from '../constants/constants';
import testAbi from '../constants/abis/testAbi.json';
import TaskTitle from '@/components/TaskTitle';
import { useProvider } from '../utils/hooks';

import {
  Flex, Button, Box, Text, VStack, StackDivider, Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const InfoWidget = () => {
  const { provider, signer } = useProvider();

  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const [value, setValue] = React.useState('0.01');
  const [inputError, setInputError] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);
  const [receipt, setReceipt] = useState(null);
  // const [userBalance, setUserBalance] = useState(0);

  // const getBalance = async () => {
  //   const balance = await provider.getBalance(signer.address);
  //   const formattedBalance = ethers.formatEther(balance);
  //   setUserBalance(formattedBalance);
  // };

  const getContractData = async (contract) => {
    try {
      const symb = await contract.symbol();
      const onContractBalance = await contract.balanceOf(signer.address);

      setTokenBalance(ethers.formatEther(onContractBalance));
      setTokenSymbol(symb);
    } catch (e) {
      console.error('Error: ', e)
    }
  };

  useEffect(() => {
    if (provider && signer) {
      const testContract = new ethers.Contract(testContractAddress, testAbi, provider);
      getContractData(testContract);
    }
  }, [provider, signer?.address]);

  const mintOnContract = async (contract, amount, signer) => {
    const amountFormatted = ethers.parseEther(amount.toString(), 18);
    try {
      const pref = await contract.mint(signer.address, amountFormatted);
      const res = await pref.wait();
      setReceipt(res);
      setValue('0.01');

      const testContract = new ethers.Contract(testContractAddress, testAbi, provider);
      getContractData(testContract);
    } catch (e) {
      console.error(e)
      if (e.code === 4001) return
    }
    setIsTransfering(false);
  };

  const buttonHandler = () => {
    if (!signer) {
      return;
    };
    setReceipt(null);
    if (!value) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
      setIsTransfering(true);
      const testContractWrite = new ethers.Contract(testContractAddress, testAbi, signer);
      mintOnContract(testContractWrite, +value, signer);
    }
  };



  return (
    <Flex direction='column' justify='flex-start' w='60%'>
      <TaskTitle />
      {/* <Text>Balance: {userBalance}</Text> */}
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        align='center'
        borderRadius='2xl'
        bg='white'
      >

        <Box p={4} pb={2} w='100%' fontSize='md'>
          <Text textAlign='center'>{`Your Token Balance: ${tokenBalance} ${tokenSymbol}`}</Text>
        </Box>

        <Box p={2} w='100%' fontSize='md'>
          <Text textAlign='center'> Your Wallet Address: {signer ? signer.address : '-'}</Text>
        </Box>

        <Box p={2} pb={0} w='100%' fontSize='md'>
          <Flex gap='4' align='center' justify='center'>
            <Text textAlign='center'>Enter amount (min: 0.01, max: 20): </Text>

            <Box w='33%' fontSize='md'>
              <NumberInput
                value={value}
                onChange={(value) => setValue(value)}
                size='lg'
                fontSize='md'
                bg='whitesmoke'
                isDisabled={isTransfering}
                defaultValue={0.01} min={0.01} max={20} precision={2} step={0.01}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>

            <Button
              isLoading={isTransfering}
              loadingText='Minting...'
              colorScheme='facebook'
              size='lg'
              fontSize='md'
              onClick={buttonHandler}
              _hover={{ bg: 'facebook.800', color: 'yellow' }}
            >
              Mint
            </Button>
          </Flex>
          <Text fontSize='xs' color={inputError ? 'red' : 'transparent'} textAlign='center' pt='0'>Wrong data!</Text>
        </Box>

        <Box w='100%' p={8}>
          <Box
            p={2}
            textAlign='center'
            color='white'
            bgGradient="linear(to-l, #c24fb6 6.59%,#3f51b8 94.04%)"
            borderWidth='1px'
            borderRadius='8px'
          >
            {receipt ?
              <Link href={`https://mumbai.polygonscan.com/tx/${receipt.hash}`} isExternal>
                Your Transactions Hash <ExternalLinkIcon mx='2px' />
              </Link>
              : <Text>No info yet</Text>}
          </Box>
        </Box>
      </VStack>
    </Flex>
  )
};

export default InfoWidget;