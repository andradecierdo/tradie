import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Col, Container, Form, ListGroup, Row, Table} from 'react-bootstrap'
import { useTradieJobs } from '../context/TradieJobsContext'
import { IJob, INote} from '../models'
import { EditableNote } from '../components/EditableNote'
import { sortByProperty, statusColor, statusTextDisplay } from '../utilities'

export function Job() {
  const [jobNotes, setJobNotes] = useState([] as INote[])
  const [job, setJob] = useState({} as IJob | null)
  const [note, setNote] = useState('')

  const { getJob, getNotesByJob, addNote, notes, setNotes, tradie } = useTradieJobs()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      setJob(getJob(id))
      setJobNotes(getNotesByJob(id))
    }
  }, [id, notes])

  if (!job || job.tradieId !== tradie.id) {
    navigate('/jobs')
  }

  const addNewNote = () => {
    const newNote = {
      jobId: id!,
      content: note,
      dateCreated: new Date(),
    }
    addNote(newNote)
    setNote('')
  }

  const handleSaveNote = (noteId: string, newContent: string) => {
    const updatedNotes = notes.map(note => {
      return note.id === noteId ? { ...note, content: newContent } : note
    })
    setNotes(updatedNotes)
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setNote(e.target.value)
  }

  const sortedNotes = sortByProperty(jobNotes, 'dateCreated')

  return (
    <Container className="p-5">
      <h1 className="mb-3 text-lg-center">Job Details</h1>
      <Container>
        <Row>
          <Col>
            <Table>
              <tbody>
              <tr>
                <td className="bg-body-secondary">Status</td>
                <td style={{ backgroundColor: statusColor(job!.status)} }>
                  { statusTextDisplay(job!.status) }
                </td>
              </tr>
              <tr>
                <td className="bg-body-secondary">Date Created</td>
                <td>{ job!.dateCreated?.toLocaleString() }</td>
              </tr>
              <tr>
                <td className="bg-body-secondary">Description</td>
                <td>{ job!.description }</td>
              </tr>
              </tbody>
            </Table>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>Customer Details</Card.Title>
                <Card.Body className="p-2">
                  <div>{ job!.customer?.firstName} {job?.customer?.lastName}</div>
                  <div>{ job!.customer?.address }</div>
                  <div>{ job!.customer?.phoneNumber }</div>
                </Card.Body>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col>
          <Container>
            <h5>Notes</h5>
            <ListGroup>
              {sortedNotes.map((note, index) => {
                return (
                  <ListGroup.Item key={index}>
                    <EditableNote
                      id={note.id}
                      note={note.content}
                      onSave={handleSaveNote}/>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Container>
        </Col>
        <Col>
          <Container>
            <Form.Label htmlFor="noteInput">New Note</Form.Label>
            <Form.Control
              type="text"
              id="noteInput"
              placeholder="Enter Note"
              value={note}
              onChange={handleNoteChange}
            />
            <Button
              className="mt-2 float-lg-end"
              variant="primary"
              disabled={note === ''}
              onClick={() => addNewNote()}>
              Add note
            </Button>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}
