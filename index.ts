import cors from "cors";
import express from "express";
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
import { houses, residents } from "./data";

let housesCopy = houses;
let residentsCopy = residents;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/houses", (req, res) => {
  for (let house of housesCopy) {
    house.residents = residentsCopy.filter(
      (resident) => resident.houseID === house.id
    );
  }
  res.send(housesCopy);
});

app.get("/houses/:id", (req, res) => {
  let house = housesCopy.find((house) => house.id === Number(req.params.id));
  if (house) {
    house.residents = residentsCopy.filter(
      //@ts-ignore
      (resident) => resident.houseID === house.id
    );
    res.send(house);
  } else {
    res.status(404).send({ errore: "Not Found" });
  }
});

app.get("/residents", (req, res) => {
  for (let resident of residentsCopy) {
    resident.house = housesCopy.find((house) => house.id === resident.houseID);
  }
  res.send(residentsCopy);
});

app.get("/residents/:id", (req, res) => {
  let resident = residentsCopy.find(
    (resident) => resident.id === Number(req.params.id)
  );
  if (resident) {
    //@ts-ignore
    resident.house = housesCopy.find((house) => house.id === resident.houseID);
    res.send(resident);
  } else {
    res.status(404).send({ error: "Not Found" });
  }
});

app.delete("/residents/:id", (req, res) => {
  let residente = residentsCopy.find(
    (resident) => resident.id === Number(req.params.id)
  );
  if (residente) {
    residentsCopy = residentsCopy.filter(
      (resident) => resident.id !== residente?.id
    );
    res.send(residentsCopy);
  } else {
    res.status(404).send({ error: "Not Found" });
  }
});

app.delete("/houses/:id", (req, res) => {
  let housee = housesCopy.find((house) => house.id === Number(req.params.id));
  if (housee) {
    housesCopy = housesCopy.filter((house) => house.id !== housee?.id);
    res.send(housesCopy);
  } else {
    res.status(404).send({ error: "Not Found" });
  }
});

app.post("/houses", (req, res) => {
  let newHouse = req.body;
  newHouse.id = housesCopy[housesCopy.length - 1].id + 1;
  housesCopy.push(newHouse);
  res.send(housesCopy);
});

app.post("/residents", (req, res) => {
  let newResident = req.body;
  newResident.id = residentsCopy[residentsCopy.length - 1].id + 1;
  residentsCopy.push(newResident);
  res.send(residentsCopy);
});

app.post("/houses", (req, res) => {
  housesCopy.push(req.body);
  res.send(housesCopy);
});

app.patch("/residents/:id", (req, res) => {
  let residente = residentsCopy.find(
    (resident) => resident.id === Number(req.params.id)
  );
  if (residente) {
    if (req.body.name) {
      residente.name = req.body.name;
    }
    if (req.body.age) {
      residente.age = req.body.age;
    }
    if (req.body.gender) {
      residente.gender = req.body.gender;
    }
    if (req.body.houseID) {
      residente.houseID = req.body.houseID;
    }
    res.send(residentsCopy);
  } else {
    res.send({ error: "asdsafsfaf" });
  }
});

app.patch("/houses/:id", (req, res) => {
  let housee = housesCopy.find((house) => house.id === Number(req.params.id));
  if (housee) {
    if (req.body.address) {
      housee.address = req.body.address;
    }
    if (req.body.type) {
      housee.type = req.body.type;
    }
    res.send(housesCopy);
  } else {
    res.send({ error: "asdsafsfaf" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
