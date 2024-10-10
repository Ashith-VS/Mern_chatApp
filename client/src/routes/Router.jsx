import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Register } from '../screens'
import PrivateRoute from './PrivateRoute'

const Router = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div className='loader'>Loading...</div>}>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes >
            </Suspense>
        </BrowserRouter>
    )
}
export default Router