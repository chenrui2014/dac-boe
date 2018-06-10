import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import axios from 'axios/index';


import { ApiHost } from '../../../../daeConfig';

const { Row, Col } = Grid;
const bciUrl = `${ApiHost}/bci`;

export default class RealTimeStatistics extends Component {
  static displayName = 'RealTimeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      height:0,
      currentBlockHash:'',
      previousBlockHash:'',
      endorser:''
    };
  }

  componentDidMount() {
    setInterval(() => {
      axios.get(bciUrl)
        .then((response) => {
          const data = response.data;
          this.setState({
            height:data.height,
            currentBlockHash:data.currentBlockHash,
            previousBlockHash:data.previousBlockHash,
            endorser:data.endorser
          });
        });
    }, 5000);
  }

  render() {
    return (
      <div className="real-time-statistics">
        <Row wrap gutter="20" style={styles.items}>
          <Col xxs="24" s="12" l="8">
            <div style={{ ...styles.itemBody, ...styles.green }}>
              <div style={styles.itemTitle}>
                <p style={styles.titleText}>当前区块高度</p>
                <span style={styles.tag}>实时</span>
              </div>
              <div style={styles.itemContent}>
                <h2 style={styles.itemNum}>{this.state.height}</h2>
                <label style={styles.itemBC}>{`当前区块：${this.state.currentBlockHash}`}</label><br />
                <label style={styles.itemBC}>{`上一区块：${this.state.previousBlockHash}`}</label>
              </div>
            </div>
          </Col>
          <Col xxs="24" s="12" l="8">
            <div style={{ ...styles.itemBody, ...styles.lightBlue }}>
              <div style={styles.itemTitle}>
                <p style={styles.titleText}>总交易数</p>
                <span style={styles.tag}>实时</span>
              </div>
              <div style={styles.itemContent}>
                <h2 style={styles.itemNum}>31</h2>
              </div>
            </div>
          </Col>
          <Col xxs="24" s="12" l="8">
            <div style={{ ...styles.itemBody, ...styles.darkBlue }}>
              <div style={styles.itemTitle}>
                <p style={styles.titleText}>节点数</p>
                <span style={styles.tag}>实时</span>
              </div>
              <div style={styles.itemContent}>
                <h2 style={styles.itemNum}>6</h2>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const styles = {
  item: {
    marginBottom: '20px',
  },
  itemBody: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '4px',
    color: '#fff',
    height: '158px',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    position: 'relative',
  },
  titleText: {
    margin: 0,
    fontSize: '14px',
  },
  tag: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
  itemNum: {
    margin: '16px 0',
    fontSize: '32px',
  },
  itemBC: {
    margin: '10px 0',
    fontSize: '10px',
  },
  total: {
    margin: 0,
    fontSize: '12px',
  },
  desc: {
    margin: 0,
    fontSize: '12px',
  },
  green: {
    background: '#31B48D',
  },
  lightBlue: {
    background: '#38A1F2',
  },
  darkBlue: {
    background: '#7538C7',
  },
  navyBlue: {
    background: '#3B67A4',
  },
};
