# Vocabulary Search and Select Engine

This is a project for finding approriate term for describing capabilities of IoT devices.

| Vocab | JSON_LD | CORS | 
| ------ | ------ | ------ |
| schema.org | Y | Y
| dublincore.org | X | X
| iot-ontologies | Y | Y

Ziel: Serverless
- keine aktive Wartung nötig
- Anwendung unabhängig von Backend
- direkter Zugriff auf Vocabs, ohne Umweg über Server
(Einschränkung: Server als Proxy und Host für eigenen Vocabs)


Problem:
- sehr viele unterschiedliche Formate


ToDos:
- (Proxy endpoint anpassen -> Browser caching freundlich)
- Refactoring


Fahrplan:
- RDF aus beliebigen Quellen/ Formaten laden (x)
- verschienden Formate in einheitliches Format umwandel
- Daten druchsuchen
