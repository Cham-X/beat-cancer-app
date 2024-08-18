import { IconCirclePlus } from '@tabler/icons-react';
import React from 'react';
import RecordCard from './components/RecordCard';

const Index = () => {

    const handleOpenModal = () => {
        console.log("click")
    }
    return (
        <div className='flex flex-wrap gap-[26px]'>
            <button
                type='button'
                className='mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 bg-[#13131a] px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-800 text-white'
                onClick={handleOpenModal}
            >
                <IconCirclePlus />
                Create Record
            </button>

            <div className='grid w-full sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
                <RecordCard />
            </div>
        </div>
    );
}

export default Index;
