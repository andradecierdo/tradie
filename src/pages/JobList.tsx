import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row, Form, Table, Button } from 'react-bootstrap'
import { SortDown, SortUp } from 'react-bootstrap-icons'
import { useTradieJobs } from '../context/TradieJobsContext'
import { sortByProperty, statusColor, statusTextDisplay } from '../utilities'
import { IJob } from '../models'

interface ITableColumnSort {
  label: string
  property: string
  sortable: boolean
}

const tableColumns: ITableColumnSort[] = [
  {
    label: 'Date Created',
    property: 'dateCreated',
    sortable: true,
  },
  {
    label: 'Description',
    property: 'description',
    sortable: true,
  },
  {
    label: 'Status',
    property: 'status',
    sortable: true,
  },
  {
    label: '',
    property: '',
    sortable: false,
  }
]

export function JobList() {
  const [tradieJobs, setTradieJobs] = useState([] as IJob[])
  const [searchKey, setSearchKey] = useState('')
  const [sortProperty, setSortProperty] = useState('dateCreated')
  const [sortOrder, setSortOrder] = useState(0)
  const { tradie, jobs } = useTradieJobs()

  const navigate = useNavigate()
  if (!tradie?.id) {
    navigate('/')
  }

  useEffect(() => {
    setTradieJobs(jobs.filter(job => job.tradieId === tradie.id))
  }, [tradie])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setSearchKey(e.target.value)
  }

  const handleTableSort = (column: ITableColumnSort): void => {
    if (column.sortable) {
      setSortOrder((prevSortOrder: number) => {
        if (sortProperty === column.property) {
          return prevSortOrder === 1 ? 0 : 1
        }
        return 0
      })
      setSortProperty(column.property)
    }
  }

  const redirectToJobDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`)
  }

  const filteredJobs = tradieJobs.filter(job => {
    return job.description.toLowerCase().includes(searchKey.toLowerCase())
  })

  const sortedJobs = sortByProperty(filteredJobs, sortProperty, sortOrder === 0)

  const sortIcon = (property: string) => {
    return property === sortProperty ? sortOrder === 0 ? <SortDown /> : <SortUp /> : ''
  }

  return (
    <Container className="p-5">
      <h1 className="mb-3 text-lg-center">Jobs</h1>
      <Row className="mb-2">
        <Col lg={3}>
          <Form.Label htmlFor="searchInput">Search</Form.Label>
          <Form.Control
            type="text"
            id="searchInput"
            placeholder="Enter description"
            value={searchKey}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
      <Table bordered hover striped>
        <thead>
        <tr>
          {tableColumns.map((column, index) => {
            return (
              <th key={index} onClick={() => handleTableSort(column)}>
                { column.label }
                <span className="float-end">
                  { sortIcon(column.property) }
                </span>
              </th>
            )
          })}
        </tr>
        </thead>
        <tbody>
          {sortedJobs.map((job, index) => {
            return (
              <tr key={index}>
                <td>{ job.dateCreated.toLocaleDateString() }</td>
                <td>{ job.description }</td>
                <td style={{ backgroundColor: statusColor(job.status)} }>
                  { statusTextDisplay(job.status) }
                </td>
                <td className="text-lg-center">
                  <Button
                    variant="secondary"
                    onClick={() => redirectToJobDetails(job.id)}>
                    View Details
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}
