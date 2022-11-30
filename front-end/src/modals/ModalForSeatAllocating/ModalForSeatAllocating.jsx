import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalForSeatAllocating = ({show,handleClose,applications,setLockedApplication,allocateSeat}) => {

  const [selectedApplication,setSelectedApplication] = useState()

    const handleAllocate = () => {
        handleClose()
        setLockedApplication(selectedApplication)
        allocateSeat(selectedApplication)
    }

  return (
    <div>
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Applications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <select name="" id="" onChange={(e) => setSelectedApplication(e.target.value)}>
        {
            applications.map((application,index) => {
                return  <option key={index} value={application.clientEmail}
                >{application.firstName}</option>       
            })
        }
      </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAllocate}>
          Allocate
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default ModalForSeatAllocating