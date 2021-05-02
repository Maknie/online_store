import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createType} from "../../http/imageAPI";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Enter the name of category"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>Close</Button>
                <Button variant="success" onClick={addType}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
