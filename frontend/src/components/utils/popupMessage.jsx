import React from 'react'

const PopupMessage = ({message, type}) => {
    const isSuccess = type === 'success';
  return (
    
    <div className=''>
        <div className={` mb-3 font-semibold rounded-xs
            flex border w-max ${isSuccess ? ' border-green-400' : ' border-red-400'}`}>
                <div className={`h-12 w-12 flex justify-center items-center
                    ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
                    {isSuccess ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        )}
                </div>
                <div className={`px-5 bg-red-100`}>
                    <div className={`${isSuccess ? ' text-green-300' : ' text-red-500'}`}>
                        {isSuccess ? 'Success' : 'Error'}
                    </div>
                    <div className="text-[13px] font-mono font-light text-gray-700">{message}</div>
                </div>
            </div>
    </div>
  )
}

export default PopupMessage;