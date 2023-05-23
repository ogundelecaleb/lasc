import React from 'react'

const Header = () => {
  return (
    <div className="flex flex-row fixed item-center justify-between bg-[#ffffff] px-[48px] py-[24px] w-full">
    <img src="./payloadlogo.png" alt="" className="h-[42px] w-[138px] " />

    <button className="py-1 px-5 bg-[#124072] rounded-[20px] text-gray-200 text-[16px]">
      Sign in
    </button>
  </div>
  )
}

export default Header