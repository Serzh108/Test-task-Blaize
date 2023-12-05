"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { testContractAddress } from '../constants/constants';
import testAbi from '../constants/abis/testAbi.json';

import { Flex, Spacer, Input, Button, Spinner, Box } from '@chakra-ui/react';

const firstAddress = '0xAd6441d8aE550706665918d0A41C8f6A76949928';
const secondAddress = '0xe957C19ccb222c8DdF4A50B5A7ea7F2392EBd377';

const Connection = () => {
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [value, setValue] = React.useState('');

  const handleChange = (event) => setValue(event.target.value);

  const getBalance = async () => {
    const balance = await provider.getBalance(signer.address);
    console.log(" Balance -> ", balance, ' : ', ethers.formatEther(balance));
  };

  const getContractData = async (contract) => {
    const symb = await contract.symbol();
    const decimals = await contract.decimals();
    const name = await contract.name();
    const onContractBalance1 = await contract.balanceOf(firstAddress);
    const onContractBalance2 = await contract.balanceOf(secondAddress);

    console.log(' -- symb: ', symb, ', name: ', name, ', decimals: ', decimals, ', onContractBalance #1: ', onContractBalance1);
    console.log(' --- onContractBalance #2: ', onContractBalance2, ', -> ', ethers.formatEther(onContractBalance2));
  };

  const mintOnContract = async (contract, amount, signer) => {
    const amount0 = ethers.parseEther(amount.toString(), 18);
    console.log(' !! amount ---> ', amount, ' - ', amount0);
    console.log(' !! contract ---> ', contract);
    console.log(' !! signer ---> ', signer);
    const pref = await contract.mint(signer.address, amount0);
    console.log(' pref ---> ', pref);
    const res = await pref.wait();
    console.log(' res ---> ', res, ' status = ', res.status ? 'success' : 'revert');
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
  useEffect(() => {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      const initProvider = ethers.getDefaultProvider();
      setProvider(initProvider);
      console.log(" initProvider #1 -> ", initProvider);
    } else {
      const initProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(initProvider);
      console.log(" initProvider #2 -> ", initProvider);
    }
  }, [])

  useEffect(() => {
    const getSigner = async () => {
      console.log(" provider ## -> ", provider);
      const signerInit = await provider.getSigner();
      console.log(" signerInit -> ", signerInit);
      setSigner(signerInit);
      // sendValue(firstAddress); !!! Tested - succesfuly -> Transaction Hash: 0x95718f76ef17f0ea1246603e92636e44fb2c953135f85edb29dd0cd53aae8ebe
    }
    if (provider) {
      getSigner();
    }
  }, [provider]);

  // --- TEMP ! ---
  if (provider) {
    const testContract = new ethers.Contract(testContractAddress, testAbi, provider);
    getContractData(testContract);
  }
  // --- / TEMP ! ---

  if (signer) {
    // console.log(' !!#!! signer ---> ', signer);
    // const testContractWrite = new ethers.Contract(testContractAddress, testAbi, signer);
    // mintOnContract(testContractWrite, 0.01, signer);
    getBalance();
  }

  const [isTransfering, setIsTransfering] = useState(false);

  const buttonHandler = () => {
    if (!signer) {
      return;
    };

    // ---
    setIsTransfering(prev => !prev);
    // --- **

    console.log(' !!#!! signer ---> ', signer);
    const testContractWrite = new ethers.Contract(testContractAddress, testAbi, signer);
    // mintOnContract(testContractWrite, 0.01, signer);
  };

  return (
    <>
      <h1> Connection </h1>
      <h2> Use Ethers.js</h2>
      <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Flex minWidth='max-content' gap='4'>
          <Input
            value={value}
            onChange={handleChange}
            placeholder='Enter Your Walletr Address (0x...)'
            size='lg'
            variant='outline'
            htmlSize={40}
          />
          {/* <Spacer /> */}
          <Button
            isLoading={isTransfering}
            loadingText='Minting...'
            colorScheme='facebook'
            size='lg'
            onClick={buttonHandler}
          >
            Mint
          </Button>
        </Flex>
      </Box>
      <Spinner thickness='6px'
        speed='0.95s'
        emptyColor='gray.200'
        color='green.500'
        size='xl' />
    </>
  )
};

export default Connection;