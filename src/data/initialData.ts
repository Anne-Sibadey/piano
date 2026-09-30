import { Student, PedagogicalLog, ScheduleEvent, ContactInquiry, TeacherSettings } from '../types';

export const initialTeacherSettings: TeacherSettings = {
  teacherName: "[Nom & Prénom du professeur]",
  title: "Professeur de piano & Pédagogue",
  tagline: "Une approche vivante, personnalisée et exigeante du piano pour tous les âges.",
  email: "contact@[mon-domaine-piano].fr",
  phone: "+33 (0)6 [À renseigner]",
  address: "[Adresse de la salle de cours]",
  city: "[Ville]",
  shortBio: "Pianiste et pédagogue passionné(e), j'accompagne depuis plusieurs années des élèves de tous horizons — enfants, adolescents et adultes — avec une approche fondée sur l'écoute, le plaisir du jeu et une technique libérée de toute rigidité.",
  musicalJourney: "[Détails de votre parcours musical à renseigner : études, formation, maîtres, pratique instrumentale et répertoire de prédilection...]",
  teachingPhilosophy: "Apprendre le piano ne doit jamais être une corvée mécanique ni une répétition stérile. Mon enseignement place la musicalité, la compréhension harmonique et le ressenti corporel au cœur de chaque séance. Chaque élève avance à son propre rythme sur un répertoire qui le stimule, tout en construisant des bases techniques saines et durables.",
  formulas: [
    {
      id: '30min',
      name: 'Formule 30 minutes',
      durationMinutes: 30,
      recommendedFor: 'Idéal pour les jeunes enfants (6-9 ans) ou pour une initiation en douceur',
      annualPrice: '[À RENSEIGNER]',
      description: 'Une séance rythmée et stimulante, parfaitement adaptée à la capacité d\'attention des plus jeunes ou à une première approche du clavier.',
      features: [
        '1 cours individuel par semaine',
        'Apprentissage ludique des premières notions',
        'Coordination et oreille musicale',
        'Partitions et supports adaptés',
        'Bilan régulier de progression'
      ]
    },
    {
      id: '45min',
      name: 'Formule 45 minutes',
      durationMinutes: 45,
      recommendedFor: 'Le format recommandé pour les adolescents et adultes débutants à intermédiaires',
      annualPrice: '[À RENSEIGNER]',
      description: 'Le parfait équilibre entre travail technique, déchiffrage, exploration du répertoire et plaisir immédiat au clavier.',
      features: [
        '1 cours individuel par semaine',
        'Temps approfondi sur 2 à 3 morceaux en parallèle',
        'Théorie musicale appliquée directement aux pièces',
        'Travail de la posture et du son',
        'Accès au suivi pédagogique personnalisé'
      ]
    },
    {
      id: '60min',
      name: 'Formule 1 heure',
      durationMinutes: 60,
      recommendedFor: 'Pour les adultes et élèves souhaitant un travail en profondeur sur l\'interprétation',
      annualPrice: '[À RENSEIGNER]',
      description: 'Une heure complète pour explorer la musique en grand : analyse harmonique, nuances fines, préparation d\'œuvres plus denses et improvisation.',
      features: [
        '1 cours individuel par semaine',
        'Immersion complète et travail d\'interprétation poussé',
        'Harmonie au clavier et travail de l\'oreille avancée',
        'Répertoire classique, jazz ou musiques actuelles selon vos envies',
        'Enregistrement audio des pièces abouties'
      ]
    }
  ]
};

