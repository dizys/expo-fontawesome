import {
  IconProp,
  Transform,
  icon,
  parse,
} from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {convert} from './@converter';
import {error} from './@logger';
import {normalizeIconArgs, objectWithKey} from './@utils';
// tslint:disable-next-line: no-null-keyword
const convertCurry = convert.bind(null, React.createElement);

export const DEFAULT_SIZE = 16;
export const DEFAULT_COLOR = '#000';

export type FontAwesomeIconStyle = StyleProp<ViewStyle> & {
  color?: string;
};

export interface FontAwesomeIconProps {
  icon: IconProp;
  mask?: IconProp;
  size?: number;
  color?: string;
  transform?: string | Transform;
  style?: FontAwesomeIconStyle;
}

export const FontAwesomeIcon: React.FunctionComponent<
  FontAwesomeIconProps
> = props => {
  let {icon: iconArgs, mask: maskArgs, style = {}, size} = props;

  let iconLookup = normalizeIconArgs(iconArgs);

  if (!iconLookup) {
    error('ERROR: icon format not valid for icon = ', iconLookup);
    return undefined;
  }

  let transform = objectWithKey(
    'transform',
    typeof props.transform === 'string'
      ? parse.transform(props.transform)
      : props.transform,
  );
  let mask = objectWithKey('mask', normalizeIconArgs(maskArgs));
  let renderedIcon = icon(iconLookup, {
    ...transform,
    ...mask,
  });

  if (!renderedIcon) {
    error('ERROR: icon not found for icon = ', iconArgs);
    return undefined;
  }

  let {abstract} = renderedIcon;

  let color = props.color || (style && style.color) || DEFAULT_COLOR;

  let {color: _, ...modifiedStyle} = style as any;

  size = size || DEFAULT_SIZE;

  let extraProps = {
    height: size,
    width: size,
    fill: color,
    style: modifiedStyle,
  };

  for (let key of Object.keys(props)) {
    if (
      !['icon', 'mask', 'size', 'color', 'transform', 'style'].includes(key)
    ) {
      (extraProps as any)[key] = (props as any)[key];
    }
  }

  return convertCurry(abstract[0], extraProps);
};
