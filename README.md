# Academic Resource Hub

A modern educational platform designed for multiple disciplines including Data Science, Bioinformatics, and Biotechnology. This platform provides a comprehensive learning environment with features similar to Google Classroom but with enhanced capabilities.

## Features

- **Multi-discipline Support**: Supports various streams including Data Science, Bioinformatics, and Biotechnology
- **Class Management**: Teachers can create and manage their own virtual classrooms
- **Resource Sharing**: Upload and share educational resources with students
- **Interactive Comments**: Discussion system for each resource and class
- **Resource Library**: Curated collection of educational materials with hover previews
- **Project Repository**: Semester-wise projects with solutions
- **Authentication**: Separate login portals for teachers and students
- **Stream-specific Access**: Users can access content relevant to their chosen stream

## Tech Stack

- Frontend: React + TypeScript + Vite
- UI Components: Shadcn/ui
- Styling: TailwindCSS
- Backend: Supabase
- Authentication: Supabase Auth
- Storage: Supabase Storage

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── features/       # Feature-specific components
├── layouts/        # Layout components
├── lib/           # Utilities and helpers
├── pages/         # Page components
├── styles/        # Global styles
└── types/         # TypeScript type definitions
```
