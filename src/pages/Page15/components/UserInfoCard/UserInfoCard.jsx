import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Icon } from '@icedesign/base';
// import axios from 'axios';
import DataBinder from '@icedesign/data-binder';

@DataBinder({
  users:{
    url:'http://localhost:8080/user/search/findByUserName',
    method:'get',
    params:{
      userName:'chen'
    },
    responseFormatter:(responseHandler, res, originResponse) => {
      const newRes = {
        status: "SUCCESS",
        message:'SUCCESS',
        data:{
          userName:res.userName,
          password:res.password,
          email:res.email,
          nickName:res.nickName,
          regTime:res.regTime,
          hashString:res.hashString
        }
      };
      responseHandler(newRes,originResponse);
    },
    defaultBindingData:{
      userName:'',
      password:'',
      email:'',
      nickName:'',
      regTime:'',
      hashString:''
    }
  }
})

export default class UserInfoCard extends Component {
  static displayName = 'UserInfoCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    //this.state = {user:{userName:''}};
  }

  /**componentWillMount() {
    axios({
      method:'get',
      url:'http://localhost:8080/user/search/findByUserName',
      params:{
        userName:'chen'
      },
      headers: {'Content-Type': 'application/json'},
    }).then((response) => {
      const { body } = response;
      this.setState({
        user: body,
      });
    });
  }**/

  componentDidMount() {
    this.props.updateBindingData('users')
  }

  render() {
    const { users } = this.props.bindingData;
    return (
      <IceContainer>
        <div className="user-info-card" style={styles.container}>
          <Balloon
            trigger={<a style={styles.triggerText}>张三</a>}
            closable={false}
          >
            <div style={styles.content}>
              <div style={styles.head}>
                <img
                  src="https://img.alicdn.com/tfs/TB1nf.WjyqAXuNjy1XdXXaYcVXa-245-245.gif"
                  style={styles.avatar}
                  alt="头像"
                />
                <div style={styles.baseInfo}>
                  <h5 style={styles.name}>{users.userName}</h5>
                  <p style={styles.deptName}>{users.hashString}</p>
                </div>
              </div>
            </div>
          </Balloon>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    padding: '20px 0',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  head: {
    display: 'flex',
    paddingBottom: '10px',
    borderBottom: '1px dotted #eee',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50px',
    border: '1px solid #eee',
  },
  name: {
    padding: '0 10px',
    margin: 0,
  },
  deptName: {
    padding: '0 10px',
    margin: 0,
    fontSize: '12px',
  },
  body: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '10px',
  },
  profileItem: {
    width: '50%',
    lineHeight: '26px',
  },
  itemIcon: {
    color: '#8a9099',
    marginRight: '5px',
  },
  triggerText: {
    color: '#108ee9',
    borderBottom: '1px dashed #108ee9',
    cursor: 'pointer',
  },
};
