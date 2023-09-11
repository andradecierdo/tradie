import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

interface IEditableNote {
  id: string
  note: string
  onSave: (id: string, note: string) => void
}

export function EditableNote({ id, note, onSave }: IEditableNote) {
  const [content, setContent] = useState(note)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    onSave(id, content)
    setIsEditing(false)
  }

  const handleCancelClick = () => {
    setContent(note)
    setIsEditing(false)
  }

  return (
    <>
      <div className="flex justify-content-between">
        <Form.Control
          disabled={!isEditing}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex px-2 justify-content-between">
          { isEditing ?
            <>
              <Button
                className="mx-1"
                onClick={handleSaveClick}>
                Save
              </Button>
              <Button
                variant="secondary"
                className="mx-1"
                onClick={handleCancelClick}>
                Cancel
              </Button>
            </>
            : <Button onClick={handleEditClick}>Edit</Button>
          }
        </div>
      </div>
    </>
  )
}
