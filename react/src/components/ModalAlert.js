import React,{useState,useEffect,useRef} from 'react'
import { Modal,Button } from 'react-bootstrap';

export default function ModalAlert(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isInitialMount = useRef(true);

    useEffect(()=>{
        if (isInitialMount.current) {
            isInitialMount.current = false;
         } else {
        handleShow()
         }
    },[props.message])
  
    return (
      <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  