# Wordle Clone

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-1.9.4-purple?style=flat-square)](https://biomejs.dev/)
[![Zod](https://img.shields.io/badge/Zod-3.24.2-blue?style=flat-square)](https://zod.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A full-stack implementation of the popular word-guessing game Wordle, built with Next.js, React, TypeScript, and Tailwind CSS.

![Wordle Game Screenshot](https://via.placeholder.com/800x450.png?text=Wordle+Clone+Screenshot)

## 🎮 Game Features

- Guess a 5-letter word in 6 attempts
- Visual feedback for each guess:
  - 🟩 Green: Correct letter in correct position
  - 🟨 Yellow: Correct letter in wrong position
  - ⬜ Gray: Letter not in the word
- Virtual keyboard with color-coded feedback
- Physical keyboard support
- Responsive design for all devices
- Random word selection from a curated list

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Validation**: Zod
- **Linting/Formatting**: Biome

## 📁 Project Structure

```
wordle-clone/
├── .env.example           # Example environment variables
├── .env.local             # Local environment variables (gitignored)
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   │   └── words/     # Word selection API
│   │   ├── components/    # React components
│   │   │   ├── Board.tsx  # Game board component
│   │   │   ├── Row.tsx    # Game row component
│   │   │   └── ...        # Other components
│   │   ├── environment/   # Environment configuration
│   │   │   └── client.ts  # Client-side environment
│   │   └── page.tsx       # Main game page
│   └── ...
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wordle-clone.git
   cd wordle-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration if needed.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## 🏗️ Build for Production

```bash
npm run build
```

## 🧪 Linting

The project uses Biome for linting and formatting:

```bash
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting to ensure code quality
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Wordle](https://www.nytimes.com/games/wordle/index.html) - Original game by Josh Wardle
- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Biome](https://biomejs.dev/) - Fast linter and formatter