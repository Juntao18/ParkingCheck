var parkingData = [
    {
      id:"1",
      name: "Car Park 1",
      permit: "MU Student",
      x: 1056,
      y: 3084,
      capacity: 140,
      available: 30,
      gmaps: "https://maps.app.goo.gl/54hkpHb5stybbe969"
    },
    {
      id: 2,
      name: "Car Park 2",
      permit: "Pay and Display",
      x: 1097,
      y: 2711,
      capacity: 17,
      available: 1,
      gmaps: "https://maps.app.goo.gl/pHvRUgdXpLwS7ht28"
    },
    {
      id: 3,
      name: "Car Park 3",
      permit: "Multi-Permit",
      x: 919,
      y: 2497,
      capacity: 11,
      available: 0,
      gmaps: "https://maps.app.goo.gl/EacEkeQV5uRygj939"
    },
    {
      id: "3-1",
      name: "Car Park 3a",
      permit: "Multi-Permit",
      x: 645,
      y: 2283,
      capacity: 320,
      available: 245,
      gmaps: "https://maps.app.goo.gl/oL82tgctgm3cA6Ru7"
    },
    {
      id: "3-2",
      name: "Car Park 3a",
      permit: "EV Charge Point",
      x: 806,
      y: 2300,
      capacity: 6,
      available: 5,
      gmaps: "https://maps.app.goo.gl/oL82tgctgm3cA6Ru7"
    },
    {
      id: 4,
      name: "Car Park 4",
      permit: "Multi-Permit",
      x: 1097,
      y: 2270,
      capacity: 217,
      available: 150,
      gmaps: "https://maps.app.goo.gl/VT2spo7aBQr2nWnp6"
    },
    {
      id: "4-1",
      name: "Restricted Car Park",
      permit: "Restricted",
      x: 1266,
      y: 2266,
      capacity: 31,
      available: 28,
      gmaps: "https://maps.app.goo.gl/YjfYDQM16CzCP5CS6"
    },
    {
      id: 5,
      name: "Restricted Car Park",
      permit: "Restricted",
      x: 1431,
      y: 2244,
      capacity: 15,
      available: 15,
      gmaps: "https://maps.app.goo.gl/5ZqHcHU8dHCL9omQ6"
    },
    {
      id: "5-1",
      name: "Car Park 5a",
      permit: "Multi-Permit",
      x: 1437,
      y: 2331,
      capacity: 70,
      available: 50,
      gmaps: "https://maps.app.goo.gl/5ZqHcHU8dHCL9omQ6"
    },
    {
      id: "6-1",
      name: "Car Park 6a",
      permit: "Multi-Permit",
      x: 1405,
      y: 1857,
      capacity: 60,
      available: 10,
      gmaps: "https://maps.app.goo.gl/JQ8wnGMAe72GrhPY8"
    },
    {
      id: "6-2",
      name: "Car Park 6b",
      permit: "MU Student",
      x: 1636,
      y: 1912,
      capacity: 41,
      available: 10,
      gmaps: "https://maps.app.goo.gl/PWadJ7zpQgZARLWb8"
    },
    {
      id: "6-3",
      name: "Car Park 6b",
      permit: "MU Student",
      x: 1802,
      y: 2008,
      capacity: 9,
      available: 1,
      gmaps: "https://maps.app.goo.gl/PWadJ7zpQgZARLWb8"
    },
    {
      id: "6-4",
      name: "Car Park 6c",
      permit: "MU Student",
      x: 1970,
      y: 2376,
      capacity: 9,
      available: 1,
      gmaps: "https://maps.app.goo.gl/ifbQ2CBLKeWV78gy5"
    },
    {
      id: 8,
      name: "Car Park 8",
      permit: "MU Staff",
      x: 1869,
      y: 2413,
      capacity: 28,
      available: 5,
      gmaps: "https://maps.app.goo.gl/zGapW7rbYUcYMVVV8"
    },
    {
      id: "9-1",
      name: "Car Park 9",
      permit: "Pay and Display",
      x: 2005,
      y: 2496,
      capacity: 20,
      available: 18,
      gmaps: "https://maps.app.goo.gl/fSGKgHAt4UbDwCue8"
    },
    {
      id: "9-2",
      name: "Car Park 9",
      permit: "Car Share/Pooling",
      x: 2076,
      y: 2649,
      capacity: 12,
      available: 10,
      gmaps: "https://maps.app.goo.gl/fSGKgHAt4UbDwCue8"
    },
    {
      id: "9-3",
      name: "Car Park 9",
      permit: "Multi-Permit",
      x: 2181,
      y: 2876,
      capacity: 150,
      available: 90,
      gmaps: "https://maps.app.goo.gl/fSGKgHAt4UbDwCue8"
    },
    {
      id: 10,
      name: "Car Park 10",
      permit: "MU Staff",
      x: 1928,
      y: 2691,
      capacity: 22,
      available: 2,
      gmaps: "https://maps.app.goo.gl/eKXD5QxiSh1kSVY36"
    },
    {
      id: 11,
      name: "Car Park 11",
      permit: "MU Staff",
      x: 1831,
      y: 2732,
      capacity: 4,
      available: 0,
      gmaps: "https://maps.app.goo.gl/Pv3orxayiP1vnaSp8"
    },
    {
      id: 12,
      name: "Car Park 12",
      permit: "MU Staff",
      x: 2017,
      y: 2883,
      capacity: 38,
      available: 15,
      gmaps: "https://maps.app.goo.gl/U3CKXoXdrHHP4yWv9"
    },
    {
      id: 13,
      name: "Car Park 13",
      permit: "MU Staff",
      x: 1862,
      y: 2811,
      capacity: 16,
      available: 5,
      gmaps: "https://maps.app.goo.gl/ZvPgzsZzwKer5c6XA"
    },
    {
      id: 14,
      name: "Car Park 14",
      permit: "MU Staff",
      x: 1966,
      y: 3019,
      capacity: 100,
      available: 40,
      gmaps: "https://maps.app.goo.gl/9rj2gefWj6Y2WyzDA"
    },
    {
      id: "14-1",
      name: "Car Park 14a",
      permit: "MU Student",
      x: 1888,
      y: 3000,
      capacity: 10,
      available: 0,
      gmaps: "https://maps.app.goo.gl/9rj2gefWj6Y2WyzDA"
    },
    {
      id: 16,
      name: "Overflow Carpark A (GAA)",
      permit: "Multi-Permit",
      x: 1842,
      y: 1720,
      capacity: 50,
      available: 40,
      gmaps: "https://maps.app.goo.gl/WfGb4sCk7v3XKL34A"
    },
    {
      id: "16-1",
      name: "Overflow Carpark B (GAA)",
      permit: "Multi-Permit",
      x: 1825,
      y: 631,
      capacity: 200,
      available: 180,
      gmaps: "https://maps.app.goo.gl/MNXqudKWppU6WjdQ8"
    },
    {
      id: 17,
      name: "Car Park South Campus",
      permit: "Pay and Display",
      x: 2539,
      y: 3745,
      capacity: 24,
      available: 15,
      gmaps: "https://maps.app.goo.gl/96UmjEeke7qfdYjr9"
    },
    {
      id: 18,
      name: "Car Park South Campus",
      permit: "MU Staff",
      x: 2560,
      y: 3882,
      capacity: 27,
      available: 19,
      gmaps: "https://maps.app.goo.gl/exsVDyopKMC5pwJ29"
    },
    {
      id: 19,
      name: "Car Park South Campus",
      permit: "MU Staff",
      x: 2430,
      y: 3843,
      capacity: 33,
      available: 10,
      gmaps: "https://maps.app.goo.gl/n47nBA7deUoaD88E7"
    },
    {
      id: 20,
      name: "Car Park South Campus",
      permit: "MU Student",
      x: 2414,
      y: 4107,
      capacity: 46,
      available: 30,
      gmaps: "https://maps.app.goo.gl/7aoiWbdGtAG5dT6y8"
    },
    {
      id: 21,
      name: "Car Park South Campus",
      permit: "Multi-Permit",
      x: 2242,
      y: 4312,
      capacity: 20,
      available: 15,
      gmaps: "https://maps.app.goo.gl/TyyDhywB821bzos5A"
    },
    {
      id: 22,
      name: "Car Park South Campus",
      permit: "MU Staff",
      x: 2224,
      y: 4217,
      capacity: 42,
      available: 28,
      gmaps: "https://maps.app.goo.gl/ARdNjTYrdaDuxmt3A"
    },
    {
      id: 23,
      name: "Car Park South Campus",
      permit: "MU Staff",
      x: 2115,
      y: 4055,
      capacity: 12,
      available: 10,
      gmaps: "https://maps.app.goo.gl/zTRALfvhcQsDNXYk9"
    },
    {
      id: 24,
      name: "Car Park South Campus",
      permit: "Multi-Permit",
      x: 1978,
      y: 4138,
      capacity: 20,
      available: 5,
      gmaps: "https://maps.app.goo.gl/3dD5o59ac5udTz3V8"
    },
    {
      id: 25,
      name: "Car Park South Campus",
      permit: "Restricted",
      x: 1690,
      y: 4000,
      capacity: 100,
      available: 80,
      gmaps: "https://maps.app.goo.gl/MwbNkYYCUvEYhf8y9"
    },
    {
      id: 26,
      name: "Car Park South Campus",
      permit: "MU Student",
      x: 2037,
      y: 3647,
      capacity: 43,
      available: 10,
      gmaps: "https://maps.app.goo.gl/8zyN5sqy2Lm761mR6"
    },
    {
      id: 27,
      name: "Car Park South Campus",
      permit: "MU Staff",
      x: 2071,
      y: 3533,
      capacity: 18,
      available: 5,
      gmaps: "https://maps.app.goo.gl/8zyN5sqy2Lm761mR6"
    },
    {
      id: 28,
      name: "Car Park South Campus",
      permit: "Restricted",
      x: 2152,
      y: 3658,
      capacity: 10,
      available: 8,
      gmaps: "https://maps.app.goo.gl/6R3LpDoFQm5vxfcm9"
    },
    {
      id: 29,
      name: "Car Park South Campus",
      permit: "EV Charge Point",
      x: 2214,
      y: 3532,
      capacity: 4,
      available: 3,
      gmaps: "https://maps.app.goo.gl/8sx3YxTDP3XT1yj36"
    },
    {
      id: 30,
      name: "Car Park South Campus",
      permit: "Restricted",
      x: 1708,
      y: 3600,
      capacity: 65,
      available: 50,
      gmaps: "https://maps.app.goo.gl/tF8bDDKLRn8kC4Zp9"
    },
    {
      id: 31,
      name: "Car Park South Campus",
      permit: "Restricted",
      x: 1525,
      y: 3499,
      capacity: 77,
      available: 50,
      gmaps: "https://maps.app.goo.gl/YcJSRH7me2FdkKbm9"
    },
    {
      id: 32,
      name: "Car Park South Campus",
      permit: "Multi-Permit",
      x: 1525,
      y: 3329,
      capacity: 50,
      available: 20,
      gmaps: "https://maps.app.goo.gl/v3wzM9FumdqHPpmv8"
    },
    {
      id: 33,
      name: "Car Park South Campus",
      permit: "Multi-Permit",
      x: 1195,
      y: 3371,
      capacity: 155,
      available: 55,
      gmaps: "https://maps.app.goo.gl/s2b92TtjdDhYusqR6"
    }
  ];
  /*******************************/
