export const BETA_QUESTIONS = [
    // --- SLIDER QUESTIONS (10) ---
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

    // --- TIMELINE QUESTIONS (10) ---
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
    }
];
