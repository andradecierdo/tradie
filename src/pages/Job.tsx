import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Col, Container, Dropdown, Form, ListGroup, Row, Table } from 'react-bootstrap'
import { useTradieJobs } from '../context/TradieJobsContext'
import { IJob, INote, JobStatus } from '../models'
import { EditableNote } from '../components/EditableNote'
import { sortByProperty, statusColor, statusTextDisplay } from '../utilities'
import { ChangeStatusConfirmation } from '../components/ChangeStatusConfirmation'

const STATUS_OPTIONS: JobStatus[] = [
  JobStatus.Completed,
  JobStatus.Scheduled,
  JobStatus.Active,
  JobStatus.Invoicing,
  JobStatus.ToPriced,
]

export function Job() {
  const [jobNotes, setJobNotes] = useState([] as INote[])
  const [job, setJob] = useState<IJob>({} as IJob)
  const [note, setNote] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [statusToChange, setStatusToChange] = useState<JobStatus>(JobStatus.Active)

  const { getJob, getJobNotes, addNote, notes, updateNote, updateJobStatus, jobs } = useTradieJobs()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      if (!getJob(id)) {
        navigate('/jobs')
      } else {
        setJob(getJob(id)!)
        setJobNotes(getJobNotes(id))
      }
    }
  }, [id, notes, jobs])

  const addNewNote = () => {
    const newNote = {
      jobId: id!,
      content: note,
      dateCreated: new Date(),
    }
    addNote(newNote)
    setNote('')
  }

  const handleSaveNote = (noteId: string, content: string) => {
    updateNote(noteId, content)
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setNote(e.target.value)
  }

  const handleStatusChange = (status: JobStatus): void => {
    setStatusToChange(status)
    setShowConfirmation(true)
  }

  const handleCloseDialog = (): void => {
    setShowConfirmation(false)
  }

  const handleConfirmDialog = (): void => {
    setShowConfirmation(false)
    updateJobStatus(job!.id, statusToChange)
  }

  const sortedNotes = sortByProperty(jobNotes, 'dateCreated') // Set default sorting by 'dateCreated'
  const statusOptions = STATUS_OPTIONS.filter(status => status !== job?.status)

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
                <td className="flex justify-content-between">
                  <Dropdown>
                    <Dropdown.Toggle style={{ backgroundColor: statusColor(job!.status)}}>
                      { statusTextDisplay(job!.status) }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      { statusOptions.map((status, index) => {
                        return (
                          <Dropdown.Item
                            key={index}
                            onClick={() => handleStatusChange(status)}
                            style={{ backgroundColor: statusColor(status)} }>
                            { statusTextDisplay(status) }
                          </Dropdown.Item>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
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
              { sortedNotes.map((note, index) => {
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
      <ChangeStatusConfirmation
        status={statusToChange}
        show={showConfirmation}
        onCancel={handleCloseDialog}
        onConfirm={handleConfirmDialog} />
    </Container>
  )
}
