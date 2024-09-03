import React, { useState } from 'react';

import Modal from './Modal';

const CreateRecordModal = ({ isOpen, onClose, onCreate }) => {

    const [foldername, setFoldername] = useState("")

    const handleCreateFolder = () => {
        onCreate(foldername)
        setFoldername("")
    }

    return (
        <Modal
            isOpen={isOpen}
            title='Create Record'
            onClose={onClose}
            onAction={handleCreateFolder}
            actionLabel='Create Folder'
        >
            <div className='grid gap-y-4'>
                <div>
                    <label
                        htmlFor="folder-name"
                        className='mb-2 block text-sm text-neutral-500 font-serif  '
                    >
                        Record Name
                    </label>
                </div>
                <div className='relative'>
                    <input
                        type="text"
                        value={foldername}
                        placeholder="Enter folder name"
                        onChange={(e) => setFoldername(e.target.value)}
                        required
                        className="block w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 border-neutral-800 bg-inherit text-neutral-400 placeholder-neutral-500"
                    />
                </div>
            </div>

        </Modal>
    );
}

export default CreateRecordModal;
