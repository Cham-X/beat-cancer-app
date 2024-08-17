import React, { createContext, useCallback, useContext, useState } from 'react';

import { db } from '../utils/dbConfig';

import { Users, Records } from '../utils/schema';

import { eq } from 'drizzle-orm';

const StateContext = createContext();



export const StateContextProvider = ({ children }) => {

    const [users, setUsers] = useState([]);

    const [reocrds, setRecords] = useState([]);

    const [currentUser, setCurrentUser] = useState(null)

    const [loading, setLoading] = useState(false)

    const fetchUsers = useCallback(async () => {
        try {
            const result = await db.select().from(Users).execute();
            setUsers(result);
        } catch (error) {
            console.log(error)
        }
    }, []);

    const fetchUserByEmail = useCallback(async (email) => {
        try {
            const result = await db.select().from(Users).where(eq(email, Users.createdBy)).execute();

            if (result.length > 0) {
                setCurrentUser(result[0]);
            }
        } catch (error) {
            console.error("Error fetching user by email", error)
        }
    }, []);

    const createUser = useCallback(async (userData) => {
        try {
            const newUser = await db.insert(Users).values(userData).returning().execute();

            setUsers((users) => [...users, newUser[0]]);
            fetchUsers();
        } catch (error) {
            console.error("Error creating user", error)
        }
    }, []);

    const fetchRecords = useCallback(async (userEmail) => {
        try {
            const result = await db.select().from(Records).where(eq(Records.createdBy, userEmail)).execute();

            setRecords(result);
        } catch (error) {
            console.error("Error fetching user records", error)
        }
    }, []);


    const createRecord = useCallback(async (recordData) => {
        try {
            const newRecord = await db.insert(Records).values(recordData).returning({ id: Records.id }).execute();

            setRecords((records) => [...records, newRecord[0]]);
        } catch (error) {
            console.error("Error creating record", error)
            return null
        }
    }, []);

    const updateRecord = useCallback(async (recordData) => {
        try {
            const { documentID, ...dataToUpdate } = recordData;

            const updatedRecord = await db.update(Records).set(dataToUpdate).where(eq(documentID, Records.id)).returning();

            setRecords((records) => records.map((record) => record.id === documentID ? updatedRecord[0] : record));

        } catch (error) {
            console.error("Error updating record", error)
        }
    }, []);


    return (
        <StateContext.Provider value={{
            users,
            reocrds,
            currentUser,
            loading,
            fetchUsers,
            fetchUserByEmail,
            createUser,
            fetchRecords,
            createRecord,
            updateRecord,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
