import { Outlet } from 'umi';
import styles from './index.less';
import {Menu, theme} from 'antd'
import { IconFont } from '@/components/IconFont';
const ProdLayout: React.FC = () => {
  const {token} = theme.useToken();
  return <div className={styles.prodLayout}>
    <div className={styles.header}>
      <div className={styles.headerLogo}>
      QUICK FORM
      </div>
      <div className={styles.headerMenu}>
        <div className={styles.menuTag} style={{backgroundColor: token.colorPrimary}}>
            项目
        </div>
      </div>
      <div className={styles.headerUser}>3</div>
    </div>
    <div className={styles.body}>
      <div className={styles.sidBar}>
        <Menu
          defaultSelectedKeys={['sub1']}
          mode="inline"
          items={[
            {
              key: 'sub1',
              label: '我的表单',
              icon:<IconFont name='icon-biaodan' />,
            },
          ]}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.contentMain} style={{
          borderRadius:token.borderRadius
        }}>
          <Outlet />
        </div>
        
      </div>
    </div>
   
  </div>;
};

export default ProdLayout;