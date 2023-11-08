# TesinaIoT
Repository per progetto IoT
## Materiale
Le componenti elettroniche utilizzate per la realizzazione del progetto assegnatoci sono: 
- Raspberry Pi 3A+, un device non-constrained che funge da LWM2M Server
- ESP-32-WROOM-32, un device constrained che rappresenta il LWM2M Client

## Prerequisiti
Questi sono i prerequisiti necessari per il corretto funzionamento della tesina
### Installazione Raspberry Pi OS
Per poter utilizzare correttamente il Raspberry Pi 3A+, è necessario installare il sistema operativo Raspberry Pi OS. 
Per fare ciò, scaricare l'ultima release dal sito ufficiale al seguente link: 
```
https://www.raspberrypi.com/software/
```
Scaricare il file compatibile con il sistema operativo del computer attualmente in uso e seguire le istruzioni del sito di Raspberry per installare l'immagine su una Micro SD (in quanto questo modello prevede solo uno slot per l'OS del Raspberry)

### Driver per porte COM-USB
In caso non dovessero essere presenti, è necessario scaricare i driver per utilizzare le porte COM dal seriale USB. 
Il driver viene incluso nella repository corrente o comunque scaricabile dal sito ufficiale al seguente link:
```
https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads.
```
### Rete wireless
Per effettuare le comunicazioni client-server, è necessario usufruire di una rete Wi-Fi a 2.4GHz di cui si conoscono SSID e password: la frequenza prima indicata è dovuta dal fatto che l'ESP-32 sopra descritto non riesca ad associarsi ad una rete Wi-Fi con frequenza di 5GHz.

### Software necessari per lo sviluppo
Per facilitare la scrittura del codice usato nei passi successivi, si consiglia di scaricare: 
1. Arduino IDE (versione 2.2.1 o successive)
2. Visual Studio Code (con successiva installazione del plugin PlatformIO per caricare il codice eseguibile su ESP-32) 

## Librerie CoAP usate
Le librerie qui elencate sono state scelte dopo una serie di confronti e risultate essere più consone all'obiettivo finale

Thing.CoAP  

 

