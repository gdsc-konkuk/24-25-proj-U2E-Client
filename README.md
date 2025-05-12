# U2E - Us to Earth

![Three.js](https://img.shields.io/badge/ThreeJs-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![React](https://img.shields.io/badge/React-V19-skyblue)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Integrated-orange)
![U2E](https://img.shields.io/badge/U2E-Earth_News_Platform-green)

## 🌍 Overview

U2E (Us to Earth) is a web application that visualizes climate change and regional environmental issues on an interactive 3D globe and provides AI-powered news analysis and solutions. Users can rotate the globe to explore issues in different regions and view related news and AI-generated recommendations.

## ✨ Key Features

- **Interactive 3D Globe**: Visualize global environmental issues using Three.js.
- **Region & Climate Filtering**: Filter news by region or specific climate challenges (droughts, floods, heatwaves, etc.).
- **Gemini AI Integration**: Analyze news articles and generate concise solutions using Google Gemini API.
- **Related News Recommendations**: Discover other relevant articles on the same topic.
- **Comment System**: Engage in discussions on each news article.
- **JWT Authentication**: Secure login and user authentication.

## 🛠 Technologies

- **Frontend**: React 19, TypeScript
- **3D Rendering**: Three.js
- **State Management**: React Query (TanStack Query) & Zustand
- **Styling**: Styled Components
- **API Client**: Axios
- **AI Integration**: Google Gemini API
- **Auth & Security**: JWT, HTTP-only cookies
- **Dev Tools**: Vite, ESLint, MSW (Mock Service Worker)
- **Version Control**: Commitlint, Husky

## 🌐 Live Demo

[View Demo Website](https://u2e.netlify.app/)

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- pnpm v8 or higher
- Google Gemini API key (set as an environment variable)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/u2e-client.git
cd u2e-client

# Install dependencies
pnpm install

# Create .env file with your Gemini key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env

# Start development server
pnpm dev
```

## 📁 Project Structure

```plaintext
src/
├── api/               # API client and AI integration
├── assets/            # Fonts, images, SVGs
├── components/        # React components
│   ├── animation/     # Animation components
│   ├── chat/          # Authentication & comments
│   ├── common/        # Shared UI components
│   ├── earth/         # 3D globe components
│   └── news/          # News display components
├── hooks/             # Custom React hooks
├── mocks/             # MSW handlers for API mocking
├── pages/             # Page components/routes
├── routes/            # Router setup
├── styles/            # Global styles & theme
├── types/             # TypeScript types and interfaces
└── utils/             # Utility functions
```

## 📝 Detailed Features

### 3D Globe Visualization

- Render an interactive 3D globe using Three.js and GeoJSON data.
- Highlight region-specific environmental alerts.
- Support mouse drag and scroll zoom interactions.

### News Analysis & Solutions

- Fetch news articles from API and display full content.
- Use Gemini AI to analyze articles and generate actionable solutions.
- Present up to three related news links for further reading.

### User Authentication & Interaction

- JWT-based login and secure session management.
- Allow users to post comments and reply to others.
- Personalized experience with saved preferences.

## 🧑‍💻 Developer Guide

### Running Locally

1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Build for production:
   ```bash
   pnpm build
   ```
3. Run linters:
   ```bash
   pnpm lint
   ```

### Environment Variables

Create a `.env` file in the project root and add:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Core Components

#### Earth Components (`src/components/earth`)

- `Globe.tsx`: Main 3D globe rendering logic
- `GeoMap.tsx`: Maps GeoJSON data onto the globe
- `Warning.tsx`: Displays environmental alerts on the globe

#### News Components (`src/components/news`)

- `NewsContents.tsx`: Displays article text and AI-generated solution
- `NewsCardList.tsx`: Renders a list of news summaries
- `NewsSideBar.tsx`: Shows original link, solutions, related news

#### Authentication

- `components/chat/Login.tsx` and `hooks/useLoginQuery.ts` implement JWT login and token management.

## 🛠 Configuration

- **TypeScript**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **ESLint**: `eslint.config.js`, including TypeScript rules
- **Commitlint**: `commitlint.config.ts` for commit message conventions
- **Vite**: `vite.config.ts` for build and dev server settings

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/awesome`
3. Commit your changes: `git commit -m 'feat: add awesome feature'`
4. Push branch: `git push origin feature/awesome`
5. Open a Pull Request

## 🔮 Future Roadmap

- Integrate real-time climate data feeds
- Expand issue categories (air quality, biodiversity loss)
- Add multi-language support
- Develop a mobile app version

## 👥 Contributors

- [Kang Joeun](https://github.com/joeuns)
- [Lee Sungjong](https://github.com/whddltjdwhd)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
