export function getContactHref(
  name: 'twitter' | 'github',
  contact: string,
): string {
  switch (name) {
    case 'twitter':
      return `https://twitter.com/${contact}`
    case 'github':
      return `https://github.com/${contact}`
  }
}
