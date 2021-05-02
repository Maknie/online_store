import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {Card, Row} from "react-bootstrap";

const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.types.map((type) => (
        <Card
          style={{ cursor: "pointer" }}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          className="py-2 px-4 mx-2"
          key={type.id}
          border={type.id === device.selectedType.id ? "info" : "light"}
        >
          {type.name}
        </Card>
      ))}
    </Row>
  );
});

export default TypeBar;
