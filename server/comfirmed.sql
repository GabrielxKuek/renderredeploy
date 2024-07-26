CREATE TABLE um_status(
    status_id SERIAL PRIMARY KEY,
    status_type VARCHAR(64),
    status_description TEXT,
    updated_on TIMESTAMP() DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE um_user (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_id INT
);

CREATE TABLE um_forgot_password (
    forgot_password_id SERIAL PRIMARY KEY,
    forgot_password_code VARCHAR(6),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT
);

CREATE TABLE um_user_profile (
    profile_id SERIAL PRIMARY KEY,
    profile_name VARCHAR(64) UNIQUE,
    profile_pin VARCHAR(6),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT
);

CREATE TABLE um_user_profile_field_details (
    profile_id SERIAL,
    field_key_id INT,
    field_value VARCHAR(255),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    field_site_id INT,
    PRIMARY KEY (profile_id, field_key_id)
);

CREATE TABLE um_user_profile_field_site (
    field_site_id SERIAL PRIMARY KEY,
    field_key_id INT,
    site_id INT
);

CREATE TABLE um_user_profile_field (
    field_key_id SERIAL PRIMARY KEY,
    field_name VARCHAR(255) UNIQUE
);

CREATE TABLE um_invited_user (
   user_site_role_permission_id SERIAL PRIMARY KEY,
   invited_key VARCHAR(6),
   status_id INT,
   created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE um_reset_type (
    reset_type_id SERIAL PRIMARY KEY,
    reset_method VARCHAR(255) UNIQUE
);

CREATE TABLE um_reset_user (
    reset_user_id SERIAL PRIMARY KEY,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reset_type_id INT,
    user_id INT
);

CREATE TABLE um_group (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(64),
    group_description TEXT
);

CREATE TABLE um_site_user_group (
    site_user_group_id SERIAL PRIMARY KEY,
    user_site_role_permission_id INT,
    group_id INT
);

ALTER TABLE um_user
ADD CONSTRAINT fk_user_status_id FOREIGN KEY (status_id) REFERENCES um_status(status_id) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE um_invited_user
ADD CONSTRAINT fk_invited_user_status_id FOREIGN KEY (status_id) REFERENCES um_status(status_id) ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE um_user_profile
ADD CONSTRAINT fk_user_profile_user_id FOREIGN KEY (user_id) REFERENCES um_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE um_user_profile_field_details
ADD CONSTRAINT fk_user_profile_field_details_profile_id FOREIGN KEY (profile_id) REFERENCES um_user_profile(profile_id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_user_profile_field_details_site_id FOREIGN KEY (field_site_id) REFERENCES um_user_profile_field_site(field_site_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE um_user_profile_field_site
ADD CONSTRAINT fk_user_profile_field_site_key_id FOREIGN KEY (field_key_id) REFERENCES um_user_profile_field(field_key_id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_user_profile_field_site_site_id FOREIGN KEY (site_id) REFERENCES um_site(site_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE um_forgot_password
ADD CONSTRAINT fk_forgot_password_user_id FOREIGN KEY (user_id) REFERENCES um_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE um_site_user_group
ADD CONSTRAINT fk_site_user_group_permission_id FOREIGN KEY (user_site_role_permission_id) REFERENCES um_user_site_role_permission(user_site_role_permission_id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_site_user_group_group_id FOREIGN KEY (group_id) REFERENCES um_group(group_id) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE um_reset_user
ADD CONSTRAINT fk_reset_user_reset_id FOREIGN KEY (reset_type_id) REFERENCES um_reset_type(reset_type_id) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT fk_reset_user_user_id FOREIGN KEY (user_id) REFERENCES um_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE;
