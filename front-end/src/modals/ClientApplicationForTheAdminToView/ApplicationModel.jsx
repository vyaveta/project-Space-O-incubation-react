import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React,{useState} from 'react'

const ApplicationModel = ({show,handleShow,handleClose,application}) => {
   
  return (
    <>
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{application.clientname}'s Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='booking-form-client'>
        <div className="booking-form-client__input-div">
            <input type="text" placeholder='First name' value={application.firstName} disabled />
            <input type="text" placeholder='Last name' value={application.lastName}  disabled/>
        </div>
        <div className="booking-form-client__input-div">
            <p></p>
            <input type="text" placeholder='State' disabled value={application.state} />
        </div>
        <div className="booking-form-client__input-div">
            <input type="number" placeholder='Contact Number' value={application.contactNumber} disabled   />
        </div>
        <div className="booking-form-client__input-div">
            <input type="text" placeholder='Enter your mail id' value={application.email} disabled   />
        </div>
        <div className="booking-form-client__input-div">
            <textarea name="" id="" cols="30" rows="10" placeholder='Tell us why do you want to Explore the Space (note: if your reason is not strong or genuine, We wont accept your request!)' 
            value={application.reason}
            disabled  ></textarea>
        </div>
        <div className="booking-form-client__input-div">
          
        </div>
        <div className="booking-form-client__input-div">
            <div className="agreement">
            <input type="checkbox" name="agreement" id="agree" value='agree' checked='true' />
            <p>Client has argreed to our policies</p>
            </div>
        </div>
        
        <div className="booking-form-client__input-div"></div>
    </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ApplicationModel