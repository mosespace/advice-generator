"use client";
import { FaPause } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { BsFillDice5Fill, BsDiscord, BsLinkedin } from "react-icons/bs";
import Link from "next/link";

export default function Hero() {
  const [quote, setQuote] = useState(null);
  // console.log(quote.quote);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [Pause, setPause] = useState(false);

  async function getQuotes() {
    const response = await fetch(process.env.NEXT_PUBLIC_LOCALHOST, {
      cache: "no-store",
    });
    const quotes = await response.json([{}]);
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

  const togglePause = () => {
    setPause(true);
  };

  return (
    <>
      {quote ? (
        <>
          <div
            className='bg-[#323a49] w-[21.5rem] sm:w-[30rem] text-center px-4 sm:px-10 py-[2.25rem] rounded-lg flex flex-col items-center gap-[25px] relative'
          >
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
                  <h1>ADVICE # {quote.originator.master_id}</h1>
                </div>
                <p className='text-[#cee3e9] text-center font-extrabold text-[1.6rem]'>
                  "{quote.content}"
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
                <BsFillDice5Fill size={25} />
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
