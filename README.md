# Genius: A SaaS AI Platform

Genius is a SaaS AI Platform built using Next.js 14, React, and Tailwind CSS. It provides various AI-powered tools for generating images, videos, conversations, music, and code based on user prompts.

## Features

- **AI-Powered Tools**:
  - **Image Generation Tool**: Utilizes OpenAI for generating images based on user prompts.
  - **Video Generation Tool**: Utilizes Replicate AI for generating videos based on user prompts.
  - **Conversation Generation Tool**: Utilizes OpenAI for generating conversations based on user prompts.
  - **Music Generation Tool**: Utilizes Replicate AI for generating music based on user prompts.
  - **Code Generation Tool**: Utilizes OpenAI for generating code snippets based on user prompts.
- **Page Loading State**: Includes a loading state indicator to enhance user experience during page transitions.

- **Tailwind Design**: Utilizes Tailwind CSS for modern and customizable UI design.
- **Animations and Effects**: Implements Tailwind animations and effects to enhance user interaction.
- **Full Responsiveness**: Ensures seamless user experience across various devices and screen sizes.
- **Clerk Authentication**: Supports authentication via email and Google accounts using Clerk Authentication.
- **Client Form Validation**: Implements client-side form validation using react-hook-form and zod for improved data integrity.
- **Server Error Handling**: Provides robust server error handling using react-toast to notify users of any issues.

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- OpenAI
- Replicate AI
- Clerk
- shadcn/ui

## Environment Setup

Before executing the project, ensure to create a `.env` file with the following environment variables:

```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=''
CLERK_SECRET_KEY=''

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=''
REPLICATE_API_TOKEN=''
```

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install` or `yarn install`.

## Usage

1. Set up the environment variables in the `.env` file.
2. Start the development server using `npm run dev` or `yarn dev`.
3. Access the application in your preferred web browser.
