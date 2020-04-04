# leboncoin API

## Overview

An express server for leboncoin clone

<p align="center">
	<img
			width="1000"
			alt="demo"
			src="https://github.com/sebkpf/leboncoin-react/blob/master/documentation/demo.gif">
</p>

<p align="center">
  Demo:<a href="https://leboncoin-clone.netlify.com" target="_blank"> https://leboncoin-clone.netlify.com</a>
</p>

### Server

#### Architecture

##### User

- login
- signup

##### Offer

- publish (with [Cloudinary](https://cloudinary.com) upload)
- get offers (with mongoose filters)
- get one offer by its id
- payment via [Stripe](https://stripe.com)

#### Packages

- [Node.js](https://nodejs.org/en/)
- [axios](https://www.npmjs.com/package/axios)
- [express](https://www.npmjs.com/package/express)
- [express-formidable](https://www.npmjs.com/package/express-formidable)
- [cors](https://www.npmjs.com/package/cors)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [crypto-js](https://www.npmjs.com/package/crypto-js)
- [js-md5](https://www.npmjs.com/package/js-md5)
- [uid2](https://www.npmjs.com/package/uid2)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Cloudinary](https://www.npmjs.com/package/cloudinary)
- [Stripe](https://www.npmjs.com/package/stripe)

### Running the project

Clone this repository:

```
git clone https://github.com/sebkpf/leboncoin-backend.git
cd leboncoin-backend
```

Install packages:

```
npm install
```

When installation is complete, run with:

```bash
npx nodemon index.js
```

## leboncoin Client

[https://github.com/sebkpf/leboncoin-react](https://github.com/sebkpf/leboncoin-react)

- [React](https://reactjs.org/docs/getting-started.html)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [React Stripe Elements](https://github.com/stripe/react-stripe-elements)
- [React Loading Elements](https://github.com/jxnblk/loading)
- [React Nuka Carousel Elements](https://github.com/FormidableLabs/nuka-carousel)
- [JS Cookie](https://github.com/js-cookie/js-cookie)
- [Axios](https://github.com/axios/axios)

## Deployment

- Client deployed with Netlify
- Server deployed with Heroku
- MongoDB database hosted on mLab

## Project status

Project is finished

## Contact

[My LinkedIn profile](https://www.linkedin.com/in/sebastienkempf/)
