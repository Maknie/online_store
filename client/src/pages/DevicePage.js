import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col>
          <a className="btn btn-info" href={process.env.REACT_APP_API_URL + device.img} target="_blank" download>Click to open in new tab</a>
        </Col>
      </Row>
    </Container>
  );
};

export default DevicePage;
