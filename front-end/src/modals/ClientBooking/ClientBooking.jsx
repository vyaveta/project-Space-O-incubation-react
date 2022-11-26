import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ClientBooking.css'
import countryList from 'react-select-country-list'
import React,{useState , useMemo} from 'react'
import ClientBookingForm from '../../components/ClientBookingForm/ClientBookingForm';

const ClientBooking = ({value,setAppear}) => {
    const [show, setShow] = useState(value);
    const options = useMemo(() => countryList().getData(), [])
    console.log(options[0].label)
  return (
    <div className='client-booking-modal'>
          <Modal
        show={value}
        onHide={() => setAppear(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            1 Step closer to make your dream come true!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <ClientBookingForm countries = {options} />
        </Modal.Body>
      </Modal>
    </div>
    
    
  )
}

export default ClientBooking