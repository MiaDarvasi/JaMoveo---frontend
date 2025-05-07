import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { socketService } from './services/socket.service.js'

import { MainPage } from './pages/MainPage.jsx'
import { ResultsPage } from './pages/ResultsPage.jsx'
import { LivePage } from './pages/LivePage.jsx'

import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { LoginAdmin } from './pages/LoginAdmin.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { SignupAdmin } from './pages/SignupAdmin.jsx'

export function RootCmp() {

    useEffect(() => {
        socketService.setup()
    }, [])

    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    <Route path="main" element={<MainPage />} />
                    <Route path="search-results" element={<ResultsPage />} />
                    <Route path="live" element={<LivePage />} />
                    <Route path="" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="login/admin" element={<LoginAdmin />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="signup/admin" element={<SignupAdmin />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


