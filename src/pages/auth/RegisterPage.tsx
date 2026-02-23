import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, User, Building } from 'lucide-react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser, selectAuth } from "../../states/authslice";
import { getProfessions, postProfession } from '../../api/professions';
import CreatableSelect from 'react-select/creatable';
import { toTitleCase } from '../../helpers/string';
import Footer from '../../components/Footer';

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
        profession_id: "",
    });
    const [professions, setProfessions] = useState<{ id: string, name: string }[]>([]);
    const [selectedProfession, setSelectedProfession] = useState<{ id?: string; name: string } | null>(null);
    const [status, setStatus] = useState('');
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(selectAuth);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchProfessions = async () => {
            const res = await getProfessions();
            setProfessions(res);

        };

        fetchProfessions();
    }, []);
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
            // console.log("Selected Profession:", selectedProfession);

            // check if selectedProfession has an id (existing profession) or just a name (new profession)
            if (selectedProfession) {
                // if i enter a profession that doesnt exist , registration is successfull but profession isnt created at all in backend. whats wrong?
                // are you there? 
                if (selectedProfession.id) {
                    payload.profession_id = selectedProfession.id;
                }
                else {
                    // check if the name already exists in professions list (to avoid duplicates)
                    const existing = professions.find(p => toTitleCase(p.name) === toTitleCase(selectedProfession.name));
                    if (existing) {
                        payload.profession_id = existing.id;

                    } else {
                        // If it's a new profession, we need to create it first
                        const newProf = await postProfession(toTitleCase(selectedProfession.name));
                        if (newProf.id === "") {
                            setStatus("❌ Failed to create new profession. Please try again.");
                            return;
                        }
                        payload.profession_id = newProf.id; // Use the newly created profession's ID
                        setProfessions(prev => [...prev, { id: newProf.id, name: newProf.name }]); // Update local professions list with the new profession
                    }

                }
            }
            else {
                setStatus("❌ Please select or enter a profession.");
                return;
            }
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
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
            {/* <!-- Top Navigation Bar --> */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="text-primary dark:text-slate-100">
                        <svg className="size-6" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path>
                        </svg>
                    </div>
                    <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">GoJobMatch</h2>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" to="/features">Features</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" to="/pricing">Pricing</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" to="/support">Support</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:inline text-sm text-slate-500">Already have an account?</span>

                        <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">
                            Log in
                        </Link>
                    </div>
                </div>
            </header>
            <main className="max-w-[1200px] mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
                {/* <!-- Heading Section --> */}
                <div className="text-center mb-10">
                    <h1 className="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Create your account</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base max-w-md mx-auto">Join a community of over 50,000 professionals and industry-leading companies.</p>
                </div>
                {/* <!-- Registration Card --> */}
                <div className="w-full max-w-[540px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                    {/* <!-- Role Selector Tabs --> */}
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex h-11 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">

                            {/* Job Seeker */}
                            <button
                                onClick={() => setRole('job_seeker')}
                                className={`flex flex-1 cursor-pointer h-full items-center justify-center rounded-md px-4 text-sm font-semibold transition-all
        ${role === 'job_seeker'
                                        ? 'bg-white text-gray-800 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                <User className="size-5 mr-2" />
                                Job Seeker
                            </button>

                            {/* Employer */}
                            <button
                                onClick={() => setRole('employer')}
                                className={`flex flex-1 cursor-pointer h-full items-center justify-center rounded-md px-4 text-sm font-semibold transition-all
        ${role === 'employer'
                                        ? 'bg-white text-gray-800 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                <Building className="size-5 mr-2" />
                                Employer
                            </button>

                        </div>
                    </div>

                    <div className="p-8">

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* --- Common Fields --- */}
                            <div >
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="you@company.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="••••••••" />
                            </div>

                            <hr />
                            {/* --- Job Seeker Fields --- */}
                            {role === 'job_seeker' && (
                                <div className="space-y-6 animate-fade-in">
                                    {/* <h3 className="text-lg font-semibold text-gray-700">Your Details</h3> */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
                                            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Jane" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
                                            <input type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange} required
                                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Profession</label>

                                        <CreatableSelect
                                            isClearable
                                            value={selectedProfession ? { value: selectedProfession.id || '', label: selectedProfession.name } : null}
                                            onChange={(newValue) => {
                                                if (newValue) {
                                                    // Check if this is an existing profession
                                                    const isExisting = professions.some(p => p.id === newValue.value);
                                                    setSelectedProfession({
                                                        id: isExisting ? newValue.value : undefined, // Only set ID if it exists
                                                        name: newValue.label
                                                    });
                                                } else {
                                                    setSelectedProfession(null);
                                                }
                                            }}
                                            options={professions.map(p => ({ value: p.id, label: p.name }))}
                                            placeholder="Select or type your profession"
                                        />
                                    </div>
                                </div>
                            )}


                            {/* --- Employer Fields --- */}
                            {role === 'employer' && (
                                <div className="space-y-6 animate-fade-in">
                                    <h3 className="text-lg font-semibold text-gray-700">Company Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
                                            <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="Acme Inc." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Company Website</label>
                                            <input type="url" name="company_website" value={formData.company_website} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="https://acme.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Company Size</label>
                                            <input type="number" name="company_size" value={formData.company_size} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm" placeholder="100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Industry</label>
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
                                    className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                                >
                                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
                                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />

                                </button>
                                {status && (
                                    <p className={`text-sm mt-4 text-center font-medium ${status.startsWith("✅") ? "text-green-600" : "text-red-600"
                                        }`}>
                                        {status}
                                    </p>
                                )}
                            </div>


                            {/* TODO Comment this out till we have social sign up */}
                            {/* <SocialAuthButtons

                                //   onGoogleClick={() => dispatch(signupWithGoogle())}
                                //   onLinkedInClick={() => dispatch(signupWithLinkedIn())}
                                // use an empty function for now to avoid errors
                                onGoogleClick={() => { }}
                                onLinkedInClick={() => { }}
                                loading={loading}
                            /> */}

                        </form>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 text-center border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                By clicking "Create Account", you agree to our
                                <Link className="text-primary font-semibold hover:underline p-1" to="/terms-of-service">Terms of Service</Link>  and
                                <Link className="text-primary font-semibold hover:underline p-1" to="/privacy-policy">Privacy Policy</Link>.
                            </p>
                        </div>


                    </div>
                </div>


            </main>


            <Footer />

        </div>


    )
};

export default RegisterPage;
