INSERT INTO services (name, description,ruuter_type)
VALUES (:name, :description,UPPER(:ruuter_type)::ruuter_request_type);