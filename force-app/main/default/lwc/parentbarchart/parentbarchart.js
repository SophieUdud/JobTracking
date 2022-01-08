import { LightningElement, wire } from 'lwc';
import getResumeChartInfo from '@salesforce/apex/BarChartController.getResumeChartInfo'; //@salesforce/apex/Namespace.Classname.apexMethodReference
export default class parentbarchart extends LightningElement {
    chartConfiguration;
    @wire(getResumeChartInfo)
    getResumeChartInfo({ error, data }) {
        if (error) {
            this.error = error;
            this.chartConfiguration = undefined;
            console.log("error");
        } else if (data) {
          console.log("no error");
          let resumes = data.resumes;
          let datasets_values = [];
          data.datasets.forEach(function(dataset) {
            datasets_values.push({
                label: dataset.label,
                backgroundColor: dataset.backgroundColor,
                data: dataset.data, // list of resume stage counts
            });
        });
         console.log("datasets_values =>", datasets_values);
            this.chartConfiguration = {
                type: 'bar',
                //
                data: {
                    labels: resumes,
                    datasets : datasets_values
                  },
                options: {
                    tooltips: {
                      displayColors: true,
                      callbacks:{
                        mode: 'x',
                      },
                    },
                    scales: {
                      xAxes: [{
                        stacked: true,
                        gridLines: {
                          display: false,
                        }
                      }],
                      yAxes: [{
                        stacked: true,
                        ticks: {
                          beginAtZero: true,
                        },
                        type: 'linear',
                      }]
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { position: 'bottom' },
                  }
            };
            console.log('data => ', data);
            this.error = undefined;
        }
    }
}