import React from 'react'
import DynamicNavbar from '../../Header/DynamicNavbar/DynamicNavbar'

function Contact({setMenuActive, menuActive}) {
  return (
    <div>
      <DynamicNavbar setMenuActive={setMenuActive} menuActive={menuActive} />
    </div>
  );
}

export default Contact