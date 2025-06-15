-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create raffles table
CREATE TABLE IF NOT EXISTS raffles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    ticket_price DECIMAL(10,2) NOT NULL,
    draw_datetime TIMESTAMP NOT NULL,
    creator_user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_drawn BOOLEAN DEFAULT FALSE
);

-- Create entries table
CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    raffle_id INTEGER REFERENCES raffles(id),
    ticket_count INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create winners table
CREATE TABLE IF NOT EXISTS winners (
    id SERIAL PRIMARY KEY,
    raffle_id INTEGER REFERENCES raffles(id),
    user_id INTEGER REFERENCES users(id),
    won_amount DECIMAL(10,2) NOT NULL,
    drawn_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
