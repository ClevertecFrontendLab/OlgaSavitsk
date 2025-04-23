import { useBreakpointValue } from '@chakra-ui/react';

export const BREAKPOINTS = {
    titleSize: { base: 'lg', md: 'md', lg: 'xl', '2xl': '2xl' },
    slider: {
        top: { base: '90%', md: '50%' },
        side: { base: '30%', md: '-8px' },
        width: { base: 344, sm: 344, md: '100%' },
    },
};

export const useBreakpointConfig = () => ({
    titleSize: useBreakpointValue(BREAKPOINTS.titleSize),
    sliderTop: useBreakpointValue(BREAKPOINTS.slider.top),
    sliderSide: useBreakpointValue(BREAKPOINTS.slider.side),
    sliderWidth: useBreakpointValue(BREAKPOINTS.slider.width),
    isMobile: useBreakpointValue({ base: true, lg: false }),
});
