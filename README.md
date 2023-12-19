# Mental Health Resources Next.js App

This is a Next.js application that provides mental health resources. It includes a serverless API to fetch and filter records related to mental health topics.

## Project Structure

The project is organized into the following directory structure:

- `src/app/api/records/route.ts`: Contains the serverless API route for fetching and filtering mental health records.

- `src/app/page.tsx`: Defines the main page component (`Home`) that renders a list of wellness cards.

- `src/app/layout.tsx`: Defines the root layout component (`RootLayout`) with metadata for the application title and description.

- `src/app/components/`: Contains reusable React components used in the application.

## API Route (`src/app/api/records/route.ts`)

This file includes a Next.js API route (`GET` method) that fetches and filters mental health records based on search terms and filters provided in the URL query parameters.

## Page Component (`src/app/page.tsx`)

The main page component (`Home`) imports and renders the `WellnessCardList` component, displaying a list of wellness cards.

## Layout Component (`src/app/layout.tsx`)

The root layout component (`RootLayout`) defines the HTML structure of the application and includes metadata for the page title and description.

## Components (`src/app/components/`)

- `WellnessCardItem`: Displays individual wellness cards with title, description, and associated grades.

- `WellnessCardList`: Renders a list of wellness cards, including a search bar and a multi-select dropdown for filtering.

- `SearchBar`: Provides a search bar component for entering search terms.

- `MultiSelectDropdown`: Implements a multi-select dropdown for filtering wellness cards based on grades.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the development server with `npm run dev`.

Feel free to explore and customize the components and functionality to fit your specific needs.

Happy coding!