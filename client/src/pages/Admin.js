import React, { useState, useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Bar } from "react-chartjs-2";
import { $host } from "../http/index";

const Admin = observer(() => {
  const { device } = useContext(Context);

  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  const [deviceNames, setDeviceNames] = useState([]);
  const [devicePrices, setDevicePrices] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(async () => {
    const {data} = await $host.get('api/device', {params: {
        typeId: null, brandId: null, page: 1, limit: 9999
    }})
    setDevices(data.rows)
  }, []);

  useEffect(async () => {
    let tempDeviceNames = [];
    let tempDevicePrices = [];
    console.log(devices);
    for (let i = 0; i < devices.length; i++) {
      tempDeviceNames.push(devices[i].name);
      tempDevicePrices.push(devices[i].price);
    }
    setDeviceNames(tempDeviceNames)
    setDevicePrices(tempDevicePrices)
  }, [devices]);


  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Добавить устройство
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <Bar
        data={{
          labels: deviceNames,
          datasets: [
            {
              label: "Цены на продукты",
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
              data: devicePrices,
            },
          ],
        }}

      />
    </Container>
  );
});

export default Admin;
