export const readFileAsync = (file: File): Promise<string> =>
  new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = event => {
      const result = event.target?.result;

      if (result && typeof result === 'string') {
        resolve(result);
      }

      resolve('');
    };

    reader.readAsDataURL(file);
  });
