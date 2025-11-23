# Frontend V3 - Light curves

A React application for visualizing and exploring stellar object data, based on the design from the figma folder.

## Features

- Interactive visualization of stellar properties
- Comprehensive database of stars with physical characteristics
- Light curve visualizations (ATLAS and ZTF)
- Sky survey image viewer
- Spectral analysis display
- Advanced search functionality
- Object parameter tables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- Recharts (for data visualization)
- Radix UI (for accessible components)
- Lucide React (for icons)

## Project Structure

```
frontend_v3/
├── public/
│   ├── index.html
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── ObjectCharts.tsx
│   │   ├── ObjectTable.tsx
│   │   ├── ObjectSearch.tsx
│   │   ├── AdvancedSearch.tsx
│   │   └── AboutDialog.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## License

Educational and research purposes.

