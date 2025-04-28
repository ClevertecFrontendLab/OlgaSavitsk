import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';

export const theme = extendTheme({
    colors,
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
    components: {
        Text: {
            baseStyle: {
                fontWeight: 400,
                lineHeight: 'normal',
            },
        },
        Heading: {
            baseStyle: {
                fontWeight: 500,
            },
        },
        Breadcrumb: {
            baseStyle: {
                link: {
                    color: 'blackAlpha.700',
                    fontWeight: 400,
                },
                list: {
                    display: 'flex',
                    flexWrap: 'wrap',
                },
            },
        },
        Tag: {
            baseStyle: {
                label: {
                    textBox: 'cap alphabetic',
                },
            },
            variants: {
                filterOutline: {
                    container: {
                        size: 'sm',
                        variant: 'outline',
                        boxShadow: 'inset 0 0 0px 1px var(--chakra-colors-lime-400)',
                        _hover: {
                            bg: 'lime.50',
                        },
                    },
                    label: {
                        color: 'lime.600',
                        fontWeight: 'medium',
                    },
                },
                filterSolid: {
                    container: {
                        size: 'sm',
                        variant: 'solid',
                        bg: 'lime.100',
                        boxShadow: 'inset 0 0 0px 1px var(--chakra-colors-lime-400)',
                    },
                    label: {
                        color: 'lime.700',
                        fontWeight: 'medium',
                    },
                },
            },
        },
        Tabs: {
            baseStyle: {
                tablist: {
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            },
        },
        Table: {
            sizes: {
                xl: {
                    th: { py: '8px', pl: '24px' },
                    td: { py: '8px', px: '24px' },
                },
            },
        },
        Switch: {
            baseStyle: {
                track: {
                    _checked: {
                        bg: 'lime.400',
                    },
                },
            },
        },
    },
    fontSize: {
        18: '18px',
    },
    styles: {
        global: {
            '::-webkit-scrollbar': {
                width: '8px',
            },
            '::-webkit-scrollbar-thumb': {
                background: 'blackAlpha.300',
                borderRadius: '4px',
            },
        },
    },
});
