# Hink Website

A modern platform for connecting professionals, teams, and aspiring developers. Create and manage professional profiles, build team presence, and foster collaboration in the tech industry.

## 🌟 Features

### Personal CV/Portfolio
- Multiple CV versions with customizable templates
- Export options (PDF, Word)
- Industry/role-specific templates
- Project showcase
- Skills matrix
- Professional timeline
- Education history
- Granular page sharing controls

### Team Profiles
- Organizational profiles
- Team projects and achievements
- Member management with role hierarchy
- Position listings
- Member CV showcase
- Application system

## 🛠️ Tech Stack

- **Frontend:** Next.js
- **Backend:** Supabase
- **Database:** PostgreSQL
- **Authentication:** Supabase Auth (OAuth + Email)
- **Storage:** Supabase Storage
- **Styling:** TailwindCSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd hink-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Supabase credentials and other required variables.

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 📚 Documentation

For detailed documentation about the project structure, database schema, and development guidelines, please refer to [hink-website.md](./hink-website.md).

### Key Documentation Sections:
- Project Phases
- Database Schema
- API Endpoints
- Security Considerations
- Future Development Plans

## 🤝 Contributing

1. Read the [hink-website.md](./hink-website.md) documentation
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Development Guidelines

- Always read hink-website.md before writing any code
- Document database schema changes in hink-website.md
- Add new migrations to the documentation
- Update documentation after completing major features

## 🔐 Security

- Implements role-based access control (RBAC)
- Secure sharing links
- Team membership verification
- Safe file export handling

## 📄 License

[License Type] - See LICENSE file for details

## 🏗️ Project Status

Currently in initial planning phase. Documentation and requirements gathering in progress.

## 🔜 Roadmap

- Enhanced team collaboration features
- Project management integration
- Advanced CV template system
- Multi-format export engine
- Analytics for page views and sharing

## 📞 Support

[Contact information or support guidelines]
