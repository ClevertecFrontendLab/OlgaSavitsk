import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { ChakraProps, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router';

type NavItemProps = {
    href: string;
    icon?: string;
    label?: string;
    rightIcon?: boolean;
    isOpen?: boolean;
    dataTestId?: string;
    className?: string;
    onClick?: () => void;
} & ChakraProps;

export const NavItem: FC<NavItemProps> = ({
    href,
    icon,
    label,
    rightIcon,
    isOpen,
    className,
    onClick,
}) => (
    <NavLink to={href || '#'} style={{ textDecoration: 'none' }} onClick={onClick}>
        <Flex className={className}>
            {icon && <Image src={icon} alt={label} />}
            <Text whiteSpace='nowrap'>{label}</Text>
            {rightIcon && (
                <Icon ml='auto' as={isOpen ? ChevronUpIcon : ChevronDownIcon} boxSize={7} />
            )}
        </Flex>
    </NavLink>
);
