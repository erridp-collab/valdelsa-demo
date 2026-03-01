import React from 'react'
import { useState } from "react";

// ─── RECENSIONI ───────────────────────────────────────────────────────────────
// Ogni recensione ha: testo narrativo, esperienza vissuta, tipo viaggiatore,
// mese soggiorno, sentiment (1-5), coerenza testo-sentiment (0-1)
const RECENSIONI = {
  1: [ // Podere Sant'Ansano
    { testo: "Siamo arrivati stanchi dalla città e dopo due giorni ci sembrava di essere lì da sempre. La colazione con i prodotti dell'orto, il silenzio la sera, i cani che ti seguono per i campi. Non è una vacanza, è un ritmo diverso.", esperienza: "Raccolta olive", tipo: "coppia", mese: 10, sentiment: 5, coerenza: 0.97 },
    { testo: "Cucina eccezionale, ogni pasto raccontava il territorio. La signora Maria ci ha insegnato a fare la pasta a mano — quella sera abbiamo mangiato meglio che in qualsiasi ristorante stellato.", esperienza: "Corso di cucina", tipo: "coppia", mese: 5, sentiment: 5, coerenza: 0.95 },
    { testo: "Struttura autentica, niente di patinato. La camera era semplice ma pulita. Il vero valore è fuori: i vigneti, i tramonti, la conversazione con i proprietari dopo cena.", esperienza: "Degustazione vini", tipo: "solo", mese: 9, sentiment: 4, coerenza: 0.93 },
  ],
  2: [ // Torre del Capitano
    { testo: "Dormire in una torre medievale nel centro storico è un'esperienza in sé. Svegliarsi con le campane, scendere tra i vicoli ancora vuoti alle 7 del mattino — Empoli ha una qualità silenziosa che non ti aspetti.", esperienza: "Tour storico", tipo: "coppia", mese: 4, sentiment: 5, coerenza: 0.96 },
    { testo: "Posizione perfetta per chi vuole usare il treno. Firenze in 25 minuti, Pisa in 35. Abbiamo visitato tre città in tre giorni senza mai usare la macchina. La struttura in sé è essenziale ma curata.", esperienza: "Visita musei Empoli", tipo: "famiglia", mese: 7, sentiment: 4, coerenza: 0.91 },
  ],
  3: [ // Cascina Valdelsa Verde
    { testo: "Sono venuta da sola cercando silenzio e l'ho trovato davvero. La sessione di yoga all'alba tra i cipressi è una di quelle esperienze che ti porti a casa nel corpo, non solo nella memoria.", esperienza: "Yoga all'alba", tipo: "solo", mese: 5, sentiment: 5, coerenza: 0.98 },
    { testo: "Ottimo per staccare, meno adatto se cerchi attività o vita sociale. La cucina vegetariana è sorprendentemente ricca. Il ritmo lento inizialmente mi ha messo a disagio, poi ho capito che era esattamente quello il punto.", esperienza: "Meditazione", tipo: "coppia", mese: 3, sentiment: 4, coerenza: 0.89 },
  ],
  4: [ // Borgo Fibbiano
    { testo: "Con tre bambini piccoli, trovare un posto dove i bimbi possano correre liberi e i genitori rilassarsi davvero è raro. Il borgo ci ha dato esattamente questo. Il mercato del sabato è diventato il rituale della settimana.", esperienza: "Mercato contadino", tipo: "famiglia", mese: 8, sentiment: 5, coerenza: 0.94 },
    { testo: "Appartamento indipendente, ottimo per noi che volevamo autonomia. Il senso di comunità con gli altri ospiti è stato inaspettato — la serata in piazzetta è diventata una tradizione quotidiana.", esperienza: "Vita di borgo", tipo: "coppia", mese: 6, sentiment: 5, coerenza: 0.96 },
  ],
  5: [ // Villa La Loggia
    { testo: "Per il nostro anniversario volevamo qualcosa di speciale e La Loggia ha superato le aspettative. La SPA, la cena privata con lo chef, la piscina al tramonto con vista sui vigneti. Lusso discreto, mai ostentato.", esperienza: "Cena privata con chef", tipo: "coppia", mese: 6, sentiment: 5, coerenza: 0.97 },
    { testo: "Struttura impeccabile. Il transfer dall'aeroporto era puntuale, il personale discreto e competente. Il tour in e-bike a Vinci il giorno dopo è stato un'aggiunta perfetta — Leonardo era davvero di qui.", esperienza: "Tour e-bike Vinci", tipo: "coppia", mese: 9, sentiment: 5, coerenza: 0.95 },
  ],
  6: [ // Rifugio Montalbano
    { testo: "Base perfetta per i trail. Sono uscito ogni mattina all'alba con la MTB e non ho mai fatto lo stesso percorso due volte. Il rifugio è spartano ma funzionale — non è il posto dove stai in camera, è il posto da cui esci.", esperienza: "MTB Montalbano", tipo: "solo", mese: 5, sentiment: 5, coerenza: 0.96 },
    { testo: "Il trekking guidato è stato il momento clou. La guida conosce ogni sasso del Montalbano, ti racconta la storia dei castagni, i segni dell'antica pastorizia. Non è solo escursionismo, è lettura del paesaggio.", esperienza: "Trekking guidato", tipo: "coppia", mese: 9, sentiment: 5, coerenza: 0.98 },
  ],
  7: [ // San Miniato
    { testo: "Vivere nel borgo come un abitante, non come un turista, fa una differenza enorme. Il fornaio mi conosceva già dal secondo giorno. La caccia al tartufo con il tartufaio è stata emozionante — non si capisce quanto sia un rito fino a che non lo si vive.", esperienza: "Caccia al tartufo", tipo: "solo", mese: 11, sentiment: 5, coerenza: 0.97 },
    { testo: "Posizione strategica per chi vuole usare i mezzi. Firenze e Pisa entrambe raggiungibili. Il borgo di sera, quando i turisti se ne vanno, è un'altra cosa.", esperienza: "Passeggiata serale", tipo: "coppia", mese: 4, sentiment: 4, coerenza: 0.92 },
  ],
  8: [ // Osteria Il Gelso
    { testo: "Quattro camere sopra una cucina straordinaria. Abbiamo mangiato così bene che abbiamo prenotato anche il pranzo del giorno dopo, cosa che non avevamo previsto. Il tour delle cantine il pomeriggio ha completato il quadro.", esperienza: "Cena degustazione", tipo: "coppia", mese: 10, sentiment: 5, coerenza: 0.98 },
  ],
  9: [ // Masseria La Volta
    { testo: "I bambini non volevano più tornare a casa. Letteralmente. La cura degli animali la mattina era il momento più atteso della giornata. Vedere tuo figlio di 5 anni raccogliere le uova con la serietà di un contadino è impagabile.", esperienza: "Cura animali", tipo: "famiglia", mese: 7, sentiment: 5, coerenza: 0.97 },
    { testo: "Perfetto per famiglie che cercano autenticità. Lo spazio esterno è enorme e sicuro. L'unica nota: in agosto è abbastanza frequentato, si perde un po' la sensazione di posto segreto.", esperienza: "Vita di fattoria", tipo: "famiglia", mese: 8, sentiment: 4, coerenza: 0.88 },
  ],
  10: [ // Casa Pratolino
    { testo: "Sono fotografo naturalista e il Padule di Fucecchio è uno dei posti più sottovalutati d'Italia. All'alba, con la nebbia bassa sull'acqua e i fenicotteri rosa che si alzano in volo — ho fatto alcune delle foto più belle della mia vita.", esperienza: "Birdwatching alba", tipo: "solo", mese: 4, sentiment: 5, coerenza: 0.99 },
  ],
  11: [ // Tenuta Petrognano
    { testo: "La vendemmia è un'esperienza fisica e spirituale insieme. Le mani nel grappolo, il sole di settembre, i canti dei raccoglitori. La sera la degustazione con il vignaiolo che ti spiega come quel preciso appezzamento diventa vino — non dimentichi.", esperienza: "Vendemmia", tipo: "coppia", mese: 9, sentiment: 5, coerenza: 0.98 },
    { testo: "Resort di qualità nel cuore del Chianti. La masterclass di vinificazione era tecnica e accessibile insieme — il sommelier sa calibrare il livello del pubblico. Struttura ottima, qualche difficoltà logistica senza auto.", esperienza: "Masterclass vino", tipo: "coppia", mese: 5, sentiment: 4, coerenza: 0.91 },
  ],
  12: [ // Cascina del Cavaliere
    { testo: "Mia figlia di 8 anni ha imparato ad andare a cavallo in tre giorni. La pazienza degli istruttori è notevole. Il trekking a cavallo al tramonto, con lei che guidava da sola per i campi, è un'immagine che mi porto dietro.", esperienza: "Equitazione bambini", tipo: "famiglia", mese: 6, sentiment: 5, coerenza: 0.97 },
  ],
  13: [ // Ostello Pellegrino
    { testo: "Ho fatto tre giorni sulla Francigena partendo dall'ostello. La comunità dei pellegrini è reale — persone da tutto il mondo, storie diverse, un senso di lentezza condivisa. La sera intorno al tavolo si parla in quattro lingue e ci si capisce lo stesso.", esperienza: "Via Francigena", tipo: "solo", mese: 9, sentiment: 5, coerenza: 0.96 },
  ],
  14: [ // Convento di Badia
    { testo: "Non sono credente, ma tre giorni al convento mi hanno dato qualcosa che non sapevo di cercare. Il silenzio non è assenza di suono, è un'altra qualità dell'attenzione. La cena con i monaci, le candele, nessuno che parla — è stato il pasto più presente della mia vita.", esperienza: "Cena in silenzio", tipo: "solo", mese: 10, sentiment: 5, coerenza: 0.99 },
  ],
  15: [ // Monte Moriccio
    { testo: "Il frantoiano ci ha spiegato la differenza tra un olio fatto bene e uno fatto male con una semplicità disarmante. Abbiamo portato a casa sei bottiglie. Il tramonto dalla terrazza con la piana illuminata sotto di noi — una di quelle visioni che ti sistemano qualcosa dentro.", esperienza: "Degustazione olio", tipo: "coppia", mese: 11, sentiment: 5, coerenza: 0.97 },
  ],
};

