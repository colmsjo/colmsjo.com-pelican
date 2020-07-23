layout: post
title: Arkitektur för mobila lösningar
description: Kort summering av de utmaningar som en utvecklare av mobila lösningar möter
date: 2015-08-19
author: Jonas Colmsjo
tags: ['post', 'mobila lösningar', 'arkitektur']

Arkitekturer för mobila lösningar
================================

Vid utveckling av mobila lösningar finns ett antal utmaningar som inte finns vid
traditionell utveckling.
Dessa utmaningar är desamma oberoende av vilken arkitektur (Android, iOS,
hybrid, web-apper, etc.) som lösningen utvecklas i. Här diskuteras kortfattat
dessa utmaningar och ett exempel på en app som utvecklats för ett logistikföretag
presenteras.


Utveckling av mobila lösningar är annorlunda

Den extremt
höga taken som nya modeller och versioner av operativsystem (Android, iOS, Windows
Phone m.fl.) släpps i gör utveckling av mobila lösningar till ett rörligt mål. Även om
operativsystemen har standardiserade API:er finns det skillnader som utvecklare ibland
måste ta hänsyn till. Det händer också att det finns skillnader i olika regioner för
samma modell, t.ex. buggar i lokaliseringslogiken (vilket kan orsaka problem vid
off-shore utveckling).

En annan utmaning är att en utvecklare inte kan utgå från att nätverket alltid är
tillgängligt. Lösningar måste känna av om nätverket är tillgängligt och göra
anrop mot servern vid rätt tillfälle. Ofta krävs någon form av lokal lagring av data för
att lösningen ska gå att använda när nätverket inte är tillgängligt.

Varierande skärmstorlek och upplösning mellan telefoner måste också hanteras för att
användarupplevelsen inte ska påverkas. Det extra skärmutrymme som en modell med 6" skärm
har jämfört med en modell med 3,5" bör utnyttjas för att för att optimera upplevelsen.
För att en app ska fungera på läsplattor krävs också vissa anpassningar.

Design av användargränssnitt för mobila lösningar skiljer sig delvis från traditionella
användargränssnitt. Den begränsade skärmstorleken gör att gränssnittet måste vara enkelt
att använda vilket kräver en bra design av menyerna och dialogerna. Användaren av en
mobila app är ofta i rörelse och gör flera saker samtidigt. Detta ställer också extra höga
krav på att användargränssnittet är intuitivt och enkelt.

Slutligen innehåller moderna mobiltelefoner kamera, bluetooth, GPS och en mängd sensorer.
Mobilen är också ofta en personlig informationscentral som användaren litar på. Här finns
information som kontakter, kalendrar etc. som bör utnyttjas. En användare ska inte behöva
mata in information som redan finns tillgänglig i telefonen eller via en sensor.

Dessa aspekter måste en utvecklare av mobila lösningar ta hänsyn till. Om utvecklingen
görs native för Android, iOS, Windows Phone, med sk. hybrid-ramverk eller kanske
som en web-applikation anpassad för mobila browsers gör liten skillnad.


Mobil app för inspektioner och skaderapporter

Ett logistikföretaget vars transporter är outsourcade hade problem med att trailers
ofta skadas under transporterna. Kostnaden för dessa skador ska transportörerna
stå för och de ska också rapportera de skador de orsakar. Benägenheten
att rapportera skador med den tidigare, pappersbaserade processen, var dock låg.

En ny process designades där transportörerna inspekterar trailern innan de tar
över den. Inspektionen rapporteras i en mobil app där alla existerande skador
finns tillgängliga. Hittar transportören en ny skada ska denna rapporteras med
hjälp av appen. Foton på skadas läggs också in i skaderapporten. I en portal
kan logistikföretaget se alla inspektioner och skaderapporter. Om en transportör
inte rapporterar en skada de orsakat kommer nästa transportör att göra detta.
Skaderapportern ligger sedan till grund för de krav på kostnadstäckning för
reparationer som logistikföretaget ställer mot sina transportörer.

Den mobila appen utvecklades i Apache Cordova. Detta gör det möjligt att kompilera
för en mängd plattformar. Appen som utvecklades här finns publicerad på Apple
Store och Google Play. Backend utvecklades i PHP och MySQL och lösningen är
hostad i Amazon's molntjänst. Bilder lagras i Amazons S3-tjänst.
En del i designen är att lastbalanserare, applikations-server samt back-end
tjänster som mail-server, cache-server, loggning mm. är uppsatt i docker. Detta
gör det enkelt och billigt att sätta upp utvecklings-, test- och utbildningsmiljöer
som är i stort sett identiska med produktionsmiljön.
