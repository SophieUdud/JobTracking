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
                        backgroundColor: "#de425b",
                        data: [10, 20, 15, 10, 12, 15, 10, 10, 15],
                    }, {
                        label: 'Recruiters',
                        backgroundColor: "#f58055",
                        data: [8, 18, 13, 8, 10, 13, 8, 8, 13],
                    }, {
                        label: 'Hiring Manager',
                        backgroundColor: "#feba65",
                        data: [6, 16, 11, 6, 9, 12, 5, 7, 10],
                    }, {
                        label: 'Technical/Cultural',
                        backgroundColor: "#fff18f",
                        data: [4, 14, 9, 5, 8, 10, 4, 6, 9],
                      }, {
                        label: 'Offer',
                        backgroundColor: "#afd07c",
                        data: [3, 2, 1, 4, 7, 9, 3, 5, 8],
                      }, {                                             
                      label: 'Background Check',
                      backgroundColor: "#64ad73",
                      data: [2, 1, 0, 2, 5, 7, 2, 1, 0],
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