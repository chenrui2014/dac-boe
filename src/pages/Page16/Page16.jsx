import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import UploadCard from './components/UploadCard/UploadCard';

export default class Page16 extends Component {
  static displayName = 'Page16';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page16-page">
        <IceContainer title="上传作品">
          <UploadCard />
        </IceContainer>
      </div>
    );
  }
}
