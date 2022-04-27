import React, {useState, useEffect} from 'react'
import downArrow from '../assets/icons/down-arrow-icon.svg'

function useDropDownDisplay(secondsToWait) {
  const [displayed, setDisplayed] = useState({
    transition: false,
    remove: false

  })
  const { transition, remove } = displayed
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayed(prev => ({
        ...prev,
        remove: !prev.remove
      }))
    }, secondsToWait)

    return () => clearTimeout(timeoutId)
  }, [transition])

  return {transition, remove, setDisplayed, downArrow}
}
export default useDropDownDisplay