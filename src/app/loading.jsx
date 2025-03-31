"use client"
export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <>
            <div className="w-full h-screen flex items-center justify-center">
                <p className='text-center text-2xl font-bold animate-bounce'>Loading...</p>
            </div>
        </>
    )
}