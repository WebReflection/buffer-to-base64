/**
 * Given a generic buffer, optionally compress it and returns its `base64` representation.
 * @param {ArrayBuffer | Uint8Array} buffer a generic buffer to optionally compress and return as base64.
 * @param {CompressionFormat | ''} format an optional compression format with `deflate` as default.
 * @returns {Promise<string>} the base64 representation of the optionally compressed buffer.
 */
export const encode = async (buffer, format = 'deflate') => {
  for (var
    blob = new Blob([buffer]),
    res = format ?
      new Response(blob.stream().pipeThrough(new CompressionStream(format))) :
      blob
    ,
    view = new Uint8Array(await res.arrayBuffer()),
    { fromCharCode } = String,
    { length } = view,
    out = '',
    c = 2000,
    i = 0; i < length; i += c
  ) out += fromCharCode(...view.subarray(i, i + c));
  return btoa(out);
};
