# Customer Dashboard Refactor Challenge

## Overview

Welcome to the Customer Dashboard Refactor Challenge! This take-home interview project is designed to assess your ability to refactor and improve existing React/Next.js code, applying modern best practices.

You've been given a working customer dashboard application that has significant technical debt. While the application functions, it suffers from poor code organization, missing TypeScript types, lack of proper error handling, and various anti-patterns.

## Project Setup

### Prerequisites

- Node.js 18+ and npm
- Two terminal windows/tabs available

### Installation

1. Clone this repository
2. Install dependencies for both the frontend and API:

```bash
# Install frontend dependencies
npm install

# Install API dependencies
cd api
npm install
cd ..
```

3. Start the development environment:

```bash
# This will run both the frontend (port 3000) and API (port 3001)
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Current Functionality

The application currently includes:

- **Customer List**: Display of all customers in a table format
- **Search**: Search customers by name or email
- **Filtering**: Filter by status, company, date range, and revenue
- **Sorting**: Sort by various fields (name, company, revenue, date)
- **Pagination**: Navigate through customer records
- **CRUD Operations**:
  - View customer details
  - Edit existing customers
  - Add new customers
  - Delete customers
- **Bulk Selection**: Select multiple customers (non-functional)
- **CSV Export**: Export button (currently non-functional)

## The Challenge

Your task is to refactor this application to production-ready quality. The current implementation has numerous issues that need to be addressed.

## Evaluation Criteria

Your submission will be evaluated based on:

1. **Code Organization** (25%)
   - Component structure and separation of concerns
   - Proper application of SOLID principles
   - Clean, readable code

2. **TypeScript Usage** (20%)
   - Proper type definitions
   - Type safety throughout the application
   - Effective use of TypeScript features

3. **React Best Practices** (20%)
   - Proper use of hooks
   - Component composition
   - Performance optimizations

4. **State Management** (15%)
   - Efficient state organization
   - Proper data flow
   - Avoiding unnecessary re-renders

5. **Error Handling & UX** (10%)
   - Proper error boundaries
   - Loading states
   - User feedback

6. **Code Quality** (10%)
   - Consistency
   - Maintainability
   - Documentation (code comments where necessary)


## Time Expectation

This challenge is designed to be completed in **3-5 hours**. You don't need to implement every possible improvement - focus on the most impactful refactoring that demonstrates your skills and approach to code quality.


## Submission Guidelines

1. Create a new branch for your refactoring work
2. Commit your changes with clear, descriptive commit messages
3. Fill out the `SOLUTION.md` file with:
   - Your approach and decisions
   - What you prioritized and why
   - Any trade-offs you made
   - What you would do with more time
4. Create a **private** Github repo and add recruiting@moksha.ai as a collaborator

## Important Notes

- The application should remain fully functional after refactoring
- Focus on demonstrating your approach to clean, maintainable code
- Don't spend time on styling unless it's related to fixing critical UX issues
- Document any assumptions you make
- If you identify issues you don't have time to fix, document them in SOLUTION.md

## Questions?

If you have any questions about the requirements or encounter any blocking issues with the setup, please reach out to your interviewer.

Good luck, and we look forward to reviewing your solution!
