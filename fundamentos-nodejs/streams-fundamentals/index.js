import { CountFromOneToOneHundred } from "./streams/count-from-one-to-one-hundred.js";
import { TurnNumberToNegative } from "./streams/turn-number-to-negative.js";
import { WhriteTheNumber } from "./streams/whrite-the-number.js";

class Application {
  countFromOneToOneHundred = new CountFromOneToOneHundred();
  turnNumberToNegative = new TurnNumberToNegative();
  whriteTheNumber = new WhriteTheNumber();

  main() {
    this.countFromOneToOneHundred
      .pipe(this.turnNumberToNegative)
      .pipe(this.whriteTheNumber);
  }
}

new Application().main();
