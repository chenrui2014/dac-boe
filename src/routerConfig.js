// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import Page15 from './pages/Page15';
import Page16 from './pages/Page16';
import Page17 from './pages/Page17';
import Page18 from './pages/Page18';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Page15,
  },
  {
    path: '/page15',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Page15,
  },
  {
    path: '/page16',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Page16,
  },
  {
    path: '/page17',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Page17,
  },
  {
    path: '/page18',
    layout: HeaderAsideFooterResponsiveLayout,
    component: Page18,
  },
  {
    path: '*',
    layout: HeaderAsideFooterResponsiveLayout,
    component: NotFound,
  },
];

export default routerConfig;
