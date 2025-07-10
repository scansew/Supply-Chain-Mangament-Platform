# Frontend Migration Plan: AWS Amplify UI to Material UI

This document outlines the steps required to migrate the frontend UI components from AWS Amplify UI to Material UI while maintaining the existing functionality.

## Current Dependencies to Replace

1. **AWS Amplify Core**
   - Used for configuration and initialization
   - Needs replacement with new API and auth configuration

2. **AWS Amplify UI Components**
   - Used throughout the application (e.g., `Button`, `Flex`, `Grid`, `View`)
   - Needs replacement with Chakra UI components

3. **AWS Authentication**
   - `withAuthenticator` HOC
   - `signOut` function and user context
   - Needs replacement with Supabase Auth

4. **AWS API & DataStore**
   - `generateClient` from `aws-amplify/api`
   - `DataStore` operations
   - Needs replacement with Apollo Client

5. **AWS Storage**
   - File uploads/downloads
   - Needs replacement with alternative storage solution

## Migration Steps

### 1. Setup Material UI Dependencies
- [x] Install Material UI packages:
  ```bash
  npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @fontsource/roboto
  ```
- [x] Add Roboto font to index.html:
  ```html
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  />
  ```

### 2. Material UI Theme Setup
- [x] Create theme configuration:
  - `src/theme/theme.js` - Material UI theme configuration
  - Update `main.jsx` to include ThemeProvider
  - Set up responsive font sizes and default theme

### 3. Replace AWS UI Components
- [x] Create a component mapping guide:
  | AWS Component | Material UI Equivalent |
  |--------------|----------------------|
  | `Button` | `Button` |
  | `Flex` | `Box` with `display: flex` |
  | `Grid` | `Grid` |
  | `View` | `Box` or `Paper` |
  | `TextField` | `TextField` |
  | `Alert` | `Alert` |
  | `Card` | `Card` |
  | `Heading` | `Typography` with variant="h1-h6" |
  | `Text` | `Typography` with variant="body1/body2" |

### 4. Component Migration Strategy
- [x] Phase 1: Basic Layout Components
  - Replace `Flex` with `Box` + `sx` prop
  - Replace `Grid` with Material UI `Grid`
  - Replace `View` with `Box` or `Paper`
  
- [x] Phase 2: Form Components
  - Replace `TextField` with Material UI `TextField`
  - Update form controls (Select, Checkbox, Radio, etc.)
  - Replace form validation messages
  
- [x] Phase 3: Feedback Components
  - Replace `Alert` with Material UI `Alert`
  - Replace loading states with `CircularProgress`
  - Implement snackbars for notifications

### 5. Styling Approach
- [x] Replace AWS Amplify styling with Material UI styling methods:
  - Use `sx` prop for one-off styles
  - Create styled components with `styled()`
  - Use theme for consistent spacing, colors, and typography
  - Implement responsive design with theme breakpoints

### 6. Component Library
- [x] Create shared component library in `src/components`:
  - `Layout` - Page layouts and containers
  - `Form` - Common form elements
  - `DataDisplay` - Cards, tables, lists
  - `Feedback` - Alerts, loaders, modals
  - `Navigation` - Menus, breadcrumbs

### 7. Testing Strategy
- [x] Unit tests for components
  - Test component rendering
  - Test interaction handlers
  - Test prop types
- [ ] Visual regression testing
  - Set up Storybook for component documentation
  - Implement visual testing with Chromatic

## Component Migration Guide

### App.jsx
- [x] Wrap with `ThemeProvider`
- [x] Replace layout components
- [x] Update navigation structure
- [x] Implement responsive drawer for mobile

### Dashboard.jsx
- [x] Replace layout with Material UI `Grid`
- [x] Update cards with Material UI `Card`
- [x] Replace form controls
- [x] Update typography

### Other Pages
- [x] Audit and update all pages for AWS dependencies
- [x] Replace AWS-specific components and hooks

## Migration Phases

### Phase 1: Core UI Migration
- [x] Set up Material UI theme
- [x] Replace layout components
- [x] Update typography and colors

### Phase 2: Component Replacement
- [x] Replace form components
- [x] Update navigation
- [x] Implement responsive design

### Phase 3: Polish & Optimization
- [x] Add transitions and animations
- [x] Optimize bundle size
- [x] Implement code splitting

## Dependencies to Add
- @mui/material
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @fontsource/roboto

## Documentation
- [x] Update component documentation
- [x] Create style guide
- [x] Document theme customization
