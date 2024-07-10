import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { fetchAllCheckDoanhThu, fetchAllCheckDoanhThuDetail } from '../../services/userService';
import './DoanhThu.scss'; // Import the CSS file
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, DoughnutController } from 'chart.js';


// eslint-disable-next-line no-undef
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, DoughnutController);



const DoanhThu = () => {
    const [chartData, setChartData] = useState(null);
    const [lineChartData, setLineChartData] = useState(null);
    const [doughnutChartData, setDoughnutChartData] = useState(null);
    const [timePeriod, setTimePeriod] = useState('month');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllCheckDoanhThu();
                if (response && response.DT) {
                    const processedData = processDoanhThuData(response.DT, timePeriod);
                    setChartData(processedData);
                    setLineChartData(processedData);

                    const responseDetail = await fetchAllCheckDoanhThuDetail();
                    console.log('Response from fetchAllCheckDoanhThuDetail:', responseDetail.DT); // Debug log

                    if (responseDetail && responseDetail.DT) {
                        const processedDoughnutData = processDoanhThuDetailData(responseDetail.DT);
                        console.log('Processed Doughnut Data:', processedDoughnutData); // Debug log
                        setDoughnutChartData(processedDoughnutData);
                    } else {
                        console.error('No data received from fetchAllCheckDoanhThuDetail');
                    }
                } else {
                    console.error('No data received from fetchAllCheckDoanhThu');
                }
            } catch (error) {
                console.error('Error fetching or processing data:', error);
            }
        };

        fetchData();
    }, [timePeriod]);

    const processDoanhThuData = (data, period) => {
        const timeData = {};

        data.forEach(item => {
            if (item.createdAt) {
                const date = new Date(item.createdAt);
                let timeKey;
                if (period === 'day') {
                    timeKey = date.toISOString().split('T')[0];
                } else if (period === 'month') {
                    timeKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
                } else if (period === 'year') {
                    timeKey = date.getFullYear();
                }
                if (!timeData[timeKey]) {
                    timeData[timeKey] = 0;
                }
                timeData[timeKey] += parseFloat(item.total.replace('.', ''));
            }
        });

        const labels = Object.keys(timeData);
        const totals = Object.values(timeData);

        return {
            labels,
            datasets: [
                {
                    label: 'Doanh thu',
                    data: totals,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        };
    };

    const processDoanhThuDetailData = (data) => {
        const productQuantity = {};

        data.forEach(item => {
            const productName = item.nameProduct;
            if (!productQuantity[productName]) {
                productQuantity[productName] = 0;
            }
            productQuantity[productName] += item.quantity;
        });

        const labels = Object.keys(productQuantity);
        const quantities = Object.values(productQuantity);

        return {
            labels,
            datasets: [
                {
                    label: 'Phần trăm sản phẩm bán ra',
                    data: quantities,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        };
    };

    const handleTimePeriodChange = (e) => {
        setTimePeriod(e.target.value);
    };

    const renderBarChart = () => {
        if (!chartData) {
            return <div>No data available for Bar chart</div>;
        }

        const options = {
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: `Doanh thu theo ${timePeriod}`,
                },
            },
        };

        return <Bar data={chartData} options={options} />;
    };

    const renderLineChart = () => {
        if (!lineChartData) {
            return <div>No data available for Line chart</div>;
        }

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `Doanh thu theo ${timePeriod}`,
                },
            },
        };

        return <Line data={lineChartData} options={options} />;
    };

    const renderDoughnutChart = () => {
        if (!doughnutChartData) {
            return <div>No data available for Doughnut chart</div>;
        }

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Biểu đồ Doughnut - Phần trăm sản phẩm bán ra',
                },
            },
        };

        return <Doughnut data={doughnutChartData} options={options} />;
    };

    return (
        <div className='doanhthu'>
            <div className='controls'>
                <label htmlFor="timePeriod">Chọn thời gian:</label>
                <select id="timePeriod" value={timePeriod} onChange={handleTimePeriodChange}>
                    <option value="day">Ngày</option>
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                </select>
            </div>
            <div className='charts-container'>
                <div className='chart'>
                    {renderBarChart()}
                </div>
                <div className='chart'>
                    {renderLineChart()}
                </div>
                <div className='chart'>
                    {renderDoughnutChart()}
                </div>
            </div>
        </div>
    );
};

