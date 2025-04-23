import { HStack, Stack, Text } from '@chakra-ui/react';

import heartIcon from '~/assets/icons/heart.svg';
import hearteyesIcon from '~/assets/icons/hearteyes.svg';
import peopleIcon from '~/assets/icons/people.svg';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

export const StatisticsComponent = ({ ...rest }) => (
    <Stack spacing={{ base: 2, md: 10 }} {...rest}>
        <HStack>
            <CustomIcon icon={heartIcon} boxSize='16px' />
            <Text fontSize='md' color='lime.600' fontWeight={600}>
                185
            </Text>
        </HStack>
        <HStack>
            <CustomIcon icon={peopleIcon} boxSize='16px' />
            <Text fontSize='md' color='lime.600' fontWeight={600}>
                589
            </Text>
        </HStack>
        <HStack>
            <CustomIcon icon={hearteyesIcon} boxSize='16px' />
            <Text fontSize='md' color='lime.600' fontWeight={600}>
                587
            </Text>
        </HStack>
    </Stack>
);
