# useSwipe

React Custom Hook useSwipe

## Install

```bash
yarn add @odnh/use-swipe
# or
npm install @odnh/use-swipe
```

## Use
```tsx
  useSwipe(target: Target, options: Options) => SwipeState;
```

### parameters
|Name|Type|Description|Required|
|-----|-----------|---------------|-----|
|target|`HTMLElement` or `React.MutableRefObject<HTMLElement>`|target element|`true`|
|option|`Object`|[Options](https://github.com/d0hyeon/useSwipe/blob/master/README.md#options)|`false`|

#### options 
|Name|type|Description|Default value|
|-----|--------|---------------------------|----|
|fps|`number`|-|60|
|useEvent|`boolean`|Whether to use the swipe event [`swipestart` - `swipemove` - `swipeend`].|`false`|
|excludeElement|`HTMLElement`|Elements to exclude the beginning.|`null`|


---
### returns
|Name|Type|Description|
|-----|-----------|---------------|
|swipeState|`SwipeState`| [SwipeState](https://github.com/d0hyeon/useSwipe/blob/master/README.md#SwipeState) |
<br />
#### SwipeState
|Name|Type|Description|
|-----|------|-------|
|state|`done` or `move`| - |
|x|number|moving position value|
|y|number|moving position value|
|difference|`{x: number, y: number}`|position difference between the beginning and the end.|
|duration|number|time of moved|

<br/> 

## Example

[live demo](https://k5yub.csb.app/)

```jsx
import React from 'react';
import useSwipe from '@odnh/use-swipe';

const DEFAULT_STYLE = {
  width: '100px',
  height: '100px',
  border: '1px solid #ddd',
  transform: 'translate(0, 0)',
  transition: 'transform 300ms'
};
const App = () => {
  const elementRef = React.useRef(null);
  const {x, y, state} = useSwipe(elementRef);
  
  const swipeStyle = React.useMemo(() => {
    if(state === 'done') {
      return DEFAULT_STYLE;
    } else {
      return {
        ...DEFAULT_STYLE,
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 100ms'
      }
    }
  }, [state, x, y]);
  
  return (
    <div ref={elementRef} style={{width: '100vw', height: '100vh'}}>
      <div
        style={swipeStyle}
      >
        swipe
      </div>
    </div>
  )
}

```

