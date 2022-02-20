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
  useSwipe(target: Target, options: Options) => SwipeMoveState | SwipeDoneState;
```

### Parameters
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
### Returns
|Name|Type|Description|
|-----|-----------|---------------|
|swipeState|`SwipeMoveState` or `SwipeDoneState`| |
<br />

##### SwipeMoveState
|Name|Type|Description|
|-----|----------|-----------|
|state|`SwipeStateEnum.MOVE`| move |
|x|`number`|moving position value|
|y|`number`|moving position value|
|difference|`{x: 0, y: 0}`|position difference between the beginning and the end.|
|duration|`0`|time of moved|

<br/>

##### SwipeDoneState
|Name|Type|Description|
|-----|----------|-----------|
|state|`SwipeStateEnum.DONE`| done |
|x|`0`|moving position value|
|y|`0`|moving position value|
|difference|`{x: number, y: number}`|position difference between the beginning and the end.|
|duration|`number`|time of moved|
<br/> 

## Example

[live demo](https://k5yub.csb.app/)

```jsx
import React from 'react';
import useSwipe, { SwipeStateEnum } from '@odnh/use-swipe';

const DEFAULT_STYLE = {
  width: '100px',
  height: '100px',
  border: '1px solid #ddd',
  transform: 'translate(0, 0)',
  transition: 'transform 300ms'
};
const App = () => {
  const elementRef = React.useRef(null);
  const swipe = useSwipe(elementRef);
  
  const swipeStyle = React.useMemo(() => {
    if(state === SwipeStateEnum.DONE) {
      return DEFAULT_STYLE;
    } else {
      const { x, y } = swipe
      return {
        ...DEFAULT_STYLE,
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 100ms'
      }
    }
  }, [swipe]);
  
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

