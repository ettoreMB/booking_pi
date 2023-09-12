'use client'

import { useState, useEffect } from 'react';

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
      width: undefined,
      height: undefined 
    })

    useEffect(()=> {
      const handleSize =  () =>{
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
      handleSize()
      window.addEventListener('resize', handleSize);

      return ()=> window.removeEventListener('resize', handleSize)
      
    },[]);

    return screenSize
}

export default useScreenSize