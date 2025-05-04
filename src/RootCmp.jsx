import React from 'react'
import { Routes, Route } from 'react-router'

import { MainPage } from './pages/MainPage.jsx'
import { ResultsPage } from './pages/ResultsPage.jsx'
import { LivePage } from './pages/LivePage.jsx'
// import { ChatApp } from './pages/Chat.jsx'

import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'

export function RootCmp() {
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
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


