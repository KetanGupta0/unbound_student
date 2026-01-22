# 🎓 Student Panel Dashboard

A **modern, high-performance Student Management Dashboard** built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.  
This panel provides students with a clean, intuitive interface to manage courses, attendance, learning resources, and certifications efficiently.

> Designed with scalability, performance, and user experience in mind.

---

## 🌟 Highlights

- ⚡ Built using **Next.js App Router**
- 🎨 Clean & modern UI powered by **Tailwind CSS**
- 📱 Fully responsive (Desktop, Tablet & Mobile)
- 🧠 Component-driven architecture
- 🚀 Optimized for performance and maintainability

---

## ✨ Key Features

### 📊 Dashboard Overview
- Snapshot of active courses
- Attendance trends & progress indicators
- Recent activity & transactions

### 📚 Course Management
- Enrolled course details
- Class schedules
- Live class links (if applicable)

### 📅 Attendance Tracking
- Visual attendance progress bars
- Daily attendance trends using bar graphs
- Course-wise attendance segregation

### 📁 Study Materials
- Centralized resource library
- Course-specific materials
- Search and filter functionality

### 📜 Certificate Module
- View earned certificates
- Certificate preview
- PDF download support

### 💬 Real-time Chat
- Course-specific discussion channels
- Enables collaborative learning

### 🛠️ Complaint / Ticket System
- Raise complaints or support tickets
- Track issue status (Open / In Progress / Resolved)

### 🔐 Course-Level Access Control
- Restricted courses are automatically hidden
- Attendance, materials, and certificates are locked for banned courses

---

## 🛠️ Technology Stack

| Category | Technology |
|--------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **State Management** | React Hooks (`useState`, `useMemo`) |
| **Data Layer** | Mocked Data (`src/lib/mockData.ts`) |

---

## 📂 Project Structure
```text
src/
├── app/                # App Router pages
├── components/         # Reusable UI components
├── lib/                # Utilities & mock data
├── styles/             # Global styles
└── types/              # TypeScript types & interfaces
```

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS version recommended)
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### 3. Running Locally
```bash
# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the results.

---

## 🔒 Course-Level Ban Behavior
The panel includes built-in security logic where admins can restrict specific courses. Banned courses are hidden from the dashboard, and all related attendance, materials, and certificates are automatically locked to ensure compliance.

---

## 📄 License
This project is for demonstration purposes. All rights reserved.
