import React, { useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import Sideebar from "./components/Sideebar";
import Navbar from "./components/Navbar";
import { Home, Onboarding, Profile, ScreeningSchedule } from "./pages";
import MedicalRecords from "./pages/records/Index";
import { useStateContext } from "./context";
import { usePrivy } from "@privy-io/react-auth";
import SingleRecordsDeatails from "./pages/records/components/SingleRecordsDeatails";

const App = () => {

    const navigate = useNavigate()

    const { currentUser } = useStateContext()

    const { user, authenticated, ready, login } = usePrivy()

    useEffect(() => {
        if (ready && !authenticated) {
            login();
        } else if (ready && authenticated && user && !currentUser) {
            navigate("/onboarding");
        }
    }, [user, authenticated, login, currentUser, navigate]);

    return (
        <div className="relative flex min-h-screen flex-row bg-[#13131a] p-4">
            <div className="relative mr-10 hidden sm:flex">
                <Sideebar />
            </div>
            <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/medical-records" element={<MedicalRecords />} />
                    <Route path="/medical-records/:id" element={<SingleRecordsDeatails />} />
                    <Route path="/screenong-schedule" element={<ScreeningSchedule />} />
                </Routes>
            </div>
        </div>
    )
}

export default App;