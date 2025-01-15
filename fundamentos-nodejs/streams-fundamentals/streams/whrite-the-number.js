export class WhriteTheNumber extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString()) * 10;
    console.log(number);
    callback();
  }
}
