import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import ImageMore from "./modals/ImageMore";

const ImageItem = ({ device }) => {
  const history = useHistory();
  const [moreVisible, setMoreVisible] = useState(false);

  return (
    <>
      <Card
        className="my-3 p-3 rounded"
        onClick={() => setMoreVisible(true)}
        border={"light"}
      >
        <Image src={process.env.REACT_APP_API_URL + device.img} />
      </Card>
      <ImageMore show={moreVisible} onHide={() => setMoreVisible(false)} device={device} />
    </>
  );
};

export default ImageItem;
