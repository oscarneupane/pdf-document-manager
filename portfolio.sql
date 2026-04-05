-- =========================================
--  PORTFOLIO DATABASE — database/portfolio.sql
-- =========================================

CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

-- ---- MESSAGES (contact form) ----
CREATE TABLE IF NOT EXISTS messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL,
  message    TEXT          NOT NULL,
  is_read    TINYINT(1)    DEFAULT 0,
  created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ---- PROJECTS ----
CREATE TABLE IF NOT EXISTS projects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(150)  NOT NULL,
  description TEXT,
  tech_stack  VARCHAR(255),
  demo_url    VARCHAR(255),
  code_url    VARCHAR(255),
  icon        VARCHAR(10)   DEFAULT '🖥️',
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ---- SEED PROJECTS ----
INSERT INTO projects (title, description, tech_stack, demo_url, code_url, icon) VALUES
('E-Commerce Platform',  'Full-stack shopping app with user auth, cart, and MySQL product/order management.', 'JavaScript,Node.js,MySQL,CSS', '#', '#', '🛒'),
('Analytics Dashboard',  'Real-time data dashboard pulling from MySQL, with dynamic charts and filters.',     'HTML,CSS,JavaScript,MySQL',   '#', '#', '📊'),
('Task Manager App',     'CRUD task app with user sessions, priority filters, and persistent database.',      'Node.js,Express,MySQL,CSS',   '#', '#', '📝'),
('REST API Service',     'Scalable REST API with JWT auth, rate limiting, and full MySQL integration.',       'Node.js,Express,MySQL',       '#', '#', '🌐'),
('Chat Application',     'Real-time chat with WebSockets, persistent message storage, and user profiles.',   'JavaScript,Node.js,MySQL',    '#', '#', '💬'),
('Auth System',          'Secure auth with bcrypt, JWT tokens, password reset and MySQL user management.',   'Node.js,MySQL,JavaScript',    '#', '#', '🔐');

-- ---- SKILLS (optional tracking) ----
CREATE TABLE IF NOT EXISTS skills (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  category   VARCHAR(80),
  level      INT DEFAULT 80
);

INSERT INTO skills (name, category, level) VALUES
('JavaScript', 'Frontend', 88),
('HTML & CSS',  'Frontend', 92),
('MySQL',       'Database', 80),
('Node.js',     'Backend',  75);