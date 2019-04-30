import {IconLookup, IconName} from '@fortawesome/fontawesome-svg-core';

export function objectWithKey(key: any, value: any): any {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
    ? {[key]: value}
    : {};
}

export function normalizeIconArgs(icon: any): IconLookup | undefined {
  if (!icon) {
    return icon;
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon as IconLookup;
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return {prefix: icon[0], iconName: icon[1]};
  }

  if (typeof icon === 'string') {
    return {prefix: 'fas', iconName: icon as IconName};
  }

  return undefined;
}
