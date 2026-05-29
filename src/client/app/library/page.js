'use client';
import NumberFill from "@/library/components/NumberFill";
import Equal from "@/library/components/Equal";
import {useState} from 'react';
export default function Library(){
        const [number1, setNumber1] = useState('');
        const [number2, setNumber2] = useState('');
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1>Welcome to the Library!</h1>
            <div className="equationCalculator">
                <NumberFill value={number1} onChange={setNumber1} /> 
                <span>+</span> 
                <NumberFill value={number2} onChange={setNumber2}/> 
                <Equal num1={number1} num2={number2}/>
            </div>
        </div>
    )
}