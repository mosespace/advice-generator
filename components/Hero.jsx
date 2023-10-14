"use client";
import React, { useEffect, useState } from "react";
import { FaPause } from "react-icons/fa";
import { BsFillDice5Fill } from "react-icons/bs";

export default function Hero() {
  const [quote, setQuote] = useState([]);
  // console.log(quote.quote);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  async function getQuotes() {
    const response = await fetch(process.env.NEXT_PUBLIC_LOCALHOST);
    const quotes = await response.json();
    // console.log(quotes);
    setQuote(quotes);
  }

  useEffect(() => {
    getQuotes();
  }, []);

  const changeQuote = () => {
    // Increment the current quote index, and loop back to 0 if it goes beyond the array length
    const nextIndex = (currentQuoteIndex + 1) % quote.length;
    setCurrentQuoteIndex(nextIndex);
  };

  return (
    <div className='bg-[#323a49] w-[21.5rem] sm:w-[30rem] text-center px-4 sm:px-10 py-[2.25rem] rounded-lg flex flex-col items-center gap-[25px]'>
      {quote?.map((quote, id) => {
        return (
          <>
            <div className='text-[#52ffa8] text-[0.75rem] tracking-[3px] leading-none'>
              <h1>ADVICE # 180</h1>
            </div>
            <p className='text-[#cee3e9] font-extrabold text-[1.6rem]'>
              "{quote.quote}"
            </p>
            <div className='flex items-center gap-2 w-full'>
              <div className='border-[0.1px] border-b-neutral-100/60 flex-grow'></div>
              <FaPause size={25} />
              <div className='border-[0.1px] border-b-neutral-100/60 flex-grow'></div>
            </div>

            <div className='flex justify-center items-end w-full'>
              <button
                onClick={changeQuote}
                className='bg-[#52ffa8] rounded-full p-4 relative bottom-6 active:shadow-3xl'
              >
                <BsFillDice5Fill size={25} />
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}
