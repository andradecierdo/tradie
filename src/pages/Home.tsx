import React from 'react'
import { useTradieJobs } from '../context/TradieJobsContext'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

export function Home() {
  const { setTradie, tradies } = useTradieJobs()

  let navigate = useNavigate()
  const redirectToJobs = (tradieId: string) => {
    const currentTradie = tradies.find(tradie => tradie.id === tradieId)
    if (currentTradie) {
      setTradie(currentTradie)
      navigate('/jobs')
    }
  }

  return (
    <Container className="p-5">
      <h1 className="mb-3 text-lg-center">Tradies</h1>
      <Row className="justify-content-center text-lg-center">
        { tradies.map(tradie => (
          <Col
            className="p-2"
            lg={3}
            key={tradie.id}
            onClick={() => redirectToJobs(tradie.id)}>
            <Card>
              <Card.Body>
                <Card.Title>{ tradie.name }</Card.Title>
                <Card.Text>{ tradie.description }</Card.Text>
                <Button variant="primary">View Jobs</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
