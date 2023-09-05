import React from 'react';

interface LoadMoreProps {
    onClick: () => void
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick }) => {

    return (
        <div className="container m-auto flex justify-center py-8 transition-all opacity-80 hover:opacity-100">
            <button className="bg-lavender p-3 rounded-lg font-mono text-xl" onClick={onClick}>Load More</button>
        </div>
    )

}

export default LoadMore;