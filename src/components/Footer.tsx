import React from 'react';

const Footer: React.FC = () => {
    // 🔥 Just change these
    const X_URL = "https://x.com/n3xtbridge";
    const FACEBOOK_URL = "https://facebook.com/n3xtbridge";
    const TIKTOK_URL = "https://tiktok.com/@n3xtbridge";

    return (
        <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} gojobmatch.com. All rights reserved.
                </p>

                <div className="flex gap-6">

                    {/* X */}
                    <a
                        href={X_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-primary transition-colors"
                    >
                        <span className="sr-only">X</span>
                        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2H21l-6.54 7.47L22 22h-6.828l-5.35-6.997L3.5 22H1l7.02-8.018L2 2h6.828l4.865 6.41L18.244 2z" />
                        </svg>
                    </a>

                    {/* Facebook */}
                    <a
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-primary transition-colors"
                    >
                        <span className="sr-only">Facebook</span>
                        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12a10 10 0 10-11.5 9.87v-6.99h-2.3V12h2.3V9.8c0-2.27 1.35-3.53 3.42-3.53.99 0 2.02.18 2.02.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42V12h2.5l-.4 2.88h-2.1v6.99A10 10 0 0022 12z" />
                        </svg>
                    </a>

                    {/* TikTok */}
                    <a
                        href={TIKTOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-primary transition-colors"
                    >
                        <span className="sr-only">TikTok</span>
                        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16.5 3c.28 1.55 1.62 2.74 3.25 2.86v3.07a6.26 6.26 0 01-3.25-1.1v6.53a5.25 5.25 0 11-5.25-5.25c.3 0 .6.03.88.08v3.1a2.25 2.25 0 102.12 2.24V3h2.25z" />
                        </svg>
                    </a>

                </div>
            </div>
        </footer>
    );
};

export default Footer;