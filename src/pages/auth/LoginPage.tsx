import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser, selectAuth, fetchCurrentUser } from "../../states/authslice";
import Footer from '../../components/Footer';
// import GoJobMatchLogo from '../../components/JobMatchLogo';
import MainHeader from '../../components/MainHeader';
// import SocialAuthButtons from '../../components/SocialAuthButtons';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(selectAuth);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('');

        if (!email || !password) {
            setStatus('Please fill out all fields.');
            return;
        }

        const result = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(result)) {
            await dispatch(fetchCurrentUser());
            navigate('/dashboard');
        } else {
            // check if the payload have wrong password in it and replace with Invalid email or password.
            // use contains instead of exact match to check if the payload contains wrong password
            if (typeof result.payload === 'string' && result.payload.includes('Wrong password')) {
                setStatus('Invalid email or password.');
                return;
            }

            setStatus(result.payload as string || 'Invalid email or password.');
        }
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display">
            <MainHeader />

            {/* Main Wrapper: Locked to flex-1 to fill space between Header and Footer */}
            <div className="flex flex-1 w-full overflow-hidden">

                {/* */}
                <div className="hidden lg:flex lg:w-2/5 relative bg-primary items-center justify-center p-12 overflow-hidden">
                    {/* Background Decorative Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
                                </pattern>
                            </defs>
                            <rect fill="url(#grid)" height="100%" width="100%"></rect>
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-xl text-white">
                        {/* <div className="flex items-center gap-3 mb-12">
                            <div className="size-10 bg-white text-primary rounded-lg flex items-center justify-center">
                                {/* Insert your LogoSVG component here if you have it */}
                        {/* <svg className="size-6" fill="currentColor" viewBox="0 0 48 48">
                                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                                </svg>
                            </div>
                            <span className="text-2xl font-black tracking-tight">Gojobmatch</span>
                        </div>  */}

                        <h1 className="text-5xl font-extrabold leading-tight mb-6">
                            Connecting talent with the right opportunities.
                        </h1>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mt-12 border border-white/20">
                            <p className="text-lg italic font-medium mb-4">
                                "Gojobmatch helped me find my dream role in under two weeks! The interface is clean and the matching algorithm is spot on."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-full overflow-hidden bg-slate-200">
                                    <img alt="Sarah J. profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqi7Qe8j4brodetgfEMPnPeRRuAPLA9JYeLn52UkLKD_ImkBneymbXqeHF7wt1ZSpSFKLxXjKY868thb1I8-QPXP9LzmveLSoxH_C1VP62CqqXLq5d5ef6BC5Cxfoiq90VUAjO5b5j1CD9WKjWC37YfIiC35-qR-2uDk_Qlc1LOd5TuDjV5raGUzODNgvD_AVU96DWpnr23Sm_jDDX0U5lJsUkIji4llfN0chjrSOrpGZ26w1-sv5VS4QJgLaHiXcrms1d4vhPaBZm" />
                                </div>
                                <div>
                                    <p className="font-bold">Sarah J.</p>
                                    <p className="text-sm text-white/70">Software Engineer @ TechFlow</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* */}
                <div className="w-full lg:w-3/5 flex flex-col justify-center items-center p-6 sm:p-12 bg-background-light dark:bg-background-dark overflow-y-auto">

                    {/* Internal container to hold form and column-specific footer items */}
                    <div className="w-full max-w-md my-auto flex flex-col">

                        {/* Mobile Logo (visible only on lg:hidden) */}
                        <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
                            <div className="size-8 bg-primary text-white rounded-lg flex items-center justify-center">
                                <svg className="size-5" fill="currentColor" viewBox="0 0 48 48">
                                    <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-black tracking-tight text-primary">Gojobmatch</span>
                        </div>

                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                            <p className="text-slate-500 dark:text-slate-400">Enter your details to access your dashboard.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <Mail className="size-5" />
                                    </div>
                                    <input
                                        className="block w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                        id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" type="email"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                                    <Link className="text-xs font-bold text-primary hover:underline" to="/forgot-password">Forgot Password?</Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <Lock className="size-5" />
                                    </div>
                                    <input
                                        className="block w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
                                        id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input className="w-4 h-4 text-primary bg-white border-slate-300 rounded focus:ring-primary" id="remember" type="checkbox" />
                                <label className="ml-2 text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">Remember me for 30 days</label>
                            </div>

                            {status && (
                                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm animate-in fade-in slide-in-from-top-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    <p className="font-medium">{status}</p>
                                </div>
                            )}
                            <button className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group" type="submit" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Log In'}
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-8 text-center lg:text-left">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Don't have an account?
                                <Link to="/register" className="font-bold text-primary hover:underline ml-1">Sign up for free</Link>
                            </p>
                        </div>

                        {/* Column Specific Footer Links */}
                        <div className="mt-12 flex gap-6 text-xs text-slate-400 font-medium justify-center lg:justify-start">
                            <Link className="hover:text-primary transition-colors" to="#">Privacy Policy</Link>
                            <Link className="hover:text-primary transition-colors" to="#">Terms of Service</Link>
                            <Link className="hover:text-primary transition-colors" to="#">Help Center</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* This Global Footer stays at the very bottom spanning 100% width */}
            <Footer />
        </div>
    );
};

export default LoginPage;


