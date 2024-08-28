import { IconChevronRight, IconFileUpload, IconProgress } from '@tabler/icons-react';
import React, { useState } from 'react';
import RecordDetailsHeader from './RecordDetailsHeader';

import { useLocation, useNavigate } from 'react-router-dom';
import FileUploadModal from './FileUploadModal';

const SingleRecordsDeatails = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [ipLoading, setUpLoading] = useState(false)
    const [upLoadSuccess, setUpLoadSucces] = useState(false)
    const [processing, setProcessing] = useState(false)

    const { state } = useLocation()

    const [analysisResult, setAnalysisResult] = useState(state.analysisResult || "")

    const [filename, setFilename] = useState("")
    const [filetype, setFiletype] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)




    return (
        <div className='flex flex-wrap gap-[25px]'>
            <button
                type='button'
                // onClick={handdleOpenModal}
                className='mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 bg-[#13131a] px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-800 text-white'
            >
                <IconFileUpload />
                Upload Reports
            </button>
            {/* FileUploadModal */}
            <FileUploadModal
            // isOpen={is}
            />

            <RecordDetailsHeader recordName={"state.recordName"} />

            <div className='w-full'>
                <div className='flex flex-col'>
                    <div className='-m-1.5 overflow-x-auto'>
                        <div className='inline-block min-w-full p-1.5 align-middle'>
                            <div className='overflow-hidden rounded-xl border-neutral-700 shadow-sm bg-[#13131a]'>
                                <div className='border-b border-neutral-700 px-6 py-4'>
                                    <h2 className='text-xl font-semibold text-neutral-200'>
                                        Personalized AI-Driven Treatment Plan
                                    </h2>
                                    <p className='text-sm text-neutral-400'>
                                        A tailored medical strategy leveraging advance AI insight
                                    </p>
                                </div>

                                <div className='flex w-full flex-col px-6 py-4 text-white'>
                                    <div>
                                        <h2 className='text-lg font-semibold text-white'>
                                            Analysis Result
                                        </h2>
                                        <div className='space-y-2'>{"rendering result"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 grid gap-2 sm:flex'>
                        <button
                            type='button'
                            onClick={() => { }}
                            className="inline-flex items-center gap-x-2 rounded-lg border  px-3 py-2 text-sm font-medium text-white shadow-sm disabled:pointer-events-none disabled:opacity-5 border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
                        >
                            View Treatment Plan
                            <IconChevronRight size={20} />
                            {true && <IconProgress size={20} className='animate-spin mr-3 h-5 w-5' />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleRecordsDeatails;
