import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Show,
    Spacer,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FC } from 'react';

import heartIcon from '~/assets/icons/heart.svg';
import peopleIcon from '~/assets/icons/hearteyes.svg';
import { TRUNCATE_STYLES } from '~/constants/menu.constants';

import { IconCounter } from '../count-icon/count-icon';
import { CustomIcon } from '../custom-icon/custom-icon';
import { CustomTag } from '../custom-tag/custom-tag';
import { Recipie } from '../pages/vegan-page/helpers';

export const DishCard: FC<Recipie> = ({
    title,
    description,
    category,
    image,
    heartCount,
    peopleCount,
    recommended,
}) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const truncateStyles = useBreakpointValue({
        base: {},
        lg: {},
        '2xl': TRUNCATE_STYLES,
    });

    return (
        <Card
            direction='row'
            borderRadius='lg'
            overflow='hidden'
            variant='outline'
            maxW={{ base: '100%', md: 356, lg: '100%', '2xl': 668 }}
            w='full'
        >
            <Image
                objectFit='cover'
                src={image}
                maxW={{ base: '158px', md: '158px', lg: '346px' }}
                h={{ base: 128, md: 128, lg: 244 }}
                w='full'
                alt='recipe'
            />

            <Show above='lg'>
                <CustomTag blog={recommended} color='lime.150' position='absolute' />
            </Show>
            <Stack w='full' spacing={{ md: 0 }}>
                <CardHeader py={{ base: 2, md: 2, lg: 4 }} px={isMobile ? 2 : 6}>
                    <Flex>
                        <CustomTag
                            category={category}
                            color='lime.50'
                            position={isMobile ? 'absolute' : 'static'}
                        />
                        {!isMobile && <Spacer />}
                        <HStack spacing={{ base: 6, md: 2, lg: 6 }}>
                            {heartCount && (
                                <IconCounter fontSize='xs' icon={heartIcon} count={heartCount} />
                            )}
                            {peopleCount && (
                                <IconCounter fontSize='xs' icon={peopleIcon} count={peopleCount} />
                            )}
                        </HStack>
                    </Flex>
                </CardHeader>
                <CardBody py={0} px={isMobile ? 2 : 6}>
                    <Heading
                        as='h4'
                        size={{ base: 'sm', lg: 'md' }}
                        fontWeight={500}
                        noOfLines={isMobile ? 2 : 1}
                        maxW={{ base: 'auto', '2xl': 280 }}
                        sx={truncateStyles}
                    >
                        {title}
                    </Heading>
                    {!isMobile && (
                        <Text fontSize='sm' noOfLines={3} letterSpacing={0.6} pt={3}>
                            {description}
                        </Text>
                    )}
                </CardBody>

                <CardFooter justifyContent='end' gap={2} p={{ base: 1, md: 2, lg: 6 }}>
                    {isMobile ? (
                        <IconButton
                            aria-label='save'
                            borderColor='blackAlpha.600'
                            icon={<CustomIcon icon={heartIcon} />}
                            variant='outline'
                            size='xs'
                        />
                    ) : (
                        <Button
                            borderColor='blackAlpha.600'
                            leftIcon={<CustomIcon icon={heartIcon} />}
                            variant='outline'
                            size='sm'
                        >
                            Сохранить
                        </Button>
                    )}
                    <Button
                        variant='solid'
                        bg='blackAlpha.900'
                        color='white'
                        size={isMobile ? 'xs' : 'sm'}
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};
