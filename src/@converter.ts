import {Svg} from 'expo';
import humps from 'humps';

const {Path, Rect, Defs, Mask, G, ClipPath} = Svg;

const SVG_OBJECT_MAP = {
  svg: Svg,
  path: Path,
  rect: Rect,
  defs: Defs,
  mask: Mask,
  g: G,
  clipPath: ClipPath,
};

export function convert(
  createElement: Function,
  element: any,
  extraProps: any = {},
): any {
  if (typeof element === 'string' || typeof element === 'number' || !element) {
    return element;
  }

  const children = (element.children || []).map((child: any) => {
    return convert(createElement, child);
  });

  const mixins = Object.keys(element.attributes || {}).reduce(
    (acc: any, key: any) => {
      const val = element.attributes[key];
      switch (key) {
        case 'class':
        case 'role':
        case 'style':
        case 'xmlns':
          delete element.attributes[key];
          break;
        default:
          if (
            key.indexOf('aria-') === 0 ||
            key.indexOf('data-') === 0 ||
            ('fill' === key && 'currentColor' === val)
          ) {
            delete element.attributes[key];
          } else {
            acc.attrs[humps.camelize(key)] = val;
          }

          break;
      }
      return acc;
    },
    {attrs: {}},
  );

  return createElement(
    (SVG_OBJECT_MAP as any)[element.tag],
    {...mixins.attrs, ...extraProps},
    ...children,
  );
}
