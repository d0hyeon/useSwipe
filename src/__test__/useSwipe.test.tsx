import * as React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import useSwipe from '../useSwipe';
import { getIsMobile } from '../utils';
import { UseSwipeOption } from '../type';

interface Props {
  options?: UseSwipeOption
}

const MockComponent: React.FC<Props> = ({options}) => {
  const swiped = useSwipe(mockElement, options);

  return (
    <div>
      {Object.keys(swiped).map(key => (
        <dl key={key}>
          <dt>{key}</dt>
          <dd className={key}>
            {swiped[key]}
          </dd>
        </dl>
      ))}
    </div>
  )
}

const mockElement = document.createElement('div');
mockElement.style.cssText = 'width: 500px; height: 500px;';

describe("useSwipe 기본 테스트", () => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: 'window',
    writable: true
  });

  test('PC환경에서 실행된다.', () => {
    expect(getIsMobile()).toBeFalsy();
  });

  const wrapper = mount(<MockComponent/>);
  const stateEl = wrapper.find('.state');
  const posYEl = wrapper.find('.y');
  const posXEl = wrapper.find('.x');

  it('마운트 시 초기값을 반환한다.', () => {
    expect(stateEl.text()).toBe('done');
    expect(posYEl.text()).toBe('0');
    expect(posXEl.text()).toBe('0');
  });

  it('start 이벤트만 발동되면 아무런 변화가 없다.', () => {
    mockElement.dispatchEvent(new MouseEvent('mousedown', {clientY: 1,  clientX: 1}));
    expect(stateEl.text()).toBe('done');
    expect(posYEl.text()).toBe('0');
    expect(posXEl.text()).toBe('0');
  });

  it('move 이벤트가 실행되면 state가 변경된다.', () => {
    mockElement.dispatchEvent(new MouseEvent('mousemove', {clientY: 100,  clientX: 100}))
    expect(stateEl.text()).toBe('move');
    expect(posXEl.text()).toBe('99');
    expect(posYEl.text()).toBe('99');
  });

  it('end 이벤트가 실행되면 초기값을 반환한다.', () => {
    mockElement.dispatchEvent(new MouseEvent('mouseup'));
    expect(stateEl.text()).toBe('done');
    expect(posYEl.text()).toBe('0');
    expect(posXEl.text()).toBe('0');
  });
  it('end와 move 이벤트가 동시에 실행되면 move 이벤트를 차단한다.', () => {
    mockElement.dispatchEvent(new MouseEvent('mouseend'));
    mockElement.dispatchEvent(new MouseEvent('mousemove'));
    expect(stateEl.text()).toBe('done');
    expect(posYEl.text()).toBe('0');
    expect(posXEl.text()).toBe('0');

    wrapper.unmount();
  });
});

describe("useSwipe 옵션추가 테스트", () => {
  it('start event target이 options에 추가한 ignore 엘리먼트거나 포함되있다면 이벤트를 차단한다.', () => {
    const wrapper = mount(<MockComponent options={{ignoreElement: mockElement}}/>);
    
    mockElement.dispatchEvent(new MouseEvent('mousedown', {clientY: 1,  clientX: 1}));
    mockElement.dispatchEvent(new MouseEvent('mousemove', {clientY: 100,  clientX: 100}));
    expect(wrapper.find('.state').text()).toBe('done');
    expect(wrapper.find('.y').text()).toBe('0');
    expect(wrapper.find('.x').text()).toBe('0');

    wrapper.unmount();
  });

  const scope = {
    x: [100, 200],
    y: [100, 200]
  };

  it.each([
    ['x', scope.x],
    ['y', scope.y]
  ])('start포지션이 options에서 지정한 $position의 값에 벗어난다면 이벤트를 차단한다', (position, range) => {
    const scope = {[position]: range};
    const wrapper = mount(<MockComponent options={{scope} as UseSwipeOption}/>);
    mockElement.dispatchEvent(new MouseEvent('mousedown', {clientY: 150,  clientX: 1}));
    mockElement.dispatchEvent(new MouseEvent('mousemove', {clientY: 150, clientX: 1}));

    expect(wrapper.find('.state').text()).toBe('done');
    expect(wrapper.find('.x').text()).toBe('0');
    expect(wrapper.find('.y').text()).toBe('0');

    wrapper.unmount();
  });

  const defaultTouch = {
    screenY: 0, 
    screenX: 0,
    clientX: 0,
    clientY: 0,
    identifier: 1,
    rotationAngle: 0,
    force: 0,
    azimuthAngle: 0,
    altitudeAngle: 0,
    pageX: 0,
    pageY: 0,
    radiusX: 0,
    radiusY: 0,
    target: mockElement,
    touchType: 'direct'
  };
  const defaultTouchEvent = {
    cancelable: true,
    bubbles: true,
    composed: true,
  }

  it.each([
    ['x', scope.x],
    ['y', scope.y]
  ])('[모바일] start포지션이 options에서 지정한 $position의 값에 벗어난다면 이벤트를 차단한다', (position, range) => {
    Object.defineProperties(mockElement, {
      'scrollY': {value: 0},
      'scrillX': {value: 0}
    })
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'iPhone',
      writable: false
    });
    
    const scope = {[position]: range};
    const wrapper = mount(<MockComponent options={{scope} as UseSwipeOption}/>);
    mockElement.dispatchEvent(new TouchEvent('touchstart', {
      ...defaultTouchEvent,
      touches: [{...defaultTouch, clientX: 1000, clientY: 1000} as Touch],
    }));
    mockElement.dispatchEvent(new TouchEvent('touchmove', {
      ...defaultTouchEvent,
      touches: [{...defaultTouch, clientX: 150, clientY: 150} as Touch]
    }));

    expect(wrapper.find('.state').text()).toBe('done');
    expect(wrapper.find('.x').text()).toBe('0');
    expect(wrapper.find('.y').text()).toBe('0');
    wrapper.unmount();
  });
});