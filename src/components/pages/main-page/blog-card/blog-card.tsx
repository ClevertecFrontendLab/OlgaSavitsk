import { Avatar, Box, Card, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';

import { TRUNCATE_STYLES } from '~/constants/menu.constants';

import { Blog } from '../helpers';

export const BlogCard: FC<Blog> = ({ id, avatar, username, name, content }) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const truncateStyles = useBreakpointValue({
        base: {},
        md: TRUNCATE_STYLES,
    });

    return (
        <Card
            key={id}
            borderRadius='lg'
            p={{ base: 4, md: 4, '2xl': 6 }}
            variant='outline'
            overflow='hidden'
        >
            <Flex pb={{ base: 4, md: 2, lg: 6 }}>
                <Flex flex='1' gap='4' alignItems='center'>
                    <Avatar size={{ base: 'sm', lg: 'md' }} name={username} src={avatar} />

                    <Box>
                        <Heading
                            fontSize={isMobile ? 16 : 18}
                            fontWeight={500}
                            sx={truncateStyles}
                            maxW={{ base: 'auto', md: 154, lg: 174 }}
                        >
                            {name}
                        </Heading>
                        <Text color='gray.600' fontSize={isMobile ? 12 : 14}>
                            {username}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Text noOfLines={3} fontSize={{ md: 14 }}>
                {content}
            </Text>
        </Card>
    );
};
