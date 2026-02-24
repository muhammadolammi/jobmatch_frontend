

// create a react component that return an html

import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoJobMatchLogo: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div className="flex items-center gap-2 text-primary dark:text-slate-100" onClick={() => { navigate("/") }}>
            <div className="text-primary dark:text-slate-100">
                <svg className="size-6" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z"></path>
                </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">GoJobMatch</h2>
        </div>
    );
};

export default GoJobMatchLogo;