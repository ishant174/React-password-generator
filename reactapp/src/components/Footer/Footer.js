import React from 'react'
import "./Footer.css"
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footer'>
      <p>&copy; {currentYear} Cridtick. All rights reserved.</p>
      <p>Contact: <a href="mailto:contact@cridtick.com">contact@cridtick.com</a></p>
  </div>
  )
}

export default Footer;
