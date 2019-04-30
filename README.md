[![NPM Package](https://badge.fury.io/js/expo-fontawesome.svg)](https://www.npmjs.com/package/expo-fontawesome) [![Build Status](https://travis-ci.org/dizys/expo-fontawesome.svg?branch=master)](https://travis-ci.org/dizys/expo-fontawesome)

# expo-fontawesome

React Native component for Font Awesome 5 in managed Expo app

## Introduction

If you have trouble trying [react-native-fontawesome](https://github.com/FortAwesome/react-native-fontawesome) with Expo, maybe you should try this. Since managed Expo app have `react-native-svg` pre-installed, using `react-native-svg` might cause an Error:

```
Error: tried to register two views with the same name rnsvgrect
```

This repository rewrites the component with Expo svg components in TypeScript, hopefully solving the problem for you.

## Installation

```
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save expo-fontawesome
```

or

```
$ yarn add @fortawesome/fontawesome-svg-core
$ yarn add @fortawesome/free-solid-svg-icons
$ yarn add expo-fontawesome
```

## Usage

> See more details at [react-native-fontawesome](https://github.com/FortAwesome/react-native-fontawesome)

You can use Font Awesome icons in your React Native components as simply as this:

```javascript
<FontAwesomeIcon icon="coffee" />
```

### Explicit Import

```javascript
import React, {Component} from 'react';
import {View} from 'react-native';
import {FontAwesomeIcon} from 'expo-fontawesome';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <FontAwesomeIcon icon={faCoffee} />
      </View>
    );
  }
}
```

### Color

Priority: The color prop takes priority over setting color via StyleSheet. So if you end up with both set,
the prop wins.

In fact, when provided a style object (suppose you've declared other style properties other
than `color`), if the color prop has been specified, then any color property on the style object is removed
before the style object is passed through to the underlying SVG rendering library. This is to avoid ambiguity.

Using the color prop should be preferred over using the StyleSheet.

#### Color Prop

```javascript
<FontAwesomeIcon icon={faCoffee} color={'red'} />
```

#### Color StyleSheet property

To set the color of an icon, provide a `StyleSheet` like this:

```javascript
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from 'expo-fontawesome';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';

type Props = {};

const style = StyleSheet.create({
  icon: {
    color: 'blue',
  },
});

export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <FontAwesomeIcon icon={faCoffee} style={style.icon} />
      </View>
    );
  }
}
```

### Size

Default: 16

To adjust the size, use the `size` prop:

```javascript
<FontAwesomeIcon icon={faCoffee} size={32} />
```

Note: the `height` and `width` props have been deprecated.

## Features

### Masking

```javascript
<FontAwesomeIcon icon="coffee" mask={['far', 'circle']} />
```

[More on masking...](https://fontawesome.com/how-to-use/on-the-web/styling/masking)

### Power Transforms

```javascript
<FontAwesomeIcon icon="arrows" transform="shrink-6 left-4" />
<FontAwesomeIcon icon="arrow-rightr" transform={{ rotate: 42 }} />
```

[More on power transforms...](https://fontawesome.com/how-to-use/on-the-web/styling/power-transforms)

## License

MIT, see the [LICENSE](/LICENSE) file for details.
