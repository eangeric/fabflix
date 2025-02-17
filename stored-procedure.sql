DELIMITER $$

CREATE PROCEDURE add_star(
    IN newStarName VARCHAR(100),
    IN newStarBirthYear INT
)
BEGIN
    DECLARE newStarId VARCHAR(10);

    -- Generate new star ID
    SELECT CONCAT('nm', LPAD(COALESCE(MAX(CAST(SUBSTRING(id, 3) AS UNSIGNED)), 0) + 1, 7, '0'))
    INTO newStarId FROM stars;

    -- Insert new star
    INSERT INTO stars (id, name, birthYear) 
    VALUES (newStarId, newStarName, newStarBirthYear);

    -- Return the newly created star ID
    SELECT newStarId AS star_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE add_movie(
    IN in_title VARCHAR(100),
    IN in_year INT,
    IN in_director VARCHAR(100),
    IN in_star_name VARCHAR(100),
    IN in_star_birthyear INT,
    IN in_genre_name VARCHAR(32)
)
BEGIN
    DECLARE movie_id VARCHAR(10);
    DECLARE star_id VARCHAR(10);
    DECLARE genre_id INT;
    DECLARE max_movie_id VARCHAR(10);
    DECLARE max_star_id VARCHAR(10);
    DECLARE random_price DECIMAL(5,2);

    -- Generate a random price between $5.00 and $20.00
    SET random_price = ROUND((5 + (RAND() * 15)), 2);

    -- Check if the movie already exists
    IF EXISTS (
        SELECT 1 FROM movies WHERE title = in_title AND year = in_year AND director = in_director
    ) THEN
        SELECT 'ERROR' AS status, NULL AS movie_id, NULL AS star_id, NULL AS genre_id,
               CONCAT('Movie "', in_title, '" (', in_year, ') by ', in_director, ' already exists. No changes made.') AS message;
    ELSE
        -- Generate new movie ID
        SELECT MAX(id) INTO max_movie_id FROM movies;
        IF max_movie_id IS NULL THEN
            SET movie_id = 'tt0000001';
        ELSE
            SET movie_id = CONCAT('tt', LPAD(CAST(SUBSTRING(max_movie_id, 3) AS UNSIGNED) + 1, 7, '0'));
        END IF;

        -- Insert new movie with random price
        INSERT INTO movies (id, title, year, director, price) 
        VALUES (movie_id, in_title, in_year, in_director, random_price);

        -- Check if the star exists
        SELECT id INTO star_id FROM stars WHERE name = in_star_name LIMIT 1;
        IF star_id IS NULL THEN
            -- Generate new star ID
            SELECT MAX(id) INTO max_star_id FROM stars;
            IF max_star_id IS NULL THEN
                SET star_id = 'nm0000001';
            ELSE
                SET star_id = CONCAT('nm', LPAD(CAST(SUBSTRING(max_star_id, 3) AS UNSIGNED) + 1, 7, '0'));
            END IF;
            INSERT INTO stars (id, name, birthYear) VALUES (star_id, in_star_name, in_star_birthyear);
        END IF;

        -- Check if genre exists
        SELECT id INTO genre_id FROM genres WHERE name = in_genre_name LIMIT 1;
        IF genre_id IS NULL THEN
            INSERT INTO genres (name) VALUES (in_genre_name);
            SET genre_id = LAST_INSERT_ID();
        END IF;

        -- Link star and genre to movie
        INSERT INTO stars_in_movies (starId, movieId) VALUES (star_id, movie_id);
        INSERT INTO genres_in_movies (genreId, movieId) VALUES (genre_id, movie_id);

        -- Return the generated movie_id, star_id, and genre_id
        SELECT 'SUCCESS' AS status, movie_id, star_id, genre_id, 
               CONCAT('New movie added with ID: ', movie_id, ' and price: $', random_price) AS message;
    END IF;
END$$

DELIMITER ;
