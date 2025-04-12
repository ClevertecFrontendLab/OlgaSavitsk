import {
    Card,
    CardBody,
    CardFooter,
    Heading,
    HStack,
    Image,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FC } from 'react';

import heartIcon from '~/assets/icons/heart.svg';
import peopleIcon from '~/assets/icons/hearteyes.svg';

import { IconCounter } from '../../../count-icon/count-icon';
import { CustomTag } from '../../../custom-tag/custom-tag';

type SliderCardProps = {
    title: string;
    description: string;
    category: string;
    image: string;
    heartCount?: number;
    peopleCount?: number;
};

export const SliderCard: FC<SliderCardProps> = ({
    title,
    description,
    category,
    image,
    heartCount,
    peopleCount,
}) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const sliderWidth = useBreakpointValue({ base: '158px', lg: '277px', '2xl': '322px' });
    const imageHeight = useBreakpointValue({ base: '128px', lg: '230px' });

    return (
        <Card w={sliderWidth} borderRadius='lg' overflow='hidden' variant='outline' h='full'>
            <Image objectFit='cover' src={image} height={imageHeight} alt='recipe' />
            <CardBody
                px={{ base: 2, md: 2, lg: 4, '2xl': 6 }}
                py={{ base: 2, lg: 4 }}
                pb={{ base: 0, lg: 4 }}
            >
                <Heading
                    as='h4'
                    size={{ base: 'md', lg: 'md' }}
                    fontWeight={500}
                    noOfLines={isMobile ? 2 : 1}
                >
                    {title}
                </Heading>
                {!isMobile && (
                    <Text fontSize='sm' noOfLines={3} letterSpacing={0.6} pt={3}>
                        {description}
                    </Text>
                )}
            </CardBody>

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                px={{ base: 3, md: 2, lg: 4, '2xl': 6 }}
                py={{ base: 3, md: 2, lg: 2, '2xl': 4 }}
            >
                <CustomTag
                    category={category}
                    color='lime.150'
                    position={isMobile ? 'absolute' : 'static'}
                />
                <HStack spacing={5}>
                    {heartCount && (
                        <IconCounter fontSize='sm' icon={heartIcon} count={heartCount} />
                    )}
                    {peopleCount && (
                        <IconCounter fontSize='sm' icon={peopleIcon} count={peopleCount} />
                    )}
                </HStack>
            </CardFooter>
        </Card>
    );
};
