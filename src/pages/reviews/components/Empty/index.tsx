import 'antd/dist/antd.css';

import { Card, Grid, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';
import classes from './index.module.css';
import { ButtonModal } from '@components/index';

type EmptyProps = {
    setOpenFeedModal: (openFeedModal: boolean) => void
}

const { useBreakpoint } = Grid;

const EmptyComponent: React.FC<EmptyProps> = ({ setOpenFeedModal }: EmptyProps) => {
    const { xs } = useBreakpoint();

    return (

        <Space align='center' direction="vertical" size={[0, xs ? 44 : 17]}
            className={classes.empty_modal}
        >
            <Card
                bordered={false}
                bodyStyle={{ minHeight: '245px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Meta title="Оставьте свой отзыв первым"
                    description=" Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор." />
            </Card>
            <ButtonModal
                setOpenFeedModal={setOpenFeedModal}
                dataId={'write-review'}
                style={{ width: xs ? '100%' : 'auto' }} />
        </Space>

    );
};

export default EmptyComponent