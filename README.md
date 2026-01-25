# MoneyTxn - Digital Wallet Monorepo

MoneyTxn may be a digital wallet application, but it's built with a modern, scalable tech stack designed for production. This monorepo contains user and merchant applications, along with a dedicated webhook handler for bank transactions.

## Architecture

This project is structured as a monorepo using [Turborepo](https://turbo.build/) to manage multiple applications and packages.

- **Frontend**: Built with [Next.js](https://nextjs.org/), leveraging server-side rendering and static site generation for optimal performance.
- **Backend**:
  - **User & Merchant Apps**: Utilize Next.js Server Actions for secure and efficient backend logic.
  - **Bank Webhook Handler**: A standalone [Express.js](https://expressjs.com/) server to handle high-volume webhook events from mock banks.
- **Database**: [PostgreSQL](https://www.postgresql.org/) is used as the primary relational database, managed via [Prisma ORM](https://www.prisma.io/).
- **State Management**: [Recoil](https://recoiljs.org/) is used for efficient global state management across React components.
- **Authentication**: Secure authentication flows (details can be added here, e.g., NextAuth).

## Project Structure

```
apps/
├── user-app/            # Main wallet application for end-users
├── merchant-app/        # Dashboard for merchants to manage their accounts
├── bank-webhook-handler/# Node.js/Express server processing bank webhooks
packages/
├── ui/                  # Shared React UI component library
├── db/                  # Prisma schema, client, and database connection logic
├── store/               # Recoil atoms, selectors, and state logic
├── eslint-config/       # Shared ESLint configurations for code consistency
└── typescript-config/   # Shared tsconfig bases for uniform compilation
```

## detailed Tech Stack

- **Monorepo Tooling**: Turborepo
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Containerization**: Docker
- **Package Manager**: npm / pnpm

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) (for running the database)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/MoneyTxn.git
    cd MoneyTxn
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: If you encounter issues, try `npm install --legacy-peer-deps` or ensure you are using the correct Node version.*

### Database Setup

1.  **Start the PostgreSQL container:**
    ```bash
    docker-compose -f docker/docker-compose.yml up -d
    ```

2.  **Generate Prisma Client:**
    This command generates the Prisma client based on your schema and ensures the database is in sync.
    ```bash
    npm run db:generate
    ```
    *This script usually runs: `cd packages/db && npx prisma generate && cd ../..`*

### Running the Applications

You can run individual apps or the entire monorepo in development mode.

**To run all applications:**
```bash
npm run dev
```

**To run a specific application (e.g., user-app):**
```bash
npm run start-user-app
```
*Or navigate to the app directory and run `npm run dev`.*

## Deployment

The application is container-ready. Each app has its own compilation process.
- **CI/CD**: Build pipelines can be configured using GitHub Actions or your preferred CI tool.
- **Build**: Run `npm run build` from the root to build all apps and packages.

## Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.
