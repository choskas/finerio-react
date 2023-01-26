const size: Record<string, string> = {
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1440px',
  }

export const device = {
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(max-width: ${size.desktop})`,
  };