// 
"use client";

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Header } from './header';
import { Social } from './social';
import { BackButton } from './back-button';


interface CardWrapperProps{
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = (
    {
        children,
        headerLabel,
        backButtonLabel,
        backButtonHref,
        showSocial
      }: CardWrapperProps) => {

  return (
    <>



          <Card className=" ">{ /*shadow-md*/}
    <CardHeader>
      <Header label={headerLabel} />
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
    <div className=' pb-5  flex justify-center items-center'>
      {showSocial && (
      <p className='text-sm'>OR</p>
      )}
    </div>
    {showSocial && (
      <CardFooter>
        <Social />
      </CardFooter>
    )}
    <CardFooter>
      <BackButton
        label={backButtonLabel}
        href={backButtonHref}
      />
    </CardFooter>
  </Card>


</>





  
  )
}
