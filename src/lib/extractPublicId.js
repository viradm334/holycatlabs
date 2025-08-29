export const extractPublicId = (url) => {
    const parts = url.split('/');
    const filename = parts.pop();
    return filename.split('.').slice(0, -1).join('.');
  };