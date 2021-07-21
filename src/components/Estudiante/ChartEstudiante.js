import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const ChartEstudainte = ({porcentaje}) => {

    const chart = (
            {
                series: [porcentaje],
                options: {
                    chart: {
                        height: '50%',
                        type: 'radialBar',
                    },
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                size: '60%',
                                }
                            },
                    },
                    labels: [''],
                    fill: {
                        colors: ['#b61915']
                    }
                 }     
            })

    return (
        <>
            <ReactApexChart 
                options={chart.options}
                series={chart.series}
                type="radialBar"
            />
        </>
    )
}