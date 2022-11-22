import { useEffect, useState } from 'react';

import { readFileAsync } from 'utils/readFileAsync';

export const useFileURL = (file?: File) => {
  const [fileURL, setFileURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (file instanceof File) {
      setIsLoading(true);
      readFileAsync(file)
        .then(result => setFileURL(result))
        .catch()
        .finally(() => setIsLoading(false));
    }
  }, [file]);

  return { fileURL, isLoading };
};
