
INSERT INTO artists (nome, bio, "imageUrl", "createdAt", "updatedAt") VALUES 
 (
    'Kanye West', 
    'Kanye West é um rapper, produtor musical, designer de moda e empresário americano. Ele é conhecido por sua influência significativa na música e na cultura pop, com álbuns icônicos como "The College Dropout" e "My Beautiful Dark Twisted Fantasy". Além de sua carreira musical, Kanye é fundador da marca Yeezy e tem sido uma figura polêmica por suas opiniões e ações públicas.',
    'https://s2-quem.glbimg.com/sJ_TO6vO5xchGjme4Npg9eg8PEE=/fit-in/324x299/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b0f0e84207c948ab8b8777be5a6a4395/internal_photos/bs/2022/c/p/mt8TzETbqajAy0gKKK2A/2021-01-07-kanye-west.jpeg', 
    NOW(), 
    NOW()
),
 (
    'Michael Jackson', 
    'Michael Jackson, conhecido como o "Rei do Pop", foi um cantor, compositor, dançarino e filantropo americano. Reconhecido como um dos artistas mais influentes de todos os tempos, ele lançou álbuns icônicos como "Thriller", "Bad" e "Dangerous". Jackson também revolucionou o mundo do entretenimento com suas performances e videoclipes inovadores, além de ser amplamente admirado por sua contribuição à música e à cultura global.',
    'https://i.scdn.co/image/ab6761610000e5eb997cc9a4aec335d46c9481fd', 
    NOW(), 
    NOW()
),
(
    'MF DOOM', 
    'MF DOOM, nascido Daniel Dumile, foi um rapper e produtor britânico-americano conhecido por sua persona mascarada e estilo lírico único. Considerado uma lenda do rap underground, ele lançou álbuns clássicos como "Operation: Doomsday" e "Madvillainy" (em parceria com Madlib). MF DOOM era famoso por seus jogos de palavras complexos e beats inovadores, consolidando-se como um dos artistas mais influentes do gênero.',
    'https://i.scdn.co/image/ab6761610000e5eb6c8167ef48a872b6f190078f', 
    NOW(), 
    NOW()
);

INSERT INTO albums (title, "releaseYear", "coverImageUrl", "createdAt", "updatedAt", artista_id) VALUES
(
    'The College Dropout', 
    2004, 
    'https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da847a45ed9366f92446f48eb588', 
    NOW(), 
    NOW(), 
    1
),
(
    'Late Registration', 
    2005, 
    'https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2', 
    NOW(), 
    NOW(), 
    1
),
(
    'Graduation', 
    2007, 
    'https://upload.wikimedia.org/wikipedia/pt/7/7b/Graduation_%28%C3%A1lbum_de_Kanye_West%29.jpg', 
    NOW(), 
    NOW(), 
    1
),
(
    'Thriller', 
    1982, 
    'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png', 
    NOW(), 
    NOW(), 
    2
),
(
    'Bad', 
    1987, 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStep0q8UYqVHVo4DfoNdFHSKDjWQInSrRSjw&s', 
    NOW(), 
    NOW(), 
    2
),
(
    'Operation: Doomsday', 
    1999, 
    'https://i.scdn.co/image/ab67616d0000b2736ce90ec627a0198a8efd127f', 
    NOW(), 
    NOW(), 
    3
),
(
    'Madvillainy', 
    2004, 
    'https://i.scdn.co/image/ab67616d0000b27374dc897ea75402db37ef239a', 
    NOW(), 
    NOW(), 
    3
);

-- Inserir músicas do álbum 'The College Dropout'
INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('We Don''t Care', 240, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 1),
('Graduation Day', 267, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 1),
('All Falls Down', 271, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 1),
('Spaceship', 334, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 1),
('Jesus Walks', 273, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 1),
('Never Let Me Down', 332, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 1),
('Last Call', 359, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 1);

-- Inserir músicas do álbum 'Late Registration'
INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('Wake Up Mr. West', 324, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 2),
('Heard ''Em Say', 317, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 2),
('Touch the Sky', 289, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 2),
('Gold Digger', 258, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 2),
('Drive Slow', 319, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 2);

-- Inserir músicas do álbum 'Graduation'
INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('Good Morning', 174, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 3),
('Champion', 202, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 3),
('Stronger', 329, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 3),
('I Wonder', 246, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 3),
('Homecoming', 246, 'URL_DO_ARQUIVO', NOW(), NOW(), 1, 3);

-- Inserir músicas do álbum 'Thriller'
INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('Wanna Be Startin'' Somethin''', 364, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 4),
('Baby Be Mine', 272, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 4),
('The Girl Is Mine', 242, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 4),
('Thriller', 357, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 4),
('Beat It', 258, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 4);

-- Inserir músicas do álbum 'Bad'
INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('Bad', 289, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 5),
('The Way You Make Me Feel', 266, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 5),
('Speed Demon', 230, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 5),
('Liberian Girl', 263, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 5),
('Just Good Friends', 264, 'URL_DO_ARQUIVO', NOW(), NOW(), 2, 5);

-- Inserir músicas do álbum 'Operation: Doomsday'
INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('Doomsday', 275, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 6),
('Rhymes Like Dimes', 295, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 6),
('The Finest', 291, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 6),
('Dead Bent', 276, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 6),
('Tick Tick...', 259, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 6);

-- Inserir músicas do álbum 'Madvillainy'
INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('Accordian', 201, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 7),
('Meat Grinder', 196, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 7),
('Danger Doom', 193, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 7),
('Figaro', 220, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 7),
('Shadows of Tomorrow', 216, 'URL_DO_ARQUIVO', NOW(), NOW(), 3, 7);

select * from musicas
