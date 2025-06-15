-- Insert sample users
INSERT INTO users (name, email, password) VALUES
('John Doe', 'john@example.com', '$2a$10$rOzJqQZQQQQQQQQQQQQQQu'),
('Jane Smith', 'jane@example.com', '$2a$10$rOzJqQZQQQQQQQQQQQQQQu'),
('Mike Johnson', 'mike@example.com', '$2a$10$rOzJqQZQQQQQQQQQQQQQQu');

-- Insert sample raffles
INSERT INTO raffles (title, description, image_url, ticket_price, draw_datetime, creator_user_id) VALUES
('Help Local Animal Shelter', 'Support our local animal shelter with this 50:50 raffle. Half goes to the winner, half helps feed and care for rescued animals.', '/placeholder.svg?height=300&width=400', 5.00, '2024-12-20 18:00:00', 1),
('Community Food Bank Drive', 'Join our community food bank fundraiser! Win big while helping families in need during the holiday season.', '/placeholder.svg?height=300&width=400', 10.00, '2024-12-22 20:00:00', 2),
('Youth Sports Equipment Fund', 'Help us raise money for new sports equipment for local youth teams. Every ticket counts!', '/placeholder.svg?height=300&width=400', 3.00, '2024-12-25 15:00:00', 3);

-- Insert sample entries
INSERT INTO entries (user_id, raffle_id, ticket_count, total_amount) VALUES
(2, 1, 2, 10.00),
(3, 1, 1, 5.00),
(1, 2, 3, 30.00),
(3, 2, 1, 10.00),
(1, 3, 5, 15.00),
(2, 3, 2, 6.00);
