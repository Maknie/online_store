import React, { useState, useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Pie } from "react-chartjs-2";
import { $host } from "../http/index";

const Admin = observer(() => {
  const { device } = useContext(Context);

  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  const [deviceCats, setDeviceCats] = useState([]);
  const [devicePrices, setDevicePrices] = useState([]);
  const [images, setImages] = useState([]);
  const [imageCatCount, setImageCatCount] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const { data } = await $host.get("api/type");
    setCategories(data);
  }, []);

  useEffect(async () => {
    let tempDeviceCats = [];
    let tempDevicePrices = [];
    let tempImageCatCount = [];
    for (let i = 0; i < categories.length; i++) {
      tempDeviceCats.push(categories[i].name);
      let tempCatId = categories[i].id;
      const { data } = await $host.get("api/device", {
        params: {
          typeId: tempCatId,
          page: 1,
          limit: 99,
        },
      });
      tempImageCatCount.push(data.rows.length);
    }
    setImageCatCount(tempImageCatCount);
    setDeviceCats(tempDeviceCats);
    setDevicePrices(tempDevicePrices);
  }, [categories]);

  useEffect(async () => {
    console.log(imageCatCount);
    console.log(categories);
  }, [imageCatCount, categories]);

  return (
    <Container className="d-flex flex-column">
      <div className="d-flex flex-row-reverse">
        <Button
          variant={"light"}
          className="mt-4 mx-3 p-2"
          onClick={() => setTypeVisible(true)}
        >
          Add Category
        </Button>

        <Button
          variant={"light"}
          className="mt-4 mx-3 p-2"
          onClick={() => setDeviceVisible(true)}
        >
          Deploy Image
        </Button>
      </div>

      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <div className=" my-3 py-3 lightBg">
        <Pie
          data={{
            labels: deviceCats,
            datasets: [
              {
                label: "Images per year",
                backgroundColor: [
                  "#B21F00",
                  "#C9DE00",
                  "#2FDE00",
                  "#00A6B4",
                  "#6800B4",
                ],
                hoverBackgroundColor: [
                  "#501800",
                  "#4B5000",
                  "#175000",
                  "#003350",
                  "#35014F",
                ],
                borderWidth: 0,
                data: imageCatCount,
              },
            ],
          }}
        />
      </div>
    </Container>
  );
});

export default Admin;
