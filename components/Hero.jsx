"use client";
import { FaPause } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import {
  BsFillDice5Fill,
  BsDiscord,
  BsLinkedin,
  BsFillDice3Fill,
  BsFillDice2Fill,
  BsFillDice1Fill,
  BsFillDice6Fill,
} from "react-icons/bs";
import Link from "next/link";

export default function Hero() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [Pause, setPause] = useState(false); // Corrected variable name to "Pause"

  // Function to fetch quotes from your API
  async function getQuotes() {
    const response = await fetch(process.env.NEXT_PUBLIC_LOCALHOST, {
      cache: "no-store",
    });
    const data = await response.json();
    setQuotes(data);
  }

  // Function to change the displayed quote
  const changeQuote = () => {
    if (quotes.length > 0) {
      const nextIndex = (currentQuoteIndex + 1) % quotes.length;
      setCurrentQuoteIndex(nextIndex);
    }
  };

  useEffect(() => {
    getQuotes(); // Fetch quotes when the component mounts
  }, []);

  // Use setInterval to change quotes every 1 minute (60000 milliseconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!Pause) {
        // Corrected variable name to "Pause"
        changeQuote();
      }
    }, 60000);

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [Pause, currentQuoteIndex, quotes]); // Corrected variable name to "Pause"

  const togglePause = () => {
    setPause(!Pause); // Corrected variable name to "Pause"
  };

  const quote = quotes[currentQuoteIndex];
  return (
    <>
      {quote ? (
        <>
          <div className='bg-[#323a49] w-[21.5rem] sm:w-[30rem] text-center px-4 sm:px-10 py-[2.25rem] rounded-lg flex flex-col items-center gap-[25px] relative'>
            {Pause ? (
              <>
                <div className='text-[#52ffa8] text-[0.75rem] tracking-[3px] leading-none'>
                  <h1>🙈😂</h1>
                </div>
                <p className='text-[#cee3e9] text-center font-extrabold text-[1.6rem]'>
                  Sorry You can't See the quotes again unless you connect with
                  me on my social's first!
                </p>
                <div className='flex gap-7'>
                  <Link href='https://discord.gg/shvJ3Zaf' target='blank'>
                    <BsDiscord size={25} className='text-white' />
                  </Link>
                  <Link
                    href='https://www.linkedin.com/in/kisakye-moses'
                    target='blank'
                  >
                    <BsLinkedin size={25} className='text-[#52ffa8]' />
                  </Link>
                  <Link
                    href='https://twitter.com/bantu_creative?lang=en'
                    target='blank'
                  >
                    <RiTwitterXLine size={25} className='text-slate-950' />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className='text-[#52ffa8] text-[0.75rem] tracking-[3px] leading-none'>
                  <h1>ADVICE # {quote.id}</h1>
                </div>
                <p className='text-[#cee3e9] text-center font-extrabold text-[1.6rem]'>
                  "{quote.text}"
                </p>
              </>
            )}
            <div className='flex items-center text-neutral-100/60 gap-2 w-full mb-4'>
              <div className='border-[0.1px] border-b-neutral-100/60 flex-grow'></div>
              <button onClick={togglePause}>
                {Pause ? (
                  <RiErrorWarningFill size={25} className='text-red-700' />
                ) : (
                  <FaPause size={25} />
                )}
              </button>
              <div className='border-[0.1px] border-b-neutral-100/60 flex-grow'></div>
            </div>

            <div className='Z-50 absolute bottom-[-1.5rem]'>
              <button
                onClick={changeQuote}
                className='bg-[#52ffa8] rounded-full p-4 text-[#323a49] transition-colors hover:shadow-xl hover:shadow-emerald-400'
              >
                {changeQuote ? (
                  <BsFillDice3Fill /> || <BsFillDice2Fill /> || (
                    <BsFillDice1Fill />
                  ) || <BsFillDice6Fill />
                ) : (
                  <BsFillDice5Fill size={25} />
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
