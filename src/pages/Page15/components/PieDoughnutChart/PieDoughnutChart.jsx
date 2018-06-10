import React, { Component } from 'react';
import { Grid, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Chart, Coord, Geom, Tooltip, Axis, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import axios from 'axios/index';
import _ from 'lodash';
import { ApiHost } from '../../../../daeConfig';

const { Row, Col } = Grid;
const { DataView } = DataSet;
const userpdId = localStorage.getItem('user');
const incomeUrl1 = `${ApiHost}/userIncomesNoPage?userId=${userpdId}`;
export default class PieDoughnutChart extends Component {
  static displayName = 'PieDoughnutChart';
  constructor(props, context) {
    super(props, context);
    this.state = {
      userId:userpdId,
      data1:[{ genre: '原创', sold: 500 },
        { genre: '二次创作', sold: 200 },
        { genre: '三次创作', sold: 200 }],
      data2:[{ genre: '蒙娜丽莎的微笑', sold: 500 },
        { genre: '日出·印象', sold: 200 },
        { genre: '撑阳伞的女孩', sold: 100 },
        { genre: '最后的晚餐', sold: 70 }]
    };
  }
  componentDidMount() {
    axios.get(incomeUrl1)
      .then((response) => {
        const temp1 = response.data.filter((item) => {
          return item.paintingGenFlag === '1';
        });
        const data1Value = temp1.length > 0 ? temp1.reduce((data1Sum, item) => {
          data1Sum += item.income;
          return data1Sum;
        }, 0) : 0;
        const temp2 = response.data.filter((item) => {
          return item.paintingGenFlag === '2';
        });

        const data2Value = temp2.length > 0 ? temp2.reduce((data1Sum, item) => {
          data1Sum += item.income;
          return data1Sum;
        }, 0) : 0;
        const temp3 = response.data.filter((item) => {
          return item.paintingGenFlag === '3';
        });
        const data3Value = temp3.length > 0 ? temp3.reduce((data1Sum, item) => {
          data1Sum += item.income;
          return data1Sum;
        }, 0) : 0;
        const income = [{ genre: '原创', sold: data1Value },
          { genre: '二次创作', sold: data2Value },
          { genre: '三次创作', sold: data3Value }];
        this.setState({ data1:income });

        const temp = response.data.filter((item) => {
          return item.paintingId !== 0;
        });
        const obj = _.groupBy(temp, function(o) {
          return o.paintingId;
        });
        const tempObj = _.filter(obj, (o) => { return o.length > 0; });
        const income2 = _.flatMap(tempObj, (o) => {
          const sum = o.reduce((data1Sum, item) => {
            data1Sum += item.income;
            return data1Sum;
          }, 0);
          return { genre:o[0].paintingName, sold:sum };
        });

        this.setState({ data2:income2 });
      })
      .catch((error) => {
        Feedback.toast.success(error.message);
      });
  }

  render() {
    const { data1, data2 } = this.state;
    const dv = new DataView();
    const dv2 = new DataView();
    dv.source(data1).transform({
      type: 'percent',
      field: 'sold',
      dimension: 'genre',
      as: 'percent',
    });

    dv2.source(data2).transform({
      type: 'percent',
      field: 'sold',
      dimension: 'genre',
      as: 'percent',
    });

    const cols = {
      percent: {
        formatter: (val) => {
          val = `${(val * 100).toFixed(2)}%`;
          return val;
        },
      },
    };

    return (
      <div className="pie-doughnut-chart">
        <Row wrap gutter="20">
          <Col xxs="24" s="24" l="12">
            <IceContainer title="收益占比（按画作类型）" style={styles.leftContainer}>
              <Chart
                width={450}
                height={300}
                data={dv}
                scale={cols}
                padding={[0, 10, 30, 10]}
                forceFit
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend position="bottom" offsetY={-30} />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom type="intervalStack" position="percent" color="genre" />
              </Chart>
            </IceContainer>
          </Col>
          <Col xxs="24" s="24" l="12">
            <IceContainer title="收益占比（按画作名称）" style={styles.rightContainer}>
              <Chart
                style={styles.chart}
                width={450}
                height={300}
                data={dv2}
                scale={cols}
                padding={[0, 10, 30, 10]}
                forceFit
              >
                <Coord type="theta" radius={0.75} />
                <Axis name="percent" />
                <Legend position="bottom" offsetY={-30} />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Geom type="intervalStack" position="percent" color="genre" />
              </Chart>
            </IceContainer>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {};
