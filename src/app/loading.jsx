"use client"
export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <p className='text-center text-2xl font-bold animate-bounce'>Loading...</p>
                <p className='text-center text-2xl font-bold animate-bounce'>Please wait for a second</p>
            </div>
        </>
    )
}