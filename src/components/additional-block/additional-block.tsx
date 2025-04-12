import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { FC } from 'react';

import heartIcon from '~/assets/icons/heart.svg';
import peopleIcon from '~/assets/icons/hearteyes.svg';
import { Category, categoryMap } from '~/constants/menu.constants';

import { IconCounter } from '../count-icon/count-icon';
import { CustomIcon } from '../custom-icon/custom-icon';
import { CustomTag } from '../custom-tag/custom-tag';

type RecipiesInfo = {
    recipies: Array<{
        title: string;
        content: string;
        favorites: number;
        likes: number;
        category: string;
    }>;
    additionalRecipes: Array<{ title: string; category: string }>;
};

type AdditionalBlockProps = {
    title: string;
    descriptions: string;
    recipiesInfo: RecipiesInfo;
};

export const AdditionalBlock: FC<AdditionalBlockProps> = ({
    title,
    descriptions,
    recipiesInfo,
}) => {
    const titleSize = useBreakpointValue({ base: 'lg', md: 'lg', lg: 'xl', '2xl': '2xl' });
    const isMobile = useBreakpointValue({ base: true, lg: false });

    return (
        <SimpleGrid
            columns={{ base: 1, md: 3, xl: 3, '2xl': 4 }}
            spacing={{ base: 3, md: 3, lg: 4, '2xl': 6 }}
        >
            <Box gridColumn={{ base: 'span 1', md: 'span 3', lg: 'span 1', '2xl': 'span 2' }}>
                <Heading
                    as='h2'
                    size={titleSize}
                    pt={{ base: 0, lg: 6 }}
                    letterSpacing={{ base: 0, lg: 1.3 }}
                >
                    {title}
                </Heading>
            </Box>
            <Box gridColumn={{ base: 'span 1', md: 'span 3', lg: 'span 2', '2xl': 'span 2' }}>
                <Text
                    color='blackAlpha.700'
                    letterSpacing={isMobile ? 0 : 0.9}
                    pt={{ base: 0, lg: 8 }}
                >
                    {descriptions}
                </Text>
            </Box>

            <Box
                display='flex'
                flexDirection={{ base: 'column', sm: 'row' }}
                gap={{ base: 3, md: 3, lg: 4, '2xl': 6 }}
                gridColumn={{ base: 'span 1', md: 'span 2', xl: 'span 2', '2xl': 'span 2' }}
            >
                {recipiesInfo.recipies.map(({ title, content, favorites, likes, category }) => (
                    <Card
                        w='xs'
                        borderRadius='lg'
                        variant='outline'
                        flex={1}
                        p={{ base: 3, lg: 4, '2xl': 6 }}
                    >
                        <CardBody p={0}>
                            <Heading as='h4' size='md' noOfLines={1}>
                                {title}
                            </Heading>
                            <Text fontSize='sm' noOfLines={3} letterSpacing={0.6} pt={3}>
                                {content}
                            </Text>
                        </CardBody>

                        <CardFooter justify='space-between' flexWrap='nowrap' p={0}>
                            <CustomTag category={category} color='lime.50' />
                            <HStack spacing={4}>
                                <IconCounter fontSize='sm' icon={heartIcon} count={favorites} />
                                <IconCounter fontSize='sm' icon={peopleIcon} count={likes} />
                            </HStack>
                        </CardFooter>
                    </Card>
                ))}
            </Box>
            <VStack
                align='stretch'
                spacing={3}
                gridColumn={{ base: 'span 1', md: 'span 1', xl: 'span 1', '2xl': 'span 2' }}
            >
                {recipiesInfo.additionalRecipes.map(({ title, category }) => (
                    <Card borderRadius='lg' variant='outline'>
                        <CardBody px={{ base: 3, md: 3, '2xl': 6 }} py={{ base: 2, md: 2, lg: 3 }}>
                            <HStack>
                                <CustomIcon
                                    icon={categoryMap[category as Category]?.icon}
                                    boxSize='24px'
                                />
                                <Heading
                                    as='h4'
                                    size={{ base: 'sm', md: '18px', '2xl': 'md' }}
                                    noOfLines={1}
                                    flex={2}
                                >
                                    {title}
                                </Heading>
                                <Button
                                    size='sm'
                                    variant='outline'
                                    colorScheme='lime'
                                    fontSize={{ base: 12, md: 12, '2xl': 16 }}
                                    w={{ base: 70, '2xl': 87 }}
                                >
                                    Готовить
                                </Button>
                            </HStack>
                        </CardBody>
                    </Card>
                ))}
            </VStack>
        </SimpleGrid>
    );
};
