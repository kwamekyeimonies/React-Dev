import React, { useState } from 'react'
import Input from './Components/Input'
import Square from './Components/Square'

const App = () => {

  const [colorValue, setColorValue] = useState(" ")
  const [hexValue,setHexValue] = useState('')
  const [isDarkText,setIsDarkText] = useState(true)

  return (
    <div className='App'>
      <Square colorValue={colorValue} hexValue={hexValue} isDarkText={isDarkText}    />
      <Input colorValue={colorValue} setColorValue={setColorValue}  setHexValue={setHexValue} setIsDarkText={setIsDarkText} />
    </div>
  )
}

export default App