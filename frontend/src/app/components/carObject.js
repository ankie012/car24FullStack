const Cars = [
    {
      name: "Ciaz",
      brand: "Maruti",
      modelYear: 2017,
      kmDriven: 32230,
      fuel: "Petrol",
      bodyType: "Sedan",
      transmission: "Manual",
      color: "Brown",
      seats: 5,
      owners: 2,
      RTO: "MH-12",
      safety: 4.2,
      discount: "5%",
      price: 5.36 * 1_00_000,
      emi: 10479,
      image: "https://media.cars24.com/hello-ar/dev/uploads/no_bg/90e16ee8-f2b1-11ef-bd36-02ede2007fbe/67bc6f7b9e271248724c64a8/6546e1a5-4708-4664-a191-fd1f52f9cde0/slot/2-Right-Front-Diagonal.png?w=240&format=auto&dpr=2&pad=48,0,0,0&trim-color=auto",
    },
    {
      name: "Alto",
      brand: "Maruti",
      modelYear: 2013,
      kmDriven: 38210,
      fuel: "Petrol",
      bodyType: "Hatchback",
      transmission: "Manual",
      color: "White",
      seats: 5,
      owners: 2,
      RTO: "MH-12",
      safety: 3.8,
      discount: "8%",
      price: 1.83 * 1_00_000,
      emi: 6078,
      image: "https://media.cars24.com/hello-ar/dev/uploads/no_bg/75343172-e87e-11ef-bd36-02ede2007fbe/67ab539b13af3ead358dd588/a045047b-4202-48c2-9138-7ea00d941d4c/slot/10311127746-34ab1593844b45349760c3db1121ba97-Exterior-7.png?w=240&format=auto&dpr=2&pad=48,0,0,0&trim-color=auto",
    },
    {
      name: "Ameo",
      brand: "Volkswagen",
      modelYear: 2019,
      kmDriven: 98820,
      fuel: "Petrol",
      bodyType: "Sedan",
      transmission: "Manual",
      color: "Silver",
      seats: 5,
      owners: 2,
      RTO: "MH-12",
      safety: 4.5,
      discount: "10%",
      price: 3.50 * 1_00_000,
      emi: 6848,
      image: "https://media.cars24.com/hello-ar/dev/uploads/no_bg/07ae5bd2-da5a-11ef-bd36-02ede2007fbe/679397a8cc02a4e442df7297/b54d6db8-5963-488b-a504-28c533c001b5/slot/10335521747-92abd0a3d5f840df907a28f493cde6f3-Exterior-7.png?w=240&format=auto&dpr=2&pad=48,0,0,0&trim-color=auto",
    },
    {
      name: "i20",
      brand: "Hyundai",
      modelYear: 2016,
      kmDriven: 42000,
      fuel: "Petrol",
      bodyType: "Hatchback",
      transmission: "Manual",
      color: "Red",
      seats: 5,
      owners: 2,
      RTO: "MH-14",
      safety: 4.0,
      discount: "6%",
      price: 4.20 * 1_00_000,
      emi: 7800,
      image: "/images/i20.png"
    },
    {
      name: "Honda City",
      brand: "Honda",
      modelYear: 2019,
      kmDriven: 28000,
      fuel: "Petrol",
      bodyType: "Sedan",
      transmission: "Automatic",
      color: "White",
      seats: 5,
      owners: 1,
      RTO: "MH-05",
      safety: 4.6,
      discount: "5%",
      price: 8.90 * 1_00_000,
      emi: 14800,
      image: "/images/city.png"
    },
    {
        name: "Swift",
        brand: "Maruti",
        modelYear: 2018,
        kmDriven: 28000,
        fuel: "Petrol",
        bodyType: "Hatchback",
        transmission: "Manual",
        color: "Blue",
        seats: 5,
        owners: 1,
        RTO: "MH-12",
        safety: 4.0,
        discount: "7%",
        price: 5.00 * 1_00_000,
        emi: 9200,
        image: "/images/swift.png",
      },
      {
        name: "Creta",
        brand: "Hyundai",
        modelYear: 2020,
        kmDriven: 19000,
        fuel: "Diesel",
        bodyType: "SUV",
        transmission: "Automatic",
        color: "Black",
        seats: 5,
        owners: 1,
        RTO: "MH-14",
        safety: 4.7,
        discount: "6%",
        price: 11.50 * 1_00_000,
        emi: 18500,
        image: "/images/creta.png"
      },
      {
        name: "Ertiga",
        brand: "Maruti",
        modelYear: 2019,
        kmDriven: 36000,
        fuel: "Petrol",
        bodyType: "MPV",
        transmission: "Manual",
        color: "Silver",
        seats: 7,
        owners: 2,
        RTO: "MH-02",
        safety: 4.2,
        discount: "5%",
        price: 7.80 * 1_00_000,
        emi: 13200,
        image: "/images/ertiga.png"
      },
      {
        name: "Baleno",
        brand: "Maruti",
        modelYear: 2021,
        kmDriven: 15000,
        fuel: "Petrol",
        bodyType: "Hatchback",
        transmission: "Automatic",
        color: "White",
        seats: 5,
        owners: 1,
        RTO: "MH-04",
        safety: 4.4,
        discount: "7%",
        price: 6.50 * 1_00_000,
        emi: 10500,
        image: "/images/baleno.png"
      },
      {
        name: "XUV500",
        brand: "Mahindra",
        modelYear: 2018,
        kmDriven: 55000,
        fuel: "Diesel",
        bodyType: "SUV",
        transmission: "Manual",
        color: "Grey",
        seats: 7,
        owners: 2,
        RTO: "MH-03",
        safety: 4.6,
        discount: "8%",
        price: 9.90 * 1_00_000,
        emi: 16000,
        image: "/images/xuv500.png"
      },
      {
        name: "Verna",
        brand: "Hyundai",
        modelYear: 2017,
        kmDriven: 47000,
        fuel: "Petrol",
        bodyType: "Sedan",
        transmission: "Manual",
        color: "Red",
        seats: 5,
        owners: 2,
        RTO: "MH-15",
        safety: 4.3,
        discount: "6%",
        price: 6.80 * 1_00_000,
        emi: 11200,
        image: "/images/verna.png"
      },
      {
        name: "Tiago",
        brand: "Tata",
        modelYear: 2020,
        kmDriven: 25000,
        fuel: "Petrol",
        bodyType: "Hatchback",
        transmission: "Manual",
        color: "Orange",
        seats: 5,
        owners: 1,
        RTO: "MH-01",
        safety: 4.1,
        discount: "7%",
        price: 5.20 * 1_00_000,
        emi: 8600,
        image: "/images/tiago.png"
      },
      {
        name: "Ecosport",
        brand: "Ford",
        modelYear: 2018,
        kmDriven: 42000,
        fuel: "Diesel",
        bodyType: "SUV",
        transmission: "Manual",
        color: "Blue",
        seats: 5,
        owners: 2,
        RTO: "MH-06",
        safety: 4.5,
        discount: "9%",
        price: 7.50 * 1_00_000,
        emi: 12400,
        image: "/images/ecosport.png"
      },
      {
        name: "Wagon R",
        brand: "Maruti",
        modelYear: 2019,
        kmDriven: 22000,
        fuel: "Petrol",
        bodyType: "Hatchback",
        transmission: "Automatic",
        color: "Silver",
        seats: 5,
        owners: 1,
        RTO: "MH-07",
        safety: 3.9,
        discount: "6%",
        price: 4.80 * 1_00_000,
        emi: 7800,
        image: "/images/wagonr.png"
      },
      {
        name: "Innova Crysta",
        brand: "Toyota",
        modelYear: 2019,
        kmDriven: 31000,
        fuel: "Diesel",
        bodyType: "MPV",
        transmission: "Automatic",
        color: "White",
        seats: 7,
        owners: 1,
        RTO: "MH-08",
        safety: 4.8,
        discount: "5%",
        price: 15.20 * 1_00_000,
        emi: 24000,
        image: "/images/innova.png"
      }
  ];

  export default Cars;