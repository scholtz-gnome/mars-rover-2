import { App } from "../src/app";

describe("Mars Rover App", () => {
  let app: App;

  beforeAll(() => {
    app = new App();
  });

  it("return Hello", () => {
    expect(app.play()).toEqual("Let's play!");
  });
});
