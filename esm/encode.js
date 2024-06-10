const VIEW_CHUNK_SIZE = 2000;

/**
 * Given a generic buffer, optionally compress it and returns its `base64` representation.
 * @param {ArrayBuffer | Uint8Array} buffer a generic buffer to optionally compress and return as base64.
 * @param {CompressionFormat | ''} format an optional compression format with `deflate` as default.
 * @returns {string} the base64 representation of the optionally compressed buffer.
 */
export const encode = async (buffer, format = 'deflate') => {
  let response = new Blob([buffer]);
  if (format) {
    const stream = new CompressionStream(format);
    response = response.stream().pipeThrough(stream);
  }
  const view = new Uint8Array(await new Response(response).arrayBuffer());
  let out = '';
  const viewLength = view.length;
  for (let i = 0; i < viewLength; i += VIEW_CHUNK_SIZE)
    out += String.fromCharCode(...view.subarray(i, i + VIEW_CHUNK_SIZE));
  return btoa(out);
};
