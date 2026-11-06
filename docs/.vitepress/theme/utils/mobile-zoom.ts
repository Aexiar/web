let installed = false

/** Keep scrolling available while blocking native touch zoom, including iOS gestures. */
export function disableMobileZoom() {
  if (installed || typeof document === 'undefined') return
  installed = true

  const preventGesture = (event: Event) => {
    if (event.cancelable) event.preventDefault()
  }
  const preventMultitouch = (event: TouchEvent) => {
    if (event.touches.length > 1) preventGesture(event)
  }

  // Safari exposes native pinch gestures independently of viewport restrictions.
  document.addEventListener('gesturestart', preventGesture, { passive: false })
  document.addEventListener('gesturechange', preventGesture, { passive: false })
  document.addEventListener('touchstart', preventMultitouch, { passive: false })
  document.addEventListener('touchmove', preventMultitouch, { passive: false })
}
