# Sequin Frontend

## Local development

- You must have the backend running (please see instructions at root README.md)
- `yarn` to install dependencies
- `yarn start` to run the dashboard frontend in development mode at
  http://localhost:3000

## Notes for handoff

There are a lot of unused packages and files in client. I think it's because the
dashboard was initially built with some boilerplate React code that added a lot
of extra code that we don't use (/vendor, /shared/layouts, etc). When I started
contributing to this codebase, redux was set up, and I changed a few things in
/store/index.js to make it easier to use. /api, /store/actions, and
/store/reducers are the three folders you'll be working with when adding new
backend endpoint support. In some places, we do use React hooks instead of
redux. Components live in /features. Some components are from react-bootstrap so
some things (such as tabs in Settings) don't look exactly like Figma designs.
Note: not all files have been formatted by prettier. Please use prettier! CSS
styles are also a bit confusing/messy because some classes are from the
boilerplate code.
