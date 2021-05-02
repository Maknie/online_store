import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { createDevice, fetchTypes } from "../../http/imageAPI";
import { observer } from "mobx-react-lite";

const CreateImage = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedType.id);
    formData.append("typeId", device.selectedType.id);
    formData.append(
      "info",
      JSON.stringify([
        {
          title: "Nice",
          description: "Image",
        },
      ])
    );
    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Deploy Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Enter name of Photographer"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Enter the year of shot"
            type="number"
          />
          <Row>
            <Col>
              <Dropdown id="dropDown" className="mt-2 mb-2">
                <Dropdown.Toggle>
                  {device.selectedType.name || "Select the category"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {device.types.map((type) => (
                    <Dropdown.Item
                      onClick={() => device.setSelectedType(type)}
                      key={type.id}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={addDevice}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateImage;
