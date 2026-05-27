import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import LeaderBoard from './LeaderBoard'

function GameOver({score, reset, youWin, setYouWin, highStats}) {
    const [username, setusername] = useState('')

    async function saveScore(x){
        try{
            const API_URL = 'https://namethatdog.onrender.com' || 'http://localhost:4004'
            const {data}=await axios.post(
                `${API_URL}/users/save`,
            {username,
                score
            })
            

            
            
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Container fluid className='d-flex transScreen flex-column align-items-center justify-content-center text-center'>
      {youWin ? <h1 className='text-white'>You've reached the end! Congratulations! <br /> Final Score: {score}</h1> : 
      <><h1 className='text-white'>Game Over</h1>
      <h3>Final Score: {score} </h3> </>}
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h4>Save Your Score!</h4>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setusername(e.target.value)} />
        
      </Form.Group>

      <LeaderBoard />

     
      <Button variant="primary" type="button" onClick={saveScore}>
        Submit
      </Button>
    </Form>
      <Button onClick={reset}>Play Again</Button>
    </Container>
  )
}

export default GameOver
