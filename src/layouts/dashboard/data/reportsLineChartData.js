import { useEffect, useState } from "react";

/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// function getData () {
//   const [data, setData] = useState([]);
//   useEffect(async ()=> {
//     let revenueByMonth = await fetch('http://127.0.0.1:8000/api/statistical/revenue-month/');
//     revenueByMonth = await revenueByMonth.json();
//     setData(carRevenueResult);
//     console.log(data);
//   },[])
// }

export default function getData () {
  const [revenueByMonth, setRevenueByMonth] = useState([]);

  useEffect(async ()=> {
    let data = await fetch('http://127.0.0.1:8000/api/statistical/revenue-month');
    data = await data.json();
    setRevenueByMonth(data);
  },[])

  const labels = revenueByMonth.map((item) => {
    let label = item.new_date
    return label
  });

  const datas = revenueByMonth.map((item) => {
    let data = item.total_pirce
    return data
  });

  return {
    sales: {
      labels,
      datasets: { label: "Doanh thu", data : datas},
    },
  }
};
