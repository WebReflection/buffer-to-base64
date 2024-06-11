/**
 * Given a base64 string, optionally decompress it and returns its `ArrayBuffer` representation.
 * @param {string} btoa a previously encoded base64 representation of a buffer.
 * @param {CompressionFormat | ''} format an optional compression format with `deflate` as default.
 * @returns {Promise<ArrayBuffer>} the buffer representing the optionally decompressed base64.
 */
export const decode = (btoa, format = 'deflate') => {
  for (var
    blob,
    str = atob(btoa),
    { length } = str,
    buffer = new Uint8Array(length),
    i = 0; i < length; i++
  ) buffer[i] = str.charCodeAt(i);
  blob = new Blob([buffer]);
  return (
    format ?
      new Response(blob.stream().pipeThrough(new DecompressionStream(format))) :
      blob
  ).arrayBuffer();
};
