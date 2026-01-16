export const BETA_QUESTIONS = [
    // --- SLIDER QUESTIONS (20) ---
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange bor i Skien kommune (ca. 2024)?',
        min: 0,
        max: 100000,
        step: 1000,
        unit: 'innbyggere',
        correctAnswer: 56000
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange meter er Eiffeltårnet (inkludert antennen)?',
        min: 0,
        max: 500,
        step: 1,
        unit: 'meter',
        correctAnswer: 330
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange dager er det i et skuddår?',
        min: 300,
        max: 400,
        step: 1,
        unit: 'dager',
        correctAnswer: 366
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hva er kokepunktet til vann (ved havnivå) i Celsius?',
        min: 0,
        max: 200,
        step: 1,
        unit: 'grader',
        correctAnswer: 100
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange tangenter har et standard piano?',
        min: 0,
        max: 100,
        step: 1,
        unit: 'tangenter',
        correctAnswer: 88
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange kilometer er det fra Oslo til Bergen (i luftlinje)?',
        min: 0,
        max: 1000,
        step: 10,
        unit: 'km',
        correctAnswer: 305
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Når startet 2. verdenskrig?',
        min: 1900,
        max: 2000,
        step: 1,
        unit: 'år',
        correctAnswer: 1939
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange prosent av jordens overflate er dekket av vann?',
        min: 0,
        max: 100,
        step: 1,
        unit: '%',
        correctAnswer: 71
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange bein er det i en voksen menneskekropp?',
        min: 0,
        max: 300,
        step: 1,
        unit: 'bein',
        correctAnswer: 206
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor høy er Mount Everest?',
        min: 0,
        max: 10000,
        step: 10,
        unit: 'meter',
        correctAnswer: 8848
    },
    // NEW Sliders
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor raskt går lyden i luft (ved 20°C)?',
        min: 0,
        max: 1000,
        step: 10,
        unit: 'm/s',
        correctAnswer: 343
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hva er toppfarten til en gepard?',
        min: 0,
        max: 200,
        step: 1,
        unit: 'km/t',
        correctAnswer: 120
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor langt er det fra Jorden til Månen (gjennomsnitt)?',
        min: 0,
        max: 500000,
        step: 1000,
        unit: 'km',
        correctAnswer: 384400
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange stjerner er det i EU-flagget?',
        min: 0,
        max: 50,
        step: 1,
        unit: 'stjerner',
        correctAnswer: 12
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange minutter er det i et døgn?',
        min: 0,
        max: 2000,
        step: 10,
        unit: 'minutter',
        correctAnswer: 1440
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Når falt Berlinmuren?',
        min: 1900,
        max: 2000,
        step: 1,
        unit: 'år',
        correctAnswer: 1989
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange brikker er det i et sjakkspill (totalt)?',
        min: 0,
        max: 64,
        step: 1,
        unit: 'brikker',
        correctAnswer: 32
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hva er gjennomsnittstemperaturen på Mars?',
        min: -100,
        max: 0,
        step: 1,
        unit: 'grader',
        correctAnswer: -63
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange liter blod har et voksent menneske (ca)?',
        min: 0,
        max: 10,
        step: 0.5,
        unit: 'liter',
        correctAnswer: 5
    },
    {
        category: 'Beta',
        type: 'slider',
        questionText: 'Hvor mange år satt Nelson Mandela i fengsel?',
        min: 0,
        max: 50,
        step: 1,
        unit: 'år',
        correctAnswer: 27
    },


    // --- TIMELINE QUESTIONS (20) ---
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse historiske hendelsene i kronologisk rekkefølge (eldst til nyest):',
        events: [
            { id: 'a', text: 'Månelandingen', year: 1969 },
            { id: 'b', text: 'Berlinmurens fall', year: 1989 },
            { id: 'c', text: '1. verdenskrig slutter', year: 1918 },
            { id: 'd', text: 'Titanic synker', year: 1912 },
            { id: 'e', text: 'Internett (WWW) blir offentlig tilgjengelig', year: 1991 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse oppfinnelsene fra eldst til nyest:',
        events: [
            { id: 'a', text: 'Hjulet', year: -3500 },
            { id: 'b', text: 'Boktrykkerkunsten', year: 1440 },
            { id: 'c', text: 'Dampmaskinen', year: 1712 },
            { id: 'd', text: 'Lyspæren', year: 1879 },
            { id: 'e', text: 'Smarttelefonen (iPhone)', year: 2007 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger Norges statsministre (kronologisk):',
        events: [
            { id: 'a', text: 'Einar Gerhardsen', year: 1945 },
            { id: 'b', text: 'Kåre Willoch', year: 1981 },
            { id: 'c', text: 'Gro Harlem Brundtland', year: 1986 },
            { id: 'd', text: 'Jens Stoltenberg', year: 2000 },
            { id: 'e', text: 'Erna Solberg', year: 2013 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse planetene etter avstand fra solen (nærmest til fjernest):',
        events: [
            { id: 'a', text: 'Merkur', year: 1 },
            { id: 'b', text: 'Venus', year: 2 },
            { id: 'c', text: 'Jorden', year: 3 },
            { id: 'd', text: 'Mars', year: 4 },
            { id: 'e', text: 'Jupiter', year: 5 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse filmene etter utgivelsesår:',
        events: [
            { id: 'a', text: 'Snehvit og de syv dvergene', year: 1937 },
            { id: 'b', text: 'Star Wars: A New Hope', year: 1977 },
            { id: 'c', text: 'Løvenes Konge', year: 1994 },
            { id: 'd', text: 'Ringenes Herre: Ringens Brorskap', year: 2001 },
            { id: 'e', text: 'Avatar', year: 2009 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse teknologiske milepælene:',
        events: [
            { id: 'a', text: 'Første e-post sendt', year: 1971 },
            { id: 'b', text: 'Facebook lanseres', year: 2004 },
            { id: 'c', text: 'YouTube lanseres', year: 2005 },
            { id: 'd', text: 'Instagram lanseres', year: 2010 },
            { id: 'e', text: 'ChatGPT lanseres', year: 2022 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse norske byene etter grunnleggelsesår:',
        events: [
            { id: 'a', text: 'Tønsberg', year: 871 },
            { id: 'b', text: 'Trondheim (Nidaros)', year: 997 },
            { id: 'c', text: 'Oslo', year: 1000 },
            { id: 'd', text: 'Bergen', year: 1070 },
            { id: 'e', text: 'Stavanger', year: 1125 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse sportsbegivenhetene:',
        events: [
            { id: 'a', text: 'Første moderne OL (Athen)', year: 1896 },
            { id: 'b', text: 'Første Fotball-VM (Uruguay)', year: 1930 },
            { id: 'c', text: 'Lillehammer OL', year: 1994 },
            { id: 'd', text: 'Drillo-isen mot Brasil', year: 1998 },
            { id: 'e', text: 'Karsten Warholm setter verdensrekord i Tokyo', year: 2021 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse krigene etter startår:',
        events: [
            { id: 'a', text: 'Den amerikanske uavhengighetskrigen', year: 1775 },
            { id: 'b', text: 'Napoleonskrigene', year: 1803 },
            { id: 'c', text: 'Den amerikanske borgerkrigen', year: 1861 },
            { id: 'd', text: 'Første verdenskrig', year: 1914 },
            { id: 'e', text: 'Vietnamkrigen', year: 1955 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse musikalske tiårene/hendelsene:',
        events: [
            { id: 'a', text: 'Elvis Presley slår gjennom', year: 1956 },
            { id: 'b', text: 'The Beatles "Please Please Me"', year: 1963 },
            { id: 'c', text: 'Woodstock-festivalen', year: 1969 },
            { id: 'd', text: 'Micheal Jackson "Thriller"', year: 1982 },
            { id: 'e', text: 'Nirvana "Smells Like Teen Spirit"', year: 1991 }
        ]
    },
    // NEW Timelines
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse Harry Potter-bøkene etter utgivelse:',
        events: [
            { id: 'a', text: 'De vises stein', year: 1997 },
            { id: 'b', text: 'Ildbegeret', year: 2000 },
            { id: 'c', text: 'Føniksordenen', year: 2003 },
            { id: 'd', text: 'Halvblodsprinsen', year: 2005 },
            { id: 'e', text: 'Dødstalismanene', year: 2007 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse Marvel-filmene etter utgivelsesår:',
        events: [
            { id: 'a', text: 'Iron Man', year: 2008 },
            { id: 'b', text: 'The Avengers', year: 2012 },
            { id: 'c', text: 'Guardians of the Galaxy', year: 2014 },
            { id: 'd', text: 'Black Panther', year: 2018 },
            { id: 'e', text: 'Avengers: Endgame', year: 2019 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse oppfinnelsene innen kommunikasjon:',
        events: [
            { id: 'a', text: 'Telegrafen', year: 1837 },
            { id: 'b', text: 'Telefonen', year: 1876 },
            { id: 'c', text: 'Radioen', year: 1895 },
            { id: 'd', text: 'Fjernsynet (TV)', year: 1927 },
            { id: 'e', text: 'SMS', year: 1992 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse norske hendelsene:',
        events: [
            { id: 'a', text: 'Unionsoppløsningen', year: 1905 },
            { id: 'b', text: 'Kvinner får stemmerett', year: 1913 },
            { id: 'c', text: 'Oljefunnet på Ekofisk', year: 1969 },
            { id: 'd', text: 'OL på Lillehammer', year: 1994 },
            { id: 'e', text: 'Operaen i Oslo åpnes', year: 2008 }
        ]
    },
    {
        category: 'Beta',
        type: 'timeline',
        questionText: 'Ranger disse konsollene etter utgivelse (Europa/USA):',
        events: [
            { id: 'a', text: 'Nintendo 64', year: 1996 },
            { id: 'b', text: 'PlayStation 2', year: 2000 },
            { id: 'c', text: 'Xbox 360', year: 2005 },
            { id: 'd', text: 'PlayStation 4', year: 2013 },
            { id: 'e', text: 'Nintendo Switch', year: 2017 }
        ]
    }
];
