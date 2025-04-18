import { Box, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { HeaderComponent } from '..';
import { Aside } from './components/aside/aside';
import { FooterComponent } from './components/footer/footer';
import { SideBar } from './components/sidebar/sidebar';

export const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const maxW = useBreakpointValue({
        '2xl': '1408px',
        lg: '928px',
        md: '768px',
        sm: '640px',
        base: '360px',
    });

    const templateAreas = isMobile
        ? `"header"
        "main"
        "footer"`
        : `"header header header"
        "nav main aside"
        "nav footer aside"`;

    const templateRows = '80px 1fr 84px';
    const templateColumns = isMobile ? '1fr' : '256px 1fr 208px';

    return (
        <Grid
            templateAreas={templateAreas}
            gridTemplateRows={templateRows}
            gridTemplateColumns={templateColumns}
        >
            <GridItem area='header'>
                <HeaderComponent collapsed={collapsed} getCollapted={setCollapsed} />
            </GridItem>
            <GridItem area='nav'>
                <SideBar />
            </GridItem>
            <GridItem area='main' maxW={{ lg: '1408px' }} w='full'>
                <Box px={{ base: 4, md: 5, '2xl': 6 }} pt={{ base: 0, lg: 8 }} maxW={maxW}>
                    <Outlet />
                </Box>
            </GridItem>
            <GridItem area='aside'>
                <Aside />
            </GridItem>
            <GridItem area='footer'>
                <FooterComponent />
            </GridItem>
        </Grid>
    );
};
