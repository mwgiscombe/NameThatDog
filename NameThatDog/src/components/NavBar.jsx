import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
function NavBar({setStart, setLgShow}) {

  function restart(){
    setStart(true)
    return
  }
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand  style={{'cursor': 'pointer'}} onClick={restart}>NameThatD🐾g</Navbar.Brand>
          
            <Button onClick={()=>setLgShow(true)}>Leaderboard</Button>
          
        </Container>
      </Navbar>
     
      </>
  )}

  export default NavBar