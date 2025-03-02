# DevInsights - Tech Blog & Product Discovery

A modern Angular application that combines tech blogging with AI-powered product discovery.

![DevInsights Logo](src/assets/images/favicon.svg)

## Overview

DevInsights is a web application built with Angular that provides users with tech insights, blog articles, and AI-powered product recommendations. The application features a clean, responsive design with dark mode support and various interactive components.

## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Dark Mode**: Toggle between light and dark themes
- **Blog Section**: Browse and read tech-related articles
- **Product Discovery**: AI-powered product recommendations
- **Image Carousel**: Customized image carousel for showcasing content
- **About Page**: Information about the developer and project architecture
- **API Integrations**: Integration with Mistral AI and Product Hunt APIs

## Tech Stack

- **Frontend**: Angular 17+, TypeScript
- **Styling**: TailwindCSS
- **Icons**: SVG icons and Font Awesome
- **PWA Support**: Progressive Web App capabilities
- **API Integration**: HTTP client for external API communication

## Project Structure

```
src/
├── app/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components (Home, Blog, About, etc.)
│   ├── services/           # Services for API calls and state management
│   ├── models/             # TypeScript interfaces and models
│   └── app.routes.ts       # Application routing
├── assets/
│   ├── images/             # Images and icons
│   └── favicon.svg         # Custom favicon
└── styles.css              # Global styles
```

## Components

- **Header**: Navigation and theme toggle
- **Footer**: Contact information and links
- **Image Carousel**: Customizable carousel with thumbnails and indicators
- **Theme Toggle**: Light/dark mode switcher
- **Project Diagram**: SVG visualization of the project architecture
- **API Integration Info**: Information about external API integrations

## Pages

- **Home**: Landing page with featured content
- **Blog**: List of blog articles
- **Blog Detail**: Individual blog article view
- **About**: Developer information and project architecture
- **Product Detail**: Detailed product information
- **Admin**: Admin dashboard (protected)
- **Login**: Authentication page

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/rishabhv471/devinsights.git
   cd devinsights
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Development

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Contact

- GitHub: [@rishabhv471](https://github.com/rishabhv471)
- LinkedIn: [Rishabh Verma](https://www.linkedin.com/in/rishabh-verma-0811/)
- Email: rishabhv471@gmail.com
- Twitter: [@rishabhv471](https://twitter.com/rishabhv471)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 