# Welcome to ConnectSphere

## Live Site

[ConnectSphere Live Site](https://connect-sphere2.netlify.app/)

ConnectSphere is a social media platform that allows users to connect, share posts, and interact with others. Built with modern web technologies, it features a responsive design and a clean user interface.

## GitHub Projects Board

[ConnectSphere GitHub Projects Board](https://github.com/users/MiaTexnes/projects/2)

## 🔗 Social Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://miatexnes.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mia-texnes-847b28bb/)

## Features

### User Authentication

- Register with Noroff email
- Login/logout functionality
- Profile management

### Feed

- Create, edit, and delete posts
- View posts from all users
- Search posts by content
- Filter posts by author

### Profile

- View and edit user profiles
- Update profile pictures
- View user-specific posts

## Technologies Used

### Frontend

- HTML5
- Tailwind CSS
- JavaScript (ES6+)

### API

- Noroff Social API
- RESTful architecture

## Installation

1. Clone the repository
git clone https://github.com/MiaTexnes/connectsphere.git
2. Install dependencies
npm install
3. Start the development server
npm run dev

## Project Structure

- `assets` - Images, icons, and favicons
- `css` - Compiled CSS and source files
- `feed` - Feed page HTML
- `js` - JavaScript modules
- `api` - API interaction functions
- `components` - Reusable components
- `constants` - Global constants
- `events` - Event handlers
- `ui` - UI manipulation functions
- `profile` - Profile page HTML
- `register` - Registration page HTML

## Pages

### Authentication Page (`/index.html`)

- Login and registration form
- HTML form validation
- Password minimum length: 8 characters
- Form action: profile

### Feed Page (`/feed/index.html`)

- List of post thumbnails
- Search bar
- Sort options
- Form to create a new post

### Profile Page (`/profile/index.html`)

- Profile image
- Username
- List of user posts
- Follow button
- Following/followers display

## Technical Requirements

- Use Tailwind CSS for styling (chosen for its flexibility and familiarity)
- Implement SASS for additional custom styling
- Ensure responsive design
- JavaScript functionality for API integration and user interactions

## Development Process

1. Create prototypes for each page
2. Set up a new git branch: `js2` from `main` branch
3. Install necessary NPM packages
4. Implement the core functionality:
   - Authentication system
   - Post creation and management
   - User profile functionality
5. Style with Tailwind CSS
6. Testing and debugging
7. Create a Pull Request for review
8. Deploy the site using Netlify

## Future Improvements

- Real-time notifications
- Direct messaging between users
- Media uploads for posts
- Enhanced user profiles with more customization options

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Submission Requirements

- Open Pull Request link
- Deployed site link
- Ensure the repository is public
- Include a `.gitignore` file (exclude `node_modules`)

## Review Process

- Share the Pull Request and request peer reviews on Teams
- Implement suggestions as needed
- Review peers' Pull Requests

> Note: This project was created as part of a JavaScript 2 course assignment, implementing a social media application with core functionality using the Noroff Social API.