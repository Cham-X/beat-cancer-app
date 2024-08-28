import { IconChevronRight, IconFolder } from '@tabler/icons-react';
import React from 'react';

const RecordCard = ({ record, onNavigate }) => {


    return (
        <div className='flex flex-col rounded-xl border shadow-sm border-neutral-800 bg-[#1313a]'>
            <div className='flex justify-between gap-x-3 p-4 md:p-5'>
                <div className='flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-blue-200'>
                    <IconFolder size={70} className='text-green-500' />
                </div>
            </div>
            <a
                onClick={() => onNavigate(record.recordName)}
                className='inline-flex cursor-pointer items-center justify-between rounded-b-xl border-t border-gray-200 text-sm text-gray-400 md:px-5 hover:border-neutral-800 '
            >
                {record.recordName}
                <IconChevronRight />
            </a>
        </div>
    );
}

export default RecordCard;
