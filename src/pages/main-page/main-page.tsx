import 'antd/dist/antd.css';

import { CONTENT,  SiderItems} from '@constants/index';
import { Button, Card, Grid, List, Space } from 'antd';

const { useBreakpoint } = Grid;

const MainPage: React.FC = () => {
  const { lg, md, xs } = useBreakpoint();
  return (
      <Space direction="vertical" size="middle" style={{ maxWidth: lg ? '752px' : 'auto', width: '100%' }}>
        <Space direction="vertical" size="large">

          <Card bordered={false} bodyStyle={{ paddingRight: md ? '61px' : '32px' }}>
            {CONTENT.MAIN}
          </Card>

          <Card bordered={false} bodyStyle={{ paddingRight: lg ? '61px' : '32px' }}>
            {CONTENT.SUBMAIN}
          </Card>

        </Space>
        <List
          grid={{ gutter: xs ? 6 : 16, column: 3, sm: 1, xs: 1 }}
          dataSource={SiderItems}
          renderItem={item => (
            <List.Item key={item.title}>
              <Card
                hoverable
                title={item.title}
                headStyle={{ textAlign: (lg || xs) ? 'center' : 'left', fontSize: '17px', fontWeight: 400, whiteSpace: 'nowrap' }}
                bodyStyle={{ padding: '10px 24px 13px', textAlign: 'center' }}>
                <Button type='link' icon={item.icon} href={item.path} style={{ fontSize: '15px' }}>
                  {item.action}
                </Button>
              </Card>
            </List.Item>
          )}
        />
      </Space>
  );
};

export default MainPage
