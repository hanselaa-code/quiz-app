// src/lib/questions_seed.js

export const CATEGORIES = [
    "Sport",
    "Musikk",
    "Film og TV",
    "Historie",
    "Geografi",
    "Vitenskap",
    "Lett blanding",
    "Mat og drikke"
];

// 50 questions per category is the goal. Starting with a smaller set for testing (approx 5-10 per category).
// Structure: { category, questionText, options, correctAnswerIndex }

export const INITIAL_QUESTIONS = [
    // --- SPORT ---
    {
        category: "Sport",
        questionText: "Hvem vant VM i fotball for menn i 2022?",
        options: ["Frankrike", "Brasil", "Argentina", "Tyskland"],
        correctAnswerIndex: 2
    },
    {
        category: "Sport",
        questionText: "Hvor mange spillere er det på et håndballag (på banen)?",
        options: ["5", "6", "7", "8"],
        correctAnswerIndex: 2
    },
    {
        category: "Sport",
        questionText: "Hvilket land arrangerte vinter-OL i 1994?",
        options: ["Sverige", "USA", "Norge", "Canada"],
        correctAnswerIndex: 2
    },
    {
        category: "Sport",
        questionText: "Hvem er kjent som 'The King of Clay' i tennis?",
        options: ["Roger Federer", "Novak Djokovic", "Rafael Nadal", "Andy Murray"],
        correctAnswerIndex: 2
    },
    {
        category: "Sport",
        questionText: "Hvor langt er et maratonløp?",
        options: ["40 km", "42,195 km", "45 km", "50 km"],
        correctAnswerIndex: 1
    },

    // --- MUSIKK ---
    {
        category: "Musikk",
        questionText: "Hvem er kjent som 'The King of Pop'?",
        options: ["Elvis Presley", "Prince", "Michael Jackson", "Freddie Mercury"],
        correctAnswerIndex: 2
    },
    {
        category: "Musikk",
        questionText: "Hvilket band ga ut albumet 'Abbey Road'?",
        options: ["The Rolling Stones", "The Beatles", "Pink Floyd", "Led Zeppelin"],
        correctAnswerIndex: 1
    },
    {
        category: "Musikk",
        questionText: "Hvem vant Eurovision Song Contest for Norge i 2009?",
        options: ["Jah Teigen", "Bobbysocks", "Alexander Rybak", "Secret Garden"],
        correctAnswerIndex: 2
    },
    {
        category: "Musikk",
        questionText: "Hva heter vokalisten i bandet Coldplay?",
        options: ["Chris Martin", "Thom Yorke", "Bono", "Dave Grohl"],
        correctAnswerIndex: 0
    },
    {
        category: "Musikk",
        questionText: "Hvilket instrument spiller Ole Bull?",
        options: ["Piano", "Fiolin", "Gitar", "Trompet"],
        correctAnswerIndex: 1
    },

    // --- FILM OG TV ---
    {
        category: "Film og TV",
        questionText: "Hvem spilte hovedrollen som Jack Dawson i 'Titanic'?",
        options: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"],
        correctAnswerIndex: 2
    },
    {
        category: "Film og TV",
        questionText: "Hva heter den fiktive planeten i filmen 'Avatar'?",
        options: ["Tatooine", "Pandora", "Vulcan", "Arrakis"],
        correctAnswerIndex: 1
    },
    {
        category: "Film og TV",
        questionText: "Hvilken serie handler om jerntronen?",
        options: ["The Witcher", "Lord of the Rings", "Game of Thrones", "Vikings"],
        correctAnswerIndex: 2
    },
    {
        category: "Film og TV",
        questionText: "Hvem har stemmen til eskelet i 'Shrek' på engelsk?",
        options: ["Eddie Murphy", "Mike Myers", "Chris Rock", "Will Smith"],
        correctAnswerIndex: 0
    },
    {
        category: "Film og TV",
        questionText: "Hva heter trollmannen som er rektor på Galtvort?",
        options: ["Severus Slur", "Sirius Svaart", "Albus Humlesnurr", "Rubeus Gygrid"],
        correctAnswerIndex: 2
    },

    // --- HISTORIE ---
    {
        category: "Historie",
        questionText: "Når startet andre verdenskrig?",
        options: ["1914", "1939", "1945", "1929"],
        correctAnswerIndex: 1
    },
    {
        category: "Historie",
        questionText: "Hvem var den første personen på månen?",
        options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"],
        correctAnswerIndex: 2
    },
    {
        category: "Historie",
        questionText: "Hvilket år ble den norske grunnloven underskrevet?",
        options: ["1905", "1814", "1884", "1945"],
        correctAnswerIndex: 1
    },
    {
        category: "Historie",
        questionText: "Hvem var leder for Sovjetunionen under andre verdenskrig?",
        options: ["Vladimir Lenin", "Nikita Khrusjtsjov", "Mikhail Gorbatsjov", "Josef Stalin"],
        correctAnswerIndex: 3
    },
    {
        category: "Historie",
        questionText: "Hvilket rike bygget Colosseum?",
        options: ["Det gamle Hellas", "Det osmanske riket", "Romerriket", "Det britiske imperiet"],
        correctAnswerIndex: 2
    },

    // --- GEOGRAFI ---
    {
        category: "Geografi",
        questionText: "Hva er hovedstaden i Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswerIndex: 2
    },
    {
        category: "Geografi",
        questionText: "Hvilket land har flest innbyggere i verden (2023)?",
        options: ["Kina", "USA", "India", "Indonesia"],
        correctAnswerIndex: 2
    },
    {
        category: "Geografi",
        questionText: "Hva er verdens lengste elv?",
        options: ["Amazonas", "Nilen", "Yangtze", "Mississippi"],
        correctAnswerIndex: 1
    },
    {
        category: "Geografi",
        questionText: "I hvilket land ligger Machu Picchu?",
        options: ["Chile", "Argentina", "Bolivia", "Peru"],
        correctAnswerIndex: 3
    },
    {
        category: "Geografi",
        questionText: "Hvilket hav ligger mellom Afrika og Oseania?",
        options: ["Atlanterhavet", "Stillehavet", "Det indiske hav", "Ishavet"],
        correctAnswerIndex: 2
    },

    // --- VITENSKAP ---
    {
        category: "Vitenskap",
        questionText: "Hva er det kjemiske symbolet for gull?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswerIndex: 0
    },
    {
        category: "Vitenskap",
        questionText: "Hvilken planet er nærmest solen?",
        options: ["Venus", "Mars", "Merkur", "Jorden"],
        correctAnswerIndex: 2
    },
    {
        category: "Vitenskap",
        questionText: "Hva måler man med en geigerteller?",
        options: ["Temperatur", "Radioaktivitet", "Vindstyrke", "Lufttrykk"],
        correctAnswerIndex: 1
    },
    {
        category: "Vitenskap",
        questionText: "Hvor mange bein har en edderkopp?",
        options: ["6", "8", "10", "12"],
        correctAnswerIndex: 1
    },
    {
        category: "Vitenskap",
        questionText: "Hva er formelen for vann?",
        options: ["CO2", "H2O", "O2", "NaCl"],
        correctAnswerIndex: 1
    },

    // --- LETT BLANDING ---
    {
        category: "Lett blanding",
        questionText: "Hvilken farge får du om du blander blå og gul?",
        options: ["Lilla", "Oransje", "Grønn", "Brun"],
        correctAnswerIndex: 2
    },
    {
        category: "Lett blanding",
        questionText: "Hvor mange dager er det i et skuddår?",
        options: ["364", "365", "366", "367"],
        correctAnswerIndex: 2
    },
    {
        category: "Lett blanding",
        questionText: "Hva heter hovedstaden i Norge?",
        options: ["Bergen", "Trondheim", "Stavanger", "Oslo"],
        correctAnswerIndex: 3
    },
    {
        category: "Lett blanding",
        questionText: "Hvilket dyr er 'Mikke Mus'?",
        options: ["Hund", "Katt", "Mus", "Rotter"],
        correctAnswerIndex: 2
    },
    {
        category: "Lett blanding",
        questionText: "Hva står forkortelsen 'NRK' for?",
        options: ["Norsk Rikskringkasting", "Norges Røde Kors", "Norsk Radio Kanal", "Nordisk Radio Kringkasting"],
        correctAnswerIndex: 0
    },

    // --- MAT OG DRIKKE ---
    {
        category: "Mat og drikke",
        questionText: "Hva er hovedingrediensen i guacamole?",
        options: ["Tomat", "Løk", "Avokado", "Agurk"],
        correctAnswerIndex: 2
    },
    {
        category: "Mat og drikke",
        questionText: "Hvilket land kommer pizza fra?",
        options: ["USA", "Frankrike", "Spania", "Italia"],
        correctAnswerIndex: 3
    },
    {
        category: "Mat og drikke",
        questionText: "Hva er sushi tradisjonelt laget av?",
        options: ["Kjøtt", "Rå fisk og ris", "Stekt fisk og poteter", "Grønnsaker"],
        correctAnswerIndex: 1
    },
    {
        category: "Mat og drikke",
        questionText: "Hva kalles den spanske småretten?",
        options: ["Tapas", "Paella", "Tacos", "Burrito"],
        correctAnswerIndex: 0
    },
    {
        category: "Mat og drikke",
        questionText: "Hvilken drikk er laget av druer?",
        options: ["Øl", "Cider", "Vin", "Vodka"],
        correctAnswerIndex: 2
    }
];
