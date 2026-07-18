function localizedKey(
  t: (key: string) => string,
  key: string,
  fallback: string
): string {
  const translated = t(key);
  return translated === key ? fallback : translated;
}

export function localizedDesc(
  t: (key: string) => string,
  roomId: number,
  fallback: string
): string {
  return localizedKey(t, `room.desc_${roomId}`, fallback);
}

export function localizedRoomName(
  t: (key: string) => string,
  roomId: number,
  fallback: string
): string {
  return localizedKey(t, `room.name_${roomId}`, fallback);
}
