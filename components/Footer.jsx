import React from 'react'
import Image from 'next/image'
import { assets } from '@/public/assets'

const Footer = () => {
    return (
        <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
            <Image src={assets.logo_light} alt='' width={120} className='' />
            <p className='text-white text-sm'>All right reserved. Copyright @blogger</p>
            <div className='flex'>
                <Image src={assets.facebook_icon} alt='' width={40}></Image>
                <Image src={assets.twitter_icon} alt='' width={40}></Image>
                <Image src={assets.googleplus_icon} alt='' width={40}></Image>
            </div>
        </div>
    )
}

export default Footer   