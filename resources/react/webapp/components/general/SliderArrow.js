import React from 'react'
import Icon from './Icon'

export default ({className, to, onClick, path}) => (
  <button type="button" onClick={onClick} className={`button button--text button--icon ${className}`} aria-label={to}>
    <Icon path={path} />
  </button>
)