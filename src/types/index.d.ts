export { };

interface Property {
  id: number,
  displaySize: string
}

declare global {
  interface Window {
    jsonModel: {
      properties: Property[]
    };
  }
}
