# leboncoin API

## Overview

An express server for leboncoin clone

<p align="center">
	<img
			width="600"
			alt="demo"
			src="https://github.com/sebkpf/leboncoin-react/blob/master/documentation/demo.png">
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

- publish (with <a href="https://cloudinary.com" target="\_blank">Cloudinary</a> upload)
- get offers (with mongoose filters)
- get one offer by its id
- payment via <a href="https://stripe.com" target="\_blank">Stripe</a>

#### Packages

- <a href="https://nodejs.org/en/" target="\_blank">Node.js</a>
- <a href="https://www.npmjs.com/package/axios" target="\_blank">axios</a>
- <a href="https://www.npmjs.com/package/express" target="\_blank">express</a>
- <a href="https://www.npmjs.com/package/express-formidable" target="\_blank">express-formidable</a>
- <a href="https://www.npmjs.com/package/cors" target="\_blank">cors</a>
- <a href="https://www.npmjs.com/package/mongoose" target="\_blank">mongoose</a>
- <a href="https://www.npmjs.com/package/crypto-js" target="\_blank">crypto-js</a>
- <a href="https://www.npmjs.com/package/js-md5" target="\_blank">js-md5</a>
- <a href="https://www.npmjs.com/package/uid2" target="\_blank">uid2</a>
- <a href="https://www.npmjs.com/package/dotenv" target="\_blank">dotenv</a>
- <a href="https://www.npmjs.com/package/cloudinary" target="\_blank">Cloudinary</a>
- <a href="https://www.npmjs.com/package/stripe" target="\_blank">Stripe</a>

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

## Marvel Client

<a href="https://github.com/sebkpf/leboncoin-react">https://github.com/sebkpf/leboncoin-react</a>

- React
- HTTP request with axios package (get and post)
- Hooks (useState, useEffect)
- React Router Dom
- Stripe React component
- Loading React component

## Deployment

- Client deployed with Netlify
- Server deployed with Heroku
- MongoDB database hosted on mLab

## Project status

Project is finished

## Contact

<a href="https://www.linkedin.com/in/sebastienkempf/" target="_blank">My LinkedIn profile</a>
