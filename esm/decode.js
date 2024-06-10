/**
 * Given a base64 string, optionally decompress it and returns its `ArrayBuffer` representation.
 * @param {string} bota a previously base64 representation of a buffer.
 * @param {CompressionFormat | ''} format an optional compression format with `deflate` as default.
 * @returns {ArrayBuffer} the buffer representing the optionally decompressed base64.
 */
export const decode = async (bota, format = 'deflate') => {
  const str = atob(bota);
  const buffer = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++)
    buffer[i] = str.charCodeAt(i);
  let response = new Blob([buffer]);
  if (format) {
    const stream = new DecompressionStream(format);
    response = response.stream().pipeThrough(stream);
  }
  return await new Response(response).arrayBuffer();
};
  