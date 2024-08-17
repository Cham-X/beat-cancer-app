import React from 'react';

const CustomButton = ({ buttonType, title, handleClick, styles }) => {
    return (
        <button
            type={buttonType}
            className={`rounded-[10px] px-4 font-epilogue text-[16px] font-semibold leading-[26px] text-white ${styles}`}
            onClick={handleClick}
        >
            {title}
        </button>
    );
}

export default CustomButton;
