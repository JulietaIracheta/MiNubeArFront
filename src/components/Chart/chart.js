export default function charts ({series}){
    return {
        series: [series],
        options: {
            chart: {
                height: '100%',
                type: 'radialBar',
                width: '100%'
        },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: [''],
            fill: {
                colors: ['#37a23b']
              }
              
        }
    }
};