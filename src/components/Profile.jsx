import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    User, Camera, Edit2, Save, X, 
    LogOut, Award, Loader2, Phone, Mail, CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    // --- STATE ---
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [shake, setShake] = useState(false);
    const { logout } = useAuth();
    // Form States
    const [formData, setFormData] = useState({ firstname: '', lastname: '', phonenumber: '' });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    // --- FETCH DATA ---
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(`${API_URL}/api/user/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(data);
            setFormData({
                firstname: data.firstname || '',
                lastname: data.lastname || '',
                phonenumber: data.phone || ''
            });
            setPreviewUrl(data.profileImage);
        } catch (error) {
            toast.error("Session expired. Please login again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProfile(); }, []);

    // --- HANDLERS ---
    const triggerErrorShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        if (!formData.firstname || !formData.lastname) {
            triggerErrorShake();
            toast.error("Name fields are required");
            return;
        }

        setIsSubmitting(true);
        const data = new FormData();
        const jsonRequest = JSON.stringify(formData);
        
        data.append("request", new Blob([jsonRequest], { type: "application/json" }));
        if (imageFile) data.append("file", imageFile);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${API_URL}/api/user/update/profile/${userData.id}`, 
                data,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
            );

            setUserData(response.data);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setIsEditing(false);
            }, 2000);
        } catch (error) {
            triggerErrorShake();
            toast.error("Update failed. Check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-black">
            <Loader2 className="animate-spin text-green-500" size={32} />
        </div>
    );

    return (
        <div className="bg-black flex-1 min-h-screen text-white pb-32 overflow-y-auto custom-scrollbar">
            
            {/* SUCCESS OVERLAY */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <CheckCircle2 size={100} className="text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                        </motion.div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Profile Synced</h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Muse Cloud Updated</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HEADER SECTION */}
            <div className={`relative bg-gray h-80 flex flex-col items-center justify-center transition-all duration-700 ${isEditing ? 'bg-gray' : 'bg-gradient-to-b from-gray-500/20 to-black'}`}>
                
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="absolute top-10 right-10 p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all group"
                    >
                        <Edit2 size={20} className="text-gray-400 group-hover:text-green-500" />
                    </button>
                )}

                <div className="relative ">
                    <motion.img 
                        layoutId="avatar"
                        src={previewUrl || 'https://via.placeholder.com/150'} 
                        className={`w-36 h-36 rounded-full object-cover border-4 shadow-2xl transition-all duration-500 ${isEditing ? 'border-green-500 scale-110' : 'border-white/20'}`}
                    />
                    {isEditing && (
                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer backdrop-blur-sm animate-in zoom-in-75 duration-300">
                            <Camera size={28} className="text-white" />
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    )}
                </div>

                <h1 className="mt-8 text-4xl font-black italic tracking-tighter uppercase leading-none">
                    {isEditing ? 'Update Profile' : `${userData?.firstname} ${userData?.lastname}`}
                </h1>
                
                <AnimatePresence mode="wait">
                    {!isEditing && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 mt-4 px-5 py-1.5 bg-green-500/10 rounded-full border border-green-500/20"
                        >
                            <Award size={14} className="text-green-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500">
                                {userData?.role || 'Listener'}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CONTENT AREA */}
            <div className="max-w-2xl mx-auto px-6 -mt-10">
                <AnimatePresence mode="wait">
                    {isEditing ? (
                        <motion.form 
                            key="edit-form"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, x: shake ? [-5, 5, -5, 5, 0] : 0 }} exit={{ opacity: 0, scale: 0.95 }}
                            onSubmit={handleUpdate}
                            className="bg-[#0A0A0A] p-10 rounded-[2.5rem] border border-white/5 space-y-8 shadow-3xl relative overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">First Name</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl focus:border-green-500/50 outline-none transition-all font-bold"
                                        value={formData.firstname}
                                        onChange={(e) => setFormData({...formData, firstname: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
                                    <input 
                                        type="text"
                                        className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl focus:border-green-500/50 outline-none transition-all font-bold"
                                        value={formData.lastname}
                                        onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                                <input 
                                    type="text"
                                    className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl focus:border-green-500/50 outline-none transition-all font-mono"
                                    value={formData.phonenumber}
                                    placeholder="+234..."
                                    onChange={(e) => setFormData({...formData, phonenumber: e.target.value})}
                                />
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button 
                                    type="button" onClick={() => setIsEditing(false)}
                                    className="flex-1 py-5 bg-white/5 hover:bg-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" disabled={isSubmitting}
                                    className="flex-[2] py-5 bg-green-500 hover:bg-green-400 text-black font-black uppercase text-[10px] tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/10"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save Changes</>}
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div 
                            key="profile-display"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="space-y-4 bg-gray p-10 rounded-[2.5rem] border border-white/5 shadow-3xl"
                        >
                            <div className="my-10 bg-gray  p-7 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-green-500/10 rounded-2xl text-green-500"><Mail size={22} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Registered Email</p>
                                        <p className="font-bold text-gray-200">{userData?.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#0A0A0A] p-7 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Phone size={22} /></div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Mobile Contact</p>
                                        <p className="font-bold text-gray-200">{userData?.phone || 'No phone linked'}</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => { logout(); window.location.reload(); }}
                                className="w-full mt-10 p-6 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-[2rem] flex items-center justify-center gap-4 text-red-500 transition-all group"
                            >
                                <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-black uppercase text-xs tracking-[0.2em]">Sign Out from Muse</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Profile;