// ─── STRUTTURE ────────────────────────────────────────────────────────────────
const STRUCTURES = [
  { id:1, name:"Podere Sant'Ansano", tipo:"Agriturismo", localita:"Certaldo", area:"Valdelsa", img:"🌾", lat:43.548, lng:11.042,
    descrizione:"Agriturismo biologico tra vigneti e oliveti. Cucina genuina, raccolta stagionale.",
    tags:["lento","natura","cucina locale","silenzio","autentico","famiglia"],
    profilo:{ritmo:1,natura:5,socialita:2,cucina:5,cultura:3,avventura:1,lusso:1},
    pressione:[2,2,3,4,5,5,5,5,4,3,2,2],
    mobilita:{tipo:"misto",label:"Treno + auto",dettagli:[{icona:"🚂",testo:"Certaldo FS → Firenze SMN · 35 min · diretto"},{icona:"🚗",testo:"Auto utile per esplorare le colline"},{icona:"🚲",testo:"E-bike disponibile in struttura"}]},
    vicino_a:[{luogo:"Firenze",distanza:"35 min treno"},{luogo:"San Gimignano",distanza:"20 min auto"},{luogo:"Siena",distanza:"55 min auto"}],
    da_vedere:["Certaldo Alto (borgo medievale)","Casa di Boccaccio","Valdelsa in bici"],
    esperienze:[{id:"e1",nome:"Raccolta olive con i proprietari",cat:"natura",mesi:[9,10,11],img:"🫒"},{id:"e2",nome:"Corso di cucina toscana",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🍝"},{id:"e3",nome:"Degustazione vini locali",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🍷"},{id:"e4",nome:"Passeggiata tra i vigneti al tramonto",cat:"natura",mesi:[4,5,6,7,8,9,10],img:"🌅"}],
    posti:6,notti_min:3 },
  { id:2, name:"Torre del Capitano", tipo:"Dimora storica", localita:"Empoli", area:"Empolese", img:"🏰", lat:43.717, lng:10.945,
    descrizione:"Casa torre medievale restaurata nel centro storico. Arte e storia a portata di mano.",
    tags:["cultura","storia","arte","tranquillo","autentico"],
    profilo:{ritmo:2,natura:2,socialita:3,cucina:3,cultura:5,avventura:1,lusso:3},
    pressione:[2,2,2,3,4,4,4,4,3,3,2,2],
    mobilita:{tipo:"treno",label:"Solo treno",dettagli:[{icona:"🚂",testo:"Empoli FS → Firenze SMN · 25 min · frequente"},{icona:"🚂",testo:"Empoli FS → Pisa · 35 min · diretto"},{icona:"🚶",testo:"Centro storico a piedi dalla stazione"}]},
    vicino_a:[{luogo:"Firenze",distanza:"25 min treno"},{luogo:"Pisa",distanza:"35 min treno"},{luogo:"Lucca",distanza:"50 min treno"}],
    da_vedere:["Museo della Collegiata","Centro storico di Empoli","Pontorme"],
    esperienze:[{id:"e5",nome:"Tour dei palazzi storici",cat:"cultura",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🏛️"},{id:"e6",nome:"Laboratorio di ceramica",cat:"arte",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🏺"},{id:"e7",nome:"Aperitivo con vista sulle torri",cat:"cucina",mesi:[4,5,6,7,8,9,10],img:"🥂"}],
    posti:4,notti_min:2 },
  { id:3, name:"Cascina Valdelsa Verde", tipo:"Eco-retreat", localita:"Castelfiorentino", area:"Valdelsa", img:"🌿", lat:43.604, lng:10.974,
    descrizione:"Ritiro eco-sostenibile con yoga, meditazione e agricoltura rigenerativa.",
    tags:["benessere","yoga","meditazione","eco","lento","silenzio"],
    profilo:{ritmo:1,natura:5,socialita:2,cucina:4,cultura:2,avventura:1,lusso:2},
    pressione:[3,3,3,4,4,4,4,4,4,3,3,3],
    mobilita:{tipo:"misto",label:"Treno + navetta",dettagli:[{icona:"🚂",testo:"Castelfiorentino FS → Firenze · 40 min"},{icona:"🚐",testo:"Navetta gratuita dalla stazione (prenotare)"}]},
    vicino_a:[{luogo:"Firenze",distanza:"40 min treno"},{luogo:"Certaldo",distanza:"15 min auto"},{luogo:"San Miniato",distanza:"20 min auto"}],
    da_vedere:["Affreschi di Benozzo Gozzoli","Via Francigena","Valdelsa a piedi"],
    esperienze:[{id:"e8",nome:"Yoga all'alba tra i cipressi",cat:"benessere",mesi:[4,5,6,7,8,9,10],img:"🧘"},{id:"e9",nome:"Meditazione al laghetto",cat:"benessere",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🪷"},{id:"e10",nome:"Cena vegetariana con prodotti dell'orto",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🥗"}],
    posti:8,notti_min:2 },
  { id:4, name:"Borgo Fibbiano", tipo:"Borgo rurale", localita:"Montespertoli", area:"Chianti", img:"🏡", lat:43.638, lng:11.072,
    descrizione:"Piccolo borgo recuperato. Appartamenti indipendenti, vita di comunità lenta.",
    tags:["comunità","lento","famiglie","cucina locale","vino"],
    profilo:{ritmo:2,natura:4,socialita:4,cucina:4,cultura:3,avventura:2,lusso:2},
    pressione:[1,1,2,3,4,5,5,5,4,3,2,1],
    mobilita:{tipo:"auto",label:"Auto necessaria",dettagli:[{icona:"🚗",testo:"Auto necessaria: borgo collinare senza TPL"},{icona:"🚂",testo:"Certaldo FS (25 min auto) → Firenze 35 min"},{icona:"🚲",testo:"E-bike in noleggio per i dintorni"}]},
    vicino_a:[{luogo:"Firenze",distanza:"45 min auto"},{luogo:"Chianti Classico",distanza:"20 min auto"},{luogo:"Certaldo",distanza:"25 min auto"}],
    da_vedere:["Chianti Classico","Impruneta","Cantine della zona"],
    esperienze:[{id:"e11",nome:"Mercato contadino settimanale",cat:"cucina",mesi:[4,5,6,7,8,9,10,11],img:"🧺"},{id:"e12",nome:"Laboratorio del pane con forno a legna",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🍞"},{id:"e13",nome:"Serata di giochi in piazzetta",cat:"sociale",mesi:[5,6,7,8,9],img:"🎭"}],
    posti:12,notti_min:3 },
  { id:5, name:"Villa La Loggia", tipo:"Villa con piscina", localita:"Vinci", area:"Montalbano", img:"🏊", lat:43.783, lng:10.921,
    descrizione:"Villa rinascimentale ristrutturata. Lusso discreto, piscina panoramica, SPA.",
    tags:["lusso","relax","piscina","coppia","romantico","spa"],
    profilo:{ritmo:2,natura:3,socialita:2,cucina:4,cultura:4,avventura:1,lusso:5},
    pressione:[1,1,2,3,4,5,5,5,4,3,2,1],
    mobilita:{tipo:"misto",label:"Auto + navetta",dettagli:[{icona:"🚗",testo:"Auto consigliata per massima flessibilità"},{icona:"🚂",testo:"Empoli FS (15 min auto) → Firenze 25 min"},{icona:"🚲",testo:"E-bike per raggiungere Vinci paese"}]},
    vicino_a:[{luogo:"Firenze",distanza:"40 min auto"},{luogo:"Vinci",distanza:"5 min auto"},{luogo:"Pistoia",distanza:"30 min auto"}],
    da_vedere:["Museo Leonardiano di Vinci","Montalbano in e-bike","Collodi - Pinocchio"],
    esperienze:[{id:"e14",nome:"Trattamento SPA con prodotti al fico",cat:"benessere",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"💆"},{id:"e15",nome:"Cena privata con chef locale",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"👨‍🍳"},{id:"e16",nome:"Tour in e-bike ai vigneti",cat:"natura",mesi:[4,5,6,7,8,9,10],img:"🚲"}],
    posti:8,notti_min:2 },
  { id:6, name:"Rifugio Montalbano", tipo:"Rifugio escursionistico", localita:"Cerreto Guidi", area:"Montalbano", img:"🥾", lat:43.762, lng:10.876,
    descrizione:"Base per trail, MTB e trekking sul Montalbano. Atmosfera da alpinismo toscano.",
    tags:["avventura","trekking","bike","attivo","natura","sport"],
    profilo:{ritmo:5,natura:5,socialita:3,cucina:3,cultura:2,avventura:5,lusso:1},
    pressione:[1,1,1,2,3,4,5,5,4,2,1,1],
    mobilita:{tipo:"auto",label:"Auto necessaria",dettagli:[{icona:"🚗",testo:"Auto indispensabile: area rurale senza TPL"},{icona:"🚂",testo:"Empoli o Fucecchio FS (20-25 min auto)"},{icona:"🚵",testo:"MTB e trail direttamente dalla struttura"}]},
    vicino_a:[{luogo:"Firenze",distanza:"50 min auto"},{luogo:"Empoli",distanza:"20 min auto"},{luogo:"Pistoia",distanza:"35 min auto"}],
    da_vedere:["Montalbano trail network","Villa medicea di Cerreto Guidi","Boschi di castagni"],
    esperienze:[{id:"e17",nome:"Trekking guidato sul Montalbano",cat:"avventura",mesi:[3,4,5,6,7,8,9,10,11],img:"🏔️"},{id:"e18",nome:"MTB nei boschi di castagni",cat:"avventura",mesi:[3,4,5,6,7,8,9,10,11],img:"🚵"},{id:"e19",nome:"Birdwatching all'alba",cat:"natura",mesi:[4,5,6,7,8,9],img:"🦅"}],
    posti:10,notti_min:2 },
  { id:7, name:"Albergo Diffuso San Miniato", tipo:"Albergo diffuso", localita:"San Miniato", area:"Empolese", img:"🌆", lat:43.685, lng:10.848,
    descrizione:"Camere sparse nel borgo medievale. Vivi il paese come un abitante.",
    tags:["borgo","cultura","storia","autentico","gastronomia","tartufo"],
    profilo:{ritmo:2,natura:2,socialita:4,cucina:5,cultura:5,avventura:1,lusso:3},
    pressione:[2,2,2,3,4,4,4,4,3,4,3,2],
    mobilita:{tipo:"misto",label:"Treno + bus",dettagli:[{icona:"🚂",testo:"San Miniato-Fucecchio FS → Firenze · 35 min"},{icona:"🚌",testo:"Bus per San Miniato Alto (10 min)"},{icona:"🚶",testo:"Borgo Alto visitabile interamente a piedi"}]},
    vicino_a:[{luogo:"Firenze",distanza:"35 min treno"},{luogo:"Pisa",distanza:"40 min treno"},{luogo:"Certaldo",distanza:"20 min auto"}],
    da_vedere:["Rocca di Federico II","Duomo e centro medievale","Mercato del tartufo bianco"],
    esperienze:[{id:"e20",nome:"Caccia al tartufo bianco con tartufaio",cat:"cucina",mesi:[10,11,12],img:"🍄"},{id:"e21",nome:"Passeggiata serale nel borgo illuminato",cat:"cultura",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🌙"},{id:"e22",nome:"Mercato del tartufo (stagionale)",cat:"cucina",mesi:[11],img:"🧺"}],
    posti:10,notti_min:2 },
  { id:8, name:"Osteria Il Gelso con Camere", tipo:"Piccolo albergo", localita:"Gambassi Terme", area:"Valdelsa", img:"🍷", lat:43.537, lng:10.950,
    descrizione:"4 camere sopra una trattoria stellata. Per chi vuole mangiare benissimo.",
    tags:["gastronomia","vino","lento","coppia","gourmet"],
    profilo:{ritmo:2,natura:3,socialita:3,cucina:5,cultura:3,avventura:1,lusso:4},
    pressione:[1,1,2,3,4,4,4,4,4,3,2,1],
    mobilita:{tipo:"auto",label:"Auto consigliata",dettagli:[{icona:"🚗",testo:"Auto consigliata: paese collinare poco servito"},{icona:"🚂",testo:"Castelfiorentino FS (15 min auto) → Firenze 40 min"}]},
    vicino_a:[{luogo:"San Gimignano",distanza:"20 min auto"},{luogo:"Firenze",distanza:"55 min auto"},{luogo:"Volterra",distanza:"30 min auto"}],
    da_vedere:["Terme di Gambassi","Via Francigena","San Gimignano"],
    esperienze:[{id:"e23",nome:"Cena degustazione con abbinamento vini",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🍽️"},{id:"e24",nome:"Tour delle cantine della Valdelsa",cat:"cucina",mesi:[4,5,6,7,8,9,10,11],img:"🍷"},{id:"e25",nome:"Bagno alle terme di Gambassi",cat:"benessere",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"♨️"}],
    posti:4,notti_min:2 },
  { id:9, name:"Masseria La Volta", tipo:"Agriturismo familiare", localita:"Barberino Val d'Elsa", area:"Chianti", img:"👨‍👩‍👧", lat:43.538, lng:11.167,
    descrizione:"Perfetta per famiglie. Animali da cortile, orto condiviso, spazio gioco protetto.",
    tags:["famiglie","bambini","animali","natura","orto","lento"],
    profilo:{ritmo:2,natura:4,socialita:4,cucina:4,cultura:2,avventura:2,lusso:1},
    pressione:[1,1,1,2,3,5,5,5,3,2,1,1],
    mobilita:{tipo:"auto",label:"Auto necessaria",dettagli:[{icona:"🚗",testo:"Auto necessaria per la zona collinare"},{icona:"🚂",testo:"Certaldo FS (20 min auto) → Firenze 35 min"}]},
    vicino_a:[{luogo:"Firenze",distanza:"50 min auto"},{luogo:"Chianti Classico",distanza:"15 min auto"},{luogo:"Certaldo",distanza:"20 min auto"}],
    da_vedere:["Chianti Classico","Castello di Barberino","Parco del Chianti"],
    esperienze:[{id:"e26",nome:"Cura degli animali con i bambini",cat:"natura",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🐄"},{id:"e27",nome:"Fare il pane e la pasta a mano",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🍞"},{id:"e28",nome:"Osservazione stelle con telescopio",cat:"natura",mesi:[6,7,8,9],img:"🔭"}],
    posti:14,notti_min:3 },
  { id:10, name:"Casa Pratolino", tipo:"Casa vacanze", localita:"Fucecchio", area:"Empolese", img:"🏠", lat:43.727, lng:10.806,
    descrizione:"Casa colonica tra le paludi di Fucecchio. Natura insolita, birdwatching.",
    tags:["solitudine","natura","birdwatching","fotografia","palude"],
    profilo:{ritmo:1,natura:5,socialita:1,cucina:2,cultura:3,avventura:3,lusso:1},
    pressione:[1,1,1,2,3,3,3,3,3,2,1,1],
    mobilita:{tipo:"misto",label:"Treno + bici",dettagli:[{icona:"🚂",testo:"Fucecchio FS → Firenze SMN · 30 min · frequente"},{icona:"🚲",testo:"Bici per esplorare la riserva del Padule"}]},
    vicino_a:[{luogo:"Firenze",distanza:"30 min treno"},{luogo:"Empoli",distanza:"10 min auto"},{luogo:"Pisa",distanza:"45 min treno"}],
    da_vedere:["Padule di Fucecchio (riserva)","Borgo di Fucecchio","Valdarno basso"],
    esperienze:[{id:"e29",nome:"Birdwatching al Padule di Fucecchio",cat:"natura",mesi:[3,4,5,6,7,8,9,10],img:"🦢"},{id:"e30",nome:"Tour fotografico all'alba",cat:"arte",mesi:[4,5,6,7,8,9,10],img:"📷"},{id:"e31",nome:"Canoa nelle paludi",cat:"avventura",mesi:[4,5,6,7,8,9,10],img:"🛶"}],
    posti:6,notti_min:2 },
  { id:11, name:"Tenuta Petrognano", tipo:"Wine resort", localita:"Montespertoli", area:"Chianti", img:"🍇", lat:43.652, lng:11.085,
    descrizione:"Nel cuore del Chianti DOC. Vendemmia, degustazioni e weekend tra le vigne.",
    tags:["vino","vigna","lusso","coppia","gastronomia"],
    profilo:{ritmo:2,natura:3,socialita:3,cucina:5,cultura:4,avventura:2,lusso:4},
    pressione:[1,1,2,3,4,4,4,4,5,3,2,1],
    mobilita:{tipo:"auto",label:"Auto consigliata",dettagli:[{icona:"🚗",testo:"Auto consigliata per i vigneti collinari"},{icona:"🚂",testo:"Certaldo FS (20 min auto) → Firenze 35 min"},{icona:"🚲",testo:"E-bike per tour tra le vigne"}]},
    vicino_a:[{luogo:"Firenze",distanza:"45 min auto"},{luogo:"Chianti Classico",distanza:"15 min auto"},{luogo:"Certaldo",distanza:"20 min auto"}],
    da_vedere:["Chianti wine road","Certaldo medievale","Impruneta"],
    esperienze:[{id:"e32",nome:"Vendemmia con i contadini",cat:"natura",mesi:[9,10],img:"🍇"},{id:"e33",nome:"Masterclass di vinificazione",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🍾"},{id:"e34",nome:"Cena tra le vigne al tramonto",cat:"cucina",mesi:[5,6,7,8,9,10],img:"🌅"}],
    posti:16,notti_min:2 },
  { id:12, name:"Cascina del Cavaliere", tipo:"Agriturismo equestre", localita:"Empoli", area:"Empolese", img:"🐴", lat:43.698, lng:10.990,
    descrizione:"Maneggio con ospitalità rurale. Escursioni a cavallo tra colline e borghi.",
    tags:["cavalli","natura","avventura","bambini","sport"],
    profilo:{ritmo:3,natura:5,socialita:3,cucina:3,cultura:2,avventura:4,lusso:2},
    pressione:[1,1,2,3,4,4,4,4,4,3,2,1],
    mobilita:{tipo:"treno",label:"Treno ideale",dettagli:[{icona:"🚂",testo:"Empoli FS → Firenze SMN · 25 min · frequentissimo"},{icona:"🚲",testo:"3 km dalla stazione in bici o taxi"},{icona:"🐴",testo:"A cavallo si raggiungono borgate vicine"}]},
    vicino_a:[{luogo:"Firenze",distanza:"25 min treno"},{luogo:"Empoli centro",distanza:"10 min bici"},{luogo:"Pisa",distanza:"35 min treno"}],
    da_vedere:["Pontorme","Empoli storica","Montalbano a cavallo"],
    esperienze:[{id:"e35",nome:"Trekking a cavallo al tramonto",cat:"avventura",mesi:[4,5,6,7,8,9,10],img:"🐴"},{id:"e36",nome:"Lezioni di equitazione per bambini",cat:"avventura",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🏇"},{id:"e37",nome:"Percorso tra casali abbandonati",cat:"cultura",mesi:[3,4,5,6,7,8,9,10,11],img:"🗺️"}],
    posti:8,notti_min:2 },
  { id:13, name:"Ostello del Pellegrino", tipo:"Ostello culturale", localita:"San Miniato", area:"Empolese", img:"🎒", lat:43.682, lng:10.852,
    descrizione:"Sul tracciato della Via Francigena. Per viaggiatori lenti e zaino in spalla.",
    tags:["cammino","francigena","budget","incontri","solo","giovani"],
    profilo:{ritmo:4,natura:4,socialita:5,cucina:3,cultura:4,avventura:3,lusso:1},
    pressione:[1,1,2,3,4,4,4,4,4,3,2,1],
    mobilita:{tipo:"treno",label:"Solo treno",dettagli:[{icona:"🚂",testo:"San Miniato-Fucecchio FS → Firenze · 35 min"},{icona:"🚶",testo:"La Via Francigena parte dall'ostello stesso"}]},
    vicino_a:[{luogo:"Firenze",distanza:"35 min treno"},{luogo:"Pisa (Francigena)",distanza:"2 giorni a piedi"},{luogo:"Siena (Francigena)",distanza:"3 giorni a piedi"}],
    da_vedere:["Via Francigena","San Miniato Alto","Torre di Federico II"],
    esperienze:[{id:"e38",nome:"Giornata sulla Via Francigena",cat:"avventura",mesi:[3,4,5,6,7,8,9,10,11],img:"🚶"},{id:"e39",nome:"Serata di racconti tra pellegrini",cat:"sociale",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🔥"},{id:"e40",nome:"Workshop di fotografia di viaggio",cat:"arte",mesi:[4,5,6,7,8,9,10],img:"📷"}],
    posti:20,notti_min:1 },
  { id:14, name:"Il Convento di Badia", tipo:"Ospitalità monastica", localita:"Badia a Passignano", area:"Chianti", img:"⛪", lat:43.538, lng:11.207,
    descrizione:"Celle monastiche restaurate. Ritmo lento, silenzio, spiritualità laica.",
    tags:["silenzio","meditazione","spirituale","lento","riflessione"],
    profilo:{ritmo:1,natura:4,socialita:1,cucina:3,cultura:4,avventura:1,lusso:2},
    pressione:[2,2,2,3,3,3,3,3,3,3,2,2],
    mobilita:{tipo:"auto",label:"Auto necessaria",dettagli:[{icona:"🚗",testo:"Auto necessaria: Chianti classico rurale"},{icona:"🚶",testo:"Sentieri intorno al monastero a piedi"}]},
    vicino_a:[{luogo:"Firenze",distanza:"40 min auto"},{luogo:"Greve in Chianti",distanza:"25 min auto"},{luogo:"Siena",distanza:"55 min auto"}],
    da_vedere:["Abbazia di Passignano","Chianti Classico","Greve in Chianti"],
    esperienze:[{id:"e41",nome:"Cammino meditativo tra i vigneti",cat:"benessere",mesi:[4,5,6,7,8,9,10],img:"🧘"},{id:"e42",nome:"Raccolta erbe officinali",cat:"natura",mesi:[4,5,6,7,8,9],img:"🌿"},{id:"e43",nome:"Cena in silenzio con i monaci",cat:"cultura",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🕯️"}],
    posti:12,notti_min:3 },
  { id:15, name:"Agriturismo Monte Moriccio", tipo:"Agriturismo con vista", localita:"Vinci", area:"Montalbano", img:"🌅", lat:43.790, lng:10.905,
    descrizione:"Vista panoramica sulla piana. Olio EVO biologico, cucina di campagna.",
    tags:["panorama","olio","lento","famiglie","cucina","natura"],
    profilo:{ritmo:2,natura:4,socialita:3,cucina:4,cultura:3,avventura:2,lusso:2},
    pressione:[1,1,2,3,4,4,4,4,4,3,2,1],
    mobilita:{tipo:"misto",label:"Treno + navetta",dettagli:[{icona:"🚂",testo:"Empoli FS (15 min) → Firenze 25 min"},{icona:"🚐",testo:"Navetta dalla stazione su prenotazione"},{icona:"🚗",testo:"Auto comoda per Vinci e Montalbano"}]},
    vicino_a:[{luogo:"Firenze",distanza:"40 min (treno da Empoli)"},{luogo:"Vinci",distanza:"10 min auto"},{luogo:"Empoli",distanza:"15 min auto"}],
    da_vedere:["Museo Leonardiano di Vinci","Montalbano","Anchiano - casa natale di Leonardo"],
    esperienze:[{id:"e44",nome:"Degustazione olio con il frantoiano",cat:"cucina",mesi:[11,12,1,2,3],img:"🫒"},{id:"e45",nome:"Laboratorio olio e pane",cat:"cucina",mesi:[1,2,3,4,5,6,7,8,9,10,11,12],img:"🍞"},{id:"e46",nome:"Tramonto panoramico sulla piana",cat:"natura",mesi:[4,5,6,7,8,9,10],img:"🌄"}],
    posti:10,notti_min:2 },
];

const ALL_ESPERIENZE = STRUCTURES.flatMap(s => s.esperienze.map(e => ({...e, struttura:s})));
const MESI = ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
const MESE_CORRENTE = new Date().getMonth();
const CATEGORIE = [
  {id:"tutti",label:"Tutte",icon:"✦"},{id:"natura",label:"Natura",icon:"🌿"},
  {id:"cucina",label:"Cucina & Vino",icon:"🍷"},{id:"avventura",label:"Avventura",icon:"🥾"},
  {id:"benessere",label:"Benessere",icon:"🧘"},{id:"cultura",label:"Cultura",icon:"🏛️"},
  {id:"arte",label:"Arte",icon:"🎨"},{id:"sociale",label:"Sociale",icon:"🎭"},
];

function cosineSim(a,b){
  const k=Object.keys(a); let d=0,mA=0,mB=0;
  k.forEach(k=>{d+=(a[k]||0)*(b[k]||0);mA+=(a[k]||0)**2;mB+=(b[k]||0)**2;});
  return d/(Math.sqrt(mA)*Math.sqrt(mB)||1);
}

function pressureLabel(v){
  if(v<=1)return{label:"Libero",color:"#2d6a4f",bg:"#e8f4ec",dot:"#2d6a4f"};
  if(v<=2)return{label:"Tranquillo",color:"#52796f",bg:"#eaf2ee",dot:"#52796f"};
  if(v<=3)return{label:"Moderato",color:"#b8860b",bg:"#fdf6e3",dot:"#c4a020"};
  if(v<=4)return{label:"Affollato",color:"#c4813a",bg:"#fdf0e3",dot:"#c4813a"};
  return{label:"Saturo",color:"#a83232",bg:"#fce8e8",dot:"#c44536"};
}

const MOB_ICON={treno:"🚂",auto:"🚗",misto:"🔄",bike:"🚲"};
const MOB_COLOR={treno:"#2d6a4f",auto:"#b87333",misto:"#52796f",bike:"#3a7d9c"};
const TIPO_ICON={coppia:"💑",famiglia:"👨‍👩‍👧",solo:"🧳"};

// ── SYSTEM PROMPT: query unica per tutto ──────────────────────────────────────
const SYSTEM = `Sei il motore di matching di una piattaforma turistica per l'area Empolese-Valdelsa (Toscana).

La query può contenere: tipo di viaggio, esperienze desiderate, destinazioni, mobilità, periodo — tutto insieme o separato.

Analizza e restituisci SOLO JSON:

Se hai abbastanza info:
{
  "pronto": true,
  "profilo": {"ritmo":1-5,"natura":1-5,"socialita":1-5,"cucina":1-5,"cultura":1-5,"avventura":1-5,"lusso":1-5},
  "destinazioni_cercate": [],
  "esperienze_cercate": [],
  "sommario": "frase breve che descrive il viaggio",
  "preferenza_mobilita": "treno|auto|misto|nessuna",
  "mese_cercato": null o numero 1-12
}

Se mancano info chiave: { "pronto": false, "domanda": "..." }

Scale: ritmo 1=lentissimo 5=frenetico, natura 1=urban 5=wild, socialita 1=solitudine 5=massima, cucina 1=non importante 5=centrale, cultura 1=nulla 5=totale immersione, avventura 1=zero 5=sport estremo, lusso 1=budget 5=premium.

SOLO JSON valido, zero testo fuori.`;

export default function App(){
  const [phase,setPhase]=useState("home");
  const [msgs,setMsgs]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [results,setResults]=useState([]);
  const [selected,setSelected]=useState(null);
  const [profilo,setProfilo]=useState(null);
  const [sommario,setSommario]=useState("");
  const [destinazioni,setDestinazioni]=useState([]);
  const [esperienzeCercate,setEsperienzeCercate]=useState([]);
  const [prefMob,setPrefMob]=useState(null);
  const [meseFilter,setMeseFilter]=useState(MESE_CORRENTE);
  // catalogo esperienze
  const [catFilter,setCatFilter]=useState("tutti");
  const [expSearch,setExpSearch]=useState("");
  const [selectedExp,setSelectedExp]=useState(null);

  const mc=(t)=>MOB_COLOR[t]||"#888";
  const reset=()=>{setPhase("home");setMsgs([]);setInput("");setResults([]);setSelected(null);setProfilo(null);setSommario("");setDestinazioni([]);setEsperienzeCercate([]);setPrefMob(null);setSelectedExp(null);setCatFilter("tutti");setExpSearch("");};

  // ── SEND ────────────────────────────────────────────────────────────────────
  const send=async(text)=>{
    if(!text.trim()||loading)return;
    const newMsgs=[...msgs,{role:"user",content:text}];
    setMsgs(newMsgs);setInput("");setLoading(true);
    try{
  const res = await fetch("/api/anthropic", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM, messages: newMsgs })
});
      const data=await res.json();
      const raw=data.content?.[0]?.text||"{}";
      let json;
      try{json=JSON.parse(raw.replace(/```json|```/g,"").trim());}catch{json={pronto:false,domanda:"Puoi dirmi di più?"};}
      if(json.pronto){
        const p=json.profilo;setProfilo(p);setSommario(json.sommario||"");
        const dest=json.destinazioni_cercate||[];setDestinazioni(dest);
        const espCercate=json.esperienze_cercate||[];setEsperienzeCercate(espCercate);
        setPrefMob(json.preferenza_mobilita);
        if(json.mese_cercato)setMeseFilter(json.mese_cercato-1);

        const ranked=STRUCTURES.map(s=>{
          let score=cosineSim(p,s.profilo)*72;
          // bonus destinazioni
          if(dest.length>0){
            const dl=dest.map(d=>d.toLowerCase());
            if(s.vicino_a.some(v=>dl.some(d=>v.luogo.toLowerCase().includes(d)||d.includes(v.luogo.toLowerCase()))))score+=18;
          }
          // bonus esperienze cercate
          if(espCercate.length>0){
            const el=espCercate.map(e=>e.toLowerCase());
            const hasExp=s.esperienze.some(e=>el.some(ec=>e.nome.toLowerCase().includes(ec)||e.cat.toLowerCase().includes(ec)));
            if(hasExp)score+=15;
          }
          // mobilità
          if(json.preferenza_mobilita==="treno"&&s.mobilita.tipo==="treno")score+=5;
          if(json.preferenza_mobilita==="treno"&&s.mobilita.tipo==="auto")score-=8;
          if(json.preferenza_mobilita==="auto"&&s.mobilita.tipo==="auto")score+=3;
          return{...s,score:Math.min(99,Math.max(30,Math.round(score)))};
        }).sort((a,b)=>b.score-a.score);
        setResults(ranked);setPhase("results");
      }else{
        setMsgs([...newMsgs,{role:"assistant",content:json.domanda||"Dimmi di più."}]);
      }
    }catch(e){setMsgs([...newMsgs,{role:"assistant",content:"Errore, riprova."}]);}
    setLoading(false);
  };

  const espFiltered=ALL_ESPERIENZE.filter(e=>{
    const catOk=catFilter==="tutti"||e.cat===catFilter;
    const searchOk=!expSearch||e.nome.toLowerCase().includes(expSearch.toLowerCase());
    return catOk&&searchOk&&e.mesi.includes(meseFilter+1);
  });

  // ── COMPONENTE PRESSIONE ────────────────────────────────────────────────────
  const PressureBar=({pressione,compact})=>{
    const val=pressione[meseFilter];const p=pressureLabel(val);
    if(compact)return(
      <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
        <div style={{width:"7px",height:"7px",borderRadius:"50%",background:p.dot}}/>
        <span style={{fontSize:"11px",color:p.color,fontWeight:"500"}}>{p.label}</span>
      </div>
    );
    return(
      <div style={{background:p.bg,border:`1px solid ${p.dot}33`,borderRadius:"10px",padding:"12px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
          <span style={{fontSize:"11px",fontWeight:"600",color:p.color}}>Pressione territoriale · {MESI[meseFilter]}</span>
          <span style={{fontSize:"13px",fontWeight:"700",color:p.color}}>{p.label}</span>
        </div>
        <div style={{display:"flex",gap:"3px",alignItems:"flex-end"}}>
          {MESI.map((m,i)=>{const pv=pressione[i];const pc=pressureLabel(pv);return(
            <div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",cursor:"pointer"}} onClick={()=>setMeseFilter(i)}>
              <div style={{width:"100%",height:`${pv*7+4}px`,background:i===meseFilter?pc.dot:pc.dot+"77",borderRadius:"2px"}}/>
              <span style={{fontSize:"7px",color:i===meseFilter?"#333":"#bbb",fontWeight:i===meseFilter?"700":"400"}}>{m}</span>
            </div>
          );})}
        </div>
        <p style={{fontSize:"10px",color:"#888",marginTop:"7px",fontStyle:"italic"}}>
          {val<=2?"✓ Ottimo periodo: territorio poco frequentato, esperienza autentica.":val<=3?"Periodo nella media. Buona disponibilità.":val<=4?"Abbastanza frequentato. Prenota con anticipo.":"⚠ Territorio saturo. Considera date alternative o un'area vicina."}
        </p>
      </div>
    );
  };

  // ── COMPONENTE RECENSIONI ───────────────────────────────────────────────────
  const RecCard=({rec,compact})=>{
    const coerenzaPct=Math.round(rec.coerenza*100);
    const coerenzaColor=rec.coerenza>0.93?"#2d6a4f":rec.coerenza>0.85?"#b8860b":"#c4813a";
    if(compact)return(
      <div style={{background:"#faf7f2",borderLeft:"3px solid #c4a35a",padding:"10px 12px",borderRadius:"0 8px 8px 0",marginTop:"8px"}}>
        <p style={{fontSize:"12px",color:"#333",lineHeight:"1.6",fontStyle:"italic"}}>"{rec.testo.slice(0,120)}…"</p>
        <div style={{display:"flex",gap:"8px",marginTop:"6px",alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:"10px",color:"#888"}}>{TIPO_ICON[rec.tipo]} {rec.tipo} · {MESI[rec.mese-1]}</span>
          <span style={{fontSize:"10px",background:"#f0ebe3",color:"#666",padding:"1px 7px",borderRadius:"8px"}}>✦ {rec.esperienza}</span>
          <span style={{fontSize:"10px",color:coerenzaColor,marginLeft:"auto"}}>coerenza {coerenzaPct}%</span>
        </div>
      </div>
    );
    return(
      <div style={{background:"#faf7f2",border:"1px solid #e8e0d0",borderRadius:"10px",padding:"14px 16px"}}>
        <p style={{fontSize:"13px",color:"#2a2a2a",lineHeight:"1.7",fontStyle:"italic",marginBottom:"10px"}}>"{rec.testo}"</p>
        <div style={{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap",borderTop:"1px solid #ede8e0",paddingTop:"8px"}}>
          <span style={{fontSize:"11px",color:"#888"}}>{TIPO_ICON[rec.tipo]} {rec.tipo}</span>
          <span style={{fontSize:"11px",color:"#888"}}>· {MESI[rec.mese-1]}</span>
          <span style={{fontSize:"11px",background:"#e8f4ec",color:"#2d6a4f",padding:"1px 8px",borderRadius:"8px",border:"1px solid #b5d8c0"}}>✦ {rec.esperienza}</span>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:"5px"}}>
            <span style={{fontSize:"10px",color:"#bbb"}}>coerenza testo</span>
            <div style={{width:"40px",height:"4px",background:"#e8e0d0",borderRadius:"2px"}}>
              <div style={{width:`${rec.coerenza*100}%`,height:"100%",background:coerenzaColor,borderRadius:"2px"}}/>
            </div>
            <span style={{fontSize:"10px",color:coerenzaColor,fontWeight:"600"}}>{coerenzaPct}%</span>
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════════════════
  return(
    <div style={st.root}>
      <div style={st.grain}/>
      <header style={st.header}>
        <div style={st.logo} onClick={reset}><span style={st.logoMark}>◈</span><span style={st.logoText}>VALDELSA <em>dentro</em></span></div>
        <div style={{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
          {phase!=="home"&&(
            <div style={st.modeTabs}>
              <button style={{...st.modeTab,...(phase==="search"||phase==="results"?st.modeTabActive:{})}} onClick={()=>{setPhase("search");setResults([]);}}>Cerca viaggio</button>
              <button style={{...st.modeTab,...(phase==="catalog"?st.modeTabActive:{})}} onClick={()=>{setPhase("catalog");setSelectedExp(null);}}>Catalogo esperienze</button>
            </div>
          )}
          <span style={st.tagline}>Piattaforma rigenerativa · Demo</span>
        </div>
      </header>

      {/* ══ HOME ══ */}
      {phase==="home"&&(
        <main style={st.home}>
          <p style={st.homeSub}>Empolese · Valdelsa · Montalbano</p>
          <h1 style={st.homeTitle}>Trova il viaggio<br/>che ti appartiene</h1>
          <p style={st.homeDesc}>Scrivi cosa cerchi — destinazione, esperienza, stile, periodo. Tutto in una volta.</p>

          <div style={st.homeSearchBox}>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();setPhase("search");send(input);}}}
              placeholder="Es: Voglio fare la vendemmia vicino a Firenze in settembre, preferisco il treno..."
              style={st.homeTextarea} rows={3}/>
            <button onClick={()=>{setPhase("search");send(input);}} style={st.homeSendBtn} disabled={!input.trim()}>
              Cerca →
            </button>
          </div>

          <div style={st.homeChips}>
            {["Vendemmia vicino a Firenze in settembre","Yoga e silenzio, no auto","Weekend tartufo con bambini","Trekking MTB Montalbano","Lusso discreto, cucina eccellente"].map(ex=>(
              <button key={ex} style={st.chip} onClick={()=>{setPhase("search");send(ex);}}>{ex}</button>
            ))}
          </div>

          <div style={st.homeOrRow}>
            <div style={st.homeDivider}/>
            <span style={st.homeOrText}>oppure</span>
            <div style={st.homeDivider}/>
          </div>

          <button style={st.homeCatalogBtn} onClick={()=>setPhase("catalog")}>
            ✦ Sfoglia il catalogo delle esperienze
          </button>

          <div style={st.homeMeseRow}>
            <span style={{fontSize:"11px",color:"#888"}}>📅 Mese di riferimento:</span>
            <select value={meseFilter} onChange={e=>setMeseFilter(+e.target.value)} style={st.meseSelect}>
              {MESI.map((m,i)=><option key={m} value={i}>{m}</option>)}
            </select>
          </div>
        </main>
      )}

      {/* ══ SEARCH (conversazione) ══ */}
      {phase==="search"&&(
        <main style={st.main}>
          <div style={st.chatWrap}>
            {msgs.length===0&&(
              <div style={st.chatHint}>
                <span style={st.aiDot}>◈</span>
                <span style={{color:"#888",fontSize:"13px"}}>Ciao — raccontami cosa stai cercando. Posso trovare strutture, esperienze, percorsi.</span>
              </div>
            )}
            {msgs.map((m,i)=>(
              <div key={i} style={m.role==="user"?st.bubU:st.bubAI}>
                {m.role==="assistant"&&<span style={st.aiDot}>◈</span>}
                <span>{m.content}</span>
              </div>
            ))}
            {loading&&<div style={st.bubAI}><span style={st.aiDot}>◈</span><span style={st.ldots}>· · ·</span></div>}
          </div>
          <div style={st.inputWrap}>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(input);}}}
              placeholder="Scrivi qui..." style={st.textarea} rows={2}/>
            <button onClick={()=>send(input)} style={st.sendBtn} disabled={loading||!input.trim()}>→</button>
          </div>
        </main>
      )}

      {/* ══ RESULTS ══ */}
      {phase==="results"&&(
        <main style={st.mainR}>
          <div style={st.topBar}>
            <div>
              <button style={st.backBtn} onClick={()=>setPhase("search")}>← Modifica</button>
              <h2 style={st.rTitle}>Strutture compatibili</h2>
              {sommario&&<p style={st.sommario}>"{sommario}"</p>}
              <div style={{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"6px"}}>
                {destinazioni.map(d=><span key={d} style={st.destChip}>📍 {d}</span>)}
                {esperienzeCercate.map(e=><span key={e} style={st.expChip}>✦ {e}</span>)}
                {prefMob&&prefMob!=="nessuna"&&<span style={st.mobChip}>{MOB_ICON[prefMob]} {prefMob}</span>}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {profilo&&(
                <div style={st.profiloBox}>
                  <p style={st.profiloTitle}>Il tuo profilo</p>
                  {Object.entries({Ritmo:profilo.ritmo,Natura:profilo.natura,Socialità:profilo.socialita,Cucina:profilo.cucina,Cultura:profilo.cultura,Avventura:profilo.avventura,Comfort:profilo.lusso}).map(([l,v])=>(
                    <div key={l} style={st.barRow}><span style={st.barL}>{l}</span><div style={st.barBg}><div style={{...st.barFill,width:`${v*20}%`}}/></div></div>
                  ))}
                </div>
              )}
              <div style={{...st.profiloBox,minWidth:"200px"}}>
                <p style={st.profiloTitle}>📅 Mese</p>
                <select value={meseFilter} onChange={e=>setMeseFilter(+e.target.value)} style={st.meseSelect}>
                  {MESI.map((m,i)=><option key={m} value={i}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={st.twoCol}>
            <div style={st.cards}>
              {results.map((r,i)=>{
                const pVal=r.pressione[meseFilter];const p=pressureLabel(pVal);
                const recs=RECENSIONI[r.id]||[];const bestRec=recs[0];
                return(
                  <div key={r.id} style={st.card} onClick={()=>{setSelected(r);setPhase("detail");}}>
                    <div style={st.cardTop}>
                      <span style={st.cEmoji}>{r.img}</span>
                      <div style={st.cMid}><div style={st.cName}>{r.name}</div><div style={st.cSub}>{r.tipo} · {r.localita}</div></div>
                      <div style={{...st.badge,background:r.score>82?"#1a4a35":r.score>65?"#2d6a4f":"#52796f"}}>
                        <span style={st.bNum}>{r.score}</span><span style={st.bSub}>match</span>
                      </div>
                    </div>
                    <div style={st.cardTagsRow}>
                      <div style={{...st.mobTag,background:mc(r.mobilita.tipo)+"18",borderColor:mc(r.mobilita.tipo)+"44",color:mc(r.mobilita.tipo)}}>
                        {MOB_ICON[r.mobilita.tipo]} {r.mobilita.label}
                        {r.vicino_a[0]&&<span style={{opacity:0.7}}> · {r.vicino_a[0].luogo} {r.vicino_a[0].distanza}</span>}
                      </div>
                      <div style={{...st.presTag,background:p.bg,borderColor:p.dot+"44",color:p.color}}>
                        <div style={{width:"6px",height:"6px",borderRadius:"50%",background:p.dot}}/>{p.label}
                      </div>
                    </div>
                    <p style={st.cDesc}>{r.descrizione}</p>
                    {bestRec&&<RecCard rec={bestRec} compact={true}/>}
                    <div style={{...st.tagRow,marginTop:"8px"}}>{r.tags.slice(0,4).map(t=><span key={t} style={st.tag}>{t}</span>)}</div>
                    {i===0&&<div style={st.best}>✦ Miglior match</div>}
                  </div>
                );
              })}
            </div>

            {/* MAPPA */}
            <div style={{display:"flex",flexDirection:"column",gap:"12px",position:"sticky",top:"70px"}}>
              <div style={st.mapBox}>
                <p style={st.mapTitle}>Territorio · pressione in {MESI[meseFilter]}</p>
                <svg viewBox="0 0 380 295" style={st.mapSvg}>
                  <defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#d4e6d0" stopOpacity="0.5"/><stop offset="100%" stopColor="#a8c5a0" stopOpacity="0.1"/></radialGradient></defs>
                  <rect width="380" height="295" fill="#f0ebe3" rx="10"/>
                  <ellipse cx="190" cy="148" rx="158" ry="118" fill="url(#g)" stroke="#84a98c" strokeWidth="1" strokeDasharray="4,3"/>
                  <path d="M20 158 Q90 143 170 153 Q250 163 360 140" stroke="#7fb3d3" strokeWidth="2" fill="none" opacity="0.55"/>
                  <text x="70" y="170" fontSize="8" fill="#7fb3d3">Arno</text>
                  <path d="M110 255 Q165 215 205 188 Q245 160 285 128" stroke="#7fb3d3" strokeWidth="1.5" fill="none" opacity="0.4"/>
                  <text x="218" y="204" fontSize="8" fill="#7fb3d3">Elsa</text>
                  <circle cx="322" cy="70" r="7" fill="#c44536" opacity="0.75"/>
                  <text x="298" y="58" fontSize="9" fill="#c44536" fontWeight="600">Firenze</text>
                  {results.filter(r=>r.mobilita.tipo==="treno"||r.mobilita.tipo==="misto").slice(0,6).map(r=>{
                    const x=((r.lng-10.5)/0.8)*320+30,y=((43.85-r.lat)/0.35)*250+22;
                    return<line key={r.id+"l"} x1={x} y1={y} x2={322} y2={70} stroke="#2d6a4f" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.22"/>;
                  })}
                  {results.map((r,i)=>{
                    const x=((r.lng-10.5)/0.8)*320+30,y=((43.85-r.lat)/0.35)*250+22;
                    const sz=i===0?11:i<5?8:6;
                    const col=i===0?"#1a3a2a":i<3?"#2d6a4f":i<7?"#52796f":"#84a98c";
                    const pCol=pressureLabel(r.pressione[meseFilter]).dot;
                    return(
                      <g key={r.id} style={{cursor:"pointer"}} onClick={e=>{e.stopPropagation();setSelected(r);setPhase("detail");}}>
                        {i===0&&<circle cx={x} cy={y} r={sz+7} fill={col} opacity="0.12"/>}
                        <circle cx={x} cy={y} r={sz} fill={col} stroke="white" strokeWidth="1.5"/>
                        <circle cx={x+sz} cy={y-sz} r={3.5} fill={pCol} stroke="white" strokeWidth="1"/>
                        {i<5&&<text x={x+sz+4} y={y+4} fontSize={9} fill="#2c2c2c" fontWeight={i===0?"700":"500"}>{r.localita}</text>}
                      </g>
                    );
                  })}
                  <text x="8" y="288" fontSize="7" fill="#aaa" fontStyle="italic">Punto colorato = pressione in {MESI[meseFilter]}</text>
                </svg>
                <div style={st.mapLeg}>
                  {[{l:"Libero",c:"#2d6a4f"},{l:"Moderato",c:"#c4a020"},{l:"Saturo",c:"#c44536"}].map(x=>(
                    <span key={x.l}><span style={{display:"inline-block",width:"7px",height:"7px",borderRadius:"50%",background:x.c,marginRight:"3px"}}/>{x.l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ══ CATALOGO ESPERIENZE ══ */}
      {phase==="catalog"&&!selectedExp&&(
        <main style={st.mainExp}>
          <h2 style={st.rTitle}>Catalogo esperienze</h2>
          <p style={st.sommario}>Scegli l'esperienza, trova la struttura</p>
          <div style={st.expControls}>
            <div style={st.catFilters}>{CATEGORIE.map(c=>(
              <button key={c.id} style={{...st.catBtn,...(catFilter===c.id?st.catBtnActive:{})}} onClick={()=>setCatFilter(c.id)}>{c.icon} {c.label}</button>
            ))}</div>
            <div style={st.expSearchRow}>
              <input value={expSearch} onChange={e=>setExpSearch(e.target.value)} placeholder="Cerca esperienza..." style={st.expSearchInput}/>
              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <span style={{fontSize:"12px",color:"#888"}}>📅</span>
                <select value={meseFilter} onChange={e=>setMeseFilter(+e.target.value)} style={st.meseSelect}>
                  {MESI.map((m,i)=><option key={m} value={i}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div style={st.expGrid}>
            {espFiltered.map(e=>{
              const pVal=e.struttura.pressione[meseFilter];const p=pressureLabel(pVal);
              return(
                <div key={e.id+e.struttura.id} style={st.expCard} onClick={()=>setSelectedExp(e)}>
                  <span style={{fontSize:"28px",flexShrink:0}}>{e.img}</span>
                  <div style={{flex:1,display:"flex",flexDirection:"column",gap:"4px"}}>
                    <div style={{fontSize:"13px",fontWeight:"600",lineHeight:"1.3"}}>{e.nome}</div>
                    <div style={{fontSize:"11px",color:"#888"}}>{e.struttura.name} · {e.struttura.localita}</div>
                    <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
                      <span style={{fontSize:"10px",padding:"1px 7px",background:"#f0ebe3",border:"1px solid #d4c9b5",borderRadius:"8px",color:"#666"}}>{e.cat}</span>
                      <span style={{fontSize:"10px",padding:"1px 7px",background:p.bg,border:`1px solid ${p.dot}33`,borderRadius:"8px",color:p.color,display:"flex",alignItems:"center",gap:"3px"}}>
                        <span style={{width:"5px",height:"5px",borderRadius:"50%",background:p.dot,display:"inline-block"}}/>{p.label}
                      </span>
                    </div>
                    <div style={{display:"flex",gap:"2px",marginTop:"2px"}}>
                      {MESI.map((m,i)=><div key={m} style={{flex:1,height:"3px",borderRadius:"1px",background:e.mesi.includes(i+1)?(i===meseFilter?"#2d6a4f":"#84a98c55"):"#e8e0d0"}}/>)}
                    </div>
                  </div>
                </div>
              );
            })}
            {espFiltered.length===0&&<p style={{color:"#aaa",fontStyle:"italic",gridColumn:"1/-1",textAlign:"center",padding:"40px"}}>Nessuna esperienza trovata in {MESI[meseFilter]}.</p>}
          </div>
        </main>
      )}

      {/* ══ ESPERIENZA → STRUTTURE ══ */}
      {phase==="catalog"&&selectedExp&&(
        <main style={st.mainR}>
          <button style={st.backBtn} onClick={()=>setSelectedExp(null)}>← Catalogo</button>
          <div style={{display:"flex",alignItems:"center",gap:"14px",margin:"14px 0 20px"}}>
            <span style={{fontSize:"40px"}}>{selectedExp.img}</span>
            <div><h2 style={st.rTitle}>{selectedExp.nome}</h2><p style={st.sommario}>Strutture che offrono questa esperienza</p></div>
          </div>
          <div style={st.cards}>
            {STRUCTURES.filter(s=>s.esperienze.some(e=>e.id===selectedExp.id)).map(s=>{
              const pVal=s.pressione[meseFilter];const p=pressureLabel(pVal);
              const recs=RECENSIONI[s.id]||[];const relRec=recs.find(r=>r.esperienza.toLowerCase().includes(selectedExp.nome.slice(0,8).toLowerCase()))||recs[0];
              return(
                <div key={s.id} style={st.card} onClick={()=>{setSelected(s);setPhase("detail");}}>
                  <div style={st.cardTop}>
                    <span style={st.cEmoji}>{s.img}</span>
                    <div style={st.cMid}><div style={st.cName}>{s.name}</div><div style={st.cSub}>{s.tipo} · {s.localita}</div></div>
                  </div>
                  <div style={st.cardTagsRow}>
                    <div style={{...st.mobTag,background:mc(s.mobilita.tipo)+"18",borderColor:mc(s.mobilita.tipo)+"44",color:mc(s.mobilita.tipo)}}>{MOB_ICON[s.mobilita.tipo]} {s.mobilita.label}</div>
                    <div style={{...st.presTag,background:p.bg,borderColor:p.dot+"44",color:p.color}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:p.dot}}/>{p.label} in {MESI[meseFilter]}</div>
                  </div>
                  <p style={st.cDesc}>{s.descrizione}</p>
                  {relRec&&<RecCard rec={relRec} compact={true}/>}
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ══ DETAIL ══ */}
      {phase==="detail"&&selected&&(
        <main style={st.mainD}>
          <button style={st.backBtn} onClick={()=>setPhase(results.length?"results":"catalog")}>← Torna ai risultati</button>
          <div style={st.dGrid}>
            <div style={st.dLeft}>
              <div style={st.dHead}>
                <span style={{fontSize:"44px"}}>{selected.img}</span>
                <div style={{flex:1}}><h2 style={st.dName}>{selected.name}</h2><p style={st.dMeta}>{selected.tipo} · {selected.localita} · {selected.area}</p></div>
                {profilo&&<div style={{...st.badge,background:selected.score>82?"#1a4a35":"#2d6a4f",padding:"10px 14px",borderRadius:"10px",minWidth:"60px"}}>
                  <span style={{fontSize:"26px",fontWeight:"700",lineHeight:1}}>{selected.score}</span>
                  <span style={{fontSize:"9px",opacity:0.8,textTransform:"uppercase"}}>% match</span>
                </div>}
              </div>
              <p style={st.dDesc}>{selected.descrizione}</p>
              <div style={st.infoRow}>
                <div style={st.iBox}><span style={st.iL}>Capacità</span><span style={st.iV}>{selected.posti} posti</span></div>
                <div style={st.iBox}><span style={st.iL}>Minimo</span><span style={st.iV}>{selected.notti_min} notti</span></div>
              </div>
              <div style={st.tagRow}>{selected.tags.map(t=><span key={t} style={st.tag}>{t}</span>)}</div>
              <PressureBar pressione={selected.pressione}/>
              <div style={st.mobSec}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",flexWrap:"wrap"}}>
                  <span style={{...st.mobBadge,background:mc(selected.mobilita.tipo)+"18",color:mc(selected.mobilita.tipo),borderColor:mc(selected.mobilita.tipo)+"55"}}>
                    {MOB_ICON[selected.mobilita.tipo]} {selected.mobilita.label}
                  </span>
                  <span style={{fontSize:"13px",fontWeight:"600"}}>Come arrivarci</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"12px"}}>
                  {selected.mobilita.dettagli.map((d,i)=>(
                    <div key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                      <span style={{fontSize:"16px",flexShrink:0,width:"22px"}}>{d.icona}</span>
                      <span style={{fontSize:"12px",color:"#444",lineHeight:"1.4"}}>{d.testo}</span>
                    </div>
                  ))}
                </div>
                <div style={st.vicGrid}>
                  {selected.vicino_a.map(v=>(
                    <div key={v.luogo} style={st.vicBox}><span style={{fontSize:"12px",fontWeight:"600"}}>{v.luogo}</span><span style={{fontSize:"11px",color:"#888"}}>{v.distanza}</span></div>
                  ))}
                </div>
              </div>
              <div style={st.dvBox}>
                <h3 style={{fontSize:"13px",fontWeight:"600",marginBottom:"8px"}}>📍 Da vedere nei dintorni</h3>
                {selected.da_vedere.map((d,i)=><div key={i} style={{fontSize:"12px",color:"#555",lineHeight:"1.8"}}>· {d}</div>)}
              </div>
            </div>

            <div style={st.dRight}>
              {/* ESPERIENZE */}
              <div style={st.expBox}>
                <h3 style={{fontSize:"15px",fontWeight:"600",margin:"0 0 3px",color:"#2d6a4f"}}>◈ Esperienze nel territorio</h3>
                <p style={{fontSize:"10px",color:"#bbb",fontStyle:"italic",marginBottom:"12px"}}>Attivate dopo la prenotazione</p>
                {selected.esperienze.map((e,i)=>{
                  const disp=e.mesi.includes(meseFilter+1);
                  return(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:"1px solid #f0ebe3",opacity:disp?1:0.4}}>
                      <span style={{fontSize:"18px",width:"24px"}}>{e.img}</span>
                      <span style={{flex:1,fontSize:"12px",color:"#333"}}>{e.nome}</span>
                      <span style={{fontSize:"10px",color:disp?"#2d6a4f":"#aaa",background:disp?"#e8f4ec":"#f0ece6",padding:"2px 7px",borderRadius:"8px",whiteSpace:"nowrap"}}>
                        {disp?MESI[meseFilter]:"fuori stagione"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* RECENSIONI */}
              <div style={{background:"white",border:"1px solid #d4c9b5",borderRadius:"12px",padding:"18px"}}>
                <h3 style={{fontSize:"14px",fontWeight:"600",margin:"0 0 4px"}}>Racconti di chi c'è stato</h3>
                <p style={{fontSize:"10px",color:"#bbb",fontStyle:"italic",marginBottom:"14px"}}>Filtrate per coerenza testo-sentiment</p>
                <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                  {(RECENSIONI[selected.id]||[]).map((rec,i)=><RecCard key={i} rec={rec} compact={false}/>)}
                </div>
              </div>

              {/* MATCH */}
              {profilo&&(
                <div style={{background:"white",border:"1px solid #d4c9b5",borderRadius:"12px",padding:"16px 18px"}}>
                  <p style={{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em",color:"#999",marginBottom:"12px"}}>Compatibilità per dimensione</p>
                  {Object.entries({Ritmo:[profilo.ritmo,selected.profilo.ritmo],Natura:[profilo.natura,selected.profilo.natura],Socialità:[profilo.socialita,selected.profilo.socialita],Cucina:[profilo.cucina,selected.profilo.cucina],Cultura:[profilo.cultura,selected.profilo.cultura],Avventura:[profilo.avventura,selected.profilo.avventura],Comfort:[profilo.lusso,selected.profilo.lusso]}).map(([l,[u,sv]])=>(
                    <div key={l} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"5px"}}>
                      <span style={{fontSize:"10px",color:"#666",width:"56px",flexShrink:0}}>{l}</span>
                      <div style={{flex:1,display:"flex",flexDirection:"column",gap:"2px"}}>
                        <div style={{height:"3px",background:"#3a7d5c",borderRadius:"2px",width:`${(u||0)*20}%`}}/>
                        <div style={{height:"3px",background:"#c4a35a",borderRadius:"2px",width:`${sv*20}%`}}/>
                      </div>
                      <span style={{fontSize:"11px",color:"#2d6a4f",width:"12px"}}>{Math.abs((u||0)-sv)<=1?"✓":""}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",gap:"12px",fontSize:"10px",color:"#888",marginTop:"8px"}}>
                    <span><span style={{display:"inline-block",width:9,height:9,borderRadius:2,background:"#3a7d5c",marginRight:3}}/>Tu</span>
                    <span><span style={{display:"inline-block",width:9,height:9,borderRadius:2,background:"#c4a35a",marginRight:3}}/>Struttura</span>
                  </div>
                </div>
              )}

              <div style={st.bookBox}>
                <p style={{fontSize:"17px",fontWeight:"600",margin:0}}>Sei interessato?</p>
                <p style={{fontSize:"12px",opacity:0.8,lineHeight:"1.6",margin:0}}>Verifica disponibilità, scegli le esperienze e prenota.</p>
                <button style={st.bookBtn} onClick={()=>alert(`Prenotazione per ${selected.name} - Questo è un demo`)}>Simula prenotazione →</button>
                <p style={{fontSize:"9px",opacity:0.45,textAlign:"center",margin:0,fontStyle:"italic"}}>[ Demo · nessuna prenotazione reale ]</p>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

const st={
  root:{minHeight:"100vh",background:"#f5f0e8",fontFamily:"'Georgia','Times New Roman',serif",color:"#1a1a1a",position:"relative"},
  grain:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`},
  header:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 28px",borderBottom:"1px solid #c8b89a",background:"#f5f0e8",position:"sticky",top:0,zIndex:10,flexWrap:"wrap",gap:"10px"},
  logo:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},
  logoMark:{fontSize:"20px",color:"#2d6a4f"},
};

export default App;
  logoText:{fontSize:"15px",fontWeight:"700",letterSpacing:"0.08em",textTransform:"uppercase"},
  tagline:{fontSize:"10px",color:"#999",letterSpacing:"0.05em",fontStyle:"italic"},
  modeTabs:{display:"flex",background:"#ede8e0",borderRadius:"20px",padding:"3px",gap:"2px"},
  modeTab:{padding:"5px 14px",borderRadius:"16px",border:"none",background:"transparent",cursor:"pointer",fontSize:"12px",color:"#666",fontFamily:"inherit"},
  modeTabActive:{background:"white",color:"#2d6a4f",fontWeight:"600",boxShadow:"0 1px 4px rgba(0,0,0,0.1)"},
  home:{maxWidth:"680px",margin:"0 auto",padding:"60px 24px 40px",textAlign:"center"},
  homeSub:{fontSize:"10px",letterSpacing:"0.2em",textTransform:"uppercase",color:"#84a98c",marginBottom:"10px"},
  homeTitle:{fontSize:"clamp(30px,5vw,50px)",fontWeight:"400",lineHeight:"1.1",margin:"0 0 12px"},
  homeDesc:{fontSize:"14px",color:"#888",marginBottom:"28px",lineHeight:"1.6"},
  homeSearchBox:{background:"white",border:"1px solid #c8b89a",borderRadius:"16px",padding:"16px",display:"flex",flexDirection:"column",gap:"10px",textAlign:"left",marginBottom:"16px"},
  homeTextarea:{width:"100%",padding:"0",border:"none",background:"transparent",fontSize:"15px",fontFamily:"inherit",resize:"none",outline:"none",lineHeight:"1.6",color:"#1a1a1a"},
  homeSendBtn:{alignSelf:"flex-end",padding:"8px 22px",background:"#2d6a4f",color:"white",border:"none",borderRadius:"10px",fontSize:"13px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"},
  homeChips:{display:"flex",flexWrap:"wrap",gap:"7px",justifyContent:"center",marginBottom:"24px"},
  homeOrRow:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},
  homeDivider:{flex:1,height:"1px",background:"#d4c9b5"},
  homeOrText:{fontSize:"11px",color:"#aaa",letterSpacing:"0.1em"},
  homeCatalogBtn:{padding:"10px 24px",border:"1px solid #c8b89a",borderRadius:"20px",background:"transparent",cursor:"pointer",fontSize:"13px",color:"#52796f",fontFamily:"inherit",marginBottom:"24px"},
  homeMeseRow:{display:"flex",alignItems:"center",gap:"10px",justifyContent:"center"},
  main:{maxWidth:"620px",margin:"0 auto",padding:"32px 24px 40px",display:"flex",flexDirection:"column",gap:"16px"},
  chatWrap:{display:"flex",flexDirection:"column",gap:"10px",minHeight:"60px"},
  chatHint:{display:"flex",gap:"8px",alignItems:"flex-start",padding:"10px 14px",background:"white",border:"1px solid #d4c9b5",borderRadius:"12px"},
  bubU:{alignSelf:"flex-end",background:"#2d6a4f",color:"white",padding:"10px 16px",borderRadius:"18px 18px 4px 18px",maxWidth:"80%",fontSize:"14px",lineHeight:"1.5"},
  bubAI:{alignSelf:"flex-start",background:"white",border:"1px solid #d4c9b5",padding:"10px 16px",borderRadius:"18px 18px 18px 4px",maxWidth:"85%",fontSize:"14px",lineHeight:"1.5",display:"flex",gap:"8px",alignItems:"flex-start"},
  aiDot:{color:"#2d6a4f",fontWeight:"bold",flexShrink:0},
  ldots:{color:"#aaa",letterSpacing:"4px"},
  inputWrap:{display:"flex",gap:"8px",alignItems:"flex-end"},
  textarea:{flex:1,padding:"10px 14px",border:"1px solid #c8b89a",borderRadius:"12px",background:"white",fontSize:"14px",fontFamily:"inherit",resize:"none",outline:"none",lineHeight:"1.5"},
  sendBtn:{padding:"10px 16px",background:"#2d6a4f",color:"white",border:"none",borderRadius:"12px",fontSize:"18px",cursor:"pointer",height:"44px",minWidth:"44px"},
  chips:{display:"flex",flexWrap:"wrap",gap:"7px",justifyContent:"center"},
  chip:{padding:"5px 13px",border:"1px solid #c8b89a",borderRadius:"20px",background:"transparent",cursor:"pointer",fontSize:"12px",color:"#555",fontFamily:"inherit"},
  mainR:{padding:"22px 24px",maxWidth:"1200px",margin:"0 auto"},
  topBar:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",flexWrap:"wrap",gap:"14px"},
  rTitle:{fontSize:"22px",fontWeight:"400",margin:"8px 0 4px"},
  sommario:{fontSize:"13px",color:"#666",fontStyle:"italic"},
  destChip:{fontSize:"11px",background:"#e8f4ec",color:"#2d6a4f",padding:"2px 9px",borderRadius:"10px",border:"1px solid #b5d8c0"},
  expChip:{fontSize:"11px",background:"#f5f0e8",color:"#84a98c",padding:"2px 9px",borderRadius:"10px",border:"1px solid #c8b89a"},
  mobChip:{fontSize:"11px",background:"#f0ece6",color:"#888",padding:"2px 9px",borderRadius:"10px",border:"1px solid #d4c9b5"},
  backBtn:{background:"transparent",border:"1px solid #c8b89a",borderRadius:"20px",padding:"5px 14px",cursor:"pointer",fontSize:"12px",color:"#555",fontFamily:"inherit",marginBottom:"6px"},
  profiloBox:{background:"white",border:"1px solid #d4c9b5",borderRadius:"10px",padding:"12px 16px",minWidth:"190px",maxWidth:"250px"},
  profiloTitle:{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em",color:"#999",marginBottom:"8px"},
  barRow:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"5px"},
  barL:{fontSize:"10px",color:"#666",width:"52px",flexShrink:0},
  barBg:{flex:1,height:"3px",background:"#e8e0d0",borderRadius:"2px"},
  barFill:{height:"100%",background:"#2d6a4f",borderRadius:"2px"},
  meseSelect:{padding:"4px 8px",border:"1px solid #c8b89a",borderRadius:"8px",background:"white",fontSize:"12px",fontFamily:"inherit",outline:"none"},
  twoCol:{display:"grid",gridTemplateColumns:"1fr 340px",gap:"18px",alignItems:"start"},
  cards:{display:"flex",flexDirection:"column",gap:"10px"},
  card:{background:"white",border:"1px solid #d4c9b5",borderRadius:"12px",padding:"14px 16px",cursor:"pointer",position:"relative"},
  cardTop:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"},
  cEmoji:{fontSize:"24px"},
  cMid:{flex:1},
  cName:{fontSize:"14px",fontWeight:"600"},
  cSub:{fontSize:"11px",color:"#999"},
  badge:{display:"flex",flexDirection:"column",alignItems:"center",padding:"5px 9px",borderRadius:"8px",color:"white",minWidth:"44px"},
  bNum:{fontSize:"17px",fontWeight:"700",lineHeight:1},
  bSub:{fontSize:"8px",opacity:0.8,textTransform:"uppercase"},
  cardTagsRow:{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"7px"},
  mobTag:{display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"11px",padding:"3px 9px",borderRadius:"20px",border:"1px solid",fontWeight:"500"},
  presTag:{display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"11px",padding:"3px 9px",borderRadius:"20px",border:"1px solid",fontWeight:"500"},
  cDesc:{fontSize:"12px",color:"#555",lineHeight:"1.5",margin:"0 0 6px"},
  tagRow:{display:"flex",flexWrap:"wrap",gap:"5px"},
  tag:{fontSize:"10px",padding:"2px 7px",background:"#f0ebe3",border:"1px solid #d4c9b5",borderRadius:"9px",color:"#666"},
  best:{position:"absolute",top:"12px",right:"62px",fontSize:"9px",color:"#2d6a4f",fontWeight:"600"},
  mapBox:{background:"white",border:"1px solid #d4c9b5",borderRadius:"12px",padding:"13px"},
  mapTitle:{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em",color:"#999",marginBottom:"7px"},
  mapSvg:{width:"100%",borderRadius:"6px"},
  mapLeg:{display:"flex",gap:"8px",fontSize:"10px",color:"#777",marginTop:"7px",flexWrap:"wrap",alignItems:"center"},
  mainExp:{padding:"22px 24px",maxWidth:"1100px",margin:"0 auto"},
  expControls:{display:"flex",flexDirection:"column",gap:"10px",margin:"14px 0 18px"},
  catFilters:{display:"flex",flexWrap:"wrap",gap:"7px"},
  catBtn:{padding:"5px 13px",border:"1px solid #c8b89a",borderRadius:"20px",background:"transparent",cursor:"pointer",fontSize:"12px",color:"#555",fontFamily:"inherit"},
  catBtnActive:{background:"#2d6a4f",borderColor:"#2d6a4f",color:"white"},
  expSearchRow:{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"},
  expSearchInput:{flex:1,padding:"7px 13px",border:"1px solid #c8b89a",borderRadius:"10px",background:"white",fontSize:"13px",fontFamily:"inherit",outline:"none",minWidth:"180px"},
  expGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:"10px"},
  expCard:{background:"white",border:"1px solid #d4c9b5",borderRadius:"11px",padding:"13px 14px",cursor:"pointer",display:"flex",gap:"11px",alignItems:"flex-start"},
  mainD:{padding:"22px 24px",maxWidth:"1100px",margin:"0 auto"},
  dGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"26px",marginTop:"12px"},
  dLeft:{display:"flex",flexDirection:"column",gap:"15px"},
  dRight:{display:"flex",flexDirection:"column",gap:"15px"},
  dHead:{display:"flex",alignItems:"center",gap:"13px"},
  dName:{fontSize:"21px",fontWeight:"400",margin:"0 0 2px"},
  dMeta:{fontSize:"12px",color:"#999",margin:0},
  dDesc:{fontSize:"14px",color:"#444",lineHeight:"1.7"},
  infoRow:{display:"flex",gap:"10px"},
  iBox:{flex:1,background:"#f8f4ed",border:"1px solid #d4c9b5",borderRadius:"8px",padding:"9px 13px",display:"flex",flexDirection:"column",gap:"2px"},
  iL:{fontSize:"9px",textTransform:"uppercase",letterSpacing:"0.1em",color:"#aaa"},
  iV:{fontSize:"14px",fontWeight:"600"},
  mobSec:{background:"white",border:"1px solid #d4c9b5",borderRadius:"12px",padding:"14px 18px"},
  mobBadge:{display:"inline-flex",alignItems:"center",gap:"5px",padding:"4px 11px",borderRadius:"20px",border:"1px solid",fontSize:"12px",fontWeight:"600"},
  vicGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"},
  vicBox:{background:"#f8f4ed",borderRadius:"8px",padding:"8px 11px",display:"flex",flexDirection:"column",gap:"2px"},
  dvBox:{background:"#f8f4ed",border:"1px solid #d4c9b5",borderRadius:"10px",padding:"13px 16px"},
  expBox:{background:"white",border:"1px solid #d4c9b5",borderRadius:"12px",padding:"16px"},
  bookBox:{background:"#2d6a4f",borderRadius:"12px",padding:"18px",color:"white",display:"flex",flexDirection:"column",gap:"9px"},
  bookBtn:{background:"white",color:"#2d6a4f",border:"none",padding:"9px 20px",borderRadius:"8px",fontSize:"13px",fontWeight:"600",cursor:"pointer",fontFamily:"inherit"},
};
