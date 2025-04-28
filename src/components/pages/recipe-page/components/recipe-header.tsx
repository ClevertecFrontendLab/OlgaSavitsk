import {
    Badge,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';

import timeIcon from '~/assets/icons/alarm.svg';
import heartIcon from '~/assets/icons/heart.svg';
import peopleIcon from '~/assets/icons/hearteyes.svg';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';
import { CustomTag } from '~/shared/components/custom-tag/custom-tag';
import { StatBadge } from '~/shared/components/stat-bage/stat-bage';
import { Recipe } from '~/shared/types/recipe.types';

interface RecipeHeaderProps {
    recipe: Recipe;
}

export const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
    const { title, description, category, image, bookmarks, likes, time } = recipe;
    return (
        <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 4, lg: 6 }} w='full'>
            <Image
                objectFit='cover'
                borderRadius='lg'
                src={image}
                maxW={{ base: '100%', md: 232, lg: 353, '2xl': 553 }}
                w='full'
                alt='recipe'
            />
            <VStack w='full' h='full' align='start' minH={{ base: 224, md: 224, lg: 410 }}>
                <HStack align='start' w='full' h='full' pb={7}>
                    <HStack wrap='wrap'>
                        {category.map((cat, index) => (
                            <CustomTag key={index} category={cat} color='lime.50' />
                        ))}
                    </HStack>
                    <Spacer />
                    <HStack spacing={{ base: 6, md: 2, lg: 6 }}>
                        {bookmarks && (
                            <StatBadge
                                fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
                                boxSize={3.5}
                                icon={heartIcon}
                                count={bookmarks}
                            />
                        )}
                        {likes && (
                            <StatBadge
                                fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
                                boxSize={3.5}
                                py={1}
                                px={3}
                                icon={peopleIcon}
                                count={likes}
                            />
                        )}
                    </HStack>
                </HStack>
                <VStack
                    spacing={{ base: 4, md: 4, lg: 6 }}
                    maxW={{ base: 'full', '2xl': '70%' }}
                    align='start'
                >
                    <Heading as='h2' fontSize={{ base: '2xl', lg: '5xl' }} fontWeight={700}>
                        {title}
                    </Heading>

                    <Text fontSize='sm'>{description}</Text>
                </VStack>
                <Spacer />
                <Flex
                    direction={{ base: 'column', sm: 'column', md: 'row' }}
                    gap={1}
                    align={{ base: 'start', md: 'end' }}
                    w='full'
                >
                    <Badge borderRadius='md' py='1'>
                        <HStack>
                            <CustomIcon icon={timeIcon} />
                            <Text>{time}</Text>
                        </HStack>
                    </Badge>
                    <Spacer />
                    <HStack spacing={3}>
                        <Button
                            borderColor='blackAlpha.600'
                            leftIcon={<CustomIcon icon={peopleIcon} boxSize={4} />}
                            variant='outline'
                            size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                        >
                            Оценить рецепт
                        </Button>
                        <Button
                            variant='solid'
                            bg='lime.400'
                            leftIcon={<CustomIcon icon={heartIcon} boxSize={4} />}
                            size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                        >
                            Сохранить в закладки
                        </Button>
                    </HStack>
                </Flex>
            </VStack>
        </Flex>
    );
};
