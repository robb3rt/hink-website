# Hink Website Project Documentation

## Project Overview
The Hink Website is a platform designed to connect professionals, teams, and aspiring developers. It serves as a comprehensive solution for personal branding, team building, and professional growth in the tech industry.

## Project Phases

### Phase 1: Personal and Team Profiles
The first phase focuses on two main components:

1. **Personal CV/Portfolio**
   - Users can create and manage their professional profiles
   - Multiple CV versions per user
   - Export options for different formats (PDF, Word, etc.)
   - Industry/role-specific templates
   - Showcase personal projects and skills
   - Professional experience timeline
   - Education history
   - Skills matrix
   - Pages system for CV content management
     - Shareable with teams or individuals
     - Granular permission control (read/edit rights)
     - Direct link sharing capability

2. **Team Profiles**
   - Teams can create organizational profiles
   - Showcase team projects and achievements
   - List current team members and their roles
   - Advertise open positions or collaboration opportunities
   - Team member hierarchy:
     - Admins: Full control, can manage pages, members, and moderators
     - Moderators: Can approve new members and manage team content
     - Members: Regular team members
   - Teams can showcase selected CV pages from members
   - Application system for potential members

## Sharing and Permissions System
- Google Docs-like sharing functionality
- Permission levels:
  - Read access
  - Edit access
- Sharing methods:
  - Direct link sharing
  - Team-based sharing
  - Individual user sharing
- Page visibility:
  - Private
  - Shared with specific users/teams
  - Public (via link)

## Database Schema

### Profiles Table
```sql
create table public.profiles (
  id uuid not null references auth.users(id) primary key,
  username text,
  avatar_url text,
  website text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Teams Table
```sql
create table public.teams (
  id uuid not null default gen_random_uuid() primary key,
  name text not null unique,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  main_page_id uuid,
  created_by uuid not null references auth.users(id),
  avatar_url text
);
```

### Team Members Table
```sql
create type team_role as enum ('admin', 'moderator', 'member');

create table public.team_members (
  id uuid not null default gen_random_uuid() primary key,
  team_id uuid references public.teams(id),
  user_id uuid references auth.users(id),
  role team_role not null default 'member',
  joined_at timestamptz default now(),
  invited_by uuid references auth.users(id),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected'))
);
```

### Pages Table
```sql
create type page_visibility as enum ('private', 'restricted', 'team', 'public');

create table public.pages (
  id uuid not null default gen_random_uuid() primary key,
  title text not null,
  current_version_id uuid references public.page_versions(id),
  owner_id uuid references auth.users(id),
  owner_type text not null check (owner_type in ('user', 'team')),
  team_id uuid references public.teams(id),
  visibility page_visibility not null default 'private',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  is_main_profile_page boolean default false,
  secure_share_id uuid default gen_random_uuid()
);
```

### Page Versions Table
```sql
create table public.page_versions (
  id uuid not null default gen_random_uuid() primary key,
  page_id uuid references public.pages(id),
  content jsonb not null,
  created_at timestamptz default now(),
  created_by uuid references auth.users(id),
  version_number integer not null,
  change_description text
);
```

### Page Access Table
```sql
create type page_role as enum ('viewer', 'commentor', 'editor');

create table public.page_access (
  id uuid not null default gen_random_uuid() primary key,
  page_id uuid references public.pages(id),
  user_id uuid references auth.users(id),
  team_id uuid references public.teams(id),
  role page_role not null default 'viewer',
  created_at timestamptz default now(),
  created_by uuid references auth.users(id)
);
```

### Page Comments Table
```sql
create table public.page_comments (
  id uuid not null default gen_random_uuid() primary key,
  page_id uuid references public.pages(id),
  version_id uuid references public.page_versions(id),
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id),
  parent_comment_id uuid references public.page_comments(id),
  resolved boolean default false
);
```

### User Settings Table
```sql
create table public.user_settings (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id),
  dark_mode boolean default false,
  notifications_enabled boolean default true,
  two_factor_enabled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  system_theme_preference boolean default true
);
```

### Tasks Table
```sql
create table public.tasks (
  id uuid not null default gen_random_uuid() primary key,
  title text not null,
  description text,
  is_complete boolean default false,
  created_at timestamptz default now(),
  user_id uuid not null references public.profiles(id)
);
```

## Migrations
The following migrations have been applied to set up the initial schema:

1. Initial Schema Setup (20240417)
   - Created profiles table
   - Created teams table
   - Created team_members table with team_role enum
   - Created pages table with page_visibility enum
   - Created page_versions table
   - Created page_access table with page_role enum
   - Created page_comments table
   - Created user_settings table
   - Created tasks table

## Tech Stack
- Frontend: Next.js (based on project structure)
- Backend: Supabase
- Database: PostgreSQL (via Supabase)
- Authentication: 
  - OAuth providers
  - Email-based authentication
- File Storage: Supabase Storage

## API Endpoints (To be implemented)
- User management endpoints
- Profile management endpoints
- Team management endpoints
- Page management endpoints
- Sharing and permissions endpoints
- CV export endpoints

## Future Phases (To be planned)
- Enhanced team collaboration features
- Project management integration
- Advanced CV template system
- Multi-format export engine
- Analytics for page views and sharing

## Development Status
Currently in initial planning phase. Documentation and requirements gathering in progress.

## Security Considerations
- Secure sharing links implementation
- Role-based access control (RBAC)
- Team membership verification
- Safe file export handling
