import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, User, Building, Briefcase, Globe, Users } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser, selectAuth } from "../../states/authslice";

type Role = 'job_seeker' | 'employer';

const RegisterPage: React.FC = () => {
    const [role, setRole] = useState<Role>('job_seeker');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        company_name: '',
        company_website: '',
        company_size: 0,
        company_industry: '',
    });
    const [status, setStatus] = useState('');
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(selectAuth);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'company_size' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('');

        const payload: any = {
            email: formData.email,
            password: formData.password,
            role: role,
        };

        if (role === 'job_seeker') {
            payload.first_name = formData.first_name;
            payload.last_name = formData.last_name;
        } else {
            payload.company_name = formData.company_name;
            payload.company_website = formData.company_website;
            payload.company_size = formData.company_size;
            payload.company_industry = formData.company_industry;
        }

        try {
            // const result = await dispatch(registerUser({ payload }));
            await dispatch(registerUser(payload)).unwrap();
            setStatus("✅ Registration successful! Please log in.");
            setTimeout(() => navigate('/login'), 2000); // Redirect to login
        } catch (err: any) {
            const errMsg = err || err.response?.data?.error || err.message || 'Registration failed.';
            setStatus(`❌ ${errMsg}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Create Account
                </h2>

                {/* --- Role Selector --- */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                        onClick={() => setRole('job_seeker')}
                        className={`w-full p-4 rounded-lg border-2 font-semibold text-center transition ${role === 'job_seeker'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        I am a Job Seeker
                    </button>
                    <button
                        onClick={() => setRole('employer')}
                        className={`w-full p-4 rounded-lg border-2 font-semibold text-center transition ${role === 'employer'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        I am an Employer
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* --- Common Fields --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="you@company.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="••••••••" />
                        </div>
                    </div>

                    <hr />

                    {/* --- Job Seeker Fields --- */}
                    {role === 'job_seeker' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-700">Your Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="Jane" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="Doe" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Employer Fields --- */}
                    {role === 'employer' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-lg font-semibold text-gray-700">Company Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="Acme Inc." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Website</label>
                                    <input type="url" name="company_website" value={formData.company_website} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="https://acme.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                                    <input type="number" name="company_size" value={formData.company_size} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="100" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Industry</label>
                                    <input type="text" name="company_industry" value={formData.company_industry} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="e.g., Technology" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- Submit --- */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
                        </button>
                        {status && (
                            <p className={`text-sm mt-4 text-center font-medium ${status.startsWith("✅") ? "text-green-600" : "text-red-600"
                                }`}>
                                {status}
                            </p>
                        )}
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;