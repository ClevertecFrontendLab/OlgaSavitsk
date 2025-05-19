import { Box, Flex, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import logo from '~/assets/icons/logo.svg';
import loginBanner from '~/assets/images/loginbanner.png';

import { AuthTabs } from './components/auth-tabs';

export const UnauthorizedLayout = () => (
    <Flex height='100vh'>
        <Box
            width={{ base: '100%', md: '50%' }}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap={{ base: 10, md: 14, lg: 20 }}
            bgGradient='linear(to-r, #29813F, #EAFFC7)'
        >
            <Flex align='center'>
                <Image src={logo} alt='logo' w={{ base: 158, lg: 270 }} />
            </Flex>
            <AuthTabs activeTab='signin' />
            <Outlet />
        </Box>

        <Box
            width={{ base: '100%', md: '50%' }}
            backgroundImage={`url(${loginBanner})`}
            backgroundSize='cover'
            backgroundPosition='center'
        />
    </Flex>
);
