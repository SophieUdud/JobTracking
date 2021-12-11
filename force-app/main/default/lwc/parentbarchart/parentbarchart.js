import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/BarChartController.getOpportunities'; //@salesforce/apex/Namespace.Classname.apexMethodReference
export default class parentbarchart extends LightningElement {
    chartConfiguration;
    @wire(getOpportunities)
    getOpportunities({ error, data }) {
        //var resumes = ["resume1","resumes2","resume4","resume5","resume6","resume7","resume8","resume9","resume10"];
        if (error) {
            this.error = error;
            this.chartConfiguration = undefined;
            console.log("error");
        } else if (data) {
          console.log("no error");
          let resumes = data.resumes;
          //let dataset = data.datasets[0];
          //console.log("dataset color: " + dataset.backgroundColor);
          let datasets_values = [];
          data.datasets.forEach(function(dataset) {
            datasets_values.push({
                label: dataset.label,
                backgroundColor: dataset.backgroundColor,
                data: dataset.data, // list of resume stage counts
            });
        });
          //console.log(error);
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