// src/components/SEOTool/SEOChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SEOChart = ({ data }) => {
    // Prepare the chart data
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'SEO Metrics',
                data: data.values,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#333', // Adjust color
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
            title: {
                display: true,
                text: 'SEO Metrics Overview',
                font: {
                    size: 16,
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Metrics',
                    color: '#333',
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.3)',
                },
                title: {
                    display: true,
                    text: 'Count',
                    color: '#333',
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px', margin: '20px 0' }}>
            <h2 style={{ textAlign: 'center', color: '#666' }}>SEO Chart</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SEOChart;