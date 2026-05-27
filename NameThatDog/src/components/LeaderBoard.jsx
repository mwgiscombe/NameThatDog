import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function LeaderBoard({highStats}) {
  const [showAll, setShowAll] = useState(false)

  function allScores(){
    setShowAll(true)
  }
  return (
    <Container className='leaderboard d-flex shadow my-5 rounded  p-3 align-items-center justify-content-center'>
        <Row>
        <Col md={1}></Col>
        <Col md={4}>Username</Col>
            
            <Col md={4}>Score</Col>
            <hr />
            {highStats.slice(0, showAll ? highStats.length : 5).map((u, i)=>
            <>
            <Col md={1}>{i === 0 ? '🥇' : i=== 1 ? '🥈' : i === 2 ? '🥉' : ''}</Col>
            <Col md={4}>{u.username}</Col>
            
            <Col md={4}>{u.score}</Col>
            <hr />
            <Button onClick={showAll ? ()=>setShowAll(false) : setShowAll(true)}>{showAll ? 'Show top 5' : 'Show All Scores'}</Button>
            </>
        )}
        </Row>
      
    </Container>
  )
}

export default LeaderBoard
