# Front-End Assessment - Domain Management App ⚛️

A single-page application built with React to manage a list of domains, allowing users to add, edit, delete, verify, search, and sort domain entries. This project was created as part of a front-end assessment.

---

## 🚀 Live Demo

## https://domains-management.netlify.app

---

## ✨ Features Implemented

- **List Domains:** Displays domains in a table with status indicators and details.
- **Add Domain:** Allows adding new domains via a drawer form.
- **Edit Domain:** Allows editing existing domain details (URL, Active Status, Verification Status) in the same drawer form.
- **Delete Domain:** Allows deleting domains with a confirmation step (`Modal.confirm`).
- **Verify Domain:** Allows marking a domain as 'Verified' and 'Active' via an action menu item (using `PUT`).
- **Search:** Filters the domain list based on user input in the search bar (case-insensitive).
- **Sort:** Sorts the domain list by Name (A-Z, Z-A) or by ID (Created First/Last) using a dropdown.
- **Validation:** Includes basic form validation (required fields, no spaces in URL, basic URL format warning).
- **Duplicate Check:** Prevents adding a new domain if one with the same name already exists in the list (front-end check).
- **API Interaction:** Uses RTK Query for efficient data fetching, caching, and mutations against the provided MockAPI.
- **State Management:** Utilizes RTK Query for server state and React Hooks (`useState`, `useEffect`, `useMemo`) within a custom hook (`useDomainManagement`) for client/UI state.
- **Responsive UI:** The header layout adjusts for different screen sizes using CSS Modules.
- **User Feedback:** Uses Ant Design `message` components for success/error feedback on actions.

---

## 🛠️ Tech Stack

- **React:** v19 (with `@ant-design/v5-patch-for-react-19`)
- **Ant Design (AntD):** v5 - Component Library
- **Redux Toolkit** + **RTK Query:** State Management & Data Fetching
- **CSS Modules:** Scoped CSS Styling
- **ESLint & Prettier:** Code Linting & Formatting

---

## ⚙️ Setup and Run Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/davariijs/front-end-assessment.git
    cd front-end-assessment
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    - Create a `.env` file in the project root (copy `.env.example`).
    - Add the API base URL variable:
      ```dotenv
      # Contents for .env file
      REACT_APP_API_BASE_URL=
      ```
4.  **Run the development server:**
    ```bash
    npm start
    ```
5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤔 Design Decisions & Notes

- A custom hook (`useDomainManagement`) encapsulates state management, API logic, and data processing (filtering/sorting) for the domains feature.
- Sorting uses Domain Name or ID. ID sort is used as a proxy for creation order ("Created First"/"Created Last").
- A front-end duplicate check was added during 'Add Domain' as the MockAPI allows duplicate entries.
- The UI generally follows the provided mockups, with adjustments for responsiveness and clarity (e.g., sort option labels).

---

## ⚠️ Known Issues / Limitations

- The MockAPI endpoint (`GET /domain`) returns duplicate domain entries; the UI displays these as received.
- "View pages" and "Install script" actions are placeholders with no implemented functionality.

---
