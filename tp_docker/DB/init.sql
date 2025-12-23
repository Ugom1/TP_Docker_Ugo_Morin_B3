CREATE TABLE IF NOT EXISTS jokes (
    id SERIAL PRIMARY KEY,
    phrase TEXT NOT NULL
);

INSERT INTO jokes (phrase) VALUES 
('Pourquoi les développeurs n''aiment pas le soleil ? Parce qu''il y a trop de bugs en production.'),
('Combien de développeurs faut-il pour changer une ampoule ? Aucun, c''est un problème de hardware.'),
('Mon code ne plante jamais, il explore des cas limites inattendus.'),
('Un SQL entre dans un bar, s''approche de deux tables et dit : "Puis-je vous joindre ?"'),
('J''ai demandé à Docker de faire la vaisselle, il m''a répondu : "ça tourne sur ma machine".');