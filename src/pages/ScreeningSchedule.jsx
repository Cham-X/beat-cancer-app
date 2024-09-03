import React from 'react';
import { useLocation } from 'react-router-dom';
import KanbanBoard from './records/components/KanbanBoard';

const ScreeningSchedule = () => {

    const { state } = useLocation()
    return (
        <div className=''>
            <KanbanBoard />
        </div>
    );
}

export default ScreeningSchedule;
