import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Spacer, Stack, useBreakpointValue } from '@chakra-ui/react';

import { BlogCard } from '~/components/blog-card/blog-card';

import { blogPosts } from '../helpers';

export const BlogSection = () => {
    const responsive = {
        titleBlog: useBreakpointValue({ base: 'lg', md: 'md', lg: 'lg', '2xl': 'xl' }),
        isMobile: useBreakpointValue({ base: true, lg: false }),
    };

    return (
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
                size={responsive.titleBlog}
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
                spacing={responsive.isMobile ? 3 : 4}
                align='stretch'
            >
                {blogPosts.map((blog) => (
                    <BlogCard key={`blog-${blog.id}`} {...blog} />
                ))}
            </Stack>
        </HStack>
    );
};
