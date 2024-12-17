'use client'

import "./NavMenuIcons.css"

export default function NavMenuIcons(props) {

  const { iconVisibility, onClick } = props
  
  return (
    <div className='mobile-menu-toggle-icons-container' onClick={onClick} >
        
    <div className={iconVisibility ? 'menu-icon open' :  'menu-icon closed'} >
      <span className='menu-icon-line' id="line-1"></span>
      <span className='menu-icon-line' id="line-2"></span>
      <span className='menu-icon-line' id="line-3"></span>
    </div>

  </div>
  )
}