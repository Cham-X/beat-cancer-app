import { IconChevronRight, IconFileUpload, IconProgress } from '@tabler/icons-react';
import React, { useState } from 'react';
import RecordDetailsHeader from './RecordDetailsHeader';

import { useLocation, useNavigate } from 'react-router-dom';
import FileUploadModal from './FileUploadModal';

import { useStateContext } from "../../../context/index"
import { GoogleGenerativeAI } from '@google/generative-ai';

import ReactMarkDown from "react-markdown"

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;


const SingleRecordsDeatails = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [isupLoading, setUpLoading] = useState(false)
    const [upLoadSuccess, setUpLoadSucces] = useState(false)
    const [processing, setProcessing] = useState(false)

    const { state } = useLocation()

    // const [analysisResult, setAnalysisResult] = useState(state.analysisResult || "")

    const [filename, setFilename] = useState("")
    const [filetype, setFiletype] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { updateRecord } = useStateContext()

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleFileChange = (e) => {
        const file = e.target.files(0)
        setFiletype(file.type)
        setFilename(file.name)
        setFile(file)
    }

    const handleFileUpload = async () => {
        setUpLoading(true)
        setUpLoadSucces(false)

        const genAI = new GoogleGenerativeAI(geminiApiKey)

        try {
            const base64Data = await readFileAsBase64(file)

            const imagePart = [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: filetype,
                    },
                },
            ];

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

            const prompt = "You are an expert cancer and any disease diagnosis analyst. Use your knowledge base to answer questions about giving personalized recommended treatment and give a detailed treatment plan for me. Make it more readeable, clear and easy to understand make it paragraph to make it more readeable"

            const results = await model.generateContent([prompt, ...imagePart])

            const response = await results.response
            const text = response.text()
            // setAnalysisResult(text)

            const updatedRecord = await updateRecord({
                documentID: state.id,
                analysisResult: text,
                kanbanRecords: "",
            })

            upLoadSuccess(true)
            setIsModalOpen(false)
            setFilename("")
            setFile(null)
            setFiletype("")

        } catch (error) {
            console.error("Error uploading file", error)
            setUpLoadSucces(false)
            setIsModalOpen(false)
        } finally {
            setUpLoading(false)
        }
    }

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result.split(".")[1])
            reader.onerror = reject;
            reader.readAsDataURL(file)
        });
    };

    const processTreatmentPlan = async () => {
        setProcessing(false)

        const genAI = new GoogleGenerativeAI(geminiApiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

        const prompt = `Your role and goal is to be an that will, using th`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const parsedResponse = JSON.parse(text)

        const updatedRecord = await updateRecord({
            documentID: state.id,
            kanbanRecords: text
        });

        navigate(`/screening-schedule`, {
            state: parsedResponse,
        })

        setProcessing(false);
    }


    return (
        <div className='flex flex-wrap gap-[25px]'>
            <button
                type='button'
                onClick={handleOpenModal}
                className='mt-6 inline-flex items-center gap-x-2 rounded-full border border-neutral-700 bg-[#13131a] px-4 py-2 text-sm font-medium shadow-sm hover:bg-neutral-800 text-white'
            >
                <IconFileUpload />
                Upload Reports
            </button>
            {/* FileUploadModal */}
            <FileUploadModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                upLoading={isupLoading}
                onFileChange={handleFileChange}
                onFIleUpload={handleFileUpload}
                upLoadSuccess={upLoadSuccess}
                filename={filename}

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
                                        <div className='space-y-2'>
                                            <ReactMarkDown>
                                                {"rendering result"}
                                            </ReactMarkDown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 grid gap-2 sm:flex'>
                        <button
                            type='button'
                            onClick={processTreatmentPlan}
                            className="inline-flex items-center gap-x-2 rounded-lg border  px-3 py-2 text-sm font-medium text-white shadow-sm disabled:pointer-events-none disabled:opacity-5 border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
                        >
                            View Treatment Plan
                            <IconChevronRight size={20} />
                            {processing && <IconProgress size={20} className='animate-spin mr-3 h-5 w-5' />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleRecordsDeatails;
