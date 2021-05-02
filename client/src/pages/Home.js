import React, { useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ImageItem from "../components/ImageItem";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/imageAPI";
import Pages from "../components/Pages";

const Home = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(null, null, 1, 10).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(device.selectedType.id, null, device.page, 10).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <Row>
        <h1 style={{textAlign: "center", color: "white", margin: "auto"}}>Find high quality stock images</h1>
      </Row>
      <Row>
        <TypeBar />
      </Row>

      {/* <BrandBar/> */}

      <Row>
        {device.devices.map((device) => (
          <Col key={device.id} sm={12} md={6} lg={4} xl={3}>
            <ImageItem device={device} />
          </Col>
        ))}
      </Row>
      <Pages />
    </Container>
  );
});

export default Home;
