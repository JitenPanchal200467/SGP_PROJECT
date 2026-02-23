# 🏠 HostelHub — Smart Hostel Management

HostelHub is a modern, web-based hostel management system designed to streamline the process of finding, comparing, and managing college accommodation. Centered around a QR-code-first approach, it allows students and parents to seamlessly navigate hostel life from their smartphones.

---

## 🚀 Key Features

- **🔍 Smart Search & Selection**: Browse available hostels with real-time room availability.
- **📊 Comparison Portal**: Side-by-side comparison of facilities, pricing, distance, and ratings.
- **📋 Student Dashboard**: Personalized view for attendance, room details, and quick actions.
- **📍 Real-time Attendance**: Track check-in/out status with instant logging.
- **🍽️ Mess Management**: View daily menus, special meals, and timing schedules.
- **🔔 Smart Notifications**: Get instant alerts for attendance, maintenance, and announcements.
- **🛠️ Complaint System**: Submit maintenance requests and track resolution status in real-time.
- **⚡ Quick Access**: dedicated landing page for returning users to jump straight to their dashboard.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, Modern JavaScript (ES6+)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL & Auth)
- **Styling**: Custom CSS with a focus on dark mode, glassmorphism, and responsive design.

---

## 📂 Project Structure

```text
d:/SGP
├── index.html           # Main landing page
├── selection.html       # Hostel discovery portal
├── comparison.html      # side-by-side hostel comparing
├── dashboard.html       # User dashboard
├── login.html           # User authentication (Sign In)
├── register.html        # User registration (Sign Up)
├── complaints.html      # Maintenance & complaint panel
├── notifications.html   # Notification center
├── quick-access.html    # Returning user landing page
├── css/                 # Stylesheets
├── js/                  # Application logic
│   ├── supabase.js      # Supabase initialization & config
│   └── main.js          # Shared utility functions
├── .env.example         # Template for environment variables
└── Supabase_setup       # SQL migration scripts for DB setup
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- A basic web server (Live Server for VS Code is recommended).
- A [Supabase](https://supabase.com/) account.

### 2. Database Setup
1. Create a new project on Supabase.
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the content from `Supabase_setup` and run it to create the necessary tables (`hostels`, `users`, `attendance`, `complaints`) and policies.

### 3. Configuration
1. Obtain your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the Supabase Project Settings API section.
2. Open `js/supabase.js` and update the credentials:
   ```javascript
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

### 4. Running the App
Simply open `index.html` using a live server or drag it into your browser.

---

## 🎨 Design Philosophy
HostelHub is built with a **Premium UI** approach:
- **Dark Mode Default**: Reduces eye strain and looks sleek.
- **Glassmorphism**: Modern frosted-glass effects for cards and navbars.
- **Micro-animations**: Smooth transitions and hover effects for a responsive feel.
- **Mobile First**: Optimized for handheld devices, typical for QR-code interactions.

---

## 📄 License
This project is open-source and available under the MIT License.
