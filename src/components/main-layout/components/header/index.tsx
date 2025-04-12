import {
    Avatar,
    Box,
    Flex,
    Hide,
    HStack,
    Image,
    Spacer,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import React from 'react';

import logo from '~/assets/icons/logo.svg';
import logoMobile from '~/assets/icons/logo-mobile.svg';
import avatar from '~/assets/images/avatar.png';
import { DATA_TEST_ID } from '~/constants/data-test-id';

import { StatisticsComponent } from '../aside/statistics';
import { MobileSideBar } from '../sidebar/mobile-sidebar';
import { Breadcrumbs } from './breadcrumb';
import classes from './index.module.css';

type HeaderProps = {
    collapsed: boolean;
    getCollapted: (collapsed: boolean) => void;
};

export const HeaderComponent: React.FC<HeaderProps> = () => {
    const logoSrc = useBreakpointValue({
        base: logoMobile,
        md: logo,
    });

    return (
        <Box
            className={classes.header}
            h={{ base: 16, md: 16, lg: 20 }}
            px={5}
            data-test-id={DATA_TEST_ID.header}
        >
            <Flex align='center'>
                <Image src={logoSrc} alt='logo' />
            </Flex>
            <Flex align='center' flex='1' px={{ base: 0, lg: 16 }}>
                <Hide below='md'>
                    <Breadcrumbs />
                </Hide>
                <Spacer />

                <HStack display={{ base: 'none', lg: 'flex' }}>
                    <Avatar size='m' src={avatar} />
                    <Hide below='md'>
                        <VStack alignItems='flex-start' spacing='1px' ml='2'>
                            <Text fontSize='lg' fontWeight={500}>
                                Екатерина Константинопольская
                            </Text>
                            <Text fontSize='sm' color='gray.600'>
                                @bake_and_pie
                            </Text>
                        </VStack>
                    </Hide>
                </HStack>
                <HStack px={0}>
                    <Hide above='lg'>
                        <StatisticsComponent direction='row' />
                    </Hide>
                    <MobileSideBar />
                </HStack>
            </Flex>
        </Box>
    );
};
