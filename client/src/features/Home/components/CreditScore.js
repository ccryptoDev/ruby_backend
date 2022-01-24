import * as React from "react";
import { Col, Card } from "react-bootstrap";
import "./Home.scss";
import Chart from "react-apexcharts";

export const CreditScore = ({creditScores}) => {
  console.log('credit scord info ******* :', creditScores);
  var data = creditScores.map(cs => {
    var d = new Date(cs.date)
    return {x: d.getTime(), y: cs.score}
  })

  var series = [{
    name: "Credit Score",
    data: data
  }]

  var options = {
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
        format: 'MMM',
        showDuplicates: true,
      }
    },
    yaxis: {
      min: 550,
      max: 850,
      tickAmount: 6
    },
    colors: ['#60034C'],
    markers: {
      size: [4]
    },
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        autoScaleYaxis: false
      }
    },
    grid: {
      show: false
    },
    annotations: {
      yaxis: [{
        y: 800,
        borderColor: '#60034C',
        label: {
          show: false,
          // text: '800 Club',
          // style: {
          //   color: "#fff",
          //   background: '#60034C'
          // }
        }
      }]
    }
  }

  return (
    <div className="sectionWrapper credit-chart">
      <h4 className="sectionTitle mt-4 ml-3">Your Credit Score History:</h4>
      <Col>
        <Card className="mb-4 section">
          <Card.Body className="align-items-center">
          {series.length ? 
            <Chart
              options={options}
              series={series}
              type="line"
            />
            :
            <Col className="text-center empty-text"><a href='#credit-check-header'>Check your credit score</a>, log it above, and track it here.</Col>
          }
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
