import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    Show,
    Spacer,
    Stack,
    useBreakpointValue,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router';

import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { DishCard } from '~/components/dish-card/dish-card';
import { BlogCard } from '~/components/pages/main-page/blog-card/blog-card';
import { Slider } from '~/components/pages/main-page/slider/slider';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { RoutePath } from '~/constants/routes.constants';
import { HeaderPage } from '~/shared/components/header-page';
import { Blog } from '~/shared/types/page-config.types';

import { additionalInfo, blogPosts, recipies, sliders } from './helpers';

export const MainPage = () => {
    const navigate = useNavigate();
    const titleSize = useBreakpointValue({ base: 'lg', md: 'md', lg: 'xl', '2xl': '2xl' });
    const titleBlog = useBreakpointValue({ base: 'lg', md: 'md', lg: 'lg', '2xl': 'xl' });
    const isMobile = useBreakpointValue({ base: true, lg: false });

    return (
        <>
            <HeaderPage title='Приятного аппетита!' />

            <Box position='relative' pt={{ base: 0, lg: 6 }}>
                <Slider sliders={sliders} />
            </Box>

            <HStack pt={{ base: 8, lg: 10 }} flexWrap='wrap' justify='center'>
                <Heading
                    as='h2'
                    size={titleSize}
                    pb={{ base: 1, md: 2, lg: 4, '2xl': 6 }}
                    letterSpacing={{ base: 0, md: 1.2 }}
                >
                    Самое сочное
                </Heading>
                <Spacer />
                <Show above='lg'>
                    <Button
                        display={isMobile ? 'none' : 'flex'}
                        size={{ base: 'md', lg: 'md', '2xl': 'lg' }}
                        rightIcon={<ArrowForwardIcon />}
                        bg='lime.400'
                        onClick={() => navigate(RoutePath.delicious)}
                        data-test-id={DATA_TEST_ID.juiciestLink}
                    >
                        Вся подборка
                    </Button>
                </Show>
                <Flex flexDirection='row' flexWrap='wrap' gap={{ base: 3, md: 4, lg: 4, '2xl': 6 }}>
                    {recipies.map((recipe, index) => (
                        <Fragment key={index}>
                            <DishCard {...recipe} />
                        </Fragment>
                    ))}
                </Flex>
                <Button
                    display={isMobile ? 'flex' : 'none'}
                    size={{ base: 'md', lg: 'md', '2xl': 'lg' }}
                    rightIcon={<ArrowForwardIcon />}
                    bg='lime.400'
                    onClick={() => navigate(RoutePath.delicious)}
                    data-test-id={DATA_TEST_ID.juiciestLinkMobile}
                >
                    Вся подборка
                </Button>
            </HStack>

            <Box pt={isMobile ? 8 : 10}>
                <HStack
                    bg='lime.300'
                    px={{ base: 3, md: 3, lg: 6 }}
                    py={{ base: 3, md: 3, lg: 4 }}
                    borderRadius={16}
                    flexWrap='wrap'
                    justify='center'
                >
                    <Heading
                        as='h2'
                        size={titleBlog}
                        pb={{ base: 2, lg: 6 }}
                        fontWeight={500}
                        letterSpacing={{ base: 0, md: 1.2 }}
                    >
                        Кулинарные блоги
                    </Heading>
                    <Spacer />
                    <Box order={{ base: 2, md: 2, lg: 0, '2xl': 0 }}>
                        <Button size='lg' rightIcon={<ArrowForwardIcon />} variant='ghost'>
                            Все авторы
                        </Button>
                    </Box>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        spacing={isMobile ? 3 : 4}
                        align='stretch'
                    >
                        {blogPosts.map((blog: Blog) => (
                            <BlogCard {...blog} />
                        ))}
                    </Stack>
                </HStack>
            </Box>

            <Box pt={{ base: 8, lg: 10 }}>
                <Divider pb={{ md: 2 }} />
                <AdditionalBlock
                    title='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
                    recipes={additionalInfo}
                />
            </Box>
        </>
    );
};
