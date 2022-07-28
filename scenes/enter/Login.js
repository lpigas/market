import React from 'react'
import StandButtons from '../../components/atoms/Buttons/standart/StandButtons'

export default function login() {

  return (
    <div>
         <div className="min-w-min min-h-min p-4 bg-blue-600 flex flex-col rounded-3xl border-black border-2 drop-shadow-[0_35px_35px_rgba(0,5,0,0.6)]"> 
          <p className="m-auto">Enter in base</p>
          <div>
          <input className="m-2"></input> Enter your login
          </div>
          <div>
          <input className="m-2"></input> Enter your password
          </div>
          <div className='m-2 text-right'>
          <StandButtons value={'Enter'} size='xl' color='lime'/>scenes
          </div>
      </div>
    </div>
  )
}
