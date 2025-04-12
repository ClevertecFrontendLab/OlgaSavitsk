import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { ChakraProps, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { NavLink } from 'react-router';

import classes from './index.module.css';

type NavItemProps = {
    href: string;
    icon?: string;
    label?: string;
    rightIcon?: boolean;
    isOpen?: boolean;
    active?: boolean;
    dataTestId?: string;
    onClick?: () => void;
} & ChakraProps;

export const NavItem: FC<NavItemProps> = ({
    href,
    icon,
    label,
    rightIcon,
    isOpen,
    active,
    onClick,
}) => (
    <NavLink to={href || '#'} style={{ textDecoration: 'none' }} onClick={onClick}>
        <Flex
            className={`${classes.navitem} ${classes.navitemborder} ${active ? `${classes.navitemborderactive}` : `${classes.navitemborder}`}`}
            _hover={{
                bg: 'lime.50',
                color: 'black',
            }}
        >
            {icon && <Image src={icon} alt={label} />}
            <Text whiteSpace='nowrap'>{label}</Text>
            {rightIcon && (
                <Icon ml='auto' as={isOpen ? ChevronUpIcon : ChevronDownIcon} boxSize={6} />
            )}
        </Flex>
    </NavLink>
);
