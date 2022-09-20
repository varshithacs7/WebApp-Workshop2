CREATE TABLE IF NOT EXISTS  auth_user (
    id SERIAL,
    email_id VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(48),
    last_name VARCHAR(48),
    zip_code VARCHAR(8),
    PRIMARY KEY (id)
);