/**
 *  Convert a file size in bytes to human readable sizes
 * @param fileSizeInBytes
 * @returns {string}
 */
export const getReadableFileSizeString = fileSizeInBytes => {
  let i = -1
  const byteUnits = [' kbps', ' Mbps', ' Gbps', ' Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps']
  do {
    fileSizeInBytes /= 1024
    i++
  } while (fileSizeInBytes > 1024)

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i]
}

/**
 * Return the bandwidth dash plotline
 * @param color
 * @param value
 * @returns {{color: *, dashStyle: string, width: number, label: {text: string, align: string}, value: *, zIndex: number}}
 */
export const getPlotLine = (color, value) => ({
  color,
  width: 2,
  value,
  dashStyle: 'dash',
  label: {
    text: `Maximum throughput ${getReadableFileSizeString(value)}`,
    align: 'right'
  },
  zIndex: 99
})
