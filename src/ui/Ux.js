//swipe in menu
export function swipeInMenu(touchStartX, touchEndX, setSidebarOpen) {
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }

  function onTouchEnd() {
    const swipeDistance = touchEndX.current - touchStartX.current;

    // swipe right → open
    if (swipeDistance > 70) {
      setSidebarOpen(true);
    }

    // swipe left → close
    if (swipeDistance < -70) {
      setSidebarOpen(false);
    }
  }

  return { onTouchStart, onTouchMove, onTouchEnd };
}

//close menu on clicking outside
