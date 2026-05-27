import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import bowl from '../assets/bowl.png'



function Landing({setStart}) {
    const title = ['NAME', 'THAT', 'DOG']
  
    const [visibleWords, setVisibleWords] = useState([])

    


  return (
    <Container className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <div className='titleCard d-flex p-4 mb-4 rounded shadow bg-dark flex-column align-items-center justify-content-center'>
        <div className='titleImageContainer d-flex bg-white p-4 rounded-pill'>
      <img src={bowl} width='100px' />
      </div>
        <h1 className='titleEnter'>{title.join(' ')}</h1>
        <h4>Beat the clock and identify the breed!!</h4>
        <Button onClick={()=>setStart(false)}>Start Game</Button>
        </div>
        <h2>Level 1</h2>
        <h5>Hint: Each dog has 1 breed</h5>
        
      
    </Container>
  )
}

export default Landing
