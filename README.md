# PeerSpace - Healthcare Network Visualization

An interactive network graph visualization showcasing relationships among healthcare professionals (HCPs).

## Features

- 🔍 **Search & Highlight**: Search HCPs by name with auto-complete functionality
- 🧠 **Network Visualization**: Force-directed graph with the searched person at the center
- 🖱️ **Interactive UI**: 
  - Click nodes to view detailed HCP profiles
  - Hover over connections to see relationship details
  - Dynamic graph navigation with zoom and pan
- 🎨 **Modern Design**: Clean, responsive interface following the provided design guidelines

## Tech Stack

- React with TypeScript
- react-force-graph-2d for network visualization
- D3.js for physics simulation
- CSS3 for styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Deployment

The application is ready for deployment to any static hosting service:

- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: Drop the `build` folder into Netlify
- **GitHub Pages**: Use the `gh-pages` package

## Data Structure

The application uses mock data representing healthcare professionals with:
- Personal information (name, title, organization)
- Education history
- Work experience
- Publications
- Connection relationships (co-authorship, colleagues, shared institutions)

## Future Enhancements

- Integration with real GraphML data
- Advanced filtering options
- Export network visualizations
- Real-time collaboration features