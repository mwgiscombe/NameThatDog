import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Landing from './components/landing'
import LeaderBoard from './components/LeaderBoard'
import Play from './components/Play'
import NavBar from './components/NavBar'
import { Modal, Button } from 'react-bootstrap'
import YouWin from './components/YouWin'

function App() {
  const [start, setStart] = useState(true)
  const [lgShow, setLgShow] = useState(false);
   const [highScore, setHighScore] = useState(0)
   const [highStats, setHighStats] = useState([])
   const [youWin, setYouWin] = useState(false)

  async function highScores(){
    try{
        const API_URL = 'http://localhost:4004'
        const {data}=await axios.get(`${API_URL}/users/highscore`)
        console.log(data)
        setHighScore(data.highScore[0].score)
        setHighStats(data.highScore)
        
        
    }catch(error){
        console.log(error)
    }
}

useEffect(() => {
  highScores();
}, []);

  return (
    <>
     <NavBar setStart={setStart} setLgShow={setLgShow} />
     {start == true ?
        <Landing setStart = {setStart} /> : 
      <Play start={start} setStart={setStart} youWin={youWin} setYouWin={setYouWin} highScore={highScore} />
      
     }
     <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Leaderboard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body><LeaderBoard highStats={highStats} /></Modal.Body>
      </Modal>
      
    </>
  )
}

export default App
