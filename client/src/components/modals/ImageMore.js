import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Col, Container, Image, Row } from "react-bootstrap";

const ImageMore = ({ show, onHide, device }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
    setTimeout(function () {
      setCopySuccess("");
    }, 3000);
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <Container className="mt-3">
          <Row style={{ borderBottom: "1px solid gray" }} className="pb-3">
            <Col>
              <Image
                width={300}
                src={process.env.REACT_APP_API_URL + device.img}
              />
            </Col>
          </Row>
          <Row style={{ borderBottom: "1px solid gray" }} className="mb-1">
            <Col>
              <label htmlFor="photgraher">Photographer</label>
            </Col>
            <Col>
              <input
                type="text"
                style={{ border: "none", outline: "none" }}
                value={device.name}
                readOnly
              />
            </Col>
          </Row>
          <Row style={{ borderBottom: "1px solid gray" }} className="mb-3">
            <Col>
              <label htmlFor="photgraher">Year of shot</label>
            </Col>
            <Col>
              <input
                type="text"
                style={{ border: "none", outline: "none" }}
                value={device.price}
                readOnly
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <a
                className="btn btn-info"
                href={process.env.REACT_APP_API_URL + device.img}
                target="_blank"
                download
              >
                Click to open in new tab
              </a>
            </Col>
            <Col>
              <label htmlFor="link">Copy link</label>
              <input
                id="link"
                style={{ border: "none", outline: "none" }}
                ref={textAreaRef}
                readOnly
                value={process.env.REACT_APP_API_URL + device.img}
              />
              {document.queryCommandSupported("copy") ? (
                <div>
                  <i
                    onClick={copyToClipboard}
                    className="fas fa-copy fa-2x my-2"
                  ></i>
                  {copySuccess}
                </div>
              ) : (
                <input value={process.env.REACT_APP_API_URL + device.img} />
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageMore;
