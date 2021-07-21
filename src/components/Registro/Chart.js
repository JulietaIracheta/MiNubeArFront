import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';


export default function() {
         const [meses, setMeses] = useState([]);
         const [cantidades, setCantidades] = useState([])
        const [data, setData] = useState([])
        
    useEffect( () => {
        //Get all chart details
        fetch(
            'http://localhost:60671/api/usuario/usuariosestadistica',
            {
              method: "GET",
              headers: { "Content-type": "application/json" },
              credentials: "include",
            }
          )
            .then(function (response) {
              return response.json();
            })
            .then((response) => {
                var array = []
                var array2 = []
                {response.map((x) => {
                    setMeses(x.mes)
                    setCantidades(x.cantidad)
                    array.push(x.mes)
                    
                    array2.push(x.cantidad)
                })}
                let a = array.split(',', 2)
                const data1 = {
                    labels: [a],
                    datasets: [
                      {
                        label: '# of Votes',
                        data: [array2[0],array2[1],array2[2]],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  };
                  
                  
                  setData(data1);
                })
                      
        }, []);

        const options = {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 2,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
              },
            },
          };
          return ( 
            <>
              <div className='header'>
                <h1 className='title'>Horizontal Bar Chart</h1>
                <div className='links'>
                  <a
                    className='btn btn-gh'
                    href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/HorizontalBar.js'
                  >
                    Github Source
                  </a>
                </div>
              </div>
              <Bar data={data} options={options} />
            </>
          );
          }