CREATE DATABASE IF NOT EXISTS mbank
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mbank;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_number CHAR(10) NOT NULL UNIQUE,
  type ENUM('debit', 'savings') NOT NULL DEFAULT 'debit',
  balance DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  status ENUM('active', 'frozen', 'closed') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_accounts_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT chk_accounts_balance CHECK (balance >= 0)
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  type ENUM('deposit', 'withdrawal', 'transfer_in', 'transfer_out') NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  related_account_id INT NULL,
  description VARCHAR(200) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_transactions_account FOREIGN KEY (account_id) REFERENCES accounts(id),
  CONSTRAINT fk_transactions_related FOREIGN KEY (related_account_id) REFERENCES accounts(id),
  CONSTRAINT chk_transactions_amount CHECK (amount > 0)
);

CREATE TABLE IF NOT EXISTS cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  type ENUM('debit', 'credit') NOT NULL,
  last_four CHAR(4) NOT NULL,
  expires_at DATE NOT NULL,
  credit_limit DECIMAL(12, 2) NULL,
  credit_used DECIMAL(12, 2) NULL,
  status ENUM('active', 'blocked', 'expired') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cards_account FOREIGN KEY (account_id) REFERENCES accounts(id)
);