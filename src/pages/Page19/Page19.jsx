import React, { Component } from 'react';
import { ApiHost } from '../../daeConfig';

export default class Page19 extends Component {
  constructor(props) {
    super(props);
    //this.canvas = React.createRef();
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const cc = canvas.getContext('2d');

    const img = new Image();
    img.src = `${ApiHost}/images/44dc639387be85150e3306f21b374f0d.jpg`;
    img.onload = function () {
      cc.drawImage(img, 0, 0);
      cc.fillStyle = "red";
      cc.font = "bold 40px '华文行楷','微软雅黑'";
      cc.fillText("版权信息", 300, 500);
    };


  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width="1500" height="1000" />
      </div>
    );
  }
}
