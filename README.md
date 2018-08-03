# Integrate Prismic, an API-based CMS, in your Next.js application.

We are going to explore how to integrate Prismic in a Next.js application  step by step.
For this tutorial, we'll consider that you're starting from a simple Next.js application without a specific server configuration and a simple routing based on the `pages` folder.
All the examples below come from this sample.
Don't hesitate to go through the code to put these example in context.

So lets dive right into it!

## Table of content

 - [Installation](#installation)
 - [Configuration to connect to Prismic](#configuration-to-connect-to-prismic)
 - [How to create a Prismic client](#how-to-create-a-prismic-client)
	 - [A client for server side rendering](#a-client-for-server-side-rendering)
 - [Link Resolving](#link-resolving)
 - [How to manage a dynamic routing](#how-to-manage-a-dynamic-routing)
	 - [Build your router](#build-your-router)
	 - [Build your server](#build-your-server)
	 - [Update your build configuration](#update-your-build-configuration)
	 - [How to use a dynamic route parameter in a component](#How-to-use-a-dynamic-route-parameter-in-a-component)
 - [How to query your content from Prismic](#how-to-query-your-content-from-prismic)
 - [How to integrate your content in your templates](#how-to-integrate-your-content-in-your-templates)
 - [Setup the Prismic preview](#setup-the-prismic-preview)
 - [Want more?](#want-more)


## Installation

Install `prismic-javascript` to make queries.
```shell
npm install --save prismic-javascript@2.0.0-beta.0
```
Install `prismic-reactjs` to quickly render structured content from Prismic API.
```shell
npm install --save prismic-reactjs
```
Install `express` to build a server and use its embedded url matching system.
```shell
npm install --save express
```
Install `next-routes` to build a router.
```shell
npm install --save next-routes
```

## How to connect to your Prismic API
Prismic offers an API which you can contact by specifying an endpoint but also an access token if you want your API to be private.
We'll create a configuration file to declare these:

**Configuration:**

*prismic-configuration.json*
```json
{
	"apiEndpoint": "https://your-repo-name.cdn.prismic.io/api/v2",
	"accessToken": "123456789"
}
```
## How to create a Prismic client
The Prismic client is a JavaScript object coming from the library `prismic-javascript` that helps you build queries to retrieve your content from your Prismic API.
It provides multiple ways to retrieve it, [by custom type](#https://prismic.io/docs/reactjs/query-the-api/query-single-type-document), [by a specific UID](#https://prismic.io/docs/reactjs/query-the-api/query-by-id-or-uid), [by multiple predicates](#https://prismic.io/docs/reactjs/query-the-api/use-multiple-predicates) etc.

### A client for server side rendering
First we're gonna create a module to export the Prismic client.
For the server side, we'll need to provide the `request` object to the Prismic client so we can get cookies for [the Prismic preview](#setup-the-prismic-preview).

**Instantiate the client:**

*prismic.js*
```javascript
import  PrismicLib  from  'prismic-javascript'
import  PrismicConfig  from  './prismic-configuration.json'
let  frontClient
export  const  Client  = (req  =  null) => {
	if(!req  &&  frontClient) return  frontClient  //prevent generate new instance for client side since we don't need the refreshed request object.
	else {
		const  options  =  Object.assign({}, req  ? {req} : {}, PrismicConfig.accessToken  ? {accessToken:  PrismicConfig.accessToken} : {})
	return  Prismic.client(PrismicConfig.apiEndpoint, options)
	}
}
```

## Link Resolving
Another major concept in Prismic is the link resolver. It helps you resolve the url of a Prismic document.
It's useful for [the Prismic preview](#setup-the-prismic-preview) but also when you have a link from one document to another.
The API is going to return all the metadata of the linked document and your link resolver will be able to convert this to a url for your website.

In the following code snippet, we are going to export the link resolver in the same module above:

*prismic.js*

```javascript
export  const  linkResolver  =  doc  => {
	if (doc.type  ===  'homepage') return  '/'
	else if (doc.type  ===  'products') return  '/products'
	else if (doc.type  ===  'product') return  '/products/'  +  doc.uid
	else if (doc.type  ===  'blog_home') return  '/blog'
	else if (doc.type  ===  'blog_post') return  '/blog/'  +  doc.uid
	else return  '/'
}
```
## How to manage a dynamic routing
For this article we are assuming that you have built a simple Next.js application with the default behavior, based on the `pages` folder.

Now that we have configured a client for Prismic, we need to configure the dynamic routing in your application.
Prismic includes a special content field called, `UID`. This field is a unique and customizable identifier each document of a given `Custom Type`.
The `UID` is used mainly for urls which is why we are going to dynamically match the `UID` on the route level so we can query the content accordingly.

### Build your router
First, we are gonna build a simple router to match our different urls with the help of `next-routes`.
You can refer to the [installation guide for `next-routes`](#installation) to help you get started with this.

**Configure your router:**

The router from Express allows you to extract a dynamic parameter from the url with the following syntax:
``` :your-parameter```.
So in the example below, if we navigate to the url `mywebsite.com/products/coffee-from-kenya`, the router will match `coffee-from-kenya` and provide it as the parameter `uid`.

*routes.js*
```javascript
const  routes  =  require('next-routes')
module.exports  =  routes()
.add('index', '/')
.add('products', '/products')
.add('product', '/products/:uid')
.add('bloghome', '/blog')
.add('blogpost', '/blog/:uid')
.add('notfound', '/*')
```

Each route in the example above will get its content from Prismic. This means that each route is related to a Prismic document. To resolve a page's url based on a Prismic document, you can refer to [the configuration of a link resolver](#link-resolving) section.

### Build your server
Now that our router is configured, we are going to build a simple server. Next.js embed a helper to set up an Express server in a few lines of code.
You can refer to the [installation guide for `Express`](#installation) to help you get started with this.

**Setup the server:**
*server.js*
```javascript
const  next  =  require("next")
const  helmet  =  require('helmet')
const  routes  =  require("./routes")
const  app  =  next({ dev:  process.env.NODE_ENV  !==  "production" })
const  handler  =  routes.getRequestHandler(app)
const  express  =  require("express")

app.prepare().then(() => {
	express()
	.use(handler)
	.use(helmet())
	.listen(3000, () =>  process.stdout.write(`Point your browser to: http://localhost:3000\n`))
})
```

### Update your build configuration
Typically, if you start a Next.js application, you use the command `next start`.
By using a custom server configuration, you need to update your configuration in `package.json`:

```json
"scripts": {
	"dev": "node server.js",
	"build": "next build",
	"start": "NODE_ENV=production node server.js"
}
```
### How to use a dynamic route parameter in a component
Everything is now setup. Let's take a look at a quick example that shows how to get a dynamic parameter from your routing system.

In [the router section above](#build-your-router), we created a route `/products/:uid` linked to the component `Product` in our application.
As soon as you navigate to a url with this pattern, you will instantiate the component `product` which is going to receive the dynamic parameter in a variable `uid`.
Here's how to get this `uid` parameter:

*product.js*
```javascript
import  React  from  'react'

class Product extends  React.Component {
	static  async  getInitialProps({ req, query }) {
		console.log(query.uid)
	}
	render() { ... }
}
```

When you configure `next-routes`, the `query` object is injected in any component linked to a route. It contains all the dynamic parameters configured in your url.
You are now able to use it in any way you want. For example, you can use it to query your content from Prismic.

## How to query your content from Prismic

The Prismic client contains a few helpers to get your content. For example, you can retrieve a single document, a list of documents, a document based on its UID, etc.
Let's discover this with a basic example that gets a product from the `UID` that we get dynamically from our routing system:

*product.js*
```javascript
import  React  from  'react'
import { Client } from  './prismic'

export  default  class  extends  React.Component {

	static  async  getInitialProps({ req, query }) {
		try {
			const  product  =  await  Client(req).getByUID('product', query.uid)
			return { product }
		} catch(error) {
			return { error }
		}
	}

	render() {
		return <div>{this.props.product.id}</div>
	}
}
```

If you want to know more about querying Prismic, you can refer to [
the official Prismic documentation for React](https://prismic.io/docs/reactjs/query-the-api/how-to-query-the-api).

## How to integrate your content in your templates
Now that you have your content, what's left to do is to render it.
Let's take a basic example with a couple of Rich Text fields (styled text fields in Prismic) and an Image field.

First let's you need to install `prismic-reactjs`. You can refer to the [installation guide for `reactjs`](#installation).

*products.js*
```javascript
import  React  from  'react'
import  {RichText, Date, Link}  from  'prismic-reactjs'
import { Client, linkResolver } from  './prismic'

export  default  class  extends  React.Component {

	static  async  getInitialProps({ req, query }) {
		try {
			const  product  =  await  Client(req).getByUID('product', query.uid)
			return { product }
		} catch(error) {
			return { error }
		}
	}

	render() {
		return (
			<div>
				{RichText.render(this.props.product.data.product_name, linkResolver)}
				{RichText.render(this.props.product.data.product_description, linkResolver)}
				<img src={this.props.product.data.product_illustration.url} />
			</div>
		)
	}
}
```

If you want to know more about Prismic integration in your templates, you can refer to [the official Prismic documentation for React](https://prismic.io/docs/reactjs/rendering/rich-text).

## Setup the Prismic preview
The Prismic preview allows you to write a draft on Prismic and preview it on your website without publishing it. It's useful to see your content in place without having to publish and make it available to all your users.
The preview can also be shared with anybody using a generated link.
If you want to know more about the preview, you can refer to [the official documentation about the preview](https://prismic.io/docs/nodejs/beyond-the-api/in-website-preview).
For this you can rely on the Node.js documentation which is also based on Express.

## Want more?

If you didn't get enough with this little tutorial, you can find well detailed articles about SEO, preview, server side rendering and more on [Gary Meehan's website](https://www.garymeehan.ie).