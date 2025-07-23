import React from 'react'

const NoPag_404 = () => {
  return (
        <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-tl from-pink-600 to-blue-600'>
      <div className='container w-[450px] h-75 bg-gradient-to-tl from-pink-500 to-blue-500 rounded-lg overflow-hidden shadow-lg flex flex-col  items-center gap-5'
      
      style={{
    boxShadow: `
      0 0 0 rgb(255, 0, 102),   /* pink */
      0 0 10px rgb(102, 0, 51),   /* cyan */
      0 0 0 rgb(204, 0, 255)   /* purple */
    `
  }}
  >
<h1 className=' text-5xl font-[600] text-[#f00058]  mt-5 mb-8'>
    Oops!
</h1>


<div className='flex mt-5'>


   <h1 className=' text-4xl text-red-500'>
    404 Page Not Found
   </h1>
   
    </div>
      <p className="text-[20px] text-[#164545] font-[500] "> The page you're looking for does not exist.</p>
      </div>
    </div>
  )
}

export default NoPag_404