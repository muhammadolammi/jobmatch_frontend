import React from "react";

import { UserSearch, Building2, Brain, Zap, AlarmClockCheck } from 'lucide-react';

import { Link } from "react-router-dom";
import MainHeader from "../components/MainHeader";

export default function LandingPage() {
  // const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* <!-- Navigation --> */}
          {/* TODO */}
          <MainHeader />
          <main className="flex-1">
            {/* <!-- Hero Section --> */}
            <section className="px-6 md:px-20 py-12 md:py-24 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:text-slate-100 ring-1 ring-inset ring-primary/20 w-fit">
                      Next Gen Recruitment
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                      Bridge the Gap Between Talent and Opportunity
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                      Our AI-powered platform instantly analyzes resumes against job descriptions to find the perfect fit with precision and speed. Stop searching, start matching.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-primary text-white text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" to={"/register"}>
                      Get Started Free
                    </Link>
                    <Link className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 transition-all" to={"/pricing"}>
                      View Pricing
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden"><img alt="Avatar" data-alt="Portrait of a young professional woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTKU8ONWRioJGXlLn4iaKs6-Dcvg6xzXChx3UIY6HR6UF9P288k5EsQFJGFN6e-srpJzgZD9oJyEVuROVFEUfvw8dNJdFsN8BiaVHYE-2E8hBc4J6jqUjiyqB7c8zI1skkAbdp7VOmPyeM9w8z8X4iJfSjEIn-N3oowEjAa4wYAvPqsQa3L4jUKjbENj7YAtmKoeioy1o6NDFMpzCJW4LzJ2INZauDtQ0yJrTNLWUiHRzS3aRB1eCIm0yYdq1zyE-b0VzzslFVgw6Q" /></div>
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden"><img alt="Avatar" data-alt="Portrait of a business executive man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5wpxIaSnXyk3cAsWTnOb4DLKbNKASoe4_NMmdwlrKxc2V7_v0gVTfsZ29MAC6VxBada9o66g_aWlViotUn4VaHRXQbw3ZmdAptZXTN0Jgc2EksJgvj7cmgq_oZ2UbWP_YGpZdkt0K68Km9RFW7esuGCNFZCVlawZ6wWnx0DInuMUvbXj87BmKaOetbqhlFuNtSrPySZWdU5LXAvxetknCynoHza89h1FXoeYQ3v2lW5D1_n-ljl6nDrX1BMWcT4jv5TxvpCp5HE_O" /></div>
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden"><img alt="Avatar" data-alt="Close up of a smiling professional woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc3wGp9V_pevzDFQvJ93iozbuD0foPWN0NZgFrPSfOPUAs34uWffYN-r_x0vJvf_wV_g3fWenR16v9R0sCfPO1A6pb1emdS9AeAL1tUb-oEWUuVrXLlS0YRAkBHbkeLWG88OXVMitEDnghQo9u7nsITUHhhLAedeav-i1hDuwPDAZPLsxkKBPyuTCMS5HekAwT8QxW-F2zz58hHREkdB8XXpujdcu27V0N7QeWnoeqsxOaPPa7defTgSjWvXgcqugK3SKpghDLfYn8" /></div>
                    </div>
                    {/* TODO GET THIS NUMBER FROM BACKEND  */}
                    <span>Joined by 10 professionals this month</span>
                  </div>

                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative w-full aspect-video md:aspect-square bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
                    {/* <div className="absolute inset-0 bg-cover bg-center" data-alt="Dashboard showing AI data analysis and resume matching graphs" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDXMz8HR-KVU9AZhs6mP5H4dZQUHPgu3AgAtgyfCWb2oO-oU9eSVlM_A3s0f3EYdoPlJCGEQPIY_dkQcB4YQw_zlgOx7pT0hsRihb-S798hQvA-HOcoS8zld0hOwsRKPSvEp_mVXy6sQSH5wEheA1ACRGbWt7tlABbi9ls2A8GrSa4h4X2pD7xQ9LcbW374OI2uE9vvxO-F3VjAfqRSRvZLwwaYkfHqoxIS0pQnwJ2CtH9zJaBbLh2fuiMhTCU8UCfLro-nlZBcElQ");'></div> */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      data-alt="Dashboard showing AI data analysis and resume matching graphs"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDXMz8HR-KVU9AZhs6mP5H4dZQUHPgu3AgAtgyfCWb2oO-oU9eSVlM_A3s0f3EYdoPlJCGEQPIY_dkQcB4YQw_zlgOx7pT0hsRihb-S798hQvA-HOcoS8zld0hOwsRKPSvEp_mVXy6sQSH5wEheA1ACRGbWt7tlABbi9ls2A8GrSa4h4X2pD7xQ9LcbW374OI2uE9vvxO-F3VjAfqRSRvZLwwaYkfHqoxIS0pQnwJ2CtH9zJaBbLh2fuiMhTCU8UCfLro-nlZBcElQ")`,
                      }}
                    ></div>

                    <div className="absolute inset-0 bg-slate-900/10"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* <!-- Social Proof Section --> */}
            {/* Uncomment when we have trusted partners TODO */}
            {/* <section className="bg-slate-50 dark:bg-slate-900/50 py-12">
              <div className="px-6 md:px-20 max-w-7xl mx-auto">
                <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-widest mb-10">Trusted by Global Industry Leaders</p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-3xl">token</span> TECHCORP
                  </div>
                  <div className="flex items-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-3xl">hub</span> NEXUS
                  </div>
                  <div className="flex items-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-3xl">polyline</span> FLOW
                  </div>
                  <div className="flex items-center gap-2 text-2xl font-bold text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-3xl">all_inclusive</span> INFINITE
                  </div>
                </div>
              </div>
            </section> */}
            {/* <!-- How It Works Section --> */}
            <section className="px-6 md:px-20 py-24 max-w-7xl mx-auto" id="how-it-works">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How it Works</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Streamlined workflows for both sides of the hiring table. Powered by advanced linguistic AI.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* <!-- For Job Seekers --> */}
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary dark:text-slate-200 mb-6">
                    <span className="material-symbols-outlined text-2xl">
                      <UserSearch className="size-6" />
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">For Job Seekers</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <p className="font-semibold dark:text-slate-200">Upload your Resume</p>
                        <p className="text-sm text-slate-500">Import your LinkedIn profile or PDF resume in seconds.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <p className="font-semibold dark:text-slate-200">Paste Job Description</p>
                        <p className="text-sm text-slate-500">Tell us about the role you're targeting.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <p className="font-semibold dark:text-slate-200">Get Instant Gap Analysis</p>
                        <p className="text-sm text-slate-500">See exactly what keywords and skills you're missing to rank #1.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* <!-- For Employers --> */}
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary dark:text-slate-200 mb-6">
                    <span className="material-symbols-outlined text-2xl">
                      <Building2 className="size-6" />
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">For Employers</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <p className="font-semibold dark:text-slate-200">Define the Role</p>
                        <p className="text-sm text-slate-500">Upload your job description and required competencies.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <p className="font-semibold dark:text-slate-200">Analyze Candidate Pool</p>
                        <p className="text-sm text-slate-500">Bulk upload applications or sync with your ATS.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 size-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <p className="font-semibold dark:text-slate-200">Rank by Precision</p>
                        <p className="text-sm text-slate-500">Identify top talent instantly with unbiased AI scoring.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            {/* <!-- Features Section --> */}
            <section className="bg-primary py-24 px-6 md:px-20 text-white overflow-hidden relative" id="features">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-black mb-6">Why Choose Gojobmatch?</h2>
                  <p className="text-slate-400 max-w-2xl mx-auto text-lg">Harness the power of Large Language Models specifically trained for the recruitment industry.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* <!-- Feature 1 --> */}
                  <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="size-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">
                        <Brain className="size-6" />
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">AI-Powered Matching</h4>
                    <p className="text-slate-400 leading-relaxed">Beyond keyword matching—our AI understands context, seniority levels, and transferable skills to find the perfect cultural fit.</p>
                  </div>
                  {/* <!-- Feature 2 --> */}
                  <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="size-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">
                        <Zap className="size-6" />

                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Detailed Gap Analysis</h4>
                    <p className="text-slate-400 leading-relaxed">Interactive heatmaps show where a candidate excels and where training might be required, reducing onboarding risk.</p>
                  </div>
                  {/* <!-- Feature 3 --> */}
                  <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="size-14 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">
                        <AlarmClockCheck className="size-6" />

                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Time-Saving HR Tools</h4>
                    <p className="text-slate-400 leading-relaxed">Reduce time-to-hire by 75% with automated initial screenings and candidate scoring based on your specific criteria.</p>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- CTA Section --> */}
            <section className="py-24 px-6 md:px-20">
              <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-primary to-indigo-900 p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to find your match?</h2>
                  <p className="text-slate-300 mb-10 text-lg md:text-xl max-w-2xl mx-auto">Join thousands of companies and job seekers using AI to streamline their career growth.</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors" to={"/register"}>Start Your Free Analysis</Link>
                    <button className="bg-primary/50 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">Schedule a Demo</button>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/* <!-- Footer --> */}
          <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 md:px-20 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 text-primary dark:text-white mb-6">
                  <div className="text-primary dark:text-slate-100">
                    <svg className="size-6" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold leading-tight tracking-tight">GoJobMatch</h2>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">The future of hiring is here. Leveraging AI to build more human workplaces.</p>
                {/* <div className="flex gap-4">
                  <a className="text-slate-400 hover:text-primary transition-colors" ><span className="material-symbols-outlined">public</span></a>
                  <a className="text-slate-400 hover:text-primary transition-colors" ><span className="material-symbols-outlined">alternate_email</span></a>
                  <a className="text-slate-400 hover:text-primary transition-colors" ><span className="material-symbols-outlined">terminal</span></a>
                </div> */}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Solutions</h4>
                <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                  <li><Link className="hover:text-primary transition-colors" to="/job-seekers">For Job Seekers</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/employers">For Employers</Link></li>
                  {/* <li><a className="hover:text-primary transition-colors" >Enterprise</a></li> */}
                  <li><Link className="hover:text-primary transition-colors" to="/api-access">API Access</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                  <li><Link className="hover:text-primary transition-colors" to="/help-center">Help Center</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/resume-tips">Resume Tips</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/hiring-blog">Hiring Blog</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/career-advice">Career Advice</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-6">Legal</h4>
                <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                  <li><Link className="hover:text-primary transition-colors" to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/terms-of-service">Terms of Service</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to="/cookie-policy">Cookie Policy</Link></li>
                  {/* <li><a className="hover:text-primary transition-colors" >GDPR</a></li> */}
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-400">© {new Date().getFullYear()} gojobmatch.com. All rights reserved.</p>
              {/* <div className="flex gap-6 text-xs text-slate-400">
                <a className="hover:text-primary" >Status</a>
                <a className="hover:text-primary" >Security</a>
                <a className="hover:text-primary" >Sitemap</a>
              </div> */}
            </div>
          </footer>
        </div>
      </div>
    </div >

  );
}



