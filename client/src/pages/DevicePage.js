import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
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
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>Цена: {device.price} тг.</h3>
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      
      <h1>Характеристики</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Свойство</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {device.info.map((info, index) => (
            <tr key={info}>
              <td>{info.title}</td>
              <td>{info.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DevicePage;
