# Mars Rover v.2

A solution to the Mars Rover challenge for Platform45.

### Setting up the app

To install all relevant Node packages, run

```bash
npm ci
```

## Explanation of app

Mars Rover v.2 is a solution to the [Mars Rover coding challenge](https://code.google.com/archive/p/marsrovertechchallenge/). My application is a terminal application that receives all relevant data from the user. I perform some validation on this data to make sure it is in the correct form, throwing errors and allowing for correction in most cases.

For my second go at this challenge, not only did I do it in TypeScript, but I tried to apply some OOP principles learnt from Metz's [Practical Object-Oriented Design in Ruby](https://www.poodr.com/) and from work done with the [Nestjs](https://nestjs.com/) framework. I encapsulated responsibilities in classes and handled their dependencies by injecting them where required.

The point of entry for this app is [`main.ts`](https://github.com/scholtz-gnome/mars-rover-2/blob/main/src/main.ts).

While coding this app, I assumed

- the rovers complete their instructions sequentially and don't clash on the plateau
- the rovers cannot exceed the bounds of the plateau
- user data is not persisted between sessions of the app

### Running the app

```bash
npm run app
```

Follow the prompts in your terminal to play the game. Hit `ctrl+c` to exit the game.

## Explanation of Tests

The code coverage is quite low as testing the `stdin` and `stdout` of Node's `process` is quite tricky. In the interests of time, I therefore only wrote [unit tests](https://github.com/scholtz-gnome/mars-rover-2/blob/main/src/app.spec.ts) for the crucial small methods that move and direct the rover.

The [`e2e` spec](https://github.com/scholtz-gnome/mars-rover-2/blob/main/tests/app.e2e-spec.ts) tests that, given the correct user input, the app works from start to finish. The first test in this suite uses the [example given in the challenge](https://code.google.com/archive/p/marsrovertechchallenge/) as test data.

### Running the unit tests

To run the unit tests, run

```bash
npm run test
```

To run them with coverage, run

```bash
npm run test:cov
```

The coverage report for the units tests is stored in the `coverage` directory.

To run the tests in watch mode, run

```bash
npm run test:watch
```

### Running the e2e tests

The e2e test tests a typical user journey through the app.

To run the e2e tests, run

```bash
npm run test:e2e
```

To run the e2e tests with coverage, run

```bash
npm run test:e2e:cov
```

The coverage report is stored in the `tests/coverage` directory.

To run the e2e tests in watch mode, run

```bash
npm run test:e2e:watch
```
