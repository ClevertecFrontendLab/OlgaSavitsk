import { Center, Heading, Text, useBreakpointValue, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Filter } from '~/components/filter/filter';

type HeaderPageProps = {
    title: string;
    subTitle?: string;
};

export const HeaderPage: FC<HeaderPageProps> = ({ title, subTitle }) => {
    const headingSize = useBreakpointValue({ base: 'lg', md: 'lg', lg: '2xl' });

    return (
        <Center pb={8}>
            <VStack w={{ base: 'full', md: 'full', lg: 'auto' }}>
                <Heading as='h1' size={headingSize} textAlign='center' fontWeight={700}>
                    {title}
                </Heading>
                {subTitle && (
                    <Text
                        color='blackAlpha.600'
                        maxW={700}
                        textAlign='center'
                        fontWeight={500}
                        letterSpacing={-0.2}
                    >
                        {subTitle}
                    </Text>
                )}
                <Filter />
            </VStack>
        </Center>
    );
};
