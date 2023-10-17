"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/utils";

type Image = {
    src: string,
    width: number,
    height: number
    alt: string
}

export default function BlurImage({ src, width, height, alt }: Image) {
    
    const [isLoading, setLoading] = useState(true);

    return (
        <a className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <Image
                    alt={alt}
                    src={src}
                    objectFit="cover"
                    style={{ width: '100%' }}
                    width={width}
                    height={height}
                    className={cn(
                        'duration-700 ease-in-out group-hover:opacity-75',
                        isLoading
                            ? 'scale-110 blur-2xl grayscale'
                            : 'scale-100 blur-0 grayscale-0'
                    )}
                    onLoadingComplete={() => setLoading(false)}
                />
            </div>
        </a>
    )
}