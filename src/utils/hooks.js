import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const useProvider = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (window.ethereum == null) {
      console.log('MetaMask not installed; using read-only defaults');
      const initProvider = ethers.getDefaultProvider();
      setProvider(initProvider);
    } else {
      const initProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(initProvider);
    }
  }, []);

  useEffect(() => {
    const getSigner = async () => {
      try {
        const signerInit = await provider.getSigner();
        setSigner(signerInit);
      } catch (err) {
        console.error(' ERROR getSigner: ', err);
      }
    };
    if (provider) {
      getSigner();
    }
  }, [provider]);

  return { provider, signer };
};
