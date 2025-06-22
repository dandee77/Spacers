export function isOnScreen({ x, y }, margin = 50) {
  return (
    x > -margin &&
    x < window.innerWidth + margin &&
    y > -margin &&
    y < window.innerHeight + margin
  );
}
