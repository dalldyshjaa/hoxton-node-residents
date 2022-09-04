type residente = {
  id: number;
  name: string;
  age: number;
  gender: string;
  houseID: number;
  house?: housee;
};

type housee = {
  address: string;
  id: number;
  type: string;
  residents?: residente[];
};
export let houses = <housee[]>[
  {
    address: "Lypjan",
    id: 1,
    type: "flat",
  },
  {
    address: "Prishtine",
    id: 2,
    type: "house",
  },

  {
    address: "Astrazuv",
    id: 3,
    type: "farm",
  },
];

export let residents = <residente[]>[
  {
    id: 1,
    name: "Taulant",
    age: 19,
    gender: "Male",
    houseID: 1,
  },
  {
    id: 2,
    name: "Albin Kurti",
    age: 47,
    gender: "Male",
    houseID: 2,
  },

  {
    id: 3,
    name: "Enver",
    age: -9999,
    gender: "Male",
    houseID: 3,
  },
];
