"use client"; // Client-side rendering ke liye

import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link'; 

function Header() {
    const path = usePathname();
    
    useEffect(() => {
        console.log(path);  
    }, [path]);

    return (
        <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
            <Image src='/logo.svg' width={160} height={100} alt='logo' />
            <ul className='flex gap-6'>
                <li className={`hover:text-purple-900 hover:font-bold transition-all cursor-pointer ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className={`hover:text-purple-900 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/about-us' ? 'text-primary font-bold' : ''}`}>
                    <Link href="/dashboard/about-us">About us</Link>
                </li>
                <li className={`hover:text-purple-900 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}`}>
                    <Link href="/dashboard/upgrade">Upgrade</Link>
                </li>
                <li className={`hover:text-purple-900 hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how-it-works' ? 'text-primary font-bold' : ''}`}>
                    <Link href="/dashboard/how-it-works">How it Works?</Link>
                </li>
            </ul>
            <UserButton />
        </div>
    );
}

export default Header;
