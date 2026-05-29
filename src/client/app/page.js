'use client'
import {useState, useEffect} from 'react';

const URL = 'http://localhost:5000';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <h1 className="homeContent">Welcome to AmeThyst Library Manager</h1>
        <p className="homeContent">{message}</p>
    </div>
  );
}
