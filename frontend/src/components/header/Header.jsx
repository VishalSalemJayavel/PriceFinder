import React from 'react'
import { motion } from 'framer-motion';
import { images } from '../../constants';

import './header.css'
const Header = () => {
  return (
    <div className="app__header">
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header_img"
      >
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.header}
          alt="header_img"
          className="overlay_img"
        />

      </motion.div>
    </div>
  )
}

export default Header
