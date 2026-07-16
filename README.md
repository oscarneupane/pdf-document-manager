# 📄 PDF Document Manager

A Node.js/Express web app for managing employee PDF documents in a company setting — upload, auto-organise, search, preview, email, and archive PDFs by **department** and **employee**, with everything stored in a clean, predictable folder structure.

Built to solve a real workflow problem: HR teams drowning in loose payslips, training certificates, and leave forms scattered across inboxes and desktops.

## ✨ Features

- **Bulk PDF upload** (up to 20 files at once, 50 MB each) with strict PDF-only validation
- **Auto-organised storage** — files are filed as `uploads/<Department>/<SURNAME_Firstname>/<date>_<filename>.pdf`
- **7 department categories** — HR, Training, Medical, Payslip, PPE, Leave Application, Compensation
- **Full document tree API** — browse every department and employee folder as JSON
- **Text extraction & scan** — reads PDF content with `pdf-parse` for inspection/search
- **Email documents** — send any stored PDF as an attachment straight from the app via Nodemailer
- **File management** — download, move between departments/employees, and delete via REST endpoints
- **Web UI** — a dedicated documents dashboard (`/docs`) for uploading and browsing without touching the API

## 🔌 API Overview

| Method | Endpoint | What it does |
|--------|----------|--------------|
| `GET` | `/api/docs/departments` | List department categories |
| `GET` | `/api/docs/list` | List documents (filter by department/employee) |
| `GET` | `/api/docs/tree` | Full folder tree as JSON |
| `POST` | `/api/docs/upload` | Bulk-upload PDFs with department + employee metadata |
| `GET` | `/api/docs/scan` | Extract text content from a stored PDF |
| `GET` | `/api/docs/download` | Download a stored PDF |
| `POST` | `/api/docs/send` | Email a stored PDF as an attachment |
| `POST` | `/api/docs/move` | Move a document to another department/employee |
| `DELETE` | `/api/docs/delete` | Delete a document |

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, Multer (uploads), pdf-parse (text extraction), Nodemailer (email)
- **Database:** MySQL (`mysql2`) for the companion portfolio/projects data
- **Frontend:** Vanilla HTML/CSS/JavaScript dashboard — no framework needed

## 🚀 Getting Started

```bash
git clone https://github.com/oscarneupane/pdf-document-manager.git
cd pdf-document-manager
npm install

# configure environment
cp .env.example .env   # or create .env with the values below

npm run dev            # nodemon, or: npm start
```

Then open **http://localhost:5000/docs** for the document dashboard.

`.env` values:

```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio
```

Load the database schema (used by the portfolio/projects routes):

```bash
mysql -u root -p < portfolio.sql
```

## 📁 How files are organised

```
uploads/
├── HR/
│   └── NEUPANE_Oscar/
│       └── 2026-05-01_employment-contract.pdf
├── Payslip/
│   └── SMITH_Jane/
│       ├── 2026-04-30_payslip-april.pdf
│       └── 2026-05-31_payslip-may.pdf
└── Training/
    └── ...
```

Surnames are upper-cased, filenames are sanitised, and every file is date-prefixed — so the archive stays consistent no matter who uploads.

## 📬 Contact

**Oscar Neupane** — [neupaneoscar143@gmail.com](mailto:neupaneoscar143@gmail.com) · [GitHub](https://github.com/oscarneupane)

## 📝 License

MIT
