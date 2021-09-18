import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/BarChartController.getOpportunities'; //@salesforce/apex/Namespace.Classname.apexMethodReference
export default class parentbarchart extends LightningElement {
    chartConfiguration;
    @wire(getOpportunities)
    getOpportunities({ error, data }) {
        var resumes = ["resume1","resumes2","resume4","resume5","resume6","resume7","resume8","resume9","resume10"];
        if (error) {
            this.error = error;
            this.chartConfiguration = undefined;
        } else if (data) {
            let chartAmtData = [];
            let chartRevData = [];
            let chartLabel = [];
            data.forEach(opp => {
                chartAmtData.push(opp.amount);
                chartRevData.push(opp.expectRevenue);
                chartLabel.push(opp.stage);
            });
            this.chartConfiguration = {
                type: 'bar',
                // data: {
                //     datasets: [{
                //         label: 'Stage1',
                //         backgroundColor: "green",
                //         data: [5, 3, 2],
                //         //data: chartAmtData,
                //     },{
                //         label: 'Stage2',
                //         backgroundColor: "orange",
                //         data: [1, 2, 3],
                //         //data: chartRevData,
                //     },],
                //     labels: chartLabel,
                // },
                // options: {
               
                // },
                data: {
                    labels: resumes,
                    datasets: [{
                      label: 'Send Application',
                      backgroundColor: "#caf270",
                      data: [12, 59, 5, 56, 58,12, 59, 87, 45],
                    }, {
                      label: 'Recruiters',
                      backgroundColor: "#45c490",
                      data: [12, 59, 5, 56, 58,12, 59, 85, 23],
                    }, {
                      label: 'Hiring Manager',
                      backgroundColor: "#008d93",
                      data: [12, 59, 5, 56, 58,12, 59, 65, 51],
                    }, {
                        label: 'Technical/Cultural',
                        backgroundColor: "#008d93",
                        data: [12, 59, 5, 56, 58,12, 59, 65, 51],
                      }, {
                        label: 'Offer',
                        backgroundColor: "#008d93",
                        data: [12, 59, 5, 56, 58,12, 59, 65, 51],
                      }, {                                             
                      label: 'Background Check',
                      backgroundColor: "#2e5468",
                      data: [12, 59, 5, 56, 58, 12, 59, 12, 74],
                    }],
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