// <div classNameName="min-h-screen bg-white text-gray-900">
//     {/* Navbar */}
//     <header classNameName="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
//       <h1 classNameName="text-2xl font-bold tracking-tight">GoJobMatch</h1>
//       <div classNameName="flex gap-3">
//         <Button variant="ghost" classNameName="rounded-2xl" onClick={() => (navigate("/login"))}>Sign In</Button>
//         <Button classNameName="rounded-2xl" onClick={() => (navigate("/register"))}>Get Started</Button>
//       </div>
//     </header>

//     {/* Hero Section */}
//     <section classNameName="px-6 md:px-12 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 classNameName="text-4xl md:text-5xl font-extrabold leading-tight">
//           Find the Right Job. <br /> Faster. Smarter.
//         </h2>
//         <p classNameName="mt-6 text-lg text-gray-600 max-w-lg">
//           GoJobMatch connects job seekers with the right opportunities and helps recruiters discover top candidates using intelligent matching and accurate recommendations.
//         </p>
//         <div classNameName="mt-8 flex flex-wrap gap-4">
//           <Button size="lg" classNameName="rounded-2xl px-8" onClick={() => (navigate("/register"))}>Join Now</Button>
//           <Button size="lg" variant="outline" classNameName="rounded-2xl px-8" onClick={() => (navigate("/login"))}>Sign In</Button>
//         </div>
//         <p classNameName="mt-4 text-sm text-gray-500">Free to join. Built for accuracy.</p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//         classNameName="bg-gray-50 rounded-2xl p-8 shadow-sm"
//       >
//         <div classNameName="space-y-6">
//           <div>
//             <h3 classNameName="font-semibold text-lg">For Job Seekers</h3>
//             <ul classNameName="mt-3 space-y-2 text-gray-600 text-sm">
//               <li>• Get matched to relevant jobs</li>
//               <li>• Increase interview chances</li>
//               <li>• Save time on applications</li>
//             </ul>
//           </div>
//           <div>
//             <h3 classNameName="font-semibold text-lg">For Recruiters</h3>
//             <ul classNameName="mt-3 space-y-2 text-gray-600 text-sm">
//               <li>• Discover top candidates instantly</li>
//               <li>• Reduce screening time</li>
//               <li>• Hire with confidence</li>
//             </ul>
//           </div>
//         </div>
//       </motion.div>
//     </section>

