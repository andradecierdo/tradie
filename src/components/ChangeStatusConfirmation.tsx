import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { JobStatus } from '../models'
import { statusColor, statusTextDisplay } from '../utilities'

interface IChangeStatusModal {
  status: JobStatus
  show: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function ChangeStatusConfirmation({ status, show, onCancel, onConfirm }: IChangeStatusModal) {
  return (
    <Modal show={show} animation={false} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Change Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to change status to
        <span className="p-1 ml-1 rounded-1" style={{ backgroundColor: statusColor(status)}}>
          { statusTextDisplay(status)}
        </span>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
