import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser, selectAuth, fetchCurrentUser } from "../../states/authslice";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(selectAuth);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('');
        if (!email || !password) {
            setStatus('⚠️ Please fill out all fields.');
            return;
        }

        const result = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(result)) {
            navigate('/');
        } else {
            setStatus('❌ Login failed.');
        }

        //  After login set the current user.
        dispatch(fetchCurrentUser());

    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Welcome Back
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@company.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Log In'}
                        </button>
                        {status && (
                            <p className="text-sm mt-4 text-center font-medium text-red-600">
                                {status}
                            </p>
                        )}
                    </div>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign up
                    </Link>
                </p>
            </div>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginPage;