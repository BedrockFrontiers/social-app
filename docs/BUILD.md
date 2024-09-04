# Build Instructions

This document provides detailed instructions on how to build and deploy the Tidal social network project using Next.js.

## Prerequisites

Before building the project, ensure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)
- **Git** (for version control)

## Installation

1. **Clone the Repository**

   Start by cloning the repository from GitHub:

   ```bash
   git clone https://github.com/BedrockFrontiers/social-app.git
   ```

2. **Navigate to the Project Directory**

   Move into the project directory:

   ```bash
   cd social-app
   ```

3. **Install Dependencies**

   Install all required dependencies using npm:

   ```bash
   npm install
   ```

## Development Build

To start a development server with hot-reloading, use the following command:

```bash
npm run dev
```

The server will start at `http://localhost:3000`, and you can view the application in your web browser.

## Production Build

To create a production-ready build of the project, follow these steps:

1. **Build the Application**

   Generate an optimized production build:

   ```bash
   npm run build
   ```

   This command compiles the project, optimizes assets, and outputs a production-ready version in the `.next` directory.

2. **Run the Production Server**

   After building the application, you can start the server in production mode:

   ```bash
   npm run start
   ```

   The server will run at `http://localhost:3000`. You can now deploy the application to your production environment.

## Deployment

To deploy Tidal, you can use platforms like Vercel, Netlify, or your custom server. Here’s a basic example for deploying with Vercel:

1. **Install Vercel CLI**

   If you haven’t already, install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. **Deploy the Application**

   Deploy the application to Vercel:

   ```bash
   vercel
   ```

   Follow the prompts to configure your deployment. Once completed, your application will be live on the provided URL.

## Troubleshooting

If you encounter any issues during the build process, consider the following:

- **Check Node.js and npm versions**: Ensure your environment meets the version requirements.
- **Review logs**: Look for error messages in the terminal output and address them accordingly.
- **Reinstall dependencies**: If you suspect issues with dependencies, try removing `node_modules` and reinstalling:

  ```bash
  rm -rf node_modules
  npm install
  ```

- **Consult the Next.js documentation**: Refer to the [Next.js documentation](https://nextjs.org/docs) for more detailed guidance.
