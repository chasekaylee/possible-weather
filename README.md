


<div align="center">
  <sub>
  Created by <a href="https://www.linkedin.com/in/chasekaylee/">Chase lee</a> and maintained with ❤️ </sub>
</div>

## Quick start

1.  Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2.  Clone this repo using `git clone https://github.com/chasekaylee/possible-weather.git <YOUR_PROJECT_NAME>`
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  Run `npm install` in order to install dependencieso.<br />
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
5.  Run `npm start` and see the app running locally at `http://localhost:3000`.

## Post write up

This project was written in React and was bootstraped using React-Boilerplate. The work was distributed throughout the weekend and time spent developing was ~6 hours (had some fun so wanted to work a little longer). Although the app is complete there are some things on the top of my head I would like to improve. The following list shows some of the things on the top of my mind that are left to improve.

- [ ] 100% code coverage
- [ ] Add proper loading placeholder (vs content disppearing)
- [ ] Add adequate error handling based on API error edge cases
- [ ] Improve client/API response structure (established error codes)
- [ ] Clean up containers + component code
- [ ] Cache responses to limit API request to third parties?
- [ ] GraphQL? :O

The design I chose was based on the [container/component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw) architecture introduced by Dan Abramov years ago. This architecture has proven very reliable to me in production which is why I choose to use it for this project. With React hooks / React evolving as a whole this architecture paradigm is evolving, however, I still find it useful to use. This project is production ready and is structure to scale (both developer and client facing). The use of codesplitting and async load of resources allows the app to be highly performant as well. This is better demonstrated on applications of higher size and complexity.

I chose to put all my business / stateful logic in my containers and manage all my async side effects in the Redux Sagas. This method helps me organize my code in a structure that is both robust and intutive to me. I choose to also create a simple backend to proxy the API requests to the third parties to hide my API keys. Having my own backend also gives me flexibily to format the responses to my choosing.

