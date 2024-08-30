import { IconCirclePlus } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import RecordCard from './components/RecordCard';
import CreateRecordModal from './components/CreateRecordModal';

import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { useStateContext } from '../../context';

const Index = () => {

    const navigate = useNavigate()
    const { user } = usePrivy()

    const { records, fetchUserByEmail, fetchUserRecords, createRecord, currentUser } = useStateContext()

    const [userRecord, setUserRecord] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (user) {
            fetchUserByEmail(user.email.address);
            fetchUserRecords(user.email.address)
        }
    }, [fetchUserByEmail, fetchUserRecords, user])

    useEffect(() => {
        setUserRecord(records)
        localStorage.setItem("userRecords", JSON.stringify(records))
    }, [records])

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const createFolder = async (foldername) => {
        try {
            if (user) {
                const newRecord = await createRecord({
                    userId: currentUser.id,
                    recorderName: foldername,
                    analysisResult: "",
                    kanbanRecords: "",
                    createdBy: user.email.address,
                })

                if (newRecord) {
                    fetchUserRecords(user.email.address)
                    handleCloseModal()
                }
            }
        } catch (error) {
            console.log(error)
            handleCloseModal()
        }
    }

    const handleNavigate = (name) => {
        const filterRecord = userRecord.filter((record) => record.recorderName === name)
        navigate(`/medical-records/${name}`, {
            state: filterRecord[0],
        })
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

            <CreateRecordModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onCreate={createFolder}
            />

            <div className='grid w-full sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
                {/* {userRecord.map((record) => {
                    return (
                        <RecordCard
                            key={record.recorderName}
                            record={record}
                            onNavigate={handleNavigate}
                        />
                    )
                })} */}
            </div>
        </div>
    );
}

export default Index;
