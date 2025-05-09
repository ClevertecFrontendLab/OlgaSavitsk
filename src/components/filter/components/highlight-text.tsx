import { Text } from '@chakra-ui/react';
import { FC, Fragment } from 'react';

const hightlightStyle: React.CSSProperties = {
    color: '#2db100',
};

type HighlightTextProps = {
    title: string;
    searchText: string | null;
};

export const HighlightText: FC<HighlightTextProps> = ({ title, searchText }) => {
    if (!title) return <Text fontWeight={500}>{title}</Text>;
    const regEx = new RegExp(searchText!, 'ig');
    const parts = title.split(regEx);
    const matchValue = title.match(regEx);

    if (!searchText) return <Text fontWeight={500}>{title}</Text>;

    return matchValue
        ? parts.map((part: string, index: number, arr: string[]) => {
              if (index < arr.length - 1) {
                  return (
                      <Fragment key={arr[index]}>
                          {part}
                          <span style={hightlightStyle}>{matchValue.shift()}</span>
                      </Fragment>
                  );
              }

              return part;
          })
        : title;
};
