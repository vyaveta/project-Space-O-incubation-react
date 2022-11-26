import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ClientBooking.css'

import React,{useState} from 'react'
import ClientBookingForm from '../../components/ClientBookingForm/ClientBookingForm';

const ClientBooking = ({value,setAppear}) => {
    const [show, setShow] = useState(value);
  return (
    <>
      <Modal
        show={value}
        onHide={() => setAppear(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className='client-booking-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            1 Step closer to make your dream come true!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <ClientBookingForm />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ClientBooking