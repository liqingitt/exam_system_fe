import { IconFont } from '@/components/IconFont';
import yayJpg from '../assets/yay.jpg';
import { Button, Input } from 'antd';

export default function HomePage() {
  return (
    <div>
      <Button type="primary">
        <IconFont name="icon-biaodan"></IconFont>
        按钮
      </Button>
      <Input></Input>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
