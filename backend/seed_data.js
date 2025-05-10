const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('matches.db', (err) => {
    if (err) {
        console.error('Błąd podczas otwierania bazy:', err);
    } else {
        console.log('Połączono z bazą danych.');
    }
});

const teams = [
    'FC Barcelona', 'Real Madrid', 'Atlético Madrid', 'Sevilla FC',
    'Real Sociedad', 'Real Betis', 'Villarreal', 'Athletic Bilbao'
];

const firstNames = ['Jan', 'Marek', 'Tomasz', 'Krzysztof', 'Adam', 'Paweł', 'Łukasz', 'Piotr', 'Kamil', 'Jakub', 'Mateusz'];
const lastNames = ['Kowalski', 'Nowak', 'Wójcik', 'Zieliński', 'Wiśniewski', 'Kamiński', 'Lewandowski', 'Szymański', 'Woźniak', 'Dąbrowski', 'Kaczmarek'];

let playerCounter = 0;

for (let i = 0; i < teams.length; i += 2) {
    const team1 = teams[i];
    const team2 = teams[i + 1];
    const match_date = `2025-05-${10 + i} ${18 + i % 5}:00`;

    const matchQuery = `INSERT INTO matches (team1, team2, match_date) VALUES (?, ?, ?)`;
    db.run(matchQuery, [team1, team2, match_date], function (err) {
        if (err) {
            console.error('Błąd przy dodawaniu meczu:', err);
            return;
        }

        const matchId = this.lastID;
        console.log(`Dodano mecz ${team1} vs ${team2}, ID meczu: ${matchId}`);

        [team1, team2].forEach(team => {
            for (let j = 0; j < 11; j++) {
                const name = `${firstNames[(playerCounter + j) % firstNames.length]} ${lastNames[(playerCounter + j) % lastNames.length]}`;
                const position = ['Bramkarz', 'Obrońca', 'Pomocnik', 'Napastnik'][j % 4];
                const goals = Math.floor(Math.random() * 5);
                const assists = Math.floor(Math.random() * 5);
                const passes = Math.floor(Math.random() * 50) + 10;
                const fouls = Math.floor(Math.random() * 4);

                const playerQuery = `
                    INSERT INTO players (name, team, position, match_id, goals, assists, passes, fouls)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;
                db.run(playerQuery, [name, team, position, matchId, goals, assists, passes, fouls], function (err) {
                    if (err) {
                        console.error('Błąd przy dodawaniu zawodnika:', err);
                    } else {
                        console.log(`Dodano zawodnika ${name} (${team})`);
                    }
                });
            }
            playerCounter += 11;
        });
    });
}

setTimeout(() => {
    db.close((err) => {
        if (err) {
            console.error('Błąd przy zamykaniu bazy:', err);
        } else {
            console.log('Baza danych zamknięta.');
        }
    });
}, 3000);
