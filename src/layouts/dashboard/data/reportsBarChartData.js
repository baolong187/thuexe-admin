import { useState, useEffect } from "react";

export default function data() {
  const [carRevenue, setRevenue] = useState([]);

  useEffect(async ()=> {
    let carRevenueResult = await fetch('http://127.0.0.1:8000/api/statistical/revenue-car');
    carRevenueResult = await carRevenueResult.json();
    setRevenue(carRevenueResult.data);
  },[])
  
  const labels = carRevenue.map((item) => {
    let label = item.car_name
    return label
  });

  const datas = carRevenue.map((item) => {
    let data = item.total_pirce
    return data
  });
  return {
    labels: labels,
    datasets: { label: "Doanh thu", data: datas },
  }
};
