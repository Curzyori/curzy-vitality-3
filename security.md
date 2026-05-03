# Sentinel Security Guidelines

This document outlines the security measures implemented in the Curzy Vitality (CV) Sentinel module to protect local data and system integrity.

## 1. Local Database Protection
- **No Direct Network Access:** The SQLite database (`sentinel.db`) is stored locally and never exposed directly to the network.
- **File Permissions:** Ensure the `.db` file and the `/data` directory have restricted read/write permissions (e.g., `chmod 600`), accessible only by the daemon user.
- **Location:** The database is stored outside the web root.
- **Git Ignore:** The database files (`*.db`, `*.sqlite`, `*.sqlite3`) are explicitly excluded from version control (`.gitignore`) to prevent accidental leaks.

## 2. API Server Security
- **Internal Port Binding:** The Express dashboard communication server runs on dedicated port `3005` and must be bound exclusively to `localhost` (`127.0.0.1`). Never bind to `0.0.0.0` unless explicitly protected by a reverse proxy.
- **Input Validation:** All incoming requests from the dashboard must be strictly validated. Never trust client input.
- **CORS:** Implement strict Cross-Origin Resource Sharing (CORS) policies, allowing requests only from the trusted local dashboard.

## 3. Environment Configuration
- **.env Files:** All sensitive configurations (database paths, port bindings, internal API keys if any) are managed via `.env` files.
- **Version Control:** `.env` is ignored in `.gitignore`. A `.env.example` should be provided with dummy values for other developers.

## 4. Execution Privileges
- **Principle of Least Privilege:** The background daemon should not run as `root`. It should run under a dedicated system user with only the permissions necessary to poll system information.
- **Module Security:** Keep `better-sqlite3`, `systeminformation`, and `express` updated to their LTS versions to mitigate known vulnerabilities.

## 5. Input Sanitization
- **Database Queries:** All database queries utilize parameterized statements provided by `better-sqlite3` to completely prevent SQL Injection attacks.
