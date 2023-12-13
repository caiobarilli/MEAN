export function minutesToMilliseconds(minutes: number): number {
  const millisecondsInMinute = 60 * 1000;
  return minutes * millisecondsInMinute;
}
