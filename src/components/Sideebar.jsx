import React, { useState } from 'react';

import { navLink } from '../constants';
import { sun } from "../assets"
import { Link, useNavigate } from 'react-router-dom';
import { IconHeartHandshake } from '@tabler/icons-react';

const Icon = ({ style, name, imageUrl, isActive, disabled, handleClick }) => {
    return (
        <div className={`h-[48px] w-[48px] rounded-[10px] ${isActive && isActive === name && "bg-[#2c2f32]"} flex items-center justify-center ${style}`}
            onClick={handleClick}
        >
            {
                isActive ? (
                    <img src={imageUrl} alt='beat-cancer logo' className='h-6 w-6' />
                ) : (
                    <img src={imageUrl} alt='beat-cancer logo' className={`h-6 w-6 ${isActive !== name && "grayscale"}`} />
                )
            }
        </div >
    )
};

const Sideebar = () => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState("dashboard")

    return (
        <div className='sticky top-5 flex flex-col justify-between h-[93vh]'>
            <Link
                to="/"
            >
                <div className='rounded-[10px] flex items-center justify-center bg-[#2c2f32] p-2'>
                    <IconHeartHandshake size={40} color="#1ec070" />
                </div>
            </Link>

            <div className='mt-12 flex flex-col w-[76px] flex-1 items-center justify-between py-8 rounded-[20px] bg-[#1c1c24]'>
                <div className='flex flex-col items-center justify-center gap-3'>
                    {
                        navLink.map((link) => {
                            return (
                                <Icon
                                    key={link.name}
                                    {...link}
                                    isActive={isActive}
                                    handleClick={
                                        () => {
                                            navigate(link.link)
                                        }
                                    }
                                />
                            )
                        })
                    }
                </div>

                <Icon style={"bg-[#1c1c24] shadow-secondary"} imageUrl={sun} />
            </div>
        </div>
    );
}

export default Sideebar;
