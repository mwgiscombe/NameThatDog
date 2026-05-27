import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import beagle from '../assets/beagle.gif'

function NextLevel({score, goToNextLevel, level}) {
    const [username, setusername] = useState('')
    let message = ''

    if (level < 3) message =`Next up: Purebreeds! Each dog has 1 right answer!`
    if (level >= 3 && level < 6) message = `Next up: Mixes! Each dog has 2 breeds!`
    if (level >= 6 && level < 9) message = `Next up: Mutts! Each dog has 2 or 3 breeds!`
    if (level >= 9) message = `Next up: Free-for-all! Each dog has between 1 & 3 breeds!`

  return (
    <Container fluid className='d-flex transScreen flex-column align-items-center justify-content-center'>
        <h1 className='text-white'>You made it to level {level + 1}!</h1>
        <img src={beagle} className='dogPic my-2' />
    
      <h2 className='text-white  mb-3'>Current Score: {score}</h2>
      
      <Button onClick={goToNextLevel}>Continue</Button>
      <div className='hintBox d-flex flex-column align-items-center justify-content-center bg-white p-2 text-center mt-4 rounded shadow'>
      <h5 className='small'>Hint:<br /> {message}</h5>
      </div>
    </Container>
  )
}

export default NextLevel
