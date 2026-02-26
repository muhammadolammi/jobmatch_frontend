import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../assets/logo2.svg';

const GoJobMatchLogo: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center gap-2 cursor-pointer text-primary dark:text-slate-100"
            onClick={() => navigate("/")}
        >
            <div className="flex items-center">
                {/* 1. REMOVED viewBox="0 0 48 48" - let the SVG use its own.
                  2. 'size-12' or 'w-24' might be better than 'size-6' 
                     because this is a wide horizontal logo, not a square icon.
                */}
                <LogoSVG className="h-10 w-auto" />
            </div>

            {/* NOTE: Your SVG already contains the text "GO JobMatch". 
               If you want to use the H2 below instead, you should delete 
               the <text> tag from the SVG file above.
            */}
        </div>
    );
};

export default GoJobMatchLogo;