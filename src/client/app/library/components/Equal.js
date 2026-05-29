'use client';
import { useState } from "react";
export default function Equal({num1, num2}){

    const [result, setResult] = useState(null);
    const handleSubmit = async () => {
        try 
        {
            const response = await fetch('http://localhost:5000/library/calculate', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num1: parseFloat(num1),
                    num2: parseFloat(num2)
                })
            });
            const data = await response.json();
            console.log('Result:', data);
            setResult(data.result);
        } 
        catch (error) 
        {
            console.error('Error:', error);
        }
    };

    return (
    <div> 

        <button className="equalCell" onClick={handleSubmit}>
            =
        </button>
        {result !== null && <span className="resultCell">{result}</span>}
    </div>
    );
}