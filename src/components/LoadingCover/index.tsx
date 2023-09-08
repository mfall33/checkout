import React from 'react';

const LoadingCover = ({ active }: { active: Boolean }) => {
    return (
        <div className={`loading-cover ${active ? 'active' : ''}`}>
            <div className="loading-cover-spinner"></div>
        </div>);
}

export default LoadingCover;