export default DoanhThu;



// import React, { useEffect, useState } from 'react';
// import { Bar, Line, Doughnut } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
// import { fetchAllCheckDoanhThu, checkdoanhthuDetail } from '../../services/userService';
// import './DoanhThu.scss'; // Import the CSS file

// // Register the required components
// Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// const DoanhThu = () => {
//     const [chartData, setChartData] = useState(null);
//     const [lineChartData, setLineChartData] = useState(null);
//     const [timePeriod, setTimePeriod] = useState('month');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetchAllCheckDoanhThu();
//                 console.log('Fetched data:', response); // Log fetched data for debugging
//                 if (response && response.DT) {
//                     const processedData = processDoanhThuData(response.DT, timePeriod);
//                     setChartData(processedData);
//                     setLineChartData(processedData); // Use the same data for both charts
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [timePeriod]);

//     const processDoanhThuData = (data, period) => {
//         const timeData = {};

//         data.forEach(item => {
//             if (item.createdAt) { // Ensure createdAt is not null
//                 const date = new Date(item.createdAt);
//                 let timeKey;
//                 if (period === 'day') {
//                     timeKey = date.toISOString().split('T')[0]; // Get full date
//                 } else if (period === 'month') {
//                     timeKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // Get year and month
//                 } else if (period === 'year') {
//                     timeKey = date.getFullYear(); // Get year
//                 }
//                 if (!timeData[timeKey]) {
//                     timeData[timeKey] = 0;
//                 }
//                 timeData[timeKey] += parseFloat(item.total.replace('.', ''));
//             }
//         });

//         const labels = Object.keys(timeData);
//         const totals = Object.values(timeData);

//         return {
//             labels,
//             datasets: [
//                 {
//                     label: 'Doanh thu',
//                     data: totals,
//                     backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     borderWidth: 1
//                 }
//             ]
//         };
//     };

//     const handleTimePeriodChange = (e) => {
//         setTimePeriod(e.target.value);
//     };

//     const renderBarChart = () => {
//         if (!chartData) {
//             return <div>No data available</div>;
//         }

//         const chartOptions = {
//             indexAxis: 'y',
//             elements: {
//                 bar: {
//                     borderWidth: 2,
//                 }
//             },
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'right',
//                 },
//                 title: {
//                     display: true,
//                     text: `Doanh thu theo ${timePeriod}`,
//                 },
//             },
//         };

//         return <Bar data={chartData} options={chartOptions} />;
//     };

//     const renderLineChart = () => {
//         if (!lineChartData) {
//             return <div>No data available</div>;
//         }

//         const lineChartOptions = {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'top',
//                 },
//                 title: {
//                     display: true,
//                     text: `Doanh thu theo ${timePeriod}`,
//                 },
//             },
//         };

//         return <Line data={lineChartData} options={lineChartOptions} />;
//     };

//     return (
//         <div className='doanhthu'>
//             <div className='controls'>
//                 <label htmlFor="timePeriod">Chọn thời gian:</label>
//                 <select id="timePeriod" value={timePeriod} onChange={handleTimePeriodChange}>
//                     <option value="day">Ngày</option>
//                     <option value="month">Tháng</option>
//                     <option value="year">Năm</option>
//                 </select>
//             </div>
//             <div className='charts-container'>
//                 <div className='chart'>
//                     {renderBarChart()}
//                 </div>
//                 <div className='chart'>
//                     {renderLineChart()}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DoanhThu;

{/* <div className='dataCard customerCard'>
                <Line
                    data={{
                        labels: ["A", "B", "C"],
                        datasets: [
                            {
                                label: "Revenue",
                                data: [200, 300, 400],
                            },
                        ]
                    }}
                />
            </div>
            <div> <Doughnut
                data={{
                    labels: ["A", "B", "C"],
                    datasets: [
                        {
                            label: "Revenue",
                            data: [200, 300, 400],
                        },
                    ]
                }}
            /></div> */}