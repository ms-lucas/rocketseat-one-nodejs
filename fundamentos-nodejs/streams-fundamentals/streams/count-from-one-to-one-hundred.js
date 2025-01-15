import { Readable } from "node:stream";

export class CountFromOneToOneHundred extends Readable {
  index = 0;

  _read() {
    this.index++;
    const chunk = Buffer.from(String(this.index));

    setTimeout(() => {
      if (this.index <= 100) {
        this.push(chunk);
      } else {
        this.push(null);
      }
    }, 100);
  }
}
