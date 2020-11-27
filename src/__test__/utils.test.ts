import {getIsMobile, getAbsolutePositionFunc, getEventNameByDevice} from '../utils';

describe("getIsMobile 함수 테스트", () => {
  test('브라우저 환경이 아니라면 false를 반환한다.', () => {
    Object.defineProperty(global.process, 'browser', {
      value: false,
      writable: true
    });

    expect(getIsMobile()).toBeFalsy();
  })

  test('아이폰으로 접속했을 경우 true를 반환한다.', () => {
    Object.defineProperty(global.process, 'browser', {
      value: true,
      writable: true
    });
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'iPhone',
      writable: true
    });
    expect(getIsMobile()).toBeTruthy();
  });
  test('윈도우로 접속했을 경우 false를 반환한다.', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Windows',
      writable: true
    });
    expect(getIsMobile()).toBeFalsy();
  })
});

describe('getAbsolutePositionFunc 커링 함수 테스트', () => {
  document.body.innerHTML = '<div id="test_element"></div>';
  const div = document.getElementById("test_element");
  const getPosition = getAbsolutePositionFunc(div);

  test("해당 함수를 실행하면 상대값 좌표를 반환해주는 함수를 반환한다.", () => {
    expect(getPosition).toHaveProperty('constructor');
  });
  test('반환 받은 함수를 실행하면 상대 좌표값을 반환한다.', () => {
    expect([getPosition('y'), getPosition('x')]).toStrictEqual([0, 0]);
  })
});

describe('getEventNameByDevice 함수 테스트', () => {
  test.each([
    [
      'mobile', 
      {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'  
      }
    ],
    [
      'desktop', 
      {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
      }
    ]
  ])('접속 디바이스가 %s라면 %j을 반환한다.', (device, expected) => {
    expect(getEventNameByDevice(device === 'mobile')).toStrictEqual(expected)
  });
})

