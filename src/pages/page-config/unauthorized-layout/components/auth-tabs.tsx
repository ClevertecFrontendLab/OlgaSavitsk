import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';

export const AuthTabs = ({ activeTab }: { activeTab: 'signin' | 'signup' }) => {
    const location = useLocation();

    return (
        <Tabs colorScheme='lime' index={activeTab === 'signin' ? 0 : 1}>
            <TabList
                w={{ base: 'full', md: 355, lg: 450, '2xl': 460 }}
                borderColor='blackAlpha.200'
            >
                <Tab
                    as={Link}
                    to={RoutePath.signin}
                    state={{ from: location.state?.from }}
                    whiteSpace='nowrap'
                    fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}
                    color='lime.800'
                    sx={{ marginBottom: 0 }}
                    _focus={{ boxShadow: 'none' }}
                >
                    Вход на сайт
                </Tab>
                <Tab
                    as={Link}
                    to={RoutePath.signup}
                    state={{ from: location.state?.from }}
                    whiteSpace='nowrap'
                    fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}
                    color='lime.800'
                    sx={{ marginBottom: 0 }}
                    _focus={{ boxShadow: 'none' }}
                >
                    Регистрация
                </Tab>
            </TabList>
        </Tabs>
    );
};
