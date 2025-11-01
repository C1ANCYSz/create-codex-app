# create-codex-app

Scaffold a new **CodexJS** project with TypeScript in seconds.

## Quick Start

Create a new CodexJS project with a single command:

```bash
npx create-codex-app
```

Or specify your project name directly:

```bash
npx create-codex-app my-app
```

## Interactive Setup

The CLI will guide you through project creation with an elegant interface:

```bash
  ╭───────────────────────────────────────────────────────────────────╮
  │                                                                   │
  │    ██████╗ ██████╗ ██████╗ ███████╗██╗  ██╗         ██╗███████╗   │
  │   ██╔════╝██╔═══██╗██╔══██╗██╔════╝╚██╗██╔╝         ██║██╔════╝   │
  │   ██║     ██║   ██║██║  ██║█████╗   ╚███╔╝          ██║███████╗   │
  │   ██║     ██║   ██║██║  ██║██╔══╝   ██╔██╗     ██   ██║╚════██║   │
  │   ╚██████╗╚██████╔╝██████╔╝███████╗██╔╝ ██╗    ╚█████╔╝███████║   │
  │    ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝     ╚════╝ ╚══════╝   │
  │                                                                   │
  │   ──────────────────────────────────────────────────              │
  │   Documentation: https://github.com/C1ANCYSz/CodexJS              │
  │   ──────────────────────────────────────────────────              │
  │                                                                   │
  ╰───────────────────────────────────────────────────────────────────╯

✔ Enter your project name: › my-project
```

After setup completes:

```bash
📂 Creating project in /path/to/my-project

✅ my-project created successfully!

Next steps:
  cd my-project
  npm run dev
```

## Interactive Module Generator

Once your project is created, `create-codex-app` enters **interactive mode**, allowing you to generate modules on the fly:

```bash
🛠️  Enter interactive mode. Type a module name to generate a module.
> user
✅ Module "user" created successfully under src/modules/
```

### Generated Module Structure

Each module follows a clean, organized architecture:

```bash
src/
└── modules/
    └── user/
        ├── index.ts              # Module entry point & route configuration
        ├── User.Controller.ts    # HTTP request handlers
        ├── User.Model.ts         # Data model & validation schemas
        ├── User.Repo.ts          # Database operations & queries
        └── User.Service.ts       # Business logic layer
```

### Automatic Integration

Generated modules are **automatically imported** into your `app.ts`:

```typescript
import codex from '@codex-js/core';
import UserModule from './modules/user/index.js'; // ← Auto-imported

const app = codex();

app.enableJson();

// Your routes are ready to use!

export default app;
```

## Features

- **Zero Configuration** - Get started immediately with sensible defaults
- **Modular Architecture** - Generate feature modules with proper separation of concerns
- **TypeScript First** - Full TypeScript support out of the box
- **Interactive CLI** - Intuitive module generation workflow
- **Auto-Import** - Modules are automatically wired into your application
- **Best Practices** - Follows clean architecture principles (Controller → Service → Repository → Model)

## Module Architecture

Each generated module follows the **layered architecture pattern**:

| Layer          | File                 | Purpose                                  |
| -------------- | -------------------- | ---------------------------------------- |
| **Controller** | `User.Controller.ts` | Handles HTTP requests and responses      |
| **Service**    | `User.Service.ts`    | Contains business logic and validation   |
| **Repository** | `User.Repo.ts`       | Manages data access and database queries |
| **Model**      | `User.Model.ts`      | Defines data structures and schemas      |
| **Routes**     | `index.ts`           | Configures endpoints and middleware      |

## Getting Started

1. **Create your project:**

```bash
   npx create-codex-app my-awesome-api
```

2. **Navigate to your project:**

```bash
   cd my-awesome-api
```

3. **Generate modules interactively:**

```bash
   > user
   > post
   > comment
```

4. **Start development:**

```bash
   npm run dev
```

## What You Get

- Pre-configured TypeScript project
- ESM module support
- Development server with hot reload
- Structured project layout
- Interactive module scaffolding
- Production-ready build setup

## Documentation

For comprehensive guides, API reference, and examples:

**📚 [Full Documentation](https://github.com/C1ANCYSz/CodexJS)**

## Requirements

- Node.js 18.x or higher
- npm 7.x or higher

## License

MIT

---
