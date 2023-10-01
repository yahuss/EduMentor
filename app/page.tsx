'use client';

import Image from 'next/image';
import Chat from './components/Chat';

export default function Home() {
  return (
    <main className="App">
      <div className='container'>
        <div className='logoBox'>
        <Image src="/AISERR3.png" alt="AISERR logo" width="400" height="200"/>
          <p> Welcome from the AI Senior Engineer CV Reviewer. Here you can review and take your tips onto your resume.</p>
          <Chat />
        </div>
      </div>
    </main>
  )
}
