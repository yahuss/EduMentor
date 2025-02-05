'use client';

import Image from 'next/image';
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="App">
      <div className='container'>
        <div className='logoBox'>
          <Image id="logo" src="/logo3.png" alt="AI Learning Assistant" width="100" height="90" />
          <p>Your personal AI learning assistant. Ask questions, get explanations, or practice with generated problems.</p>
        </div>
        <Chat />
      </div>
    </main>
  )
}