import { App, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {  Outlet } from 'umi';

export default function Layout() {
  return (
    <ConfigProvider 
      locale={zhCN}
      theme={{
        cssVar:true,
        token:{
          borderRadius:4,
          colorInfo:'#722ed1',
          colorLink:'#722ed1',
          colorPrimary:'#722ed1',
          colorSuccess:'#52c41a',
          colorTextBase:'#333',
          colorWarning:'#faad14',
          fontSize:12,
          sizePopupArrow:14,
        },
        components:{
          Form:{
            itemMarginBottom:6,
          },
          Menu:{
            activeBarBorderWidth:0,
          },
          Typography:{
            titleMarginBottom:0,
            titleMarginTop:0,
          }
        }
      }}
    >
      <App>
        <Outlet />
      </App>
    </ConfigProvider>
  );
}
