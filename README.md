## Nur.js - easy to use, fast and secure framework
Nur.js is a Laravel-like framework for Node.js, ready to give you out-of-the-box rich functionality to create a REST or GraphQL API, testesting and go to production faster.

<h4 style="color: indianred">The current version, 1.1.0, is in beta testing and is not an LTS version, so there may be some issues. You are free to open an <u>issue report</u> or <u>contribute</u>.</h4>

<hr />
## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Scripts and Tasks](#-scripts-and-tasks)
- [Debugger in VSCode](#-debugger-in-vscode)
- [API Routes](#-api-routes)
- [Project Structure](#-project-structure)
- [Logging](#-logging)
- [Event Dispatching](#-event-dispatching)
- [Seeding](#-seeding)
- [GraphQL](#-graph-q-l)
- [Docker](#-docker)
- [Further Documentations](#-further-documentations)
- [Related Projects](#-related-projects)
- [License](#-license)


## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`
- on Debian and Ubuntu `apt install node`
- on RHEL and CentOS `yum install node`
- on Fedora `dnf install node`
- on Arch and Manjaro `pacman -Syu node`

Install yarn globally

```bash
yarn global add yarn
```

Install a MySQL database.

> If you work with a mac, we recommend to use homebrew for the installation.

### Step 2: Create new Project

Clone this repository
```bash
git clone https://github.com/mrananyan/nurjs  YOUR_PROJECT_NAME
```

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env`-file.

Then setup your application environment.

```bash
yarn run setup
```

> This installs all dependencies with yarn. After that it migrates the database and seeds some test data into it. So after that your development environment is ready to use.

### Step 3: Serve your App

Go to the project dir and start your app with this yarn script.

```bash
yarn start serve
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://0.0.0.0:3000`.

## ❯ Scripts and Tasks

All script are defined in the `package-scripts.js` file, but the most important ones are listed here.

### Install

- Install all dependencies with `yarn install`

### Linting

- Run code quality analysis using `yarn start lint`. This runs tslint.
- There is also a vscode task for this called `lint`.

### Tests

- Run the unit tests using `yarn start test` (There is also a vscode task for this called `test`).
- Run the integration tests using `yarn start test.integration`.
- Run the e2e tests using `yarn start test.e2e`.

### Running in dev mode

- Run `yarn start serve` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `yarn start build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `yarn start`.

### Database Migration

- Run `typeorm migration:create -n <migration-file-name>` to create a new migration file.
- Try `typeorm -h` to see more useful cli commands like generating migration out of your models.
- To migrate your database run `yarn start db.migrate`.
- To revert your latest migration run `yarn start db.revert`.
- Drops the complete database schema `yarn start db.drop`.

### Database Seeding

- Run `yarn start db.seed` to seed your seeds into the database.

## ❯ Debugger in VSCode

To debug your code run `yarn start build` or hit <kbd>cmd</kbd> + <kbd>b</kbd> to build your app.
Then, just set a breakpoint and hit <kbd>F5</kbd> in your Visual Studio Code.

## ❯ API Routes

The route prefix is `/api/v1` by default, but you can change this in the .env file.
The swagger and the monitor route can be altered in the `.env` file.

| Route          | Description |
| -------------- | ----------- |
| **/api/v1**    | Shows us the name, description and the version of the package.json    |
| **/graphql**   | Route to the graphql editor or your query/mutations requests |
| **/swagger**   | This is the Swagger UI with our API documentation |
| **/monitor**   | Shows a small monitor page for the server |
| **/api/v1/users** | Example entity endpoint |
| **/api/v1/photos**  | Example entity endpoint |

## ❯ Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **dist/**                         | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/api/controllers/**          | REST API Controllers |
| **src/api/controllers/requests**  | Request classes with validation rules if the body is not equal with a model |
| **src/api/controllers/responses** | Response classes or interfaces to type json response bodies  |
| **src/api/errors/**               | Custom HttpErrors like 404 NotFound |
| **src/api/interceptors/**         | Interceptors are used to change or replace the data returned to the client. |
| **src/api/middlewares/**          | Express Middlewares like helmet security features |
| **src/api/models/**               | TypeORM Models |
| **src/api/repositories/**         | Repository / DB layer |
| **src/api/services/**             | Service layer |
| **src/api/subscribers/**          | Event subscribers |
| **src/api/validators/**           | Custom validators, which can be used in the request classes |
| **src/api/resolvers/**            | GraphQL resolvers (query, mutation & field-resolver) |
| **src/api/types/**                | GraphQL types ,input-types and scalar types |
| **src/api/** schema.gql           | Generated GraphQL schema |
| **src/auth/**                     | Authentication checkers and services |
| **src/core/**                     | The core features like logger and env variables |
| **src/database/factories**        | Factory the generate fake entities |
| **src/database/migrations**       | Database migration scripts |
| **src/database/seeds**            | Seeds to create some data in the database |
| **src/decorators/**               | Custom decorators like @Logger & @EventDispatch |
| **src/loaders/**                  | Loader is a place where you can configure your app |
| **src/public/**                   | Static assets (fonts, css, js, img). |
| **src/types/** *.d.ts             | Custom type definitions and files that aren't on DefinitelyTyped |
| **test**                          | Tests |
| **test/e2e/** *.test.ts           | End-2-End tests (like e2e) |
| **test/integration/** *.test.ts   | Integration test with SQLite3 |
| **test/unit/** *.test.ts          | Unit tests |
| .env.example                      | Environment configurations |
| .env.test                         | Test environment configurations |
| mydb.sql                          | SQLite database for integration tests. Ignored by git and only available after integration tests |

## ❯ Logging

Our logger is [winston](https://github.com/winstonjs/winston). To log http request we use the express middleware [morgan](https://github.com/expressjs/morgan).
We created a simple annotation to inject the logger in your service (see example below).

```typescript
import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export class UserService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    ...
```

## ❯ Event Dispatching

We use this awesome repository [event-dispatch](https://github.com/pleerock/event-dispatch) for event dispatching.
We created a simple annotation to inject the EventDispatcher in your service (see example below). All events are listed in the `events.ts` file.

```typescript
import { events } from '../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';

@Service()
export class UserService {

    constructor(
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface
    ) { }

    public async create(user: User): Promise<User> {
        ...
        this.eventDispatcher.dispatch(events.user.created, newUser);
        ...
    }
```

## ❯ Seeding

Isn't it exhausting to create some sample data for your database, well this time is over!

How does it work? Just create a factory for your entities (models) and a seed script.

### 1. Create a factory for your entity

For all entities we want to seed, we need to define a factory. To do so we give you the awesome [faker](https://github.com/marak/Faker.js/) library as a parameter into your factory. Then create your "fake" entity and return it. Those factory files should be in the `src/database/factories` folder and suffixed with `Factory` like `src/database/factories/UserFactory.ts`.

Settings can be used to pass some static value into the factory.

```typescript
define(User, (faker: typeof Faker, settings: { roles: string[] }) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.roles = settings.roles;
    return user;
});
```

Handle relation in the entity factory like this.

```typescript
define(Photo, (faker: typeof Faker, settings: undefined) => {

    const photo = new Photo();
    photo.path = 'https://example.com/photo.jpg';
    photo.kind = ;'avatar'
    photo.description = ;'An avatar'
    photo.user = factory(User)({ roles: ['admin'] })
    return photo;
});
```

### 2. Create a seed file

The seeds files define how much and how the data are connected with each other. The files will be executed alphabetically.
With the second function, accepting your settings defined in the factories, you are able to create different variations of entities.

```typescript
export class CreateUsers implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        await factory(User)({ roles: [] }).createMany(10);
    }

}
```

Here an example with nested factories. You can use the `.map()` function to alter
the generated value before they get persisted.

```typescript
...
await factory(User)()
    .map(async (user: User) => {
        const photos: Photo[] = await factory(Photo)().createMany(2);
        const photoIds = photos.map((photo: Photo) => photo.Id);
        await user.photos().attach(photods);
    })
    .createMany(5);
...
```

To deal with relations you can use the entity manager like this.

```typescript
export class CreatePhoto implements SeedsInterface {

    public async seed(factory: FactoryInterface, connection: Connection): Promise<any> {
        const connection = await factory.getConnection();
        const em = connection.createEntityManager();

        await times(10, async (n) => {
            // This creates a photo in the database
            const photo = await factory(Photo)().create();
            // This only returns a entity with fake data
            const user = await factory(User)({ roles: ['admin'] }).make();
            user.photos = [photo];
            await em.save(user);
        });
    }

}
```

### 3. Run the seeder

The last step is the easiest, just hit the following command in your terminal, but be sure you are in the projects root folder.

```bash
yarn start db.seed
```

#### CLI Interface

| Command                                              | Description |
| ---------------------------------------------------- | ----------- |
| `yarn start "db.seed"`                               | Run all seeds |
| `yarn start "db.seed --run CreateBruce,CreatePhotos"`  | Run specific seeds (file names without extension) |
| `yarn start "db.seed -L"`                            | Log database queries to the terminal |
| `yarn start "db.seed --factories <path>"`            | Add a different path to your factories (Default: `src/database/`) |
| `yarn start "db.seed --seeds <path>"`                | Add a different path to your seeds (Default: `src/database/seeds/`) |

## ❯ GraphQL

For the GraphQL part we used the library [TypeGraphQL](https://19majkel94.github.io/type-graphql/) to build awesome GraphQL API's.

The context(shown below) of the GraphQL is builded in the **graphqlLoader.ts** file. Inside of this loader we create a scoped container for each incoming request.

```typescript
export interface Context {
  requestId: number;
  request: express.Request;
  response: express.Response;
  container: ContainerInstance;
}
```

### DataLoader

For the usage of the DataLoaders we created a annotation, which automatically creates and registers a new DataLoader to the scoped container.

Here is an example of the **PhotoResolver**.

```typescript
import DataLoader from 'dataloader';
import { DLoader } from '../../decorators/DLoader';
    ...
    constructor(
        private photoService: PhotoService,
        @Logger(__filename) private log: LoggerInterface,
        @DLoader(UserModel) private userLoader: DataLoader<string, UserModel>
    ) { }
    ...
```

Or you could use the repository too.

```typescript
@DLoader(UserRepository) private userLoader: DataLoader<string, UserModel>
```

Or even use a custom method of your given repository.

```typescript
@DLoader(PhotoRepository, {
    method: 'findByUserIds',
    key: 'userId',
    multiple: true,
}) private photoLoader: DataLoader<string, PhotoModel>
```

## ❯ Docker

### Install Docker

Before you start, make sure you have a recent version of [Docker](https://docs.docker.com/engine/installation/) installed

### Build Docker image

```shell
docker build -t <your-image-name> .
```

### Run Docker image in container and map port

The port which runs your application inside Docker container is either configured as `PORT` property in your `.env` configuration file or passed to Docker container via environment variable `PORT`. Default port is `3000`.

#### Run image in detached mode

```shell
docker run -d -p <port-on-host>:<port-inside-docker-container> <your-image-name>
```

#### Run image in foreground mode

```shell
docker run -i -t -p <port-on-host>:<port-inside-docker-container> <your-image-name>
```

### Stop Docker container

#### Detached mode

```shell
docker stop <container-id>
```

You can get a list of all running Docker container and its ids by following command

```shell
docker images
```

#### Foreground mode

Go to console and press <CTRL> + C at any time.

### Docker environment variables

There are several options to configure your app inside a Docker container

#### project .env file

You can use `.env` file in project root folder which will be copied inside Docker image. If you want to change a property inside `.env` you have to rebuild your Docker image.

#### run options

You can also change app configuration by passing environment variables via `docker run` option `-e` or `--env`.

```shell
docker run --env DB_HOST=localhost -e DB_PORT=3306
```

#### environment file

Last but not least you can pass a config file to `docker run`.

```shell
docker run --env-file ./env.list
```

`env.list` example:

```
# this is a comment
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
```

## ❯ Further Documentations

| Name & Link                       | Description                       |
| --------------------------------- | --------------------------------- |
| [Express](https://expressjs.com/) | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. |
| [Microframework](https://github.com/pleerock/microframework) | Microframework is a simple tool that allows you to execute your modules in a proper order, helping you to organize bootstrap code in your application. |
| [TypeDI](https://github.com/pleerock/typedi) | Dependency Injection for TypeScript. |
| [routing-controllers](https://github.com/pleerock/routing-controllers) | Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework. |
| [TypeORM](http://typeorm.io/#/) | TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework. |
| [class-validator](https://github.com/pleerock/class-validator) | Validation made easy using TypeScript decorators. |
| [class-transformer](https://github.com/pleerock/class-transformer) | Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors |
| [event-dispatcher](https://github.com/pleerock/event-dispatch) | Dispatching and listening for application events in Typescript |
| [Helmet](https://helmetjs.github.io/) | Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help! |
| [Auth0 API Documentation](https://auth0.com/docs/api/management/v2) | Authentification service |
| [Jest](http://facebook.github.io/jest/) | Delightful JavaScript Testing Library for unit and e2e tests |
| [supertest](https://github.com/visionmedia/supertest) | Super-agent driven library for testing node.js HTTP servers using a fluent API |
| [nock](https://github.com/node-nock/nock) | HTTP mocking and expectations library |
| [swagger Documentation](http://swagger.io/) | API Tool to describe and document your api. |
| [SQLite Documentation](https://www.sitepoint.com/getting-started-sqlite3-basic-commands/) | Getting Started with SQLite3 – Basic Commands. |
| [GraphQL Documentation](http://graphql.org/graphql-js/) | A query language for your API. |
| [DataLoader Documentation](https://github.com/facebook/dataloader) | DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching. |

## ❯ Related Projects

- [Microsoft/TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter) - A starter template for TypeScript and Node with a detailed README describing how to use the two together.
- [express-graphql-typescript-boilerplate](https://github.com/w3tecch/express-graphql-typescript-boilerplate) - A starter kit for building amazing GraphQL API's with TypeScript and express by @w3tecch
- [aurelia-typescript-boilerplate](https://github.com/w3tecch/aurelia-typescript-boilerplate) - An Aurelia starter kit with TypeScript
- [Auth0 Mock Server](https://github.com/hirsch88/auth0-mock-server) - Useful for e2e testing or faking an oAuth server
