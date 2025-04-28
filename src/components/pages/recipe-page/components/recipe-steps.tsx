import { Card, CardBody, Heading, Image, Tag, TagLabel, Text, VStack } from '@chakra-ui/react';

import { RecipeStep } from '~/shared/types/recipe.types';

interface RecipeStepsProps {
    steps: RecipeStep[];
}

export const RecipeSteps = ({ steps }: RecipeStepsProps) => (
    <VStack spacing={5} align='start' w='full'>
        <Heading size={{ base: 'lg', lg: '2xl' }} fontWeight={500}>
            Шаги приготовления
        </Heading>

        {steps.map((step, index) => (
            <Card
                key={step.stepNumber}
                direction='row'
                overflow='hidden'
                borderRadius='lg'
                variant='outline'
                w='full'
            >
                {step.image && (
                    <Image
                        objectFit='cover'
                        src={step.image}
                        alt={step.description}
                        w={{ base: 158, lg: 'auto' }}
                        maxH='200px'
                    />
                )}

                <CardBody minH={128} p={{ base: 2, md: 6 }} overflow='hidden'>
                    <Tag mb={{ base: 3, md: 4 }} bg={index === steps.length - 1 ? 'lime.50' : ''}>
                        <TagLabel>Шаг {step.stepNumber}</TagLabel>
                    </Tag>
                    <Text fontSize='sm' whiteSpace='pre-line'>
                        {step.description}
                    </Text>
                </CardBody>
            </Card>
        ))}
    </VStack>
);
