CREATE TABLE um_request_log (
    log_id SERIAL PRIMARY KEY,
    user_id INT,
    site_id INT,
    request_method VARCHAR(10),
    api_requested JSONB,
    user_ip VARCHAR(16),
    user_os VARCHAR(10),
    request_success BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE um_creation_log (
    log_id SERIAL PRIMARY KEY,
    user_id INT,
    site_id INT,
    table_name VARCHAR(50),
    record_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE um_modification_log (
    log_id SERIAL PRIMARY KEY,
    user_id INT,
    site_id INT,
    table_name VARCHAR(50),
    record_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE um_deletion_log (
    log_id SERIAL PRIMARY KEY,
    user_id INT,
    site_id INT,
    table_name VARCHAR(50),
    record_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE um_modification_log_detail (
    field_modification_id SERIAL PRIMARY KEY,
    log_id INT UNIQUE,
    field_name VARCHAR(50),
    old_value JSONB
);

CREATE TABLE um_deletion_log_detail (
    field_modification_id SERIAL PRIMARY KEY,
    log_id INT UNIQUE,
    field_name VARCHAR(50),
    old_value JSONB
);

ALTER TABLE um_request_log
    ADD CONSTRAINT fk_request_user_id FOREIGN KEY (user_id) REFERENCES ""um_user""(user_id),
    ADD CONSTRAINT fk_request_site_id FOREIGN KEY (site_id) REFERENCES ""um_site""(site_id);

ALTER TABLE um_creation_log
    ADD CONSTRAINT fk_creation_user_id FOREIGN KEY (user_id) REFERENCES ""um_user""(user_id),
    ADD CONSTRAINT fk_creation_site_id FOREIGN KEY (site_id) REFERENCES ""um_site""(site_id);

ALTER TABLE um_modification_log
    ADD CONSTRAINT fk_modification_user_id FOREIGN KEY (user_id) REFERENCES ""um_user""(user_id),
    ADD CONSTRAINT fk_modification_site_id FOREIGN KEY (site_id) REFERENCES ""um_site""(site_id);

ALTER TABLE um_deletion_log
    ADD CONSTRAINT fk_deletion_user_id FOREIGN KEY (user_id) REFERENCES ""um_user""(user_id),
    ADD CONSTRAINT fk_deletion_site_id FOREIGN KEY (site_id) REFERENCES ""um_site""(site_id);
