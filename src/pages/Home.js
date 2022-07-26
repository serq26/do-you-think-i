import React from 'react'
import Questions from '../components/Questions';
import WelcomeScreen from '../components/WelcomeScreen';
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { userId } = useAuth();
  return (
    <div className='py-20 flex items-center justify-center'>
      {userId ? <Questions /> : <WelcomeScreen />}      
    </div>
  )
}
