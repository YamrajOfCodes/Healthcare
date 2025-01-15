"use client"
import { AppDispatch, RootState } from '@/Redux/App/store';
import { getWaitingroom } from '@/Redux/Slices/Admin/adminSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();

const allappointments = () => {
    const dispatch = useAppDispatch();
  const { waitingroom } = useSelector((state:RootState)=>state.Doctor);
  console.log("waitingroom",waitingroom[0]);
  

  useEffect(()=>{
    dispatch(getWaitingroom());
  },[]);
  return (
    <div>
      
    </div>
  )
}

export default allappointments