//     {/* How It Works */}
//     <section classNameName="bg-gray-50 py-20 px-6 md:px-12">
//       <div classNameName="max-w-7xl mx-auto text-center">
//         <h3 classNameName="text-3xl font-bold">How It Works</h3>
//         <p classNameName="mt-4 text-gray-600">Simple steps. Better matches.</p>

//         <div classNameName="mt-12 grid md:grid-cols-3 gap-8">
//           <Card classNameName="rounded-2xl shadow-sm">
//             <CardContent classNameName="p-6">
//               <h4 classNameName="font-semibold text-lg">1. Create Profile</h4>
//               <p classNameName="mt-3 text-sm text-gray-600">Add your skills, experience, and preferences.</p>
//             </CardContent>
//           </Card>

//           <Card classNameName="rounded-2xl shadow-sm">
//             <CardContent classNameName="p-6">
//               <h4 classNameName="font-semibold text-lg">2. Smart Matching</h4>
//               <p classNameName="mt-3 text-sm text-gray-600">Our system ranks jobs and candidates by relevance.</p>
//             </CardContent>
//           </Card>

//           <Card classNameName="rounded-2xl shadow-sm">
//             <CardContent classNameName="p-6">
//               <h4 classNameName="font-semibold text-lg">3. Connect & Apply</h4>
//               <p classNameName="mt-3 text-sm text-gray-600">Apply or connect with confidence and clarity.</p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>

//     {/* Final CTA */}
//     <section classNameName="py-20 px-6 md:px-12">
//       <div classNameName="max-w-4xl mx-auto text-center">
//         <h3 classNameName="text-3xl md:text-4xl font-bold">Ready to Find Better Matches?</h3>
//         <p classNameName="mt-4 text-gray-600">Join GoJobMatch today and experience smarter hiring.</p>
//         <div classNameName="mt-8 flex justify-center gap-4">
//           <Button size="lg" classNameName="rounded-2xl px-8" onClick={() => (navigate("/register"))}>Create Account</Button>
//           <Button size="lg" variant="outline" classNameName="rounded-2xl px-8" onClick={() => (navigate("/login"))}>Sign In</Button>
//         </div>
//       </div>
//     </section>

//     {/* Footer */}
//     <footer classNameName="border-t py-8 px-6 md:px-12 text-center text-sm text-gray-500">
//       © {new Date().getFullYear()} GoJobMatch. All rights reserved.
//     </footer>
//   </div>