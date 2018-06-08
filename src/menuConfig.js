// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'http://www.boe.com/index/pi.html',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'http://www.boe.com/about/',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/',
    icon: 'home2',
  },
  {
    name: '版权登记',
    path: '/page16',
    icon: 'publish',
  },
  {
    name: '链上作品',
    path: '/page17',
    icon: 'link',
  },
  {
    name: '链上交易',
    path: '/page18',
    icon: 'rmb',
  },
  {
    name: '收益明细',
    path: '/page19',
    icon: 'redpacket',
  },
];

export { headerMenuConfig, asideMenuConfig };
