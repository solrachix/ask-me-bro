// Credits to Akram Khalid
import React, { useEffect, useRef, useCallback } from 'react'
import useWindowSize from './useWindowSize'
let __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (let s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (const p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) {
              t[p] = s[p]
            }
          }
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
const __rest =
  (this && this.__rest) ||
  function (s, e) {
    const t = {}
    for (const p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) {
        t[p] = s[p]
      }
    }
    if (s != null && typeof Object.getOwnPropertySymbols === 'function') {
      for (let i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        ) {
          t[p[i]] = s[p[i]]
        }
      }
    }
    return t
  }

export default function SmoothProvider(_a) {
  const ease = _a.ease
  const skew = _a.skew
  const children = _a.children
  const props = __rest(_a, ['ease', 'skew', 'children'])
  // Hook to grab window size
  const size = useWindowSize()
  useRef()
  // Ref for parent div and scrolling div
  const app = useRef(null)
  const scrollContainer = useRef(null)
  // Configs
  const data = {
    ease: Math.max(
      0,
      Math.min(1, ease !== null && ease !== undefined ? ease : 0.1)
    ),
    current: 0,
    previous: 0,
    rounded: 0
  }
  // Scrolling
  const skewScrolling = useCallback(
    function () {
      let _a
      // Set Current to the scroll position amount
      data.current = window.scrollY
      // Set Previous to the scroll previous position
      data.previous += (data.current - data.previous) * data.ease
      // Set rounded to
      data.rounded = Math.round(data.previous * 100) / 100
      // Difference between
      const difference = data.current - data.rounded
      const acceleration = difference / size.width
      const velocity = +acceleration
      const skewing = skew ? velocity * 7.5 : 0
      // Assign skew and smooth scrolling to the scroll container
      if (
        (_a = scrollContainer.current) === null || _a === undefined
          ? undefined
          : _a.style
      ) {
        const translate3d = 'translate3d(0, -' + data.rounded + 'px, 0)'
        const skewY = 'skewY(' + skewing + 'deg)'
        scrollContainer.current.style.transform = translate3d + ' ' + skewY
      }
      // loop vai raf
      requestAnimationFrame(skewScrolling)
    },
    [data, size.width]
  )
  // Run scrollrender once page is loaded.
  useEffect(
    function () {
      requestAnimationFrame(skewScrolling)
    },
    [skewScrolling]
  )
  // Set the height of the body to the height of the scrolling div
  const setBodyHeight = function () {
    let _a
    document.body.style.height =
      ((_a = scrollContainer.current) === null || _a === undefined
        ? undefined
        : _a.getBoundingClientRect().height) + 'px'
  }
  // set the height of the body.
  useEffect(
    function () {
      setBodyHeight()
    },
    [size.height]
  )

  return React.createElement('div', { ref: scrollContainer }, children)
}
