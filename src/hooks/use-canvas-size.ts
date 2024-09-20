const devicePixelRatio = window.devicePixelRatio || 1

export const useCanvasSize = (width: number, height: number) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }

  return {
    style,
    width: width * devicePixelRatio,
    height: height * devicePixelRatio,
  }
}