export const initialStudents: Student[] = [
  {
    id: 'eleve-1',
    firstName: 'Camille',
    lastName: 'Laurent',
    birthDate: '2014-04-12',
    age: 12,
    phone: '+33 6 12 34 56 78',
    email: 'famille.laurent@example.com',
    address: '14 rue des Lilas, [Ville]',
    isMinor: true,
    parentContact: {
      name: 'Hélène Laurent (Mère)',
      relationship: 'Mère',
      phone: '+33 6 12 34 56 78',
      email: 'helene.laurent@example.com'
    },
    level: 'Intermédiaire (3e année)',
    startDate: '2023-09-15',
    formula: '45min',
    pricePerYear: '[À RENSEIGNER]',
    paymentStatus: 'up_to_date',
    paymentNotes: 'Règlement annuel en 3 prélèvements',
    habitualSlot: 'Mercredi 14h30 - 15h15',
    goals: ['Préparer la Sonatine de Clementi', 'Améliorer l\'indépendance main gauche / main droite', 'Mémoriser sans partition'],
    currentPieces: [
      'Muzio Clementi — Sonatine op. 36 n°1 (1er mvt)',
      'Yann Tiersen — Comptine d\'un autre été'
    ],
    pastPieces: [
      'J.S. Bach — Menuet en Sol Majeur (Livre d\'Anna Magdalena)',
      'Béla Bartók — For Children n°3'
    ],
    pedagogicalNotes: 'Très bonne écoute harmonique. A besoin de relâcher les poignets sur les descentes de gammes.',
    observations: 'Élève très motivée, travaille avec régularité à la maison. Clavier acoustique droit à domicile.',
    absencesCount: 0,
    status: 'active',
    createdAt: '2023-09-01'
  },
  {
    id: 'eleve-2',
    firstName: 'Alexandre',
    lastName: 'Vasseur',
    birthDate: '1988-11-23',
    age: 37,
    phone: '+33 6 98 76 54 32',
    email: 'a.vasseur@example.com',
    address: '28 avenue de la République, [Ville]',
    isMinor: false,
    level: 'Adulte reprise (7 ans d\'arrêt)',
    startDate: '2024-01-10',
    formula: '60min',
    pricePerYear: '[À RENSEIGNER]',
    paymentStatus: 'up_to_date',
    paymentNotes: 'Virement mensuel le 5 du mois',
    habitualSlot: 'Mardi 19h00 - 20h00',
    goals: ['Retrouver l\'aisance de déchiffrage', 'Travailler la nuance pianissimo', 'Découvrir les grilles de jazz'],
    currentPieces: [
      'Frédéric Chopin — Nocturne op. 9 n°2',
      'Bill Evans — Autumn Leaves (arrangement piano solo)'
    ],
    pastPieces: [
      'Erik Satie — Gymnopédie n°1',
      'Ludwig van Beethoven — Sonate au clair de lune (1er mvt)'
    ],
    pedagogicalNotes: 'Excellente maturité musicale. Attention à ne pas sur-utiliser la pédale de soutien pour masquer l\'articulation.',
    observations: 'Pratique quotidienne le soir sur piano numérique haut de gamme. Passionné par le répertoire romantique.',
    absencesCount: 1,
    status: 'active',
    createdAt: '2024-01-05'
  },
  {
    id: 'eleve-3',
    firstName: 'Léo',
    lastName: 'Moreau',
    birthDate: '2018-06-30',
    age: 8,
    phone: '+33 6 44 22 11 00',
    email: 'parents.moreau@example.com',
    address: '5 allée des Tilleuls, [Ville]',
    isMinor: true,
    parentContact: {
      name: 'Thomas Moreau (Père)',
      relationship: 'Père',
      phone: '+33 6 44 22 11 00',
      email: 'thomas.moreau@example.com'
    },
    level: 'Débutant (1ère année)',
    startDate: '2025-09-10',
    formula: '30min',
    pricePerYear: '[À RENSEIGNER]',
    paymentStatus: 'up_to_date',
    paymentNotes: 'Règlement par chèques trimestriels',
    habitualSlot: 'Samedi 10h00 - 10h30',
    goals: ['Position naturelle de la voûte palmaire', 'Repérage fluide des notes clés (Do, Sol, Fa)', 'Comptage à voix haute'],
    currentPieces: [
      'Méthode Dervaux — La Danse de l\'Ours',
      'Le Vieux Château (thème adapté 8 mesures)'
    ],
    pastPieces: [
      'Exercices de frappe d\'oiseau et d\'empreintes'
    ],
    pedagogicalNotes: 'Plein d\'énergie, très spontané. Préfère les morceaux entraînants. Alterner 10 min de jeu, 5 min de rythme tapé, 15 min de morceau.',
    observations: 'Les parents veillent à une séance quotidienne de 15 minutes à la maison.',
    absencesCount: 0,
    status: 'active',
    createdAt: '2025-09-01'
  },
  {
    id: 'eleve-4',
    firstName: 'Sophie',
    lastName: 'Guerin',
    birthDate: '1975-02-14',
    age: 51,
    phone: '+33 6 77 88 99 11',
    email: 'sophie.guerin@example.com',
    address: '9 impasse des Moulins, [Ville]',
    isMinor: false,
    level: 'Adulte grand débutant',
    startDate: '2024-09-18',
    formula: '45min',
    pricePerYear: '[À RENSEIGNER]',
    paymentStatus: 'pending',
    paymentNotes: 'En attente du règlement du 2e trimestre',
    habitualSlot: 'Jeudi 18h15 - 19h00',
    goals: ['Surmonter l\'appréhension du déchiffrage', 'Prendre du temps pour soi chaque semaine', 'Jouer Amélie Poulain'],
    currentPieces: [
      'Yann Tiersen — La valse d\'Amélie (version simplifiée)',
      'J.S. Bach — Prélude en Do Majeur BWV 846'
    ],
    pastPieces: [
      'Études préliminaires de Czerny op. 599'
    ],
    pedagogicalNotes: 'Progression remarquable en lecture de clé de Fa. Travail en cours sur la respiration avant chaque attaque.',
    observations: 'Apprécie l\'atmosphère bienveillante et sans jugement. Retrouve une vraie confiance en son potentiel musical.',
    absencesCount: 0,
    status: 'active',
    createdAt: '2024-09-10'
  }
];

