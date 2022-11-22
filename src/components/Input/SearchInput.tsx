import { ChangeEvent, useState } from 'react';

import {
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useDebounce } from 'react-use';

type Props = {
  debounce?: number;
  onSearch?: (query: string) => void;
};

export const SearchInput: React.FC<InputProps & Props> = ({
  color,
  bg,
  onSearch,
  placeholder,
  debounce = 0,
}) => {
  const [query, setQuery] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch?.(query);
  };

  useDebounce(handleSearch, debounce, [query]);

  return (
    <InputGroup>
      <Input
        border="0"
        color={color}
        bg={bg}
        outline="none"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      <InputRightElement
        children={<Icon as={BsSearch} color="gray.500" height="6" />}
      />
    </InputGroup>
  );
};
