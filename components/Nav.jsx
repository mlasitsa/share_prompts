"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

const isUserLogged = true
const [providers, useProviders] = useState(null);
const [toggleDropdown, setToggleDropdown] = useState(false)

useEffect(() => {
    const fetchProviders = async () => {
        const response = await getProviders();
        useProviders(response); 
    };

    fetchProviders();
}, []); 


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
        <Image 
        src="/assets/images/logo.svg"
        alt="Promtolio Logo"
        width={30}
        height={30}
        className='object-contain'
        />

        <p className='logo_text'>Promtolio</p>
        </Link>

        {/* Desctop Nav Bar*/}
        <div className='sm: flex hidden'>
        {isUserLogged ? 
        (<div className='flex gap-3 md: gap-5'> 
            <Link href='/create-prompt'
            className='black_btn'>
            Create Post
            </Link>
            <button type='button' onClick={signOut}
            className='outline_btn'> Sign Out </button>
            <Link href="/profile">
            <Image src="/assests/images/logo.svg"
            width={37}
            height={37}
            className='rounded-full'
            alt='profile'
            onClick={() => setToggleDropdown((prev) => !prev)}/>
            </Link>

            {toggleDropdown &&  (
                <div className='dropdown'>
                    <Link
                    href="/profile"
                    onClick={() => setToggleDropdown(false)}>
                        My Profile
                    </Link>
                    <Link
                    href="/create-prompt"
                    onClick={() => setToggleDropdown(false)}>
                        Create Prompt
                    </Link>
                    <button
                    type='button'
                    className='mt-5 w-full black_btn'
                    onClick={() => {
                        setToggleDropdown(false)
                        signOut()
                    }}>
                        Sign Out
                    </button>
                </div>
            )}
        </div>)
        :
        (<>
        {providers && 
        Object.values(providers).map((provider) => (
            <button
            type='button'
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'>
            Sign In
            </button>
        ))}
        </>)
        }

        </div>

        {/* Mobile Nav Bar */}
        <div className='sm: hidden flex relative'>
            {isUserLogged ? 
            (<div className='flex'>
                <Image src="/assests/images/logo.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => console.log("hello")}/>
            </div>)
            : 
            (<>
                {providers && 
                Object.values(providers).map((provider) => (
                <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'>
                Sign In
                </button>
            ))}
            </>
        )}

        </div>

    </nav>
  )
}

export default Nav