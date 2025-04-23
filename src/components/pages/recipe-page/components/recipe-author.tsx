import {
    Avatar,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    HStack,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';

import subscribeIcon from '~/assets/icons/subscribe.svg';
import subscribersIcon from '~/assets/icons/subscribers.svg';
import authorIcon from '~/assets/images/author.png';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

export const RecipeAuthor = () => (
    <Card
        direction='row'
        overflow='hidden'
        borderRadius='lg'
        variant='outline'
        bgColor='lime.300'
        w='full'
    >
        <CardBody>
            <Flex flex='1' gap='4'>
                <Avatar size='xl' name='Автор рецепта' src={authorIcon} />
                <VStack w='full' alignItems='start'>
                    <Flex
                        direction={{ base: 'column-reverse', sm: 'row' }}
                        w='full'
                        justify='space-between'
                    >
                        <Heading fontSize={{ base: 'sm', md: '2xl' }} fontWeight={600}>
                            Сергей Разумов
                        </Heading>
                        <Spacer />
                        <Text fontSize={{ base: 'xs', sm: 'sm' }} textAlign='right'>
                            Автор рецепта
                        </Text>
                    </Flex>
                    <Text fontSize='sm' color='blackAlpha.700' flex={1}>
                        @serge25
                    </Text>
                    <Spacer />
                    <HStack align='end' w='full'>
                        <Button
                            variant='solid'
                            bg='black'
                            color='white'
                            size='xs'
                            leftIcon={<CustomIcon icon={subscribeIcon} />}
                        >
                            Подписаться
                        </Button>
                        <Spacer />
                        <HStack spacing={2}>
                            <CustomIcon icon={subscribersIcon} />
                            <Text color='lime.600' fontWeight={600} fontSize='sm'>
                                125
                            </Text>
                        </HStack>
                    </HStack>
                </VStack>
            </Flex>
        </CardBody>
    </Card>
);
