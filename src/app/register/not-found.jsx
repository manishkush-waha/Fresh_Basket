import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold animate-bounce'>Page Not Found</h1>
            <p className='text-gray-500'>The page you are looking for does not exist.</p>
            <Link href={'/'} className='text-blue-500 p-2 bg-gray-300 cursor-pointer rounded-xl'>👈🏼 Go to Home</Link>
        </div>
    )
}