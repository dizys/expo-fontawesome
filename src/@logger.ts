let PRODUCTION = false;

export function error(...args: any[]): void {
  if (!PRODUCTION && console && typeof console.error === 'function') {
    console.error(...args);
  }
}
