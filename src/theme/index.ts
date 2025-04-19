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
