"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { testContractAddress } from '../constants/constants';
import testAbi from '../constants/abis/testAbi.json';
import TaskTitle from '@/components/TaskTitle';
import { useProvider } from '../utils/hooks';

import { Flex, Spacer, Input, Button, Spinner, Box, Text, Heading, VStack, StackDivider } from '@chakra-ui/react';

const firstAddress = '0xAd6441d8aE550706665918d0A41C8f6A76949928';
const secondAddress = '0xe957C19ccb222c8DdF4A50B5A7ea7F2392EBd377';

const Connection = () => {
  const { provider, signer } = useProvider();

  // const [signer, setSigner] = useState(null);
  // const [provider, setProvider] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const [value, setValue] = React.useState('');
  const [inputError, setInputError] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    setInputError(false);
  }

  const getBalance = async () => {
    const balance = await provider.getBalance(signer.address);
    console.log(" Balance -> ", balance, ' : ', ethers.formatEther(balance));
    const formattedBalance = ethers.formatEther(balance);
    setUserBalance(formattedBalance);
  };

  const getContractData = async (contract) => {
    console.log('  ---- getContractData run !!!!!!!');
    const symb = await contract.symbol();
    const decimals = await contract.decimals();
    const name = await contract.name();
    const onContractBalance = await contract.balanceOf(signer.address);

    console.log(' -- symb: ', symb, ', name: ', name, ', decimals: ', decimals);
    console.log(' --- onContractBalance: ', onContractBalance, ', -> ', ethers.formatEther(onContractBalance));
    setTokenBalance(ethers.formatEther(onContractBalance));
    setTokenSymbol(symb);
  };

  const mintOnContract = async (contract, amount, signer) => {
    console.log('  ---- mintOnContract run !!!!!!!');
    const amount0 = ethers.parseEther(amount.toString(), 18);
    console.log(' !! amount ---> ', amount, ' - ', amount0);
    console.log(' !! contract ---> ', contract);
    console.log(' !! signer ---> ', signer);
    const pref = await contract.mint(signer.address, amount0);
    console.log(' pref ---> ', pref);
    const res = await pref.wait();
    console.log(' res ---> ', res, ' status = ', res.status ? 'success' : 'revert');
    console.log(' res.hash ---> ', res.hash);
    setIsTransfering(false);
    // --- - ---
    const testContract = new ethers.Contract(testContractAddress, testAbi, provider);
    getContractData(testContract);
  };

  const sendValue = async (toAddress) => {
    const tx = await signer.sendTransaction({
      to: toAddress,
      value: ethers.parseEther("0.05")
    });

    const receipt = await tx.wait();
    console.log(' receipt ->', receipt)
  }
  // --- - ---

  // --- TEMP ! ---
  useEffect(() => {
    if (provider && signer) {
      const testContract = new ethers.Contract(testContractAddress, testAbi, provider);
      getContractData(testContract);
    }
  }, [provider, signer?.address]);
  // --- / TEMP ! ---

  useEffect(() => {
    //   if (signer) {
    //     getBalance();
    //   }
    if (signer && signer.address) {
      setValue(signer.address);
    }
  }, [signer]);


  const buttonHandler = () => {
    console.log('  ---- buttonHandler clicked!!!!!!!');
    if (!signer) {
      return;
    };
    const checkAddress = ethers.isAddress(value);
    // --- 
    if (checkAddress) {
      console.log('  ---- checkAddress true !!!!!!!');
      setInputError(false);
      setIsTransfering(true);
      const testContractWrite = new ethers.Contract(testContractAddress, testAbi, signer);
      mintOnContract(testContractWrite, 0.001, signer);
    } else {
      setInputError(true);
    }
  };


  return (
    <Flex direction='column' justify='flex-start' w='60%'>
      <TaskTitle />
      {/* --- TEMP! */}
      {/* <Text>Balance: {userBalance}</Text> */}
      {/* --- / TEMP! */}
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        // spacing={4}
        align='center'
        borderRadius='24px'
        bg='white'
      >

        <Box
          p={4}
          pb={2}
          w='100%'
          fontSize='16px'
        >
          <Text textAlign='center'>
            {`Your Token Balance: ${tokenBalance} ${tokenSymbol}`}
          </Text>
        </Box>

        <Box
          p={8}
          pb={2}
          w='100%'
          fontSize='16px'
        >
          {/* <Flex minWidth='max-content' gap='4'> */}
          <Flex gap='4'>
            <Input
              value={value}
              onChange={handleChange}
              placeholder='Enter Your Walletr Address (0x...)'
              size='lg'
              fontSize='md'
              variant='outline'
              htmlSize={40}
              bg='whitesmoke'
              p={2}
            />
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
          <Text fontSize='xs' color={inputError ? 'red' : 'transparent'} textAlign='center' pt='4px'>Wrong Wallet Address!</Text>
        </Box>
        <Flex
          w='100%'
          direction='column'
          p={8}
        >
          <Flex
            direction='row'
            justify='space-between'
            p={2}
            color='white'
            bgGradient="linear(to-l, #c24fb6 6.59%,#3f51b8 94.04%)"
            borderWidth='1px'
            borderTopRadius='8px'
          >
            <Text>Your Transactions</Text><Text w='110px' textAlign='left'>Time</Text>
          </Flex>
          <Flex
            direction='row'
            justify='space-between'
            p={2}
            bg='white'
            borderWidth='1px'
            borderTopWidth='0px'
            borderBottomRadius='8px'>
            <Text>0x12345678909</Text><Text w='110px' textAlign='left'>19 hours ago</Text>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  )
};

export default Connection;