# MeetingAI

This is the repository for the landing page of MeetingAI, an AI-powered meeting assistant designed to revolutionize how remote teams collaborate.

## About MeetingAI

MeetingAI transforms your meetings into actionable insights. Our AI automatically transcribes conversations, creates project templates, and assigns tasks based on what's discussed. This helps teams save time on follow-ups and stay focused on what matters.

## Features

*   **Real-time Transcription**: Get accurate, speaker-identified transcriptions of your meetings.
*   **Smart Project Templates**: Automatically generate industry-specific project templates from your meeting's context.
*   **Intelligent Task Assignment**: Assign tasks to team members based on their skills, availability, and the conversation.
*   **Seamless Integrations**: Connects with your favorite tools like Slack, Jira, and Google Calendar.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (using Radix UI and Lucide React)
*   **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
*   **Charts**: [Recharts](https://recharts.org/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   pnpm (or your favorite package manager)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/my-v0-project.git
    ```
2.  Install NPM packages
    ```sh
    pnpm install
    ```

### Running the Application

To run the app in development mode, use:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

*   `pnpm dev`: Runs the app in the development mode.
*   `pnpm build`: Builds the app for production.
*   `pnpm start`: Starts a production server.
*   `pnpm lint`: Lints the code using Next.js's built-in ESLint configuration.

## Project Structure

```
.
├── app/                  # Main application code (App Router)
│   ├── page.tsx          # The landing page component
│   └── layout.tsx        # The main layout for the application
├── components/           # Reusable UI components
├── public/               # Static assets (images, etc.)
├── styles/               # Global styles
├── lib/                  # Utility functions
└── package.json          # Project dependencies and scripts
```
