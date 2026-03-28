import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';


const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginWithToken } = useAuth();

   useEffect(() => {
        console.log("Redirect Handler hit!");
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userEmail = params.get('user'); // This is usually the email string
        const userId = params.get('userId');

        if (token) {
            // WE CONSTRUCT THE OBJECT HERE TO MATCH YOUR CONTEXT EXPECTATIONS
            const fakeResponse = {
                user: {
                    email: userEmail,
                    id: userId,
                    isEmailVerified: true 
                }
            };

            loginWithToken(token, fakeResponse); 
            navigate('/home'); 
        } else {
            toast.error("Google login failed. Please try again.");
            navigate('/login');
        }
    }, [location, navigate, loginWithToken]);
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
            <Loader2 className="animate-spin text-green-500 mb-4" size={48} />
            <h2 className="text-xl font-bold tracking-tight">Syncing with MUSE...</h2>
        </div>
    );
};

export default OAuth2RedirectHandler;