export const initialPedagogicalLogs: PedagogicalLog[] = [
  {
    id: 'log-1',
    studentId: 'eleve-1',
    date: '2026-09-23',
    durationMinutes: 45,
    piecesWorkedOn: ['Clementi Sonatine op. 36 n°1', 'Yann Tiersen — Comptine'],
    conceptsCovered: 'Régularité des croches de la main droite, nuance staccato légère contre basse tenue',
    exercisesGiven: 'Gammes de Do et Sol Majeur en noires puis croches avec métronome à 76',
    difficulties: 'Tendance à accélérer dans le développement de Clementi mesures 15 à 22',
    nextGoals: 'Caler le métronome et jouer le 1er mouvement sans interruption',
    freeComment: 'Très belle séance ! Camille s\'approprie de mieux en mieux le tempo et l\'écoute de la résonance.'
  },
  {
    id: 'log-2',
    studentId: 'eleve-2',
    date: '2026-09-22',
    durationMinutes: 60,
    piecesWorkedOn: ['Chopin Nocturne op. 9 n°2', 'Autumn Leaves'],
    conceptsCovered: 'Rubato poétique, distinction claire entre la ligne de chant soprano et l\'accompagnement berceur',
    exercisesGiven: 'Travail main gauche seule avec pédale synchronisée sur le changement d\'harmonie',
    difficulties: 'Les triolets contre croches de la mesure 18 nécessitent un travail de subdivision lente',
    nextGoals: 'Mesures 13 à 24 avec la respiration chantée',
    freeComment: 'Sensibilité remarquable. Alexandre comprend intuitivement la couleur harmonique de la cadence finale.'
  },
  {
    id: 'log-3',
    studentId: 'eleve-3',
    date: '2026-09-20',
    durationMinutes: 30,
    piecesWorkedOn: ['La Danse de l\'Ours', 'Jeu de reconnaissance d\'intervalles'],
    conceptsCovered: 'Basse lourde vs aigu piqué, pulsation sur 4 temps',
    exercisesGiven: 'Faire chanter les 4 premières mesures en tapant la pulsation sur le genou',
    difficulties: 'Le 4e doigt a tendance à s\'affaisser sur le Mi',
    nextGoals: 'Faire sonner la ronde finale bien jusqu\'au bout sans lâcher brusquement',
    freeComment: 'Léo a adoré imiter le pas lourd de l\'ours dans les graves. Beaucoup d\'écoute et de joie.'
  },
  {
    id: 'log-4',
    studentId: 'eleve-4',
    date: '2026-09-25',
    durationMinutes: 45,
    piecesWorkedOn: ['Bach — Prélude en Do Majeur BWV 846'],
    conceptsCovered: 'Fluidité du roulement d\'arpèges, tenue de la basse fondamentale',
    exercisesGiven: 'Mesures 1 à 12 en accords plaqués pour bien ressentir l\'enchaînement harmonique',
    difficulties: 'Tension résiduelle dans les épaules au bout de 20 minutes',
    nextGoals: 'Intégrer la pédale harmonique discrète sans noyer les voix intermédiaires',
    freeComment: 'Grand cap franchi : Sophie ne regarde plus constamment ses mains et lit directement le texte.'
  }
];

export const initialScheduleEvents: ScheduleEvent[] = [
  {
    id: 'evt-1',
    studentId: 'eleve-2',
    studentName: 'Alexandre Vasseur',
    title: 'Cours de piano (60 min) — Alexandre Vasseur',
    date: '2026-10-06', // Tuesday
    startTime: '19:00',
    endTime: '20:00',
    durationMinutes: 60,
    type: 'course_60',
    notes: 'Nocturne Chopin & Jazz',
    roomOrLocation: 'Salle de piano'
  },
  {
    id: 'evt-2',
    studentId: 'eleve-1',
    studentName: 'Camille Laurent',
    title: 'Cours de piano (45 min) — Camille Laurent',
    date: '2026-10-07', // Wednesday
    startTime: '14:30',
    endTime: '15:15',
    durationMinutes: 45,
    type: 'course_45',
    notes: 'Sonatine Clementi',
    roomOrLocation: 'Salle de piano'
  },
  {
    id: 'evt-3',
    studentId: 'eleve-4',
    studentName: 'Sophie Guerin',
    title: 'Cours de piano (45 min) — Sophie Guerin',
    date: '2026-10-08', // Thursday
    startTime: '18:15',
    endTime: '19:00',
    durationMinutes: 45,
    type: 'course_45',
    notes: 'Bach Prélude',
    roomOrLocation: 'Salle de piano'
  },
  {
    id: 'evt-4',
    studentId: 'eleve-3',
    studentName: 'Léo Moreau',
    title: 'Cours de piano (30 min) — Léo Moreau',
    date: '2026-10-10', // Saturday
    startTime: '10:00',
    endTime: '10:30',
    durationMinutes: 30,
    type: 'course_30',
    notes: 'Danse de l\'Ours & Rythme',
    roomOrLocation: 'Salle de piano'
  },
  {
    id: 'evt-5',
    title: 'Vacances scolaires d\'Automne (Toussaint)',
    date: '2026-10-24',
    startTime: '08:00',
    endTime: '20:00',
    durationMinutes: 720,
    type: 'vacation',
    notes: 'Période sans cours réguliers (stages optionnels sur demande)'
  }
];

export const initialInquiries: ContactInquiry[] = [
  {
    id: 'inq-1',
    firstName: 'Claire',
    lastName: 'Dumont',
    email: 'claire.dumont@example.com',
    phone: '+33 6 55 44 33 22',
    profile: 'Adulte débutant',
    level: 'Grand débutant, jamais pratiqué d\'instrument',
    age: '42 ans',
    formula: 'Formule 45 minutes',
    message: 'Bonjour, j\'ai toujours rêvé de jouer du piano mais je craignais la rigidité du solfège traditionnel. Votre approche personnalisée m\'intéresse beaucoup ! Auriez-vous un créneau en fin de journée en semaine ? Merci d\'avance.',
    createdAt: '2026-09-28',
    status: 'new'
  },
  {
    id: 'inq-2',
    firstName: 'Marc',
    lastName: 'Benoit',
    email: 'marc.benoit@example.com',
    phone: '+33 6 78 90 12 34',
    profile: 'Parent d\'élève (Enfant 10 ans)',
    level: '2 ans en école de musique, souhaite changer de pédagogie',
    age: '10 ans',
    formula: 'Formule 45 minutes',
    message: 'Notre fils Julien a commencé le piano il y a deux ans mais a perdu toute motivation à cause d\'exercices répétitifs. Nous recherchons un enseignement plus stimulant et bienveillant où il peut choisir des morceaux qui lui plaisent.',
    createdAt: '2026-09-26',
    status: 'contacted'
  